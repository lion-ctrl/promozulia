import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
// components
import Layout from 'components/Layout';
import BreadCrumb from 'components/Breadcrumb';
// helpers
import { shimmer, toBase64 } from 'helpers';
import { slug } from 'helpers/slug';
// http methods
import { getInitiativesPageDataAPI } from 'api/pages';
// styles
import { addOpacity } from 'styles/utils';
import { colors } from 'styles/variables';
import Image from 'next/image';

interface Props {
  data: {
    id: number;
    attributes: {
      titulo_banner: string;
      titulo_consejos: string;
      titulo_proyectos: string;
      imagen_banner: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      consejos: {
        id: number;
        texto: string | null;
        titulo: string | null;
        imagen: {
          data: {
            attributes: {
              url: string;
            };
          };
        };
      }[];
    };
  };
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
    const {
      data: { data },
    } = await getInitiativesPageDataAPI();

    return { props: { data } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function Iniciativas({ data, error }: Props) {
  if (error) return 'No se puede cargar la página.';

  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section id='banner-1' className='banner'>
        <div className='container'>
          <h1>{data.attributes.titulo_banner}</h1>
        </div>
      </section>
      <section id='tips' className='container'>
        <h2>{data.attributes.titulo_consejos}</h2>
        <Slider {...carouseSettings}>
          {data.attributes.consejos.map(({ id, imagen, titulo }) => (
            <>
              {titulo && (
                <div key={id}>
                  <article className='tip'>
                    <Link href={`/consejo/${slug(titulo)}`}>
                      <a>
                        <div className='img-container'>
                          <Image
                            src={imagen.data.attributes.url}
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
            </>
          ))}
        </Slider>
      </section>
      <section id='ongoing-projects' className='container'>
        <h2>{data.attributes.titulo_proyectos}</h2>
        <div className='row'>
          {Array.from(Array(6).keys()).map((n) => (
            <article
              key={n}
              className='project box-shadow col-12 col-md-6 col-lg-4'
            >
              <div className='img-container'>
                <Image
                  src='/img/example.jpg'
                  alt='imagen'
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer('100%', '100%')
                  )}`}
                />
              </div>
              <h4>Titulo</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
                cum et soluta doloribus voluptates quod, natus illum optio
                consequatur aspernatur vero similique odit ullam, veniam tenetur
                expedita officiis maiores omnis?
              </p>
              <button type='button' title='see more' className='button'>
                Ver
              </button>
            </article>
          ))}
        </div>
      </section>
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

        article.project {
          padding: 0.5rem;
        }

        article.project p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        article.project button {
          display: block;
          width: 100%;
        }
      `}</style>
    </Layout>
  );
}
