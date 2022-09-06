import { useState } from "react";

const validation = {
  withoutNumbers: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
  email: /^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$/,
};

const useForm = (initialState = {}) => {
  const [state, setState] = useState<any>(initialState);

  const reset = (newFormState = initialState) => {
    setState(newFormState);
  };

  const handleChange = ({
    e,
    max,
    required,
    validation: valid,
  }: {
    e: any;
    max: number;
    required: boolean;
    validation: string | null;
  }) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.length > max) return;

    if (value.length && valid?.length) {
      // @ts-ignore
      const regex = validation[valid];
      if (regex === undefined) return;

      const newState = {
        ...state,
        [name]: { value },
      };

      if (regex.test(value)) {
        newState[name].valid = true;
      } else {
        newState[name].valid = false;
      }
      setState(newState);
      return;
    }

    if (required) {
      const newState = {
        ...state,
        [name]: { value },
      };

      if (value.length) {
        newState[name].valid = true;
      } else {
        newState[name].valid = false;
      }
      setState(newState);
      return;
    }

    setState({
      ...state,
      [name]: { value, valid: true },
    });
  };

  const handleValidate = ({
    e,
    required,
    validation: valid,
  }: {
    e: any;
    required: boolean;
    validation: string | null;
  }) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.length && valid?.length) {
      // @ts-ignore
      const regex = validation[valid];
      if (regex === undefined) return;

      const newState = {
        ...state,
        [name]: { value },
      };

      if (regex.test(e.target.value)) {
        newState[name].valid = true;
      } else {
        newState[name].valid = false;
      }
      setState(newState);
      return;
    }

    if (required) {
      const newState = {
        ...state,
        [name]: { value },
      };

      if (value.length) {
        newState[name].valid = true;
      } else {
        newState[name].valid = false;
      }
      setState(newState);
      return;
    }

    setState({
      ...state,
      [name]: { value, valid: true },
    });
  };

  return { state, handleChange, handleValidate, reset };
};

export default useForm;
