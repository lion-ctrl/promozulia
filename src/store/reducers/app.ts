import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HeaderInfo {
  logoSrc: string;
  publicLinks: { id: number; name: string; href: string }[];
  privateLinks: { id: number; name: string; href: string }[];
  sessionLinks: { id: number; name: string; href: string }[];
  sessionPrivateLinks: { id: number; name: string; href: string | null }[];
}

export interface FooterInfo {
  logoSrc: string;
  directionTitle: string;
  direction: string;
  phoneNumberTitle: string;
  phoneNumber: string;
  copyright: string;
}

export interface AppTypes {
  loading: boolean;
  headerInfo: HeaderInfo;
  footerInfo: FooterInfo;
}

const initialState: AppTypes = {
  loading: true,
  headerInfo: {
    logoSrc: "ZULIA",
    publicLinks: [
      {
        id: 0,
        href: "/",
        name: "Inicio",
      },
      {
        id: 1,
        href: "/quienes-somos",
        name: "¿Quienes somos?",
      },
      {
        id: 2,
        href: "/servicios",
        name: "Servicios",
      },
      {
        id: 3,
        href: "/contacto",
        name: "Contacto",
      },
    ],
    privateLinks: [
      {
        id: 3,
        href: "/contacto",
        name: "Contacto",
      },
    ],
    sessionLinks: [
      {
        id: 4,
        href: "/iniciar-sesion",
        name: "Iniciar sesión",
      },
      {
        id: 5,
        href: "/registrarse",
        name: "Registrarse",
      },
    ],
    sessionPrivateLinks: [
      {
        id: 6,
        href: "/configuracion",
        name: "Configuración",
      },
      {
        id: 7,
        href: null,
        name: "Cerrar sesión",
      },
    ],
  },
  footerInfo: {
    logoSrc: "ZULIA",
    directionTitle: "Vísitanos",
    direction: "Maracaibo, Zulia Venezuela",
    phoneNumberTitle: "Llámanos",
    phoneNumber: "+58000000000",
    copyright: "Todos los derechos reservados PromoZulia",
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    headerInfo: (state, action: PayloadAction<HeaderInfo>) => {
      state.headerInfo = action.payload;
    },
    footerInfo: (state, action: PayloadAction<FooterInfo>) => {
      state.footerInfo = action.payload;
    },
  },
});

export default appSlice.reducer;
