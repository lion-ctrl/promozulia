import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { setAuthLogOutUser } from 'store/actions/auth';
// components
import ActiveLink from 'components/ActiveLink';
// helpers
import { shimmer, toBase64 } from 'helpers';
// styles
import { breakPoints, colors } from 'styles/variables';

export default function Header() {
  const { headerInfo } = useSelector((state: RootState) => state.app);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header>
        <nav className='container row'>
          <Link href='/'>
            <a className='col-8 col-sm-10 col-md-2'>
              {headerInfo.logoSrc === 'ZULIA' ? (
                <h3 className='logo'>{headerInfo.logoSrc}</h3>
              ) : (
                <div className='logo'>
                  <Image
                    src={headerInfo.logoSrc}
                    alt='logo'
                    layout='fill'
                    placeholder='blur'
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer('100%', '100%')
                    )}`}
                  />
                </div>
              )}
            </a>
          </Link>
          <button
            className={`header-btn ${
              isMenuOpen ? 'is-active' : ''
            } col-4 col-sm-2`}
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
          <div
            className={`links ${isMenuOpen ? 'is-active' : ''} col-md-10 row`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className='internal-links col-12 col-md-9'>
              {headerInfo.publicLinks.map(({ id, href, name }) => {
                return (
                  <ActiveLink key={id} href={href} activeClassName='is-active'>
                    <a>{name}</a>
                  </ActiveLink>
                );
              })}
              {isAuthenticated &&
                headerInfo.privateLinks.map(({ id, href, name }) => {
                  return (
                    <ActiveLink
                      key={id}
                      href={href}
                      activeClassName='is-active'
                    >
                      <a>{name}</a>
                    </ActiveLink>
                  );
                })}
            </div>
            <div className='session-links col-12 col-md-3'>
              {!isAuthenticated &&
                headerInfo.sessionLinks.map(({ id, href, name }) => {
                  return (
                    <ActiveLink
                      key={id}
                      href={href}
                      activeClassName='is-active'
                    >
                      <a>{name}</a>
                    </ActiveLink>
                  );
                })}
              {isAuthenticated &&
                headerInfo.sessionPrivateLinks.map(({ id, href, name }) =>
                  href !== null ? (
                    <ActiveLink
                      key={id}
                      href={href}
                      activeClassName='is-active'
                    >
                      <a>{name}</a>
                    </ActiveLink>
                  ) : (
                    <a
                      key={id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setAuthLogOutUser()}
                    >
                      {name}
                    </a>
                  )
                )}
            </div>
          </div>
        </nav>
      </header>
      <style jsx>{`
        header {
          background-color: ${colors.color1};
          border-bottom: 1px solid ${colors.black};
          height: 5rem;
          padding: 10px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-btn {
          align-items: center;
          background-color: ${colors.color1};
          border: none;
          cursor: pointer;
          display: flex;
          justify-content: flex-end;
          outline: none;
          padding: 0.5rem;
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

        .header-btn.is-active .line1 {
          transform: rotate(45deg);
        }

        .header-btn.is-active .line2 {
          transform: scaleY(0);
        }

        .header-btn.is-active .line3 {
          transform: rotate(-45deg);
        }

        div.links {
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
          row-gap: 3rem;
          top: 5rem;
          transition: opacity 0.5s ease-in-out;
          width: 100%;
        }

        div.links.is-active {
          opacity: 1;
          pointer-events: auto;
        }

        div.links a {
          align-items: center;
          color: ${colors.white};
          display: flex;
          font-size: 0.8rem;
          font-weight: bold;
          justify-content: center;
          padding: 0.8rem 0;
          position: relative;
          text-align: center;
          text-decoration: none;
        }

        @media (min-width: ${breakPoints.md}) {
          button.header-btn {
            display: none;
          }

          div.links {
            flex-direction: row;
            opacity: 1;
            padding: 0.5rem 0;
            pointer-events: auto;
            position: static;
            width: 84%;
          }

          div.internal-links {
            align-items: center;
            display: flex;
            justify-content: space-between;
          }

          div.session-links {
            display: flex;
            justify-content: flex-end;
          }

          div.links div.session-links a:not(:last-of-type) {
            margin-right: 0.7rem;
          }

          div.links a {
            font-size: 0.6rem;
            overflow: hidden;
            padding: 0;
          }

          div.links a:last-of-type {
            margin-right: 0;
          }

          div.links a::after {
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

          div.links a.is-active::after {
            transform: translateX(0%);
          }
        }

        @media (min-width: ${breakPoints.lg}) {
          div.internal-links {
            justify-content: center;
          }

          div.links a {
            font-size: 0.7rem;
            margin-right: 0.8rem;
          }
        }

        @media (min-width: ${breakPoints.xl}) {
          div.links a {
            font-size: 0.9rem;
            margin-right: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
