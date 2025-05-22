import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomCard from "../components/common/CustomCard";
import FooterComponent from "../components/layout/Footer";
import HeaderComponent from "../components/layout/Header";
import "../styles/Home.css";
import { getMovies } from "../services/movieService";
import { dev } from "../config";

interface Movie {
  id: number;
  titulo: string;
  duracion: string;
  clasificacion_nombre: string;
  idioma_nombre: string;
  sinopsis: string;
  imagen?: string;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation(); // detecta cambio de ruta

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      if (response?.data) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error("Error al cargar películas:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [location]);

  return (
    <div className="Home">
      <HeaderComponent />
      <div className="containerHome">
        {movies.map((movie) => (
          <CustomCard
            key={movie.id}
            title={movie.titulo}
            duration={`${movie.duracion} min`}
            classification={movie.clasificacion_nombre}
            language={movie.idioma_nombre}
            rating={4.75}
            synopsis={movie.sinopsis}
            imageSrc={
              movie.imagen
                ? `${dev.BASE_URL}${movie.imagen}` 
                : "src/assets/images/noImageMovie.png"
            }
            isNew={true}
            onEdit={() => console.log("Editar", movie.id)}
            onClick={() => console.log("Ver funciones", movie.id)}
          />
        ))}
      </div>
      <FooterComponent />
    </div>
  );
};

export default Home;
