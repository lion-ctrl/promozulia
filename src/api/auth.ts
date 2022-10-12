import API from "api/index";
import { AxiosResponse } from "axios";

export const postRegisterUserAPI = (data: {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}): Promise<AxiosResponse> => {
  const URI = `/auth/local/register`;
  return API.post(URI, data);
};

export const getConfirmAccountAPI = (
  confirmation: string
): Promise<AxiosResponse> => {
  const URI = `/auth/email-confirmation?confirmation=${confirmation}`;
  return API.get(URI);
};

export const postLoginUserAPI = (data: {
  identifier: string;
  password: string;
}): Promise<AxiosResponse> => {
  const URI = `/auth/local`;
  return API.post(URI, data);
};

export const getCurrentUserAPI = ({
  accessToken,
}: {
  accessToken: string;
}): Promise<AxiosResponse> => {
  const URI = `/users/me`;
  return API.get(URI, { headers: { Authorization: `Bearer ${accessToken}` } });
};

export const postForgotPasswordAPI = (data: { email: string }) => {
  const URI = `/auth/forgot-password`;
  return API.post(URI, data);
};

export const postResetPasswordAPI = (data: {
  password: string;
  passwordConfirmation: string;
  code: string;
}) => {
  const URI = `/auth/reset-password`;
  return API.post(URI, data);
};
