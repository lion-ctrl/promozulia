import React from 'react';
// components
import Layout from 'components/Layout';
import BreadCrumb from 'components/Breadcrumb';
import Redirect from 'components/Redirect';
import ShowInfo from 'components/ShowInfo';
// http methods
import { getPublicationDataAPI } from 'api/collections';
// interfaces
import { CollectionType, ImageType } from 'interface';

interface Props {
  data: CollectionType<{
    titulo: string;
    contenido: string;
    imagen: ImageType;
    fecha?: string;
  }>;
}

export default function Publicacion({ data }: Props) {
  if (!data?.data?.length) return <Redirect to='/estudios-publicaciones' />;

  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section className='container'>
        <ShowInfo
          title={data?.data[0].attributes.titulo}
          content={data?.data[0].attributes.contenido || ''}
          src={data?.data[0].attributes.imagen.data?.attributes.url}
        />
      </section>
    </Layout>
  );
}

Publicacion.getInitialProps = async (ctx: any) => {
  const { query, res } = ctx;

  if (!query?.slug) {
    res.writeHead(301, { Location: '/estudios-publicaciones' }).end();
    return { data: null };
  }

  try {
    const { data } = await getPublicationDataAPI({
      slug: query!.slug as string,
    });

    return { data };
  } catch (error: any) {
    res.writeHead(301, { Location: '/estudios-publicaciones' }).end();
  }
  return { data: null };
};
