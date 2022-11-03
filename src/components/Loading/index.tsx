import Loader from 'components/Loader';
import React from 'react';
import { colors } from 'styles/variables';

export default function Loading({
  title = 'Cargando...',
  color,
}: {
  title: string;
  color?: 'primary' | 'white';
}) {
  return (
    <>
      <div className='overlay'>
        <div className='content'>
          <Loader size='big' color={color} />
          <h3>{title}</h3>
        </div>
      </div>
      <style jsx>{`
        .overlay {
          align-items: center;
          background-color: rgba(0, 0, 0, 0.3);
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
          width: 100%;
          z-index: 1500;
        }

        h3 {
          color: ${colors.white};
        }
      `}</style>
    </>
  );
}
