import { useNavigate } from "react-router-dom";
import CustomButton from "../common/CustomButton";
import { useEffect, useState } from "react";
import "../../styles/layout/Header.css";
import LoadingModal from "../modals/LoadingModal";
import { useUser } from "../../context/UserContext";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const { name, isAdmin } = useUser(); 
  const [showMenu, setShowMenu] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const loginNavigate = () => {
    navigate("/login");
  };

  const RegisterNavigate = () => {
    navigate("/Register");
  };

  const HomeNavigate = () => {
    navigate("/Home");
  };

  const UsePanelNavigate = () => {
    navigate("/Panel");
    window.location.hash = "#profile";
  };

  const ReservationsNavigate = () => {
    navigate("/Panel");
    window.location.hash = "#reservations";
  };

  const logOut = () => {
    setIsLoading(true);
    localStorage.clear();
    navigate("/Home");
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <div className="Header">
      <div className="ContainerHeader">
        <div className="ContainerImageHeader">
          <img
            onClick={HomeNavigate}
            className="HeaderImage"
            src="src/assets/logos/ECINE.png"
            alt="logo negro.png"
          />
        </div>

        {name !== undefined &&
          (isAdmin ? (
            <div className="buttonUserHeader">
              <CustomButton
                fill="#ccabff"
                placeholder="Gestión de películas"
                width="auto"
                color="white"
                border="2px solid #ccabff"
                padding="10px 80px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="700"
                fontSize="18px"
                boxShadow={true}
                onClick={loginNavigate}
              />
            </div>
          ) : (
            <div className="buttonUserHeader">
              <CustomButton
                fill="#ccabff"
                placeholder="Mis reservaciones"
                width="auto"
                color="white"
                border="2px solid #ccabff"
                padding="10px 80px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="700"
                fontSize="18px"
                boxShadow={true}
                onClick={ReservationsNavigate}
              />
            </div>
          ))}

        {name !== undefined ? (
          <div
            className="userContainerHeader"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            <div>
              <button className="userContainer">
                <div className="userNameContainer">
                  <span className="welcomeText">Bienvenido</span>
                  <span className="nameText">{name}</span>
                </div>
                <div className="imageUserContainer">
                  <img src="src/assets/images/user.png" alt="usuario" />
                </div>
              </button>
              {showMenu && (
                <div className="optionsUserContainer">
                  <div className="triangleImage">
                    <img src="src/assets/images/Triangulo.png" alt="" />
                  </div>
                  <div className="optionsContainer">
                    <div className="profileUserContainer">
                      <button onClick={UsePanelNavigate}>
                        <img src="src/assets/iconos/User.png" alt="" />
                        <span>Mis datos</span>
                      </button>
                    </div>
                    <div className="exitContainer">
                      <button onClick={logOut}>
                        <img src="src/assets/iconos/Exit.png" alt="" />
                        <span>Cerrar sesión</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="ContainerButtons">
            <CustomButton
              fill="#ccabff"
              placeholder="Registrarme "
              width="190px"
              color="white"
              border="none"
              padding="10px 20px"
              fontFamily="Source Sans 3, sans-serif"
              fontWeight="700"
              fontSize="18px"
              onClick={RegisterNavigate}
            />
            <CustomButton
              fill="white"
              placeholder="Iniciar Sesión "
              width="190px"
              color="#ccabff"
              border="none"
              padding="10px 20px"
              fontFamily="Source Sans 3, sans-serif"
              fontWeight="700"
              fontSize="18px"
              onClick={loginNavigate}
            />
          </div>
        )}
      </div>
      <LoadingModal isVisible={isLoading} />
    </div>
  );
};

export default HeaderComponent;
