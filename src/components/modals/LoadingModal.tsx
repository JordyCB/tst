import React from "react";
import "../../styles/modals/LoadingModal.css";
import loadingGif from "../../assets/images/loading.gif";

interface LoadingModalProps {
  isVisible: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="loadingModal">
      <div className="loadingModalContent">
        <img src={loadingGif} alt="Cargando..." />
      </div>
    </div>
  );
};

export default LoadingModal;
