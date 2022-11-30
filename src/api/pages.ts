import API from "api/index";
import { AxiosResponse } from "axios";

export const getHomePageDataAPI = <T>(): Promise<AxiosResponse<T>> => {
  let URI = `/pagina-inicio`;
  URI += `?populate[0]=imagen_banner_sub_titulo&populate[1]=imagen_banner_contacto`;
  URI += `&populate[2]=carusel_inicio&populate[3]=carusel_inicio.imagen`;
  URI += `&populate[4]=tarjetas_inicio&populate[5]=tarjetas_inicio.imagen`;
  URI += `&populate[6]=carusel_sectores&populate[7]=carusel_sectores.imagen`;
  return API.get<T>(URI);
};

export const getUSPageDataAPI = (): Promise<AxiosResponse> => {
  let URI = `/pagina-nosotros`;
  URI += `?populate[0]=imagen_banner_nosotros&populate[1]=imagen_mision&populate[2]=imagen_vision`;
  URI += `&populate[3]=tarjetas_valores&populate[4]=tarjetas_valores.imagen`;
  URI += `&populate[5]=tarjetas_promozulia&populate[6]=tarjetas_promozulia.imagen`;
  return API.get(URI);
};

export const getServicesPageDataAPI = (): Promise<AxiosResponse> => {
  let URI = `/pagina-servicios`;
  URI += `?populate[0]=imagen_banner_servicios`;
  URI += `&populate[1]=tarjetas_servicios&populate[2]=tarjetas_servicios.imagen`;
  return API.get(URI);
};

export const getHistoryPageDataAPI = (): Promise<AxiosResponse> => {
  let URI = `/pagina-historia`;
  URI += `?populate[0]=imagen_banner`;
  URI += `&populate[1]=tarjetas&populate[2]=tarjetas.imagen`;
  return API.get(URI);
};

export const getInitiativesPageDataAPI = (): Promise<AxiosResponse> => {
  let URI = `/pagina-iniciativa`;
  URI += `?populate[0]=imagen_banner`;
  URI += `&populate[1]=consejos&populate[2]=consejos.imagen`;
  return API.get(URI);
};

export const getStudiesPublicationsAPI = (): Promise<AxiosResponse> =>
  API.get(`/pagina-estudios`);
