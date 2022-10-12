import Link from 'next/link';
import Image from 'next/image';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'store';
// helpers
import { shimmer, toBase64 } from 'helpers';
// styles
import { colors } from 'styles/variables';

export default function Footer() {
  const { footerInfo } = useSelector((state: RootState) => state.app);

  return (
    <>
      <footer>
        <nav className='container row'>
          <Link href='/'>
            <a className='col-12 col-md-4'>
              {footerInfo.logoSrc === 'ZULIA' ? (
                <h3 className='logo'>{footerInfo.logoSrc}</h3>
              ) : (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div className='logo'>
                    <Image
                      src={footerInfo.logoSrc}
                      alt='logo'
                      layout='fill'
                      placeholder='blur'
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer('100%', '100%')
                      )}`}
                    />
                  </div>
                </div>
              )}
            </a>
          </Link>
          <article className='col-12 col-md-4'>
            <h4>{footerInfo.directionTitle}</h4>
            <p>{footerInfo.direction}</p>
          </article>
          <article className='col-12 col-md-4'>
            <h4>{footerInfo.phoneNumberTitle}</h4>
            <a href={`tel:${footerInfo.phoneNumber}`}>
              {footerInfo.phoneNumber}
            </a>
          </article>
        </nav>
        <aside>
          <p>{footerInfo.copyright}</p>
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
