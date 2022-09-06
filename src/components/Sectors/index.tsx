import React from 'react';
import Slider from 'react-slick';
// data
import { sectorsData } from 'data/homePageData';
// styles
import { breakPoints, colors } from 'styles/variables';

const carouseSettings = {
  arrows: true,
  dots: false,
  infinite: true,
  initialSlide: 0,
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

export default function Sectors() {
  return (
    <>
      <section id='sectors' className='container'>
        <Slider {...carouseSettings}>
          {sectorsData.map(({ Icon, content, viewBox }) => (
            <div key={content}>
              <article>
                <div className='icon-container'>
                  <Icon style={{ fill: colors.white }} viewBox={viewBox} />
                </div>
                <p>{content}</p>
              </article>
            </div>
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
