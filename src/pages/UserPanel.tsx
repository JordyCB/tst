import { useEffect, useState } from "react";
import CustomButton from "../components/common/CustomButton";
import FooterComponent from "../components/layout/Footer";
import HeaderComponent from "../components/layout/Header";
import "../styles/UserPanel.css";
import { useNavigate } from "react-router-dom";
import ReservationsComponent from "../components/userPanel/ReservationsComponent";
import { useUser } from "../context/UserContext";
import LoadingModal from "../components/modals/LoadingModal";

const UsePanel = () => {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const { name } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const navigateToSection = (hash: string) => {
    window.location.hash = hash;
    setActiveSection(hash);
  };

  useEffect(() => {
    const updateHash = () => {
      setActiveSection(window.location.hash);
    };

    if (!window.location.hash) {
      window.location.hash = "#reservations";
    }

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (name === undefined) { 
      navigate("/Home");
    }
  }, [name, navigate]);

  const HomeNavigate = () => {
    navigate("/Home");
  };

  return (
    <div className="UsePanel">
      <HeaderComponent />
      <div className="UsePanelContainer">
        <div className="menuContainer">
          <div className="optionsPanelContainer">
            <div className="userImagePanelContainer">
              <img src="src/assets/images/user.png" alt="user" />
            </div>
            <div className="optionsButtonContainer">
              <div>
                <CustomButton
                  fill={activeSection === "#reservations" ? "black" : "#f2f2f2"}
                  color={activeSection === "#reservations" ? "white" : "black"}
                  placeholder="Mis Reservaciones"
                  width="300px"
                  border="none"
                  borderRadius="0px"
                  padding="20px 0px"
                  fontFamily="Source Sans 3, sans-serif"
                  fontWeight="700"
                  fontSize="24px"
                  onClick={() => navigateToSection("#reservations")}
                />
              </div>
              <div>
                <CustomButton
                  fill={activeSection === "#profile" ? "black" : "#f2f2f2"}
                  color={activeSection === "#profile" ? "white" : "black"}
                  placeholder="Mis Datos"
                  width="300px"
                  border="none"
                  borderRadius="0px"
                  padding="20px 0px"
                  fontFamily="Source Sans 3, sans-serif"
                  fontWeight="700"
                  fontSize="24px"
                  onClick={() => navigateToSection("#profile")}
                />
              </div>
              <div>
                <CustomButton
                  fill={activeSection === "#support" ? "black" : "#f2f2f2"}
                  color={activeSection === "#support" ? "white" : "black"}
                  placeholder="Soporte"
                  width="300px"
                  border="none"
                  borderRadius="0px"
                  padding="20px 0px"
                  fontFamily="Source Sans 3, sans-serif"
                  fontWeight="700"
                  fontSize="24px"
                  onClick={() => navigateToSection("#support")}
                />
              </div>
            </div>
            <div className="goHomeButtonContainer">
              <CustomButton
                fill="#ccabff"
                placeholder="Ir al Inicio"
                width="auto"
                color="white"
                border="none"
                borderRadius="0px"
                padding="10px 30px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="700"
                fontSize="24px"
                onClick={HomeNavigate}
              />
            </div>
          </div>

          <div className="infoPanelContainer">
            {activeSection === "#reservations" && <ReservationsComponent />}

            {/* Aquí puedes mostrar el contenido según el hash */}
            {/* Ejemplo:
                {activeSection === "#reservations" && <ReservationsComponent />}
                {activeSection === "#profile" && <ProfileComponent />}
                {activeSection === "#support" && <SupportComponent />}
            */}
          </div>
        </div>
      </div>
      <FooterComponent />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
};

export default UsePanel;
