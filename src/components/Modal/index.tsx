import React from 'react';
import Image from 'next/image';
// components
import { Xcircle } from 'components/Icons';
// helpers
import { shimmer, toBase64 } from 'helpers';
// interfces
import { ImageType } from 'interface';
// styles
import { colors } from 'styles/variables';

export default function Modal({
  title,
  content,
  image,
  setShowModal,
}: {
  title: string;
  content: string;
  image?: ImageType;
  setShowModal: () => void;
}) {
  return (
    <>
      <div
        className='modal'
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowModal();
          }
        }}
      >
        <div className='content fade-in-down'>
          <div className='header'>
            <h2>{title}</h2>
            <div
              className='close-modal-icon'
              onClick={() => {
                setShowModal();
              }}
            >
              <Xcircle />
            </div>
          </div>
          <div className='body'>
            {image?.data && (
              <div className='img-container'>
                <Image
                  src={image.data.attributes.url}
                  alt='image'
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer('100%', '100%')
                  )}`}
                />
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: content }} />
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
          height: 80vh;
          width: 90%;
        }

        .header {
          border-bottom: 1px solid ${colors.black};
          padding: 1rem;
          position: relative;
        }

        .header h2 {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }

        .close-modal-icon {
          cursor: pointer;
          height: 30px;
          position: absolute;
          right: 5px;
          top: 5px;
          width: 30px;
        }

        .body {
          flex: 1;
          overflow: auto;
          padding: 1rem;
        }

        div.img-container {
          height: 300px;
          position: relative;
          width: 100%;
        }
      `}</style>
    </>
  );
}
