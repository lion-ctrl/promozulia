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
