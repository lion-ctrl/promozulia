import React, { Fragment, useState } from 'react';
// components
import Layout from 'components/Layout';
import Modal from 'components/Modal';
import BreadCrumb from 'components/Breadcrumb';
// hooks
import useViewPortWidth from 'hooks/useViewPortWidth';
// http methods
import { getHistoryPageDataAPI } from 'api/pages';
// styles
import { addOpacity } from 'styles/utils';
import { breakPoints, colors, fluidFontSizes } from 'styles/variables';

interface Card {
  id: number;
  date?: string;
  title: string;
  content: string;
}

interface Props {
  data: any;
  cards: Card[];
  cardsAchievement: Card[];
  error: boolean;
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { data },
    } = await getHistoryPageDataAPI();

    const cards: Card[] = [];
    const cardsAchievement: Card[] = [];

    for (const { id, fecha, titulo, contenido } of data.attributes.tarjetas) {
      cards.push({
        id,
        date: fecha,
        title: titulo,
        content: contenido,
      });
    }

    for (const { id, titulo, contenido } of data.attributes.tarjetas_logros) {
      cardsAchievement.push({
        id,
        title: titulo,
        content: contenido,
      });
    }

    return { props: { data, cards, cardsAchievement } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function History({
  data,
  cards,
  cardsAchievement,
  error,
}: Props) {
  const vw = useViewPortWidth();
  const [timelineActives, setTimelineActives] = useState<number[]>([]);
  const [achievementActive, setAchievementActive] = useState<Card | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (error) return 'No se puede cargar la página.';

  const formatDate = ({ stringDate }: { stringDate: string | undefined }) => {
    const date = new Date(stringDate ? `${stringDate}T00:00:00` : Date.now());
    const month = new Intl.DateTimeFormat('es', { month: 'long' }).format(date);
    const monthFormat = month.charAt(0).toUpperCase() + month.slice(1);
    return `${monthFormat} ${date.getFullYear()}`;
  };

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
          {cards.map(({ id, date, title, content }, i) => (
            <Fragment key={id}>
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
                {date && (
                  <p className='date'>{formatDate({ stringDate: date })}</p>
                )}
                <aside className='box-shadow'>
                  <h3>{title}</h3>
                  <div
                    className={`content ${
                      timelineActives.includes(i)
                        ? 'is-active'
                        : 'is-not-active'
                    }`}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
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
          ))}
        </div>
      </section>
      <section id='achievements' className='container'>
        <h2>{data.attributes.titulo_logros}</h2>
        <div className='row'>
          {cardsAchievement.map(({ id, title, content }) => (
            <article
              key={id}
              className='achievement col-12 col-md-4 box-shadow'
            >
              <h3>{title}</h3>
              <button
                type='button'
                title='read more'
                className='button'
                onClick={() => {
                  setAchievementActive({ id, title, content });
                  setShowModal(true);
                }}
              >
                Leer más
              </button>
            </article>
          ))}
        </div>
      </section>
      {achievementActive && showModal && (
        <Modal
          title={achievementActive.title}
          content={achievementActive.content}
          setShowModal={setShowModal}
        />
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

        aside h3 {
          color: ${colors.color1};
        }

        aside div.content {
          height: 0;
          margin: 0;
          overflow: hidden;
        }

        aside div.content.is-active {
          height: auto;
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
          padding: 1rem;
        }

        article.achievement h3 {
          text-align: center;
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
