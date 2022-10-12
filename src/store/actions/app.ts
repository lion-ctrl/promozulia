import { store } from "store";
import { appSlice, HeaderInfo, FooterInfo } from "store/reducers/app";

// Actions
export const setAppLoading = (bool: boolean) => {
  store.dispatch(appSlice.actions.loading(bool));
};

export const setAppHeaderInfo = (info: HeaderInfo) => {
  store.dispatch(appSlice.actions.headerInfo(info));
};

export const setAppFooterInfo = (info: FooterInfo) => {
  store.dispatch(appSlice.actions.footerInfo(info));
};
