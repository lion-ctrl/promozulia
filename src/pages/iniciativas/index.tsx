import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
// components
import Cards from 'components/Cards';
import BreadCrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
// helpers
import { shimmer, toBase64 } from 'helpers';
// http methods
import { getInitiativesPageDataAPI } from 'api/pages';
import { getAdvicesDataAPI, getPlansDataAPI } from 'api/collections';
// interfaces
import { CollectionType, ImageType } from 'interface';
// styles
import { addOpacity } from 'styles/utils';
import { colors } from 'styles/variables';

interface Props {
  data: {
    id: number;
    attributes: {
      titulo_banner: string;
      titulo_consejos: string;
      titulo_proyectos: string;
      imagen_banner: ImageType;
    };
  };
  advices: CollectionType<{
    titulo: string;
    imagen: ImageType;
    slug: string;
  }>;
  plans: CollectionType<{
    titulo: string;
    contenido: string;
    imagen: ImageType;
    fecha?: string;
  }>;
  error: boolean;
}

const carouseSettings = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: false,
  infinite: true,
  initialSlide: 0,
  pauseOnHover: true,
  slidesToScroll: 1,
  slidesToShow: 3,
  speed: 500,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export const getServerSideProps = async () => {
  try {
    const [
      {
        data: { data },
      },
      { data: advices },
      { data: plans },
    ] = await Promise.all([
      getInitiativesPageDataAPI(),
      getAdvicesDataAPI(),
      getPlansDataAPI({ page: 1, pageSize: 4 }),
    ]);

    return { props: { data, advices, plans } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function Iniciativas({ data, advices, plans, error }: Props) {
  if (error) return 'No se puede cargar la página.';

  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>

      <section id='banner-1' className='banner'>
        <div className='container'>
          <h1>{data?.attributes?.titulo_banner}</h1>
        </div>
      </section>

      {!!advices.data.length && (
        <section id='tips' className='container'>
          <h2>{data?.attributes?.titulo_consejos}</h2>
          <Slider {...carouseSettings}>
            {advices.data.map(
              ({ id, attributes: { titulo, imagen, slug } }, i) => (
                <Fragment key={`${id}${i}`}>
                  {titulo && imagen.data && (
                    <div>
                      <article className='tip'>
                        <Link href={`/consejo/${slug}`}>
                          <a>
                            <div className='img-container'>
                              <Image
                                src={imagen.data?.attributes?.url}
                                alt='imagen'
                                layout='fill'
                                objectFit='cover'
                                placeholder='blur'
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                  shimmer('100%', '100%')
                                )}`}
                              />
                            </div>
                            <p>{titulo}</p>
                          </a>
                        </Link>
                      </article>
                    </div>
                  )}
                </Fragment>
              )
            )}
          </Slider>
        </section>
      )}

      <Cards
        dataEntry={plans}
        title={data?.attributes?.titulo_proyectos || ''}
        fetchData={({ page, pageSize }) => getPlansDataAPI({ page, pageSize })}
      />
      <style jsx>{`
        h1 {
          color: ${colors.white};
          text-align: center;
        }

        h2 {
          color: ${colors.color1};
          margin-bottom: 4rem;
          padding-bottom: 1rem;
          position: relative;
          text-align: center;
        }

        h2::after {
          background-color: ${colors.color1};
          bottom: 0;
          content: '';
          height: 2px;
          left: 0;
          position: absolute;
          width: 100%;
        }

        section#banner-1 {
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(${data.attributes?.imagen_banner?.data?.attributes?.url});
          height: 500px;
          padding: 2rem 1rem;
        }

        section:not(:first-of-type) {
          margin-top: 4rem;
        }

        section:last-of-type {
          margin-bottom: 4rem;
        }

        div.img-container {
          height: 300px;
          position: relative;
          width: 100%;
        }

        article.tip {
          cursor: pointer;
          margin: 0 12px;
          transition: opacity 0.5s ease;
        }

        @media (hover: hover) {
          article.tip:hover {
            opacity: 0.8;
          }
        }

        article.tip p {
          color: ${colors.color1};
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}
