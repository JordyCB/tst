import CustomButton from "./CustomButton";
import "../../styles/common/ReservationCard.css";
import { useState } from "react";
import CancelReservation from "../modals/cancelReservation";

interface ReservationCardProps {
  pelicula: string;
  folio: string;
  fecha: string;
  hora: string;
  sucursal: string;
  sala: string;
  asientos: string;
  onCancel: () => void; 
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  pelicula,
  folio,
  fecha,
  hora,
  sucursal,
  sala,
  asientos,
  onCancel,
}) => {
  const [showModal, setShowModal] = useState(false);

  const truncateByCharacters = (text: string): string => {
    if (text.length <= 15) return text;
    return text.slice(0, 15).trim() + "...";
  };

  return (
    <div className="cardReservations">
      <div className="movieFolioContainer">
        <div>
          <span>Pelicula: {truncateByCharacters(pelicula)}</span>
        </div>
        <div>
          <span>Folio: {folio}</span>
        </div>
      </div>

      <div className="dateMovieContainer">
        <div>
          <span>Fecha: {fecha}</span>
        </div>
        <div>
          <span>Hora: {hora}</span>
        </div>
      </div>

      <div className="placeMovieContainer">
        <div>
          <span>Sucursal: {sucursal}</span>
        </div>
        <div>
          <span>Sala: {sala}</span>
        </div>
      </div>

      <div className="seatsMovieContainer">
        <div>
          <span>Asientos: {asientos}</span>
        </div>
      </div>

      <div className="buttonCardReservationsContainer">
        <CustomButton
          fill="#de3838"
          color="white"
          placeholder="Cancelar reserva"
          width="auto"
          border="none"
          borderRadius="0px"
          padding="7px 30px"
          fontFamily="Source Sans 3, sans-serif"
          fontWeight="700"
          fontSize="12px"
          boxShadow={true}
          onClick={() => setShowModal(true)} 
        />
      </div>

      <CancelReservation
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onCancel(); 
        }}
      />
    </div>
  );
};

export default ReservationCard;
