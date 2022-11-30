import Link from 'next/link';
import Image from 'next/image';
// components
import AutoCarousel from '../components/AutoCarousel';
import Layout from '../components/Layout';
import Sectors from '../components/Sectors';
// http methods
import { getHomePageDataAPI } from 'api/pages';
// interfaces
import { CardType, ImageType, SingleType } from 'interface';
// styles
import { colors } from 'styles/variables';
import { addOpacity } from 'styles/utils';
import { Fragment } from 'react';

type Data = SingleType<{
  titulo: string;
  sub_titulo: string;
  imagen_banner_subtitulo: ImageType;
  texto_banner_contacto: string;
  texto_boton_contacto: string;
  imagen_banner_contacto: ImageType;
  imagen_banner_sub_titulo: ImageType;
  tarjetas_inicio: CardType[];
  carusel_sectores: CardType[];
  carusel_inicio: CardType[];
}> | null;

interface Props {
  data: Data;
  carouselData: {
    backgroundImages: string[];
    content: { title: string; text?: string; fontSize: string }[];
  };
  error: boolean;
}

export const getCarouselData = ({ data }: { data: Data }) => {
  const carouselData: {
    backgroundImages: string[];
    content: { title: string; text?: string; fontSize: string }[];
  } = {
    backgroundImages: [],
    content: [],
  };

  if (data?.attributes.carusel_inicio.length) {
    for (const { titulo, contenido, imagen } of data.attributes
      .carusel_inicio) {
      carouselData.backgroundImages.push(
        `${imagen?.data?.attributes.url || ''}`
      );

      carouselData.content.push({
        title: titulo || '',
        text: contenido,
        fontSize: contenido ? 'small-size' : 'big-size',
      });
    }
  }

  return { carouselData };
};

export const getServerSideProps = async () => {
  try {
    const {
      data: { data },
    } = await getHomePageDataAPI<{ data: Data }>();

    const { carouselData } = getCarouselData({ data });
    return { props: { data, carouselData, error: false } };
  } catch (error: any) {
    return { props: { error: true } };
  }
};

export default function Home({ data, carouselData, error }: Props) {
  if (error) return <h1>No se puede cargar la página.</h1>;

  return (
    <Layout>
      {carouselData.backgroundImages.length === carouselData.content.length &&
        !!carouselData.backgroundImages.length && (
          <AutoCarousel
            backgroundImages={carouselData.backgroundImages}
            content={carouselData.content}
            height='calc(100vh - 4.5rem)'
            width='100vw'
          />
        )}

      {data?.attributes.titulo && (
        <section id='title' className='container' data-testid='title'>
          <h1>{data?.attributes?.titulo}</h1>
        </section>
      )}

      {data?.attributes.sub_titulo && (
        <section id='banner-1' className='banner' data-testid='sub-title'>
          <div className='container'>
            <h2>{data?.attributes?.sub_titulo}</h2>
          </div>
        </section>
      )}

      {!!data?.attributes.tarjetas_inicio.length && (
        <section id='cards' className='container row' data-testid='cards'>
          {data?.attributes.tarjetas_inicio.map(({ id, titulo, imagen }) => (
            <Fragment key={id}>
              {titulo && imagen?.data?.attributes.url && (
                <article
                  className='box-shadow card col-12 col-sm-6 col-lg-3'
                  style={{ padding: '1.5rem' }}
                >
                  <Image
                    src={imagen.data.attributes.url}
                    alt='imagen'
                    height={47}
                    width={47}
                  />
                  <p style={{ fontSize: '16px', marginBottom: 0 }}>{titulo}</p>
                </article>
              )}
            </Fragment>
          ))}
        </section>
      )}

      {!!data?.attributes.carusel_sectores.length && (
        <Sectors content={data?.attributes.carusel_sectores} />
      )}

      {data?.attributes.texto_banner_contacto &&
        data?.attributes?.imagen_banner_contacto?.data?.attributes?.url && (
          <section id='banner-2' className='banner' data-testid='contact-us'>
            <div className='container'>
              <h3>{data?.attributes?.texto_banner_contacto}</h3>
              <Link href='/contacto'>
                <a className='button'>
                  {data?.attributes?.texto_boton_contacto || 'Contáctanos'}
                </a>
              </Link>
            </div>
          </section>
        )}
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
            url(${
              data?.attributes?.imagen_banner_sub_titulo?.data?.attributes
                ?.url || ''
            });
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
            url(${
              data?.attributes?.imagen_banner_contacto?.data?.attributes?.url ||
              ''
            });
          height: 300px;
          margin-top: 2rem;
          padding: 2rem 1rem;
        }
        }
      `}</style>
    </Layout>
  );
}
