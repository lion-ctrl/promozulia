// react
import React, { useEffect, useState } from 'react';
// helpers
import { createInterval } from 'helpers';
// styles
import { colors } from 'styles/variables';
import { addOpacity } from 'styles/utils';

const ProgressBar = ({
  resetInterval,
  AutomaticNextSlide,
}: {
  resetInterval: boolean;
  AutomaticNextSlide: () => void;
}) => {
  const [progress, setProgress] = useState<{
    progressIntervalKey: any;
    progressBarPercent: number;
  }>({
    progressIntervalKey: null,
    progressBarPercent: 0,
  });

  useEffect(() => {
    let progressIntervalKey: any = null;
    if (progress.progressIntervalKey === null) {
      progressIntervalKey = createInterval({
        cb: automaticProgressWidth,
        time: 600,
      });

      setProgress((state) => ({
        ...state,
        progressIntervalKey,
      }));
    }

    if (!resetInterval) return;
    clearInterval(progress.progressIntervalKey);
    progressIntervalKey = createInterval({
      cb: automaticProgressWidth,
      time: 600,
    });
    setProgress((state) => ({
      ...state,
      progressIntervalKey,
      progressBarPercent: 0,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetInterval]);

  useEffect(() => {
    if (progress.progressBarPercent < 100) return;
    AutomaticNextSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.progressBarPercent]);

  const automaticProgressWidth = () => {
    setProgress((state) => ({
      ...state,
      progressBarPercent:
        state.progressBarPercent + 1 > 100 ? 0 : state.progressBarPercent + 1,
    }));
  };

  if (progress.progressBarPercent === 0) return null;

  return (
    <>
      <div
        className='carousel-progress-bar'
        style={{ width: `${progress.progressBarPercent}%` }}
      ></div>
      <style jsx>{`
        div.carousel-progress-bar {
          background-color: ${addOpacity({
            color: colors.black,
            opacity: 0.6,
          })};
          height: 5px;
          left: 0;
          position: absolute;
          top: 0;
          transition: width 600ms linear;
          z-index: 10;
        }
      `}</style>
    </>
  );
};

export default React.memo(ProgressBar);
