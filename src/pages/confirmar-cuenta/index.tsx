import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import toast from 'react-hot-toast';
// http methods
import { getConfirmAccountAPI } from 'api/auth';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query, res } = ctx;
  if (!query.confirmation) {
    res.writeHead(301, { Location: '/' }).end();
    return;
  }

  try {
    await getConfirmAccountAPI(query.confirmation as string);
    return {
      props: { message: 'Cuenta confirmada satisfactoriamente.', error: false },
    };
  } catch (error: any) {
    let message =
      'Error: no se pudo confirmar la cuenta, intente de nuevo mas tarde.';
    if (error?.response?.data?.error?.message === 'Invalid token') {
      message = 'Error: código de confirmación invalido.';
    }
    return { props: { message, error: true } };
  }
};

export default function ConfirmarCuenta({
  message,
  error,
}: {
  message: string;
  error: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(message, { duration: 5000 });
      router.replace('/');
      return;
    }

    toast.success(message, { duration: 5000 });
    router.replace('/iniciar-sesion');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
