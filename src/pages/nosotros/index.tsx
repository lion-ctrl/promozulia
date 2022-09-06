import React from 'react';
// componets
import BreadCrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
// data
import { cardInfo, values } from 'data/usPageData';
// styles
import { addOpacity } from 'styles/utils';
import { breakPoints, colors } from 'styles/variables';

export default function Us() {
  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section id='banner-1' className='banner'>
        <div className='container'>
          <h1>
            Somos una ONG cuyo fin es incentivar y promocionar el desarrollo
            Económico del Estado Zulia.
          </h1>
        </div>
      </section>
      <section id='mission' className='container row'>
        <h2 className='col-12 col-md-6'>Misión</h2>
        <article className='col-12 col-md-6'>
          <p>
            Contribuir a Detectar Necesidades y Oportunidades Tecnológicas,
            Definir y Ejecutar Proyectos en Promozulia con los diferentes entes
            educativos , empresariales públicos y privados para incentivar el
            desarrollo científico, tecnológico, innovación y transferencia de
            tecnología a nivel nacional.
          </p>
        </article>
      </section>
      <section id='vision' className='container row reverse'>
        <h2 className='col-12 col-md-6'>Visión</h2>
        <article className='col-12 col-md-6'>
          <p>
            Ser una Comisión parte de Promozulia que propicie el captar, generar
            y aplicar conocimiento científico y tecnológico en materia de
            formación, innovación y sostenibilidad aplicadas al sector económico
            del estado Zulia, apoyando a la región en sus planes estratégicos
            que favorezcan la atracción de capital y recursos tecnológicos
            internos y externos.
          </p>
        </article>
      </section>
      <section id='values' className='container'>
        <h2>Valores</h2>
        <div className='cards row'>
          {values.map(({ Icon, content, title }) => (
            <article key={content} className='box-shadow card col-12 col-lg-4'>
              <h4>{title}</h4>
              <Icon height={65} width={65} style={{ fill: colors.color1 }} />
              <p style={{ marginBottom: 0 }}>{content}</p>
            </article>
          ))}
        </div>
      </section>
      <section id='goals' className='container'>
        <h2>
          PromoZulia trabaja en beneficio del territorio Regional y Nacional
        </h2>
        <div className='cards row'>
          {cardInfo.map(({ Icon, content, viewBox }) => (
            <article key={content} className='box-shadow card col-12 col-md-4'>
              <Icon
                height={65}
                width={65}
                style={{ fill: colors.color1 }}
                viewBox={viewBox}
              />
              <p style={{ marginBottom: 0 }}>{content}</p>
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
          align-items: center;
          color: ${colors.color1};
          display: flex;
          justify-content: center;
          text-align: center;
        }

        h4 {
          color: ${colors.color1};
          text-align: center;
          margin-bottom: 1rem;
        }

        p {
          line-height: 1.5;
        }

        section:not(:first-of-type) {
          margin-top: 4rem;
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

        section#mission h2 {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(/assets/img/mission.jpg);
          color: ${colors.white};
          height: 200px;
        }
        section#vision h2 {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(/assets/img/vision.jpg);
          color: ${colors.white};
          height: 200px;
        }

        div.cards {
          margin-top: 2rem;
        }

        section#goals {
          margin-bottom: 4rem;
        }

        @media (min-width: ${breakPoints.md}) {
          section#mission h2,
          section#vision h2 {
            height: auto;
          }
        }
      `}</style>
    </Layout>
  );
}
