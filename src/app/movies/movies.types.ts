export interface Movie {
  id: number;
  name: string;
  description: string;
  rating: number;
  director?: Director;
  actors: Actor[];
  genres: Genre[];
  img: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Director {
  id: number;
  name: string;
}

export class Actor {
  id: number;
  name: string;
}
