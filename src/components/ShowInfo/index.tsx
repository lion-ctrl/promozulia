import { shimmer, toBase64 } from 'helpers';
import Image from 'next/image';
import React from 'react';
import { colors } from 'styles/variables';

interface Props {
  title: string;
  content: string;
  src?: string;
}

export default function ShowInfo({ src, title, content }: Props) {
  return (
    <>
      {src && (
        <div className='img-container'>
          <Image
            src={src}
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
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <style jsx>{`
        h1 {
          color: ${colors.color1};
          margin-top: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        div.img-container {
          height: 500px;
          position: relative;
          width: 100%;
        }
      `}</style>
    </>
  );
}
