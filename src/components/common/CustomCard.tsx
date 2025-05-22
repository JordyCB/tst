import StarRating from "./StarRating";
import CustomButton from "./CustomButton";
import { jwtDecode } from "jwt-decode";
import "../../styles/common/CustomCard.css";
import { useEffect, useState } from "react";

interface CustomCardProps {
  title: string;
  duration: string;
  classification: string;
  rating: number;
  language: string;
  synopsis: string;
  isNew?: boolean;
  onEdit?: () => void;
  onClick?: () => void;
  imageSrc?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  duration,
  classification,
  rating,
  language,
  synopsis,
  isNew = false,
  onEdit,
  onClick,
  imageSrc = "src/assets/images/noImageMovie.png",
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const data = jwtDecode<any>(token);
      const rolId = data?.rol_id;
      if (rolId === 2) {
        setIsAdmin(true);
      }
    }
  }, []);

  const truncateByCharacters = (text: string, maxChars: number): string => {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trim() + "...";
  };
  return (
    <div className="cardContainer">
      <div className="imageCardContainer">
        <img src={imageSrc} alt="imagen no cargada"  className="imageCard"/>
      </div>

      {isNew && (
        <div className="newMovie">
          <span>Novedad</span>
        </div>
      )}

      {isAdmin && (
        <div className="editMovie">
          <button onClick={onEdit}>
            <img src="src/assets/iconos/pin.png" alt="Editar" />
          </button>
        </div>
      )}

      <div className="textCardContainer">
        <div className="titleCard">
          <span>{title}</span>
        </div>

        <div className="movieMetaCard">
          <div className="lenghtMovie">
            <span>Duración: {duration}</span>
          </div>
          <div className="clasificationMovie">
            <span>Clasificación: {classification}</span>
          </div>
        </div>

        <div className="ratingLanguageCard">
          <div className="clasificationCard">
            <span>Calificación:</span>
            <div className="starts">
              <StarRating rating={rating} />
            </div>
            <div className="clasification">
              <span>{rating}/5</span>
            </div>
          </div>
          <div>
            <span>Idioma: {language}</span>
          </div>
        </div>

        <div className="synopsisCard">
          <span>Sinopsis</span>
          <span className="textSynopsis">
            {truncateByCharacters(synopsis, 300)}
          </span>
        </div>

        <div className="buttonWatchMovie">
          {!isAdmin && (
            <CustomButton
              fill="white"
              placeholder="Ver funciones"
              width="150px"
              color="black"
              border="2px solid black"
              padding="10px 20px"
              fontFamily="Source Sans 3, sans-serif"
              fontWeight="700"
              fontSize="15px"
              onClick={onClick || (() => {})}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
