// react
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// components
import ActiveLink from 'components/ActiveLink';
// helpers
import { shimmer, toBase64 } from 'helpers';
// styles
import { breakPoints, colors } from 'styles/variables';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuData = [
    {
      href: '/',
      text: 'Inicio',
    },
    {
      href: '/nosotros',
      text: 'Nosotros',
    },
    {
      href: '/servicios',
      text: 'Servicios',
    },
    {
      href: '/contacto',
      text: 'Contacto',
    },
  ];

  return (
    <>
      <header>
        <section className='container'>
          <Link href='/'>
            <a className='logo'>
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
          <button
            className={`header-btn ${isMenuOpen ? 'is-active' : ''}`}
            type='button'
            title='menu-button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className='header-hamburger'>
              <span className='hamburger-line line1'></span>
              <span className='hamburger-line line2'></span>
              <span className='hamburger-line line3'></span>
            </div>
          </button>
          <nav
            className={isMenuOpen ? 'is-active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            {menuData.map((data) => (
              <ActiveLink
                activeClassName='is-active'
                href={data.href}
                key={`${data.text}`}
              >
                <a>{data.text}</a>
              </ActiveLink>
            ))}
          </nav>
        </section>
      </header>
      <style jsx>{`
        header {
          background-color: ${colors.color4};
          height: 5rem;
          padding: 10px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        section {
          align-items: center;
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .header-btn {
          background-color: ${colors.color4};
          border: none;
          cursor: pointer;
          outline: none;
          padding: 0.5rem;
        }

        .header-btn.is-active .line1 {
          transform: rotate(45deg);
        }

        .header-btn.is-active .line2 {
          transform: scaleY(0);
        }

        .header-btn.is-active .line3 {
          transform: rotate(-45deg);
        }

        .header-hamburger {
          display: flex;
          flex-direction: column;
          height: 26px;
          justify-content: space-between;
          position: relative;
          width: 32px;
          z-index: 2;
        }

        .hamburger-line {
          display: block;
          height: 4px;
          width: 100%;
          border-radius: 10px;
          background-color: ${colors.white};
        }

        .line1 {
          transform-origin: 0% 0%;
          transition: transform 0.4s ease-in-out;
        }

        .line2 {
          transition: transform 0.2s ease-in-out;
        }

        .line3 {
          transform-origin: 0% 100%;
          transition: transform 0.4s ease-in-out;
        }

        nav {
          align-items: center;
          background-color: ${colors.color1};
          display: flex;
          flex-direction: column;
          justify-content: center;
          left: 0;
          opacity: 0;
          padding: 1rem 0;
          pointer-events: none;
          position: fixed;
          top: 4.8rem;
          transition: opacity 0.5s ease-in-out;
          width: 100%;
        }

        nav.is-active {
          opacity: 1;
          pointer-events: auto;
        }

        nav a {
          align-items: center;
          color: ${colors.white};
          display: flex;
          font-size: 0.8rem;
          font-weight: bold;
          justify-content: flex-start;
          padding: 0.8rem 0;
          position: relative;
          text-align: center;
          text-decoration: none;
        }

        @media (min-width: ${breakPoints.md}) {
          button.header-btn {
            display: none;
          }

          nav {
            flex-direction: row;
            opacity: 1;
            padding: 0.5rem 0;
            pointer-events: auto;
            position: static;
            width: auto;
          }

          nav a {
            font-size: 1rem;
            overflow: hidden;
            padding: 0;
            margin-right: 0.7rem;
          }

          nav a:last-of-type {
            margin-right: 0;
          }

          nav a::after {
            background-color: ${colors.white};
            bottom: 0;
            content: '';
            height: 2px;
            left: 0;
            position: absolute;
            transform: translateX(-105%);
            transition: transform 0.5s ease-in-out;
            width: 100%;
          }

          nav a.is-active::after {
            transform: translateX(0%);
          }
        }

        @media (min-width: ${breakPoints.md}) {
          header {
            height: 6rem;
          }
        }

        @media (min-width: ${breakPoints.lg}) {
          nav a {
            margin-right: 1rem;
          }
        }
      `}</style>
    </>
  );
}
