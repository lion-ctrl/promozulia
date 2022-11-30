import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
// components
import Loader from 'components/Loader';
import Modal from 'components/Modal';
// helpers
import { formatDate, shimmer, toBase64 } from 'helpers';
// http methods
import { AxiosResponse } from 'axios';
// interfaces
import { CardType, CollectionType, ImageType } from 'interface';
// styles
import { colors } from 'styles/variables';
import Link from 'next/link';

interface Props {
  title: string;
  redirect?: boolean;
  path?: string;
  dataEntry: CollectionType<{
    titulo: string;
    imagen: ImageType;
    contenido?: string;
    fecha?: string;
    slug?: string;
  }>;
  fetchData: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => Promise<AxiosResponse<any, any>>;
}

export default function Cards({
  title,
  redirect,
  path,
  dataEntry,
  fetchData,
}: Props) {
  const [isSearching, setIsSearching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(dataEntry.data);
  const [active, setActive] = useState<CardType | null>(null);
  const [pagination, setPagination] = useState({
    page: dataEntry.meta.pagination.page,
    pageCount: dataEntry.meta.pagination.pageCount,
  });

  useEffect(() => {
    if (!isSearching) return;

    const queryApi = async () => {
      try {
        const {
          data: { data },
        } = await fetchData({
          page: pagination.page,
          pageSize: 4,
        });

        setTimeout(() => {
          setData((state) => [...state, ...data]);
          setIsSearching(false);
        }, 2000);
      } catch (error) {
        toast.error(
          'Error: no se pudo cargar mas información, intente mas tarde.'
        );
      }
    };
    queryApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching, pagination.page]);

  if (!data.length) return null;

  return (
    <>
      <section className='container'>
        {title.length && <h2>{title}</h2>}
        <div className='row'>
          {data.map(
            ({
              id,
              attributes: { titulo, imagen, contenido, fecha, slug },
            }) => (
              <article key={id} className='col-12 col-md-6 box-shadow'>
                {imagen?.data && (
                  <div className='img-container'>
                    <Image
                      src={imagen.data?.attributes?.url}
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
                {titulo && <h3>{titulo}</h3>}
                {fecha && <p>{formatDate({ stringDate: fecha })}</p>}
                {redirect && path && slug ? (
                  <Link href={`/${path}/${slug}`}>
                    <a>
                      <button
                        type='button'
                        title='read more'
                        className='button'
                      >
                        Leer más
                      </button>
                    </a>
                  </Link>
                ) : (
                  <button
                    type='button'
                    title='read more'
                    className='button'
                    onClick={() => {
                      setActive({
                        id,
                        titulo,
                        imagen,
                        contenido,
                        fecha,
                      });
                      setShowModal(true);
                    }}
                  >
                    Leer más
                  </button>
                )}
              </article>
            )
          )}
        </div>
        {isSearching && <Loader size='big' />}
        {pagination.page !== pagination.pageCount && !isSearching && (
          <div
            className='row'
            style={{ justifyContent: 'center', marginTop: '4rem' }}
          >
            <div className='col-6'>
              <button
                type='button'
                title='show more'
                className='button'
                style={{ width: '100%' }}
                onClick={() => {
                  setPagination((state) => ({
                    ...state,
                    page: state.page + 1,
                  }));
                  setIsSearching(true);
                }}
              >
                Cargar más
              </button>
            </div>
          </div>
        )}
        {active && showModal && (
          <Modal
            title={active.titulo || ''}
            setShowModal={() => {
              setActive(null);
              setShowModal(false);
            }}
          >
            {active.imagen?.data && (
              <div className='img-container'>
                <Image
                  src={active.imagen.data?.attributes?.url}
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
            <div
              dangerouslySetInnerHTML={{
                __html: active.contenido || '',
              }}
            />
          </Modal>
        )}
      </section>
      <style jsx>{`
        section {
          margin-bottom: 4rem;
          margin-top: 4rem;
        }

        h2 {
          color: ${colors.color1};
          margin-bottom: 4rem;
          padding-bottom: 1rem;
          position: relative;
          text-align: center;
        }

        h2::after {
          background-color: ${colors.color1};
          bottom: 0;
          content: '';
          height: 2px;
          left: 0;
          position: absolute;
          width: 100%;
        }

        h3 {
          color: ${colors.color1};
          margin: 1rem 0;
        }

        div.img-container {
          height: 300px;
          position: relative;
          width: 100%;
        }

        article {
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        article h3 {
          flex: 1;
        }

        article button {
          display: block;
          margin-top: 1rem;
          width: 100%;
        }
      `}</style>
    </>
  );
}
