import { ReactNode } from "react";
import { MediaType } from "./types";

export interface CustomComponentProps {
  children?: ReactNode;
  className?: string;
}

export interface Episode {
  id: number;
  title: string;
  overview: string;
  airDate: string;
  stillPath: string;
  episodeNumber: number;
}

export interface Season {
  id: number;
  name: string;
  title: string;
  seasonNumber: number;
  posterPath: string;
  episodes: Episode[];
}

export interface Film {
  id: number;
  mediaType: MediaType;
  title: string;
  description: string;
  posterPath: string;
  coverPath: string;
  genreIds: number[];
  season: Season[];
}

export interface Cast {
  id: number;
  name: string;
  characterName: string;
  profilePath: string;
}

export interface Trailer {
  id: number;
  key: string;
}

export interface Genre {
  id: number;
  name: string;
}
