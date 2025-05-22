import React, { useState } from "react";
import CustomButton from "../../components/common/CustomButton";
import { useNavigate } from "react-router-dom";
import "../../styles/auth/Login.css";
import { loginService } from "../../services/auth/AuthServices";
import FooterComponent from "../../components/layout/Footer";
import LoadingModal from "../../components/modals/LoadingModal";
import { useUser } from "../../context/UserContext";

interface LoginData {
  Correo: string;
  Password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
   const { updateUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setEmail(value);
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(value)) {
      setErrorEmail("Correo electrónico no válido.");
    } else {
      setErrorEmail("");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setPassword(value);
    if (value.length < 6) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres.");
    } else {
      setErrorPassword("");
    }
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = () => {
    let isValid = true;

    if (email === "") {
      setErrorEmail("El campo de correo no debe estar vacío.");
      isValid = false;
    }
    if (password === "") {
      setErrorPassword("La contraseña no puede estar vacía.");
      isValid = false;
    }

    if (isValid) {
      setIsLoading(true);
      const loginData: LoginData = {
        Correo: email,
        Password: password,
      };

      console.log(loginData);

      loginService(loginData)
        .then((response: any) => {
          const token = response.access;

          if (token) {
            localStorage.setItem("access_token", token);
            updateUser();
            navigate("/Home");
          } else {
            console.error("No se recibió token en el login.");
          }
        })
        .catch((error: any) => {
          console.error("Error al iniciar sesion:", error);
          setErrorLogin("Correo o contraseña no válidos");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const registerNavigate = () => {
    navigate("/register");
  };

  const imageEye = showPassword
    ? "src/assets/iconos/Eye-off.png"
    : "src/assets/iconos/Eye-on.png";

  return (
    <div className="Login">
      <div className="ContainerLogin">
        <div className="ContainerImageLogin">
          <img
            src="src/assets/logos/ECINE.png"
            alt="Logo Ecine"
            className="LogoEcineLogin"
          />
          <img
            src="src/assets/images/Palomitas.png"
            alt="Imagen palomitas"
            className="PalomitasLogin"
          />
        </div>
        <div className="FormLogin">
          <div className="TitleTextLogin">
            <span>LOGIN</span>
          </div>
          <div className="FormLoginInputs">
            <div className="Email">
              <span>CORREO ELECTRONICO</span>
              <input
                type="text"
                id="Email"
                name="Email"
                value={email}
                onChange={handleEmail}
              />
              {errorEmail && (
                <div className="ErrorMessageLogin">{errorEmail}</div>
              )}
            </div>

            <div className="Password">
              <span>CONTRASEÑA</span>
              <div className="PasswordInput">
                <input
                  type={showPassword ? "text" : "password"}
                  id="Password"
                  name="Password"
                  value={password}
                  onChange={handlePassword}
                />
                <img
                  onClick={passwordVisibility}
                  src={imageEye}
                  alt="Ojo"
                  className="EyeIcon"
                />
              </div>
              {errorPassword && (
                <div className="ErrorMessageLogin">{errorPassword}</div>
              )}
              {errorLogin && (
                <div className="ErrorMessageLogin">{errorLogin}</div>
              )}
            </div>
          </div>

          <div className="buttonsLogin">
            <CustomButton
              fill="black"
              placeholder="INGRESAR"
              width="470px"
              fontFamily="Source Sans 3, sans-serif"
              fontWeight="500"
              fontSize="24px"
              onClick={loginUser}
            />

            <div className="divider-container">
              <div className="divider"></div>
              <span className="divider-text">¿Aun no tienes una cuenta?</span>
              <div className="divider"></div>
            </div>

            <CustomButton
              fill="white"
              color="black"
              border="2px solid black"
              placeholder="REGISTRARSE"
              padding="10px 20px"
              width="470px"
              fontFamily="Source Sans 3, sans-serif"
              fontWeight="500"
              fontSize="24px"
              onClick={registerNavigate}
            />
          </div>
        </div>
      </div>
      <FooterComponent />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
};

export default Login;
