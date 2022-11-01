import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// libraries
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
// components
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import PublicRoute from 'components/PublicRoute';
// http methods
import { postResetPasswordAPI } from 'api/auth';
// styles
import { colors } from 'styles/variables';

export default function NuevaContrasena() {
  const router = useRouter();

  const captchaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [codeParam, setCodeParam] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    if (!router.query.code) {
      router.replace('/');
    }

    setCodeParam(router.query.code as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
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
        await postResetPasswordAPI({
          password: formData.password,
          passwordConfirmation: formData.repeatPassword,
          code: codeParam as string,
        });

        toast.success(
          'Su contraseña ha sido reestablecida satisfactoriamente.'
        );
        setTimeout(() => {
          router.replace('/iniciar-sesion');
        }, 3000);
      } catch (error: any) {
        let msg =
          'Error: no se pudo reestablecer su nueva contraseña, intente mas tarde.';

        if (
          error?.response?.data?.error?.message === 'Incorrect code provided'
        ) {
          msg = 'Código incorrecto, intente mas tarde.';
        }

        toast.error(msg, {
          duration: 5000,
        });

        setTimeout(() => {
          router.replace('/');
        }, 3000);
      }
    },
  });

  return (
    <PublicRoute>
      <Layout>
        {loading && <Loading title='Enviando...' />}
        <section className='container'>
          <h1>Nueva contraseña</h1>
          <form className='row' onSubmit={formik.handleSubmit}>
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
              <button type='submit' className='button col-12 col-md-6'>
                Establecer nueva contraseña
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
    .oneOf([Yup.ref('password'), 'Las contraseñas debe ser iguales'])
    .trim(),
});
