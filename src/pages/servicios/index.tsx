import Image from 'next/image';
// componets
import BreadCrumb from 'components/Breadcrumb';
import Layout from 'components/Layout';
// http methods
import { getServicesPageDataAPI } from 'api/pages';
// styles
import { addOpacity } from 'styles/utils';
import { colors } from 'styles/variables';

interface ServicesProps {
  data: any;
  servicesCards: {
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
    } = await getServicesPageDataAPI();

    const servicesCards: {
      id: number;
      title: string | null;
      text: string | null;
      src: string | null;
    }[] = [];

    for (const { id, titulo, texto, imagen } of data.attributes
      .tarjetas_servicios) {
      servicesCards.push({
        id,
        title: titulo,
        text: texto,
        src: `${imagen.data.attributes.url}`,
      });
    }

    return { props: { data, servicesCards } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function Services({
  data,
  servicesCards,
  error,
}: ServicesProps) {
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
      <section id='values' className='container'>
        <h2>{data.attributes.sub_titulo}</h2>
        <div className='cards row' style={{ justifyContent: 'space-evenly' }}>
          {servicesCards.map(({ id, title, text, src }) => (
            <article
              key={id}
              className='box-shadow card col-12 col-sm-6 col-lg-3'
            >
              <h4>{title}</h4>
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
            url(${data?.attributes?.imagen_banner_servicios?.data?.attributes
              ?.url});
          background-position: center 20%;
          height: 500px;
          padding: 2rem 1rem;
        }

        section#values {
          margin-top: 4rem;
          margin-bottom: 4rem;
        }
      `}</style>
    </Layout>
  );
}
