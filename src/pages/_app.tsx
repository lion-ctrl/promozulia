/// <reference types="styled-jsx" />
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
// redux
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from 'store';
import { setAuthLogOutUser, setAuthRefreshUser } from 'store/actions/auth';
import {
  setAppFooterInfo,
  setAppHeaderInfo,
  setAppLoading,
} from 'store/actions/app';
// components
import Loader from 'components/Loader';
// libraries
import toast, { Toaster } from 'react-hot-toast';
// http methods
import { getFooterDataAPI, getHeaderDataAPI } from 'api/components';
import { getCurrentUserAPI } from 'api/auth';
// styles
import { colors } from 'styles/variables';
import globalStyles from 'styles/globals';
import 'styles/slick/slick.css';
import 'styles/slick/slick.theme.css';
import 'styles/grid.css';
import 'styles/form.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const queryAPI = async () => {
      try {
        const [
          {
            data: { data: headerData },
          },
          {
            data: { data: footerData },
          },
        ] = await Promise.all([getHeaderDataAPI(), getFooterDataAPI()]);

        const publicLinks: {
          id: number;
          name: string;
          href: string;
        }[] = [];
        for (const { id, nombre, navegacion } of headerData.attributes
          .enlaces_publicos) {
          publicLinks.push({ id, name: nombre, href: navegacion });
        }

        const sessionLinks: {
          id: number;
          name: string;
          href: string;
        }[] = [];
        for (const { id, nombre, navegacion } of headerData.attributes
          .enlaces_manejar_sesion) {
          sessionLinks.push({ id, name: nombre, href: navegacion });
        }

        const privateLinks: {
          id: number;
          name: string;
          href: string;
        }[] = [];
        for (const { id, nombre, navegacion } of headerData.attributes
          .enlaces_privados) {
          privateLinks.push({ id, name: nombre, href: navegacion });
        }

        const sessionPrivateLinks: {
          id: number;
          name: string;
          href: string | null;
        }[] = [];
        for (const { id, nombre, navegacion } of headerData.attributes
          .enlaces_privados_manejar_sesion) {
          sessionPrivateLinks.push({
            id,
            name: nombre,
            href: navegacion === 'null' ? null : navegacion,
          });
        }

        setAppHeaderInfo({
          logoSrc: `${headerData.attributes.logo.data.attributes.url}`,
          publicLinks,
          sessionLinks,
          privateLinks,
          sessionPrivateLinks,
        });

        setAppFooterInfo({
          logoSrc: `${footerData.attributes.logo.data.attributes.url}`,
          directionTitle: footerData.attributes.titulo_direccion,
          direction: footerData.attributes.direccion,
          phoneNumberTitle: footerData.attributes.titulo_numero_telefono,
          phoneNumber: footerData.attributes.numero_telefono,
          copyright: footerData.attributes.copyright,
        });
      } catch (error) {
        toast.error('Error: no se cargo la página correctamente.');
      }

      setAppLoading(false);
    };
    queryAPI();
  }, []);

  const Loading = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const { loading } = useSelector((state: RootState) => state.app);

    useEffect(() => {
      if (!router.isReady) return;
      if (!accessToken) return;
      const queryAPI = async () => {
        try {
          const res = await getCurrentUserAPI({ accessToken });
          delete res.data.confirmed;
          delete res.data.createdAt;
          delete res.data.provider;
          delete res.data.updatedAt;
          setAuthRefreshUser({ user: res.data });
        } catch (error: any) {
          setAuthLogOutUser();
          toast.error('Error: Acceso invalido.');
        }
      };
      queryAPI();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    if (loading) {
      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '95vh',
            justifyContent: 'center',
          }}
        >
          <Loader />
          <h3
            style={{
              color: colors.color1,
              fontSize: 'clamp(1.25rem, calc(0.91rem + 1.96vw), 2.38rem)',
              fontWeight: 'bold',
            }}
          >
            PromoZulia
          </h3>
        </div>
      );
    }

    return <>{children}</>;
  };

  return (
    <Provider store={store}>
      <Loading>
        <Toaster
          position='top-center'
          containerStyle={{ top: '12%', textAlign: 'center' }}
          toastOptions={{ duration: 5000 }}
        />
        <Component {...pageProps} />
        <style jsx global>
          {globalStyles}
        </style>
      </Loading>
    </Provider>
  );
}

export default MyApp;
