import React, { useState } from 'react';
import { LeftArrow, RightArrow } from 'components/Icons';
import { colors } from 'styles/variables';
import useViewPortWidth from 'hooks/useViewPortWidth';

export default function ManualCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const width = useViewPortWidth();
  const [state, setState] = useState({
    active: [0, 1],
    moveSlide: 1,
  });

  // const [slides, setSlides] = useState(
  //   React.Children.map(children, function (child, i) {
  //     return (
  //       <div
  //         className={`slide`}
  //         style={{
  //           right: `calc(100% - ${moveSlide + i}20px`,
  //           position: 'absolute',
  //           textAlign: 'center',
  //           top: 0,
  //           transition: 'right 0.5s ease, opacity 0.5s ease',
  //           width: '100px',
  //           // position: 'absolute',
  //           // opacity: moveSlide > 0 ? 1 : 0,
  //         }}
  //       >
  //         {child}
  //       </div>
  //     );
  //   })
  // );

  // useEffect(() => {
  //   document.querySelectorAll('.slide').forEach(($element, i) => {
  //     console.log(isInViewport($element), i);
  //   });
  // }, [moveSlide]);

  const handleLeft = () => {
    setState((state) => ({
      active: [
        state.active.at(0)! - 1 < 0
          ? React.Children.count(children) - 1
          : state.active.at(0)! - 1,
        state.active.at(1)! - 1 < 0
          ? React.Children.count(children) - 1
          : state.active.at(1)! - 1,
      ],
      moveSlide: state.moveSlide - 1,
    }));
  };

  const handleRight = () => {
    // const slidesWithClones = [...slides];
    // slidesWithClones.unshift(slidesWithClones[slidesWithClones.length - 1]);
    // slidesWithClones.push(slidesWithClones[1]);
    // setSlides(slidesWithClones);

    setState((state) => ({
      active: [
        state.active.at(0)! + 1 >= React.Children.count(children)
          ? 0
          : state.active.at(0)! + 1,
        state.active.at(1)! + 1 >= React.Children.count(children)
          ? 0
          : state.active.at(1)! + 1,
      ],
      moveSlide: state.moveSlide - 1,
    }));
  };

  return (
    <>
      <section className='carousel'>
        {React.Children.map(children, function (child, i) {
          return (
            <div
              className={`slide`}
              style={{
                right: state.active.includes(i)
                  ? `calc(100% - ${state.active.indexOf(i) + 1}20px)`
                  : `calc(100%)`,
                // opacity: state.active.includes(i) ? 1 : 0,
              }}
            >
              {child}
            </div>
          );
        })}
        {/* {slides} */}
        <div className='arrow-container'>
          <button type='button' title='left-arrow' onClick={handleLeft}>
            <LeftArrow width={20} height={20} viewBox='0 0 450 350' />
          </button>
          <button type='button' title='right-arrow' onClick={handleRight}>
            <RightArrow width={20} height={20} viewBox='0 0 350 300' />
          </button>
        </div>
      </section>
      <style jsx>{`
        section.carousel {
          overflow: hidden;
          padding-bottom: 3rem;
          position: relative;
          height: 200px;
        }

        section.carousel > div.slide {
          position: absolute;
          text-align: center;
          top: 0;
          transition: opacity 1s ease;
          width: 100px;
        }

        section.carousel > div.slide.is-active {
          opacity: 1;
        }

        section.carousel > div.slide.is-not-active {
          opacity: 0;
        }

        section.carousel > div.arrow-container {
          bottom: 0;
          display: flex;
          gap: 1rem;
          justify-content: center;
          left: 0;
          position: absolute;
          width: 100%;
        }

        button {
          align-items: center;
          background-color: #f0f0f0;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          display: flex;
          fill: ${colors.color1};
          height: 40px;
          justify-content: center;
          outline: none;
          transition: all 0.2s ease-in-out;
          width: 40px;
        }

        @media (hover: hover) {
          button:hover {
            background-color: ${colors.color1};
            fill: ${colors.white};
          }
        }
      `}</style>
    </>
  );
}
