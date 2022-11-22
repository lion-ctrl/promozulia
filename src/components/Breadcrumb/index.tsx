import React from 'react';
import Link from 'next/link';
import { colors } from 'styles/variables';
import { useRouter } from 'next/router';

export default function BreadCrumb({ title }: { title: string }) {
  const router = useRouter();
  const paths = router.asPath.split('/').slice(1);

  return (
    <>
      <div className='row'>
        <Link href='/'>
          <a>{title}</a>
        </Link>
        {paths.map((path) => (
          <React.Fragment key={path}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              width={20}
              height={20}
              viewBox='0 0 24 24'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
            <p>{path}</p>
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        a {
          color: ${colors.black};
        }

        p {
          color: ${colors.black};
          font-size: 16px;
          margin: 0;
        }

        svg {
          stroke: ${colors.black};
        }

        div.row {
          justify-content: flex-start;
          padding: 0.5rem 0;
        }

        @media (hover: hover) {
          a:hover {
            color: ${colors.color1};
          }
        }
      `}</style>
    </>
  );
}
