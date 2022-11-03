import React from 'react';
import { colors } from 'styles/variables';
import { Xcircle } from 'components/Icons';

export default function Modal({
  title,
  content,
  setShowModal,
}: {
  title: string;
  content: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className='modal'>
        <div className='content fade-in-down'>
          <div className='header'>
            <h2>
              {title}
              <div
                style={{ height: '30px', width: '30px', cursor: 'pointer' }}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <Xcircle />
              </div>
            </h2>
          </div>
          <div className='body'>
            <p dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal {
          align-items: center;
          backdrop-filter: blur(4px);
          background-color: rgba(0, 0, 0, 0.5);
          bottom: 0;
          display: flex;
          justify-content: center;
          left: 0;
          position: fixed;
          right: 0;
          top: 80px;
          z-index: 500;
        }

        .content {
          background-color: ${colors.white};
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          width: 90%;
        }

        .header {
          border-bottom: 1px solid ${colors.black};
          padding: 1rem;
        }

        .header h2 {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }

        .body {
          flex: 1;
          overflow: auto;
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
