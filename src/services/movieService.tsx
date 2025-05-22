// src/services/movieService.ts
import { dev } from "../config.tsx";

interface MovieData {
  titulo: string;
  sinopsis: string;
  año: string;
  idioma: number;
  duracion: string;
  clasificacion: number;
  imagen?: string; 
}

const API_URL = `${dev.BASE_URL}/api/movies`;

export const createMovie = (movieData: MovieData) => {
  return fetch(`${API_URL}/peliculas/crear/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movieData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.detail || `Error ${response.status}: ${response.statusText}`
          );
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al crear la película:", error.message);
      throw error;
    });
};

export const getMovies = () => {
  return fetch(`${API_URL}/peliculas/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al obtener las películas:", error);
    });
};
