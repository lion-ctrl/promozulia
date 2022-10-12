import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
// libraries
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// components
import BreadCrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
// styles
import { colors } from 'styles/variables';
import { postRegisterUserAPI } from 'api/auth';

export default function Registrarse() {
  const router = useRouter();

  const captchaRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (data) => {
      try {
        if (!navigator.onLine) {
          toast.error(
            'Error: debe tener conexión a internet para poder enviar el formulario.'
          );
          return;
        }
        // @ts-ignore
        if (!captchaRef.current.getValue()) {
          toast.error(
            'Error: tiene que realizar la verificación del Recaptcha.'
          );
          return;
        }

        setLoading(true);
        await postRegisterUserAPI(data);
        toast.success(
          'Verifique su correo electrónico para confirmar su cuenta.',
          { duration: 5000 }
        );
        router.push('/');
      } catch (error: any) {
        let msg =
          'Error: no se pudo crear la cuenta, intente de nuevo mas tarde.';
        if (
          error?.response?.data?.error?.message ===
          'Email or Username are already taken'
        ) {
          msg =
            'Error: Nombre o Correo ya estan registrados, intente con otra información.';
        }
        toast.error(msg, {
          duration: 5000,
        });
        setLoading(false);
      }
    },
  });

  return (
    <Layout>
      {loading && <Loading title='Enviando...' />}
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section className='container'>
        <h1>Registrarse</h1>
        <form className='row' onSubmit={formik.handleSubmit}>
          <div className='input-group col-12 col-lg-6'>
            <label
              className={`input-filled ${
                formik.errors.username?.length
                  ? 'input-danger'
                  : formik.values.username.length
                  ? 'input-success'
                  : ''
              } ${formik.values.username.length ? 'has-value' : ''}`}
            >
              <input
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <span className='input-label'>
                Nombre personal o nombre empresarial
              </span>
              {formik.errors.username?.length && (
                <span className='input-helper'>{formik.errors.username}</span>
              )}

              <svg
                fill='#28a745'
                width='24'
                height='24'
                xmlns='http://www.w3.org/2000/svg'
                className='success-icon'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z' />
              </svg>
              <svg
                fill='#b50706'
                width='24'
                height='24'
                viewBox='0 0 55 55'
                xmlns='http://www.w3.org/2000/svg'
                className='error-icon'
              >
                <path d='M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z' />
              </svg>
            </label>
          </div>
          <div className='input-group col-12 col-lg-6'>
            <label
              className={`input-filled ${
                formik.errors.email?.length
                  ? 'input-danger'
                  : formik.values.email.length
                  ? 'input-success'
                  : ''
              } ${formik.values.email.length ? 'has-value' : ''}`}
            >
              <input
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <span className='input-label'>Correo electrónico</span>
              {formik.errors.email?.length && (
                <span className='input-helper'>{formik.errors.email}</span>
              )}

              <svg
                fill='#28a745'
                width='24'
                height='24'
                xmlns='http://www.w3.org/2000/svg'
                className='success-icon'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z' />
              </svg>
              <svg
                fill='#b50706'
                width='24'
                height='24'
                viewBox='0 0 55 55'
                xmlns='http://www.w3.org/2000/svg'
                className='error-icon'
              >
                <path d='M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z' />
              </svg>
            </label>
          </div>
          <div className='input-group col-12 col-lg-6'>
            <label
              className={`input-filled ${
                formik.errors.password?.length
                  ? 'input-danger'
                  : formik.values.password.length
                  ? 'input-success'
                  : ''
              } ${formik.values.password.length ? 'has-value' : ''}`}
            >
              <input
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span className='input-label'>Contraseña</span>
              {formik.errors.password?.length && (
                <span className='input-helper'>{formik.errors.password}</span>
              )}

              <svg
                fill='#28a745'
                width='24'
                height='24'
                xmlns='http://www.w3.org/2000/svg'
                className='success-icon'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z' />
              </svg>
              <svg
                fill='#b50706'
                width='24'
                height='24'
                viewBox='0 0 55 55'
                xmlns='http://www.w3.org/2000/svg'
                className='error-icon'
              >
                <path d='M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z' />
              </svg>
            </label>
          </div>
          <div className='input-group col-12 col-lg-6'>
            <label
              className={`input-filled ${
                formik.errors.repeatPassword?.length
                  ? 'input-danger'
                  : formik.values.repeatPassword.length
                  ? 'input-success'
                  : ''
              } ${formik.values.repeatPassword.length ? 'has-value' : ''}`}
            >
              <input
                type='password'
                name='repeatPassword'
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
              />
              <span className='input-label'>Repetir contraseña</span>
              {formik.errors.repeatPassword?.length && (
                <span className='input-helper'>
                  Las contraseñas deben ser iguales
                </span>
              )}

              <svg
                fill='#28a745'
                width='24'
                height='24'
                xmlns='http://www.w3.org/2000/svg'
                className='success-icon'
              >
                <path fill='none' d='M0 0h24v24H0z' />
                <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z' />
              </svg>
              <svg
                fill='#b50706'
                width='24'
                height='24'
                viewBox='0 0 55 55'
                xmlns='http://www.w3.org/2000/svg'
                className='error-icon'
              >
                <path d='M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z' />
              </svg>
            </label>
          </div>
          <div className='col-12'>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
              size='compact'
              ref={captchaRef}
            />
          </div>
          <div className='col-12 row' style={{ justifyContent: 'center' }}>
            <button type='submit' className='button col-6'>
              Registrarse
            </button>
          </div>
        </form>
      </section>
      <style jsx>{`
        h1 {
          color: ${colors.color1};
          margin: 2rem 0;
          text-align: center;
        }

        form {
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  );
}

const validationSchema = () => ({
  username: Yup.string()
    .trim()
    .required('Nombre personal o nombre empresarial es requerido'),
  email: Yup.string()
    .email('Correo electrónico incorrecto')
    .required('Correo electrónico es requerido')
    .trim(),
  password: Yup.string()
    .required('Contraseña en requerido')
    .matches(
      /^(?=.*[@#$%^&+=]).*$/,
      'Contraseña debe tener: un caracter especial'
    )
    .min(6, 'Contraseña debe tener minimo 6 caracteres')
    .max(12, 'Contraseña debe tener maximo 12 caracteres')
    .trim(),
  repeatPassword: Yup.string()
    .required('Repetir contraseña es requerido')
    .oneOf([Yup.ref('password'), 'Las contraseñas deben ser iguales'])
    .trim(),
});
