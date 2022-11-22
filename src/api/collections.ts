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
