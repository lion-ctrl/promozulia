import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// helpers
import { shimmer, toBase64 } from 'helpers';
// styles
import { colors } from 'styles/variables';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer>
        <nav className='container row'>
          <Link href='/'>
            <a className='logo col-12 col-md-4'>
              <Image
                src='/assets/img/logo.jpeg'
                alt='logo'
                layout='fill'
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer('100%', '100%')
                )}`}
              />
            </a>
          </Link>
          <article className='col-12 col-md-4'>
            <h4>Vísitanos</h4>
            <p>Maracaibo, Zulia Venezuela</p>
          </article>
          <article className='col-12 col-md-4'>
            <h4>Llámanos</h4>
            <a href='tel:+58000000000'>+58000000000</a>
          </article>
        </nav>
        <aside>
          <p>Todos los derechos reservados PromoZulia {year}</p>
        </aside>
      </footer>
      <style jsx>{`
        footer {
          background-color: ${colors.color1};
          padding: 1rem 0;
        }

        .logo {
          color: ${colors.white};
          padding: 0.5rem 0;
        }

        article {
          color: ${colors.white};
          text-align: center;
        }

        p,
        a {
          color: ${colors.white};
          display: block;
          margin: 0.5rem 0 0;
        }

        aside {
          border-top: thin solid ${colors.black};
          color: ${colors.white};
          font-weight: bold;
          margin-top: 1rem;
          padding: 1rem 0 0;
          text-align: center;
        }
      `}</style>
    </>
  );
}
