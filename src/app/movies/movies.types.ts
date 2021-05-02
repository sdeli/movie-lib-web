export interface MovieGenre {
  id: string;
  name: string;
}

export interface Movie {
  id: number;
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

export interface Game {
  id: string;
  name: string;
  image: string;
  jackpot: number;
  isNew?: boolean;
}
