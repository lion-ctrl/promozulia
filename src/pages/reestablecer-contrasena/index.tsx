import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// libraries
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
// components
import Layout from 'components/Layout';
import PublicRoute from 'components/PublicRoute';
import Loading from 'components/Loading';
// http methods
import { postForgotPasswordAPI } from 'api/auth';
// styles
import { colors } from 'styles/variables';

export default function ReestablecerContrasena() {
  const router = useRouter();

  const captchaRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
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
        const { data } = await postForgotPasswordAPI(formData);

        if (!data.ok) {
          throw new Error();
        }

        toast.success(
          'Verifique su correo electrónico para recuperar su contraseña.'
        );
        setTimeout(() => {
          router.push('/iniciar-sesion');
        }, 3000);
      } catch (error: any) {
        const msg =
          'Error: no se pudo enviar el correo de recuperación de contraseña, intente mas tarde.';
        toast.error(msg, {
          duration: 5000,
        });
        setLoading(false);
      }
    },
  });

  return (
    <PublicRoute>
      <Layout>
        {loading && <Loading title='Enviando...' />}
        <section className='container'>
          <h1>Recuperar contraseña</h1>
          <form className='row' onSubmit={formik.handleSubmit}>
            <div className='input-group col-12'>
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
            <div className='col-12'>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
                size='compact'
                ref={captchaRef}
              />
            </div>
            <div className='col-12 row' style={{ justifyContent: 'center' }}>
              <button type='submit' className='button col-12 col-md-6'>
                Enviar correo
              </button>
            </div>
            <div className='col-12 row' style={{ justifyContent: 'center' }}>
              <Link href='/iniciar-sesion'>
                <a
                  className='button col-12 col-md-6'
                  style={{
                    backgroundColor: 'transparent',
                    color: colors.color1,
                    textAlign: 'center',
                    textDecoration: 'underline',
                  }}
                >
                  Regresar a inicio de sesión
                </a>
              </Link>
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
    </PublicRoute>
  );
}

const validationSchema = () => ({
  email: Yup.string()
    .email('Correo electrónico incorrecto')
    .required('Correo electrónico es requerido')
    .trim(),
});
