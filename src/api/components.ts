import API from "api/index";
import { AxiosResponse } from "axios";

export const getHeaderDataAPI = (): Promise<AxiosResponse> => {
  const URI = `/cabecera?populate[0]=logo&populate[1]=enlaces_publicos&populate[2]=enlaces_manejar_sesion&populate[3]=enlaces_privados&populate[4]=enlaces_privados_manejar_sesion`;
  return API.get(URI);
};

export const getFooterDataAPI = (): Promise<AxiosResponse> => {
  const URI = `/pie-pagina?populate[0]=logo`;
  return API.get(URI);
};
