interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface Large {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

interface Formats {
  large: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

interface Attributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImageType {
  data: {
    id: number;
    attributes: Attributes;
  } | null;
}
