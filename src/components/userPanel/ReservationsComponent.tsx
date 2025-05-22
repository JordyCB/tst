import "../../styles/userPanel/ReservationsComponent.css";
import ReservationCard from "../common/ReservationCard";

const ReservationsComponent = () => {
  return (
    <div className="reservation">
      <div className="titleReservation">
        <span>Mis reservaciones</span>
      </div>

      <div className="reservationCardsContainer">
        <ReservationCard
          pelicula="Lorem, ipsum dolor."
          folio="37GHV763"
          fecha="20/05/25"
          hora="16:00 PM"
          sucursal="Lorem, ipsum."
          sala="5"
          asientos="F1, F2"
          onCancel={() => console.log("Cancelar reserva")}
        />

        <ReservationCard
          pelicula="Lorem, ipsum dolor."
          folio="37GHV763"
          fecha="20/05/25"
          hora="16:00 PM"
          sucursal="Lorem, ipsum."
          sala="5"
          asientos="F1, F2"
          onCancel={() => console.log("Cancelar reserva")}
        />

        <ReservationCard
          pelicula="Lorem, ipsum dolor."
          folio="37GHV763"
          fecha="20/05/25"
          hora="16:00 PM"
          sucursal="Lorem, ipsum."
          sala="5"
          asientos="F1, F2"
          onCancel={() => console.log("Cancelar reserva")}
        />
      </div>
    </div>
  );
};

export default ReservationsComponent;
