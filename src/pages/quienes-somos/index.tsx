import Image from 'next/image';
// componets
import BreadCrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
// http methods
import { getUSPageDataAPI } from 'api/pages';
// styles
import { addOpacity } from 'styles/utils';
import { breakPoints, colors } from 'styles/variables';

interface UsProps {
  data: any;
  valueCards: {
    id: number;
    title: string | null;
    text: string | null;
    src: string | null;
  }[];
  promoCards: {
    id: number;
    title: string | null;
    text: string | null;
    src: string | null;
  }[];
  error: boolean;
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { data },
    } = await getUSPageDataAPI();

    const valueCards: {
      id: number;
      title: string | null;
      text: string | null;
      src: string | null;
    }[] = [];

    for (const { id, titulo, texto, imagen } of data.attributes
      .tarjetas_valores) {
      valueCards.push({
        id,
        title: titulo,
        text: texto,
        src: `${imagen.data.attributes.url}`,
      });
    }

    const promoCards: {
      id: number;
      title: string | null;
      text: string | null;
      src: string | null;
    }[] = [];
    for (const { id, titulo, texto, imagen } of data.attributes
      .tarjetas_promozulia) {
      promoCards.push({
        id,
        title: titulo,
        text: texto,
        src: `${imagen.data.attributes.url}`,
      });
    }

    return { props: { data, valueCards, promoCards } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function Us({ data, valueCards, promoCards, error }: UsProps) {
  if (error) return 'No se puede cargar la página.';
  return (
    <Layout>
      <div className='container'>
        <BreadCrumb title='PromoZulia' />
      </div>
      <section id='banner-1' className='banner'>
        <div className='container'>
          <h1>{data.attributes.titulo}</h1>
        </div>
      </section>
      <section id='quienes-somos' className='container'>
        <h2>{data.attributes.titulo_nosotros}</h2>
        <article>
          <p>{data.attributes.descripcion_nosotros}</p>
        </article>
      </section>
      <section id='mission' className='container row'>
        <h3 className='col-12 col-md-6'>{data.attributes.titulo_mision}</h3>
        <article className='col-12 col-md-6'>
          <p>{data.attributes.mision}</p>
        </article>
      </section>
      <section id='vision' className='container row reverse'>
        <h3 className='col-12 col-md-6'>{data.attributes.titulo_vision}</h3>
        <article className='col-12 col-md-6'>
          <p>{data.attributes.vision}</p>
        </article>
      </section>
      <section id='values' className='container'>
        <h2>{data.attributes.titulo_valores}</h2>
        <div className='cards row'>
          {valueCards.map(({ id, title, text, src }) => (
            <article key={id} className='box-shadow card col-12 col-lg-4'>
              <h4>{title}</h4>
              {src && <Image src={src} alt='image' height={65} width={65} />}
              <p style={{ marginBottom: 0 }}>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section id='goals' className='container'>
        <h2>{data.attributes.sub_titulo}</h2>
        <div className='cards row'>
          {promoCards.map(({ id, text, src }) => (
            <article key={id} className='box-shadow card col-12 col-md-4'>
              {src && <Image src={src} alt='imagen' height={65} width={65} />}
              <p style={{ marginBottom: 0 }}>{text}</p>
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

        h3 {
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
            url(${data?.attributes?.imagen_banner_nosotros?.data?.attributes
              ?.url});
          height: 500px;
          padding: 2rem 1rem;
        }

        section#mission h3 {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(${data?.attributes?.imagen_mision?.data?.attributes?.url});
          color: ${colors.white};
          height: 200px;
        }
        section#vision h3 {
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: linear-gradient(
              to right,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%,
              ${addOpacity({ color: colors.color1, opacity: 0.5 })} 50%
            ),
            url(${data?.attributes?.imagen_vision?.data?.attributes?.url});
          color: ${colors.white};
          height: 200px;
        }

        section#mission p,
        section#vision p {
          margin: 0;
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
