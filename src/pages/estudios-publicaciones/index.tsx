import React from 'react';
// components
import BreadCrumb from 'components/Breadcrumb';
import Cards from 'components/Cards';
import Layout from 'components/Layout';
// http methods
import { getStudiesPublicationsAPI } from 'api/pages';
import { getPublicationsDataAPI, getStudiesDataAPI } from 'api/collections';
// interfaces
import { CollectionType, ImageType, SingleType } from 'interface';

interface Props {
  data: SingleType<{
    titulo_estudios: string;
    titulo_publicaciones: string;
  }>;
  studies: CollectionType<{
    titulo: string;
    imagen: ImageType;
    slug: string;
    fecha?: string;
  }>;
  publications: CollectionType<{
    titulo: string;
    imagen: ImageType;
    slug: string;
    fecha?: string;
  }>;
}

export const getServerSideProps = async () => {
  try {
    const [
      {
        data: { data },
      },
      { data: studies },
      { data: publications },
    ] = await Promise.all([
      getStudiesPublicationsAPI(),
      getStudiesDataAPI({ page: 1, pageSize: 4 }),
      getPublicationsDataAPI({ page: 1, pageSize: 4 }),
    ]);

    return { props: { data, studies, publications } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function StudiesPublications({
  data,
  studies,
  publications,
}: Props) {
  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>

      <Cards
        dataEntry={studies}
        title={data?.attributes?.titulo_estudios || 'Estudios'}
        redirect
        path='estudio'
        fetchData={({ page, pageSize }) =>
          getStudiesDataAPI({ page, pageSize })
        }
      />

      <Cards
        dataEntry={publications}
        title={data?.attributes?.titulo_publicaciones || 'Publicaciones'}
        redirect
        path='publicacion'
        fetchData={({ page, pageSize }) =>
          getPublicationsDataAPI({ page, pageSize })
        }
      />
    </Layout>
  );
}
