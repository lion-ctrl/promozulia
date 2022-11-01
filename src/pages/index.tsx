import Link from 'next/link';
import Image from 'next/image';
// components
import AutoCarousel from 'components/AutoCarousel';
import Layout from 'components/Layout';
import Sectors from 'components/Sectors';
// styles
import { colors } from 'styles/variables';
import { addOpacity } from 'styles/utils';
// http methods
import { getHomePageDataAPI } from 'api/pages';

interface Props {
  data: any;
  carouselData: {
    backgroundImages: string[];
    content: { title: string; text?: string; fontSize: string }[];
  };
  cardsData: { id: number; title: string | null; src: string | null }[];
  sectorsCarousel: { id: number; title: string | null; src: string | null }[];
  error: boolean | undefined;
}

export const getServerSideProps = async () => {
  try {
    const {
      data: { data },
    } = await getHomePageDataAPI();

    const carouselData: {
      backgroundImages: string[];
      content: { title: string; text?: string; fontSize: string }[];
    } = {
      backgroundImages: [],
      content: [],
    };

    for (const { imagen_de_fondo: backgroundImage, titulo, texto } of data
      .attributes.carusel_inicio) {
      carouselData.backgroundImages.push(
        `${backgroundImage.data.attributes.url}`
      );

      carouselData.content.push({
        title: titulo,
        text: texto,
        fontSize: texto ? 'small-size' : 'big-size',
      });
    }

    const cardsData = [];
    for (const { id, imagen, titulo } of data.attributes.tarjetas_inicio) {
      cardsData.push({
        id,
        src: `${imagen.data.attributes.url}`,
        title: titulo,
      });
    }

    const sectorsCarousel = [];
    for (const { id, imagen, titulo } of data.attributes.carusel_sectores) {
      sectorsCarousel.push({
        id,
        src: `${imagen.data.attributes.url}`,
        title: titulo,
      });
    }

    return { props: { data, carouselData, cardsData, sectorsCarousel } };
  } catch (error: any) {
    return { props: { message: error.message, error: true } };
  }
};

export default function Home({
  data,
  carouselData,
  cardsData,
  sectorsCarousel,
  error,
}: Props) {
  if (error) return 'No se puede cargar la página.';

  return (
    <Layout>
      <AutoCarousel
        backgroundImages={carouselData.backgroundImages}
        content={carouselData.content}
        height='calc(100vh - 4.5rem)'
        width='100vw'
      />
      <section id='title' className='container'>
        <h1>{data?.attributes?.titulo}</h1>
      </section>
      <section id='banner-1' className='banner'>
        <div className='container'>
          <h2>{data?.attributes?.sub_titulo}</h2>
        </div>
      </section>
      <section id='cards' className='container row'>
        {cardsData.map(({ id, src, title }) => (
          <article
            key={id}
            className='box-shadow card col-12 col-sm-6 col-lg-3'
            style={{ padding: '1.5rem' }}
          >
            {src && <Image src={src} alt='imagen' height={47} width={47} />}
            <p style={{ fontSize: '16px', marginBottom: 0 }}>{title}</p>
          </article>
        ))}
      </section>
      <Sectors content={sectorsCarousel} />
      <section id='banner-2' className='banner'>
        <div className='container'>
          <h3>{data?.attributes?.texto_banner_contacto}</h3>
          <Link href='/contacto'>
            <a className='button'>{data?.attributes?.texto_boton_contacto}</a>
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
            url(${
              data?.attributes?.imagen_banner_sub_titulo?.data?.attributes?.url
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
              data?.attributes?.imagen_banner_contacto?.data?.attributes?.url
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
