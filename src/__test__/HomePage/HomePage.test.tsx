import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState as AppInitialState } from '../../store/reducers/app';
import { initialState as AuthInitialState } from '../../store/reducers/auth';
import Home, { getCarouselData } from '../../pages/index';
import { baseURL } from 'api';

const mockStore = configureStore();

const initState = {
  app: AppInitialState,
  auth: AuthInitialState,
};
const store = mockStore(initState);
store.dispatch = jest.fn();

describe.skip('Home page', () => {
  it('renders correctly the home page', async () => {
    let URI = `${baseURL}/pagina-inicio`;
    URI += `?populate[0]=imagen_banner_sub_titulo&populate[1]=imagen_banner_contacto`;
    URI += `&populate[2]=carusel_inicio&populate[3]=carusel_inicio.imagen`;
    URI += `&populate[4]=tarjetas_inicio&populate[5]=tarjetas_inicio.imagen`;
    URI += `&populate[6]=carusel_sectores&populate[7]=carusel_sectores.imagen`;

    const {
      data: { data },
    } = await axios.get(URI);

    const { carouselData } = getCarouselData({ data });

    const wrapper = render(
      <Provider store={store}>
        <Home data={data} carouselData={carouselData} error={false} />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('sub-title')).toBeInTheDocument();
    expect(screen.getByTestId('cards')).toBeInTheDocument();
    expect(screen.getByTestId('sectors')).toBeInTheDocument();
    expect(screen.getByTestId('contact-us')).toBeInTheDocument();
  });
});
