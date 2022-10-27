import React, { Fragment } from 'react';
// components
import Layout from 'components/Layout';
// styles
import { addOpacity } from 'styles/utils';
import { breakPoints, colors, fluidFontSizes } from 'styles/variables';

export default function History() {
  return (
    <Layout>
      <section id='banner-1' className='banner'>
        <div className='container'>
          <h1>Historia y Trayectoria</h1>
        </div>
      </section>
      <section id='timeline' className='container'>
        <h2>PromoZulia</h2>
        <div className='articles'>
          {Array.from(Array(5).keys()).map((number, i) => (
            <Fragment key={number}>
              {i % 2 !== 0 && (
                <>
                  <div className='empty'></div>
                  <div className='line'></div>
                </>
              )}
              <article>
                <p className='date'>Enero 2022 {number}</p>
                <aside className='box-shadow'>
                  <h3>Title</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum debitis voluptatibus pariatur numquam ex unde
                    voluptates dolorum cumque eius, eveniet vero tempore autem
                    ducimus quam velit excepturi ipsam, ad in!
                  </p>
                  <button type='button' title='read more'>
                    Leer más
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
              {i % 2 === 0 && (
                <>
                  <div className='line'></div>
                  <div className='empty'></div>
                </>
              )}
            </Fragment>
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
          text-align: center;
        }

        section#banner-1 {
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(/assets/img/banner3.jpg);
          height: 500px;
          padding: 2rem 1rem;
        }

        section#timeline {
          margin-top: 4rem;
          margin-bottom: 4rem;
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

        aside button {
          align-items: center;
          background-color: transparent;
          border: none;
          color: ${colors.color1};
          cursor: pointer;
          display: flex;
          font-size: ${fluidFontSizes.p};
          justify-content: center;
        }

        aside button span {
          display: inline-block;
          height: 1rem;
          width: 1rem;
        }

        @media (min-width: ${breakPoints.md}) {
          div.articles {
            gap: 20px 40px;
            display: grid;
            grid-template-columns: auto 2px auto;
          }

          div.line {
            background-color: ${colors.color1};
            position: relative;
          }

          div.line::before,
          div.line::after {
            content: '';
            width: 20px;
            display: block;
            height: 20px;
            background-color: ${colors.color1};
            border-radius: 50%;
            position: absolute;
            top: -20px;
            left: -9px;
          }

          div.line::after {
            top: 100%;
          }
        }
      `}</style>
    </Layout>
  );
}
