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
import { CollectionType, ImageType } from 'interface';
// styles
import { colors } from 'styles/variables';
import Redirect from 'components/Redirect';

interface Props {
  data: CollectionType<{
    titulo: string;
    contenido: string;
    imagen: ImageType;
    fecha?: string;
  }>;
}

export default function Consejo({ data }: Props) {
  if (!data?.data?.length) return <Redirect to='/iniciativas' />;

  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section className='container'>
        <div className='img-container'>
          <Image
            src={data?.data[0].attributes.imagen.data?.attributes.url!}
            alt='image'
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer('100%', '100%')
            )}`}
          />
        </div>
        <h1>{data?.data[0].attributes.titulo}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.data[0].attributes.contenido || '',
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

Consejo.getInitialProps = async (ctx: any) => {
  const { query, res } = ctx;

  if (!query?.slug) {
    res.writeHead(301, { Location: '/iniciativas' }).end();
    return { data: null };
  }

  try {
    const { data } = await getAdviceDataAPI({ slug: query!.slug as string });

    return { data };
  } catch (error: any) {
    res.writeHead(301, { Location: '/iniciativas' }).end();
  }
  return { data: null };
};
