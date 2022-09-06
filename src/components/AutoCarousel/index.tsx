// react
import React, { Fragment, useCallback, useState } from 'react';
import Image from 'next/image';
// components
import ProgressBar from './ProgressBar';
// helpers
import { debounce } from 'helpers';
// styles
import { addOpacity } from 'styles/utils';
import { breakPoints, colors } from 'styles/variables';

interface Props {
  backgroundImages: string[];
  content: {
    text: string;
  }[];
  height: string;
  width: string;
}

export default function AutoCarousel({
  backgroundImages,
  content,
  height,
  width,
}: Props) {
  const [state, setState] = useState<{
    active: number;
    activeContent: number;
    resetInterval: boolean;
    isAnimateContent: boolean;
  }>({
    active: 0,
    activeContent: 0,
    resetInterval: false,
    isAnimateContent: true,
  });

  const AutomaticNextSlide = useCallback(() => {
    setState((state) => ({
      ...state,
      isAnimateContent: false,
      active:
        state.active + 1 >= backgroundImages.length ? 0 : state.active + 1,
    }));

    setTimeout(() => {
      setState((state) => ({
        ...state,
        activeContent:
          state.activeContent + 1 >= content.length
            ? 0
            : state.activeContent + 1,
        isAnimateContent: true,
      }));
    }, 1200);
  }, [backgroundImages.length, content.length]);

  const handleLeft = () => {
    setState((state) => ({
      ...state,
      active:
        state.active - 1 < 0 ? backgroundImages.length - 1 : state.active - 1,
      isAnimateContent: false,
      resetInterval: true,
    }));

    setTimeout(() => {
      setState((state) => ({
        ...state,
        activeContent:
          state.activeContent - 1 < 0
            ? content.length - 1
            : state.activeContent - 1,
        isAnimateContent: true,
        resetInterval: false,
      }));
    }, 1200);
  };

  const handleRight = () => {
    setState((state) => ({
      ...state,
      active:
        state.active + 1 >= backgroundImages.length ? 0 : state.active + 1,
      isAnimateContent: false,
      resetInterval: true,
    }));

    setTimeout(() => {
      setState((state) => ({
        ...state,
        activeContent:
          state.activeContent + 1 >= content.length
            ? 0
            : state.activeContent + 1,
        isAnimateContent: true,
        resetInterval: false,
      }));
    }, 1200);
  };

  return (
    <>
      <section className='carousel'>
        <ProgressBar
          resetInterval={state.resetInterval}
          AutomaticNextSlide={AutomaticNextSlide}
        />

        <div className='carousel-slider'>
          {backgroundImages.map((bg, i) => (
            <div
              key={bg}
              className={`carousel-slide-container ${
                state.active === i ? 'is-active' : 'is-not-active'
              }`}
            >
              <figure>
                <Image
                  src={bg}
                  alt={`image-${i}`}
                  layout='fill'
                  objectFit='cover'
                />
              </figure>
            </div>
          ))}
        </div>

        <article>
          <aside className='container'>
            <h4
              className={
                state.isAnimateContent ? 'fade-in-down' : 'fade-out-down'
              }
            >
              {content.map(({ text }, i) => {
                return state.activeContent === i && text;
              })}
            </h4>
          </aside>
        </article>

        <button
          type='button'
          title='next slide'
          onClick={debounce(handleLeft, 200)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
        <button
          type='button'
          title='previous slide'
          onClick={debounce(handleRight, 200)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>
      </section>
      <style jsx>{`
        section.carousel {
          position: relative;
          overflow-x: hidden;
          height: ${height};
          width: ${width};
        }

        div.carousel-slider {
          position: relative;
          height: inherit;
          width: inherit;
        }

        div.carousel-slide-container {
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          transition: opacity 1s ease-in-out;
        }

        div.carousel-slide-container.is-active {
          opacity: 1;
        }

        div.carousel-slide-container.is-not-active {
          opacity: 0;
        }

        figure {
          height: 100%;
          margin: 0;
          padding: 0;
          position: relative;
        }

        article {
          background-color: rgba(0, 0, 0, 0.4);
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        aside {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          width: 60%;
        }

        h4 {
          color: ${colors.white};
          line-height: 1.5;
          text-align: center;
        }

        button {
          background-color: ${addOpacity({
            color: colors.black,
            opacity: 0.8,
          })};
          border: none;
          border-radius: 50%;
          cursor: pointer;
          height: 2rem;
          outline: none;
          padding: 5px;
          position: absolute;
          top: calc(50% - 18px);
          transition: background-color 0.2s ease;
          width: 2rem;
        }

        button > svg {
          stroke: ${colors.white};
        }

        button:first-of-type {
          left: 1rem;
        }
        button:last-of-type {
          right: 1rem;
        }

        @media (hover: hover) {
          button:hover {
            background-color: ${addOpacity({
              color: colors.black,
              opacity: 1,
            })};
          }
        }

        @media (min-width: ${breakPoints.sm}) {
          aside {
            width: 80%;
          }
        }
      `}</style>
    </>
  );
}
