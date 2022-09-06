import React from 'react';
// componets
import BreadCrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
// data
import { services } from 'data/servicePage';
// styles
import { addOpacity } from 'styles/utils';
import { colors } from 'styles/variables';

export default function Services() {
  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section id='banner-1' className='banner'>
        <div className='container'>
          <h1>Nuestro principal servicio es de tipo asesoría.</h1>
        </div>
      </section>
      <section id='values' className='container'>
        <h2>Servicios</h2>
        <div className='cards row'>
          {services.map(({ Icon, content, title }) => (
            <article key={content} className='box-shadow card col-12 col-lg-4'>
              <h4>{title}</h4>
              <Icon height={65} width={65} style={{ fill: colors.color1 }} />
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
          margin-top: 2rem;
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

        section#banner-1 {
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(/assets/img/banner4.jpg);
          background-position: center 20%;
          height: 500px;
          padding: 2rem 1rem;
        }

        div.cards {
          margin: 2rem 0;
        }
      `}</style>
    </Layout>
  );
}

/*  Apoyamos el
            Desarrollo de la educación, enfocados en las necesidades de las
            empresas. 
            
            
            Apoyo funcional para establecer y desarrollar relaciones
            entre las empresas en pro del desarrollo de las potencialidades del
            estado Zulia */
