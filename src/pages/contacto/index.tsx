import React, { useRef } from 'react';
// libraries
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
// componets
import BreadCrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
// hooks
import useForm from 'hooks/useForm';
// styles
import { breakPoints, colors } from 'styles/variables';

export default function Contact() {
  const captchaRef = useRef(null);

  const { state, handleChange, reset } = useForm({
    name: { value: '', valid: false },
    email: { value: '', valid: false },
    issue: { value: '', valid: false },
    comment: { value: '', valid: false },
  });
  const { name, email, issue, comment } = state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let invalidForm = false;
      for (const key in state) {
        const value = state[key];
        if (!value.valid) {
          const $element = document.querySelector(
            `[name="${key}"]`
          )?.parentElement;
          $element?.classList.add('input-danger');
          invalidForm = true;
        }
      }
      if (invalidForm) return;

      // @ts-ignore
      if (!captchaRef.current.getValue()) {
        toast.error('Tienes que realizar la verificación del Recaptcha');
        return;
      }
      toast.success('Mensaje correctamente enviado');
      // TODO: include service to send data
    } catch (error) {
      toast.error('Error al enviar el formulario, intente mas tarde');
    }

    // @ts-ignore
    captchaRef.current.reset();
    reset();
  };

  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section className='container'>
        <h1>Contáctanos</h1>
        <form className='row' onSubmit={handleSubmit}>
          <div className='input-group col-12 col-lg-6'>
            <label
              className={`input-filled ${
                name.value.length
                  ? name.valid
                    ? 'input-success'
                    : 'input-danger'
                  : ''
              }`}
            >
              <input
                name='name'
                value={name.value}
                onChange={(e) =>
                  handleChange({
                    e,
                    max: 50,
                    required: true,
                    validation: 'withoutNumbers',
                  })
                }
              />
              <span className='input-label'>Nombre</span>
              {!name.valid && (
                <span className='input-helper'>
                  El nombre solo puede contener letras y espacios, este campo es
                  obligatorio.
                </span>
              )}

              {!!name.value.length && (
                <>
                  {name.valid ? (
                    <svg
                      fill='#28a745'
                      width='24'
                      height='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z' />
                    </svg>
                  ) : (
                    <svg
                      fill='#b50706'
                      width='24'
                      height='24'
                      viewBox='0 0 55 55'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z' />
                    </svg>
                  )}
                </>
              )}
            </label>
          </div>
          <div className='input-group col-12 col-lg-6'>
            <label
              className={`input-filled ${
                email.value.length
                  ? email.valid
                    ? 'input-success'
                    : 'input-danger'
                  : ''
              }`}
            >
              <input
                name='email'
                value={email.value}
                onChange={(e) =>
                  handleChange({
                    e,
                    max: 50,
                    required: true,
                    validation: 'email',
                  })
                }
              />
              <span className='input-label'>Correo</span>
              {!email.valid && (
                <span className='input-helper'>
                  Debes ingresar un correo válido, este campo es obligatorio.
                </span>
              )}
              {!!email.value.length && (
                <>
                  {email.valid ? (
                    <svg
                      fill='#28a745'
                      width='24'
                      height='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z' />
                    </svg>
                  ) : (
                    <svg
                      fill='#b50706'
                      width='24'
                      height='24'
                      viewBox='0 0 55 55'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z' />
                    </svg>
                  )}
                </>
              )}
            </label>
          </div>
          <div className='input-group col-12'>
            <label
              className={`input-filled ${
                issue.value.length
                  ? issue.valid
                    ? 'input-success'
                    : 'input-danger'
                  : ''
              }`}
            >
              <input
                name='issue'
                value={issue.value}
                onChange={(e) =>
                  handleChange({
                    e,
                    max: 50,
                    required: true,
                    validation: null,
                  })
                }
              />
              <span className='input-label'>Asunto a tratar</span>
              {!issue.valid && (
                <span className='input-helper'>Este campo es obligatorio.</span>
              )}
              {!!issue.value.length && (
                <>
                  {issue.valid ? (
                    <svg
                      fill='#28a745'
                      width='24'
                      height='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path fill='none' d='M0 0h24v24H0z' />
                      <path d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6 7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z' />
                    </svg>
                  ) : (
                    <svg
                      fill='#b50706'
                      width='24'
                      height='24'
                      viewBox='0 0 55 55'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M44.373 7.603c-10.137-10.137-26.632-10.138-36.77 0-10.138 10.138-10.137 26.632 0 36.77s26.632 10.138 36.77 0c10.137-10.138 10.137-26.633 0-36.77zm-8.132 28.638a2 2 0 0 1-2.828 0l-7.425-7.425-7.778 7.778a2 2 0 1 1-2.828-2.828l7.778-7.778-7.425-7.425a2 2 0 1 1 2.828-2.828l7.425 7.425 7.071-7.071a2 2 0 1 1 2.828 2.828l-7.071 7.071 7.425 7.425a2 2 0 0 1 0 2.828z' />
                    </svg>
                  )}
                </>
              )}
            </label>
          </div>
          <div className='input-group col-12'>
            <label
              className={`input-filled ${
                comment.value.length
                  ? comment.valid
                    ? 'input-success'
                    : 'input-danger'
                  : ''
              }`}
            >
              <textarea
                name='comment'
                value={comment.value}
                placeholder='Comentarios'
                onChange={(e) =>
                  handleChange({
                    e,
                    max: 500,
                    required: true,
                    validation: null,
                  })
                }
              ></textarea>
              {!comment.valid && (
                <span className='input-helper'>Este campo es obligatorio.</span>
              )}
            </label>
          </div>
          <div className='col-12 row'></div>
          <div className='col-12'>
            <div className='recaptcha-container'>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
                size='compact'
                ref={captchaRef}
              />
            </div>
          </div>
          <div className='col-12 row'>
            <button type='submit' className='button col-6'>
              Enviar
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

        .recaptcha-container {
          margin-left: auto;
          margin-right: auto;
          width: 60%;
        }

        @media (min-width: ${breakPoints.sm}) {
          .recaptcha-container {
            width: 30%;
          }
        }

        @media (min-width: ${breakPoints.md}) {
          .recaptcha-container {
            width: 25%;
          }
        }

        @media (min-width: ${breakPoints.lg}) {
          .recaptcha-container {
            width: 20%;
          }
        }

        @media (min-width: ${breakPoints.xl}) {
          .recaptcha-container {
            width: 15%;
          }
        }
      `}</style>
    </Layout>
  );
}
