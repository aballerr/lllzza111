export interface Media {
  type: string;
  url: string;
  urls: string | null;
}

export interface Collection {
  contractAddress: string;
  name: string;
}

export interface Token {
  id: string;
  media: Media;
  collection: Collection;
}
