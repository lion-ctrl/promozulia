import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
// components
import Layout from 'components/Layout';
import Modal from 'components/Modal';
import BreadCrumb from 'components/Breadcrumb';
import Loader from 'components/Loader';
// helpers
import { shimmer, toBase64, formatDate } from 'helpers';
// hooks
import useViewPortWidth from 'hooks/useViewPortWidth';
// http methods
import { getHistoryPageDataAPI } from 'api/pages';
import { getAchievementsDataAPI } from 'api/collections';
// interfaces
import { CardType, CollectionType, ImageType } from 'interface';
// styles
import { addOpacity } from 'styles/utils';
import { breakPoints, colors, fluidFontSizes } from 'styles/variables';
import toast from 'react-hot-toast';

interface Props {
  data: {
    id: number;
    attributes: {
      titulo: string;
      titulo_banner: string;
      titulo_logros: string;
      imagen_banner: ImageType;
      tarjetas: CardType[];
    };
  };
  achievements: CollectionType<{
    titulo: string;
    contenido: string;
    imagen: ImageType;
    fecha?: string;
  }>;
  error: boolean;
}

export const getServerSideProps = async () => {
  try {
    const [
      {
        data: { data },
      },
      { data: achievements },
    ] = await Promise.all([
      getHistoryPageDataAPI(),
      getAchievementsDataAPI({ page: 1, pageSize: 4 }),
    ]);

    return { props: { data, achievements } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function History({ data, achievements, error }: Props) {
  const vw = useViewPortWidth();
  const [timelineActives, setTimelineActives] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [achievementData, setAchievementData] = useState(achievements.data);
  const [achievementActive, setAchievementActive] = useState<CardType | null>(
    null
  );
  const [pagination, setPagination] = useState({
    page: achievements.meta.pagination.page,
    pageCount: achievements.meta.pagination.pageCount,
  });

  useEffect(() => {
    if (!isSearching) return;

    const queryApi = async () => {
      try {
        const {
          data: { data },
        } = await getAchievementsDataAPI({
          page: pagination.page,
          pageSize: 4,
        });

        setTimeout(() => {
          setAchievementData((state) => [...state, ...data]);
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
          <h1>{data.attributes.titulo_banner}</h1>
        </div>
      </section>
      <section id='timeline' className='container'>
        <h2>{data.attributes.titulo}</h2>
        <div className='articles'>
          {data.attributes.tarjetas.map(
            ({ id, fecha, titulo, contenido, imagen }, i) => (
              <Fragment key={`${id}${i}`}>
                <div className='line'></div>
                <article
                  style={{
                    gridColumn:
                      vw >= 768
                        ? i % 2 === 0
                          ? '1 / span 1'
                          : '3 / span 1'
                        : undefined,
                    gridRow: vw >= 768 ? `${i + 1} / span 1` : undefined,
                  }}
                >
                  {fecha && (
                    <p className='date'>{formatDate({ stringDate: fecha })}</p>
                  )}
                  <aside className='box-shadow'>
                    {titulo && <h3>{titulo}</h3>}
                    <div
                      className={`content ${
                        timelineActives.includes(i)
                          ? 'is-active'
                          : 'is-not-active'
                      }`}
                    >
                      {imagen?.data && (
                        <div className='img-container'>
                          <Image
                            src={imagen.data.attributes.url}
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
                      {contenido && (
                        <div dangerouslySetInnerHTML={{ __html: contenido }} />
                      )}
                    </div>
                    <button
                      type='button'
                      title='read more'
                      onClick={() => {
                        setTimelineActives((state) => {
                          if (state.includes(i)) {
                            return state.filter((n) => n !== i);
                          } else {
                            return [...state, i];
                          }
                        });
                      }}
                    >
                      {timelineActives.includes(i) ? 'Leer menos' : 'Leer más'}
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={4}
                          stroke={colors.color1}
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      </span>
                    </button>
                  </aside>
                </article>
              </Fragment>
            )
          )}
        </div>
      </section>
      <section id='achievements' className='container'>
        <h2>{data.attributes.titulo_logros}</h2>
        <div className='row'>
          {achievementData.map(
            ({ id, attributes: { titulo, imagen, contenido, fecha } }) => (
              <article
                key={id}
                className='achievement col-12 col-md-6 box-shadow'
              >
                {imagen?.data && (
                  <div className='img-container'>
                    <Image
                      src={imagen.data.attributes.url}
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
                {titulo && <h3>{titulo}</h3>}
                {fecha && <p>{formatDate({ stringDate: fecha })}</p>}
                <button
                  type='button'
                  title='read more'
                  className='button'
                  onClick={() => {
                    setAchievementActive({
                      id,
                      titulo,
                      imagen,
                      contenido,
                      fecha,
                    });
                    setShowModal(true);
                  }}
                >
                  Leer más
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
      </section>
      {achievementActive && showModal && (
        <Modal
          title={achievementActive.titulo || ''}
          setShowModal={() => {
            setAchievementActive(null);
            setShowModal(false);
          }}
        >
          {achievementActive.imagen?.data && (
            <div className='img-container'>
              <Image
                src={achievementActive.imagen.data.attributes.url}
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
              __html: achievementActive.contenido || '',
            }}
          />
        </Modal>
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
          color: ${colors.color1};
          margin: 1rem 0;
        }

        div.img-container {
          height: 300px;
          position: relative;
          width: 100%;
        }

        section#banner-1 {
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(${data?.attributes?.imagen_banner?.data?.attributes?.url});
          height: 500px;
          padding: 2rem 1rem;
        }

        section:not(:first-of-type) {
          margin-top: 4rem;
        }

        section:last-of-type {
          margin-bottom: 4rem;
        }

        div.articles {
          display: grid;
          gap: 20px 40px;
          grid-template-columns: 2px auto;
        }

        div.line {
          background-color: ${colors.color1};
          grid-column: 1 / span 1;
          position: relative;
        }

        div.line::before,
        div.line::after {
          background-color: ${colors.color1};
          border-radius: 50%;
          content: '';
          display: block;
          height: 20px;
          left: -9px;
          position: absolute;
          top: -20px;
          width: 20px;
        }

        div.line::after {
          top: 100%;
        }

        article {
          grid-column: 2 / span 1;
        }

        article p.date {
          background-color: ${colors.color1};
          border-radius: 20px;
          color: ${colors.white};
          padding: 0.5rem;
          width: max-content;
        }

        article aside {
          padding: 1rem;
        }

        aside div.content {
          height: 0;
          margin: 0;
          overflow: hidden;
        }

        aside div.content.is-active {
          height: auto;
          padding: 1rem 0;
        }

        aside button {
          align-items: center;
          background-color: transparent;
          border: none;
          color: ${colors.color1};
          cursor: pointer;
          display: flex;
          font-size: ${fluidFontSizes.p};
          justify-content: center;
          margin-top: 1rem;
          text-decoration: underline;
        }

        aside button span {
          display: inline-block;
          height: 1rem;
          width: 1rem;
        }

        article.achievement {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        article.achievement h3 {
          flex: 1;
        }

        article.achievement button {
          display: block;
          margin-top: 1rem;
          width: 100%;
        }

        @media (min-width: ${breakPoints.md}) {
          div.articles {
            grid-template-columns: auto 2px auto;
          }

          div.line {
            grid-column: 2 / 3;
          }
        }
      `}</style>
    </Layout>
  );
}
