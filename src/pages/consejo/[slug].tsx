import React from 'react';
import Image from 'next/image';
// components
import Layout from 'components/Layout';
import BreadCrumb from 'components/Breadcrumb';
// helpers
import { shimmer, toBase64 } from 'helpers';
// http methods
import { getAdviceDataAPI } from 'api/collections';
// interfaces
import { GetServerSideProps } from 'next';
import { CollectionType, ImageType } from 'interface';
// styles
import { colors } from 'styles/variables';

interface Props {
  data: CollectionType<{
    titulo: string;
    contenido: string;
    imagen: ImageType;
    fecha?: string;
  }>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, res } = ctx;

  if (!params?.slug) {
    res.writeHead(301, { Location: '/iniciativas' }).end();
    return { props: { data: null } };
  }

  try {
    const { data } = await getAdviceDataAPI({ slug: params!.slug as string });

    return { props: { data } };
  } catch (error: any) {
    res.writeHead(301, { Location: '/iniciativas' }).end();
  }
  return { props: { data: null } };
};

export default function Consejo({ data }: Props) {
  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section className='container'>
        <div className='img-container'>
          <Image
            src={data.data[0].attributes.imagen.data?.attributes.url!}
            alt='image'
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer('100%', '100%')
            )}`}
          />
        </div>
        <h1>{data.data[0].attributes.titulo}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data.data[0].attributes.contenido || '',
          }}
        />
      </section>
      <style jsx>{`
        h1 {
          color: ${colors.color1};
          margin-top: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        div.img-container {
          height: 500px;
          position: relative;
          width: 100%;
        }
      `}</style>
    </Layout>
  );
}
