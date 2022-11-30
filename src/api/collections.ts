import API from "api/index";
import { AxiosResponse } from "axios";

export const getAchievementsDataAPI = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<AxiosResponse> => {
  let URI = `/achievements`;
  URI += `?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  URI += `&populate=*`;
  return API.get(URI);
};

export const getPlansDataAPI = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<AxiosResponse> => {
  let URI = `/plans`;
  URI += `?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  URI += `&populate=*`;
  return API.get(URI);
};

export const getAdvicesDataAPI = (): Promise<AxiosResponse> => {
  let URI = `/advices`;
  URI += `?fields[0]=titulo&fields[2]=slug`;
  URI += `&populate=*`;
  return API.get(URI);
};

export const getAdviceDataAPI = ({
  slug,
}: {
  slug: string;
}): Promise<AxiosResponse> => {
  let URI = `/advices`;
  URI += `?filters[slug][$eq]=${slug}`;
  URI += `&populate=*`;
  return API.get(URI);
};

export const getStudiesDataAPI = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<AxiosResponse> => {
  let URI = `/studies`;
  URI += `?fields[0]=titulo&fields[2]=slug&fields[3]=fecha`;
  URI += `&populate=*`;
  URI += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  return API.get(URI);
};

export const getStudyDataAPI = ({
  slug,
}: {
  slug: string;
}): Promise<AxiosResponse> => {
  let URI = `/studies`;
  URI += `?filters[slug][$eq]=${slug}`;
  URI += `&populate=*`;
  return API.get(URI);
};

export const getPublicationsDataAPI = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<AxiosResponse> => {
  let URI = `/publications`;
  URI += `?fields[0]=titulo&fields[2]=slug&fields[3]=fecha`;
  URI += `&populate=*`;
  URI += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  return API.get(URI);
};

export const getPublicationDataAPI = ({
  slug,
}: {
  slug: string;
}): Promise<AxiosResponse> => {
  let URI = `/publications`;
  URI += `?filters[slug][$eq]=${slug}`;
  URI += `&populate=*`;
  return API.get(URI);
};
