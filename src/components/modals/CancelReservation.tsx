import React, { useState } from "react";
import "../../styles/modals/CancelReservation.css";
import CustomButton from "../common/CustomButton";
import checkImage from "../../assets/images/check.png";
import { useNavigate } from "react-router-dom";

interface CancelReservationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelReservation: React.FC<CancelReservationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleConfirm = () => {
    setConfirmed(true); 
  };

  const handleGoHome = () => {
    onClose(); 
    navigate("/Home");
  };

  return (
    <div className="cancelReservationModal">
      <div >
        {!confirmed ? (
          <div className="cancelReservationContent">
            <div className="titleCancelReservation">
              <span>¿Estás seguro que deseas cancelar tu reserva?</span>
            </div>
            <div className="buttonsCancelReservations">
              <CustomButton
                fill="#3dde37"
                color="white"
                placeholder="Cancelar"
                width="200px"
                border="none"
                borderRadius="0px"
                padding="7px 30px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="700"
                fontSize="12px"
                boxShadow={true}
                onClick={onClose}
              />
              <CustomButton
                fill="#de3838"
                color="white"
                placeholder="Cancelar reserva"
                width="200px"
                border="none"
                borderRadius="0px"
                padding="7px 30px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="700"
                fontSize="12px"
                boxShadow={true}
                onClick={handleConfirm}
              />
            </div>
          </div>
        ) : (
          <div className="confirmCancelReservation">
            <div className="titleCancelReservation">
              <span>Se canceló la reservación</span>
            </div>
            <div className="checkIconContainer">
              <img src={checkImage} alt="Confirmación" />
            </div>
            <div className="buttonsCancelReservations">
              <CustomButton
                fill="#ccabff"
                color="white"
                placeholder="Volver al inicio"
                width="250px"
                border="none"
                borderRadius="0px"
                padding="10px 20px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="700"
                fontSize="14px"
                boxShadow={true}
                onClick={handleGoHome}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelReservation;
