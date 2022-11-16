import { ImageType } from "./ImageType";

export interface CardType {
  id: number;
  titulo?: string;
  contenido?: string;
  fecha?: string;
  imagen?: ImageType;
}
