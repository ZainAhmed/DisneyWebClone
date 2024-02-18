import { Movie, TvShow } from "@/Types/ComponentTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTvShow(movie: Movie | TvShow): movie is TvShow {
  return (movie as TvShow).name !== undefined;
}
export function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}
