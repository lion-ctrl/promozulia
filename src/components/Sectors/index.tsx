import Image from 'next/image';
import Slider from 'react-slick';
// interfaces
import { CardType } from 'interface';
// styles
import { breakPoints, colors } from 'styles/variables';
import { Fragment } from 'react';

const carouseSettings = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 5000,
  dots: false,
  infinite: true,
  initialSlide: 0,
  pauseOnHover: true,
  slidesToScroll: 1,
  slidesToShow: 7,
  speed: 500,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

export default function Sectors({ content }: { content: CardType[] }) {
  return (
    <>
      <section id='sectors' className='container' data-testid='sectors'>
        <Slider {...carouseSettings}>
          {content.map(({ id, titulo, imagen }) => (
            <Fragment key={id}>
              {titulo && imagen?.data?.attributes.url && (
                <div>
                  <article>
                    <div className='icon-container'>
                      <Image
                        src={imagen.data.attributes.url}
                        alt='imagen'
                        height={47}
                        width={47}
                      />
                    </div>
                    <p>{titulo}</p>
                  </article>
                </div>
              )}
            </Fragment>
          ))}
        </Slider>
      </section>
      <style jsx>{`
        section#sectors {
          margin-top: 4rem;
        }

        article {
          height: 100%;
          text-align: center;
        }

        div.icon-container {
          align-items: center;
          background-color: ${colors.color1};
          border-radius: 50%;
          display: flex;
          height: 80px;
          justify-content: center;
          margin-left: auto;
          margin-right: auto;
          padding: 20px;
          text-align: center;
          width: 80px;
        }

        p {
          font-size: 12px;
        }

        @media (min-width: ${breakPoints.md}) {
          p {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}
