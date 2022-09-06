import Link from 'next/link';
// components
import AutoCarousel from 'components/AutoCarousel';
import Layout from 'components/Layout';
import Sectors from 'components/Sectors';
// data
import { autoCarouselData, cardInfo } from 'data/homePageData';
// styles
import { colors } from 'styles/variables';
import { addOpacity } from 'styles/utils';

export default function Home() {
  return (
    <Layout>
      <AutoCarousel
        backgroundImages={autoCarouselData.backgroundImages}
        content={autoCarouselData.content}
        height='calc(100vh - 3.5rem)'
        width='100vw'
      />
      <section id='title' className='container'>
        <h1>
          Impactamos en el territorio a través de la atracción de inversiones y
          captación de grandes eventos.
        </h1>
      </section>
      <section id='banner-1' className='banner'>
        <div className='container'>
          <h2>
            Brindamos acompañamiento a las empresas nacionales o extranjeras en
            cada etapa de su proceso de inversión o reinversión.
          </h2>
        </div>
      </section>
      <section id='cards' className='container row'>
        {cardInfo.map(({ Icon, content }) => (
          <article
            key={content}
            className='box-shadow card col-12 col-sm-6 col-lg-3'
          >
            <Icon height={47} width={47} style={{ fill: colors.color1 }} />
            <p style={{ marginBottom: 0 }}>{content}</p>
          </article>
        ))}
      </section>
      <Sectors />
      <section id='banner-2' className='banner'>
        <div className='container'>
          <h3>Si deseas recibir nuestro apoyo no dudes en contactarnos.</h3>
          <Link href='/contacto'>
            <a className='button'>Contáctanos</a>
          </Link>
        </div>
      </section>
      <style jsx>{`
        section#title {
          margin-bottom: 3rem;
          margin-top: 3rem;
        }

        h1 {
          color: ${colors.color1};
          text-align: center;
        }

        section#banner-1 {
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(/assets/img/banner1.jpg);
          background-attachment: fixed;
          clip-path: ellipse(80% 100% at 50% 0%);
          height: 400px;
          padding: 2rem 1rem 4rem 1rem;
        }

        h2,
        h3 {
          color: ${colors.white};
          text-align: center;
        }

        section#cards {
          margin-top: 4rem;
        }

        .card::after {
          background-color: ${colors.color1};
          bottom: 0;
          content: '';
          height: 5px;
          left: 0;
          opacity: 0;
          position: absolute;
          transition: opacity 0.2s ease-in-out;
          width: 100%;
        }

        @media (hover: hover) {
          .card:hover::after {
            opacity: 1;
          }
        }

        section#banner-2 {
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(/assets/img/banner2.jpg);
          height: 300px;
          margin-top: 2rem;
          padding: 2rem 1rem;
        }
        }
      `}</style>
    </Layout>
  );
}
