import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import toast from 'react-hot-toast';
// components
import Layout from 'components/Layout';
import BreadCrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
// helpers
import { formatDate, shimmer, toBase64 } from 'helpers';
import { slug } from 'helpers/slug';
// http methods
import { getInitiativesPageDataAPI } from 'api/pages';
import { getPlansDataAPI } from 'api/collections';
// interfaces
import { CardType, CollectionType, ImageType } from 'interface';
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
      { data: plans },
    ] = await Promise.all([
      getInitiativesPageDataAPI(),
      getPlansDataAPI({ page: 1, pageSize: 4 }),
    ]);

    return { props: { data, plans } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function Iniciativas({ data, plans, error }: Props) {
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [planData, setPlanData] = useState(plans?.data || []);
  const [active, setActive] = useState<CardType | null>(null);
  const [pagination, setPagination] = useState({
    page: plans?.meta.pagination.page || 1,
    pageCount: plans?.meta.pagination.pageCount || 0,
  });

  useEffect(() => {
    if (!isSearching) return;

    const queryApi = async () => {
      try {
        const {
          data: { data },
        } = await getPlansDataAPI({
          page: pagination.page,
          pageSize: 4,
        });

        setTimeout(() => {
          setPlanData((state) => [...state, ...data]);
          setIsSearching(false);
        }, 2000);
      } catch (error) {
        toast.error(
          'Error: no se pudo cargar mas información, intente mas tarde.'
        );
      }
    };
    queryApi();
  }, [isSearching, pagination.page]);

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
      {!!data?.attributes?.consejos.length && (
        <section id='tips' className='container'>
          <h2>{data?.attributes?.titulo_consejos}</h2>
          <Slider {...carouseSettings}>
            {data?.attributes?.consejos.map(({ id, imagen, titulo }, i) => (
              <Fragment key={`${id}${i}`}>
                {titulo && (
                  <div>
                    <article className='tip'>
                      <Link href={`/consejo/${slug(titulo)}`}>
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
            ))}
          </Slider>
        </section>
      )}

      {!!planData.length && (
        <section id='ongoing-projects' className='container'>
          <h2>{data?.attributes?.titulo_proyectos}</h2>
          <div className='row'>
            {planData.map(
              ({ id, attributes: { titulo, imagen, contenido, fecha } }, i) => (
                <article
                  key={`${id}${i}`}
                  className='project box-shadow col-12 col-md-6'
                >
                  {imagen?.data && (
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
                  )}
                  {titulo && <h3>{titulo}</h3>}
                  {fecha && <p>{formatDate({ stringDate: fecha })}</p>}
                  <button
                    type='button'
                    title='see more'
                    className='button'
                    onClick={() => {
                      setActive({
                        id,
                        titulo,
                        imagen,
                        contenido,
                        fecha,
                      });
                      setShowModal(true);
                    }}
                  >
                    Ver
                  </button>
                </article>
              )
            )}
          </div>
          {isSearching && <Loader size='big' />}
          {pagination.page !== pagination.pageCount && (
            <div
              className='row'
              style={{ justifyContent: 'center', marginTop: '4rem' }}
            >
              <div className='col-6'>
                <button
                  type='button'
                  title='show more'
                  className='button'
                  style={{ width: '100%' }}
                  onClick={() => {
                    setPagination((state) => ({
                      ...state,
                      page: state.page + 1,
                    }));
                    setIsSearching(true);
                  }}
                >
                  Cargar más
                </button>
              </div>
            </div>
          )}
          {active && showModal && (
            <Modal
              title={active.titulo || ''}
              setShowModal={() => {
                setActive(null);
                setShowModal(false);
              }}
            >
              {active.imagen?.data && (
                <div className='img-container'>
                  <Image
                    src={active.imagen.data?.attributes?.url}
                    alt='image'
                    layout='fill'
                    objectFit='cover'
                    placeholder='blur'
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer('100%', '100%')
                    )}`}
                  />
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: active.contenido || '',
                }}
              />
            </Modal>
          )}
        </section>
      )}
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

        h3 {
          margin: 1rem 0;
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
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        article.project h3 {
          flex: 1;
        }

        article.project button {
          display: block;
          margin-top: 1rem;
          width: 100%;
        }
      `}</style>
    </Layout>
  );
}
