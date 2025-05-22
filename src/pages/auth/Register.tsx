import React, { useState } from "react";
import "../../styles/auth/Register.css";
import CustomButton from "../../components/common/CustomButton";
import { registerService } from "../../services/auth/AuthServices";
import { useNavigate } from "react-router-dom";
import FooterComponent from "../../components/layout/Footer";
import LoadingModal from "../../components/modals/LoadingModal";
import { useUser } from "../../context/UserContext";

interface RegisterData {
  Nombre: string;
  Apellido_Mat: string;
  Apellido_Pat: string;
  Correo: string;
  Password: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [lastNameFirst, setLastNameFirst] = useState("");
  const [lastNameSecond, setLastNameSecond] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorLastNameFirst, setErrorLastNameFirst] = useState("");
  const [errorLastNameSecond, setErrorLastNameSecond] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const { updateUser } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const regex = /^[A-Za-z\s]*$/;

  const handleLastNameFirst = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setLastNameFirst(value);
      setErrorLastNameFirst("");
    } else {
      setErrorLastNameFirst("Solo se permiten letras y espacios.");
    }
  };

  const handleLastNameSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setLastNameSecond(value);
      setErrorLastNameSecond("");
    } else {
      setErrorLastNameSecond("Solo se permiten letras y espacios.");
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setName(value);
      setErrorName("");
    } else {
      setErrorName("Solo se permiten letras y espacios.");
    }
  };

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

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    setConfirmPassword(value);
    if (value !== password) {
      setErrorConfirmPassword("Las contraseñas no coinciden.");
    } else {
      setErrorConfirmPassword("");
    }
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const imageEye = showPassword
    ? "src/assets/iconos/Eye-off.png"
    : "src/assets/iconos/Eye-on.png";

  const registerUser = () => {
    let isValid = true;
    if (lastNameFirst === "") {
      setErrorLastNameFirst("El campo no debe estar vacío");
      isValid = false;
    }
    if (lastNameSecond === "") {
      setErrorLastNameSecond("El campo no debe estar vacío");
      isValid = false;
    }
    if (name === "") {
      setErrorName("El campo no debe estar vacío");
      isValid = false;
    }
    if (email === "") {
      setErrorEmail("El campo no debe estar vacío");
      isValid = false;
    }
    if (password === "") {
      setErrorPassword("La contraseña no puede estar vacía");
      isValid = false;
    }
    if (confirmPassword === "") {
      setErrorConfirmPassword(
        "La confirmación de la contraseña no puede estar vacía"
      );
      isValid = false;
    }

    if (isValid) {
      setIsLoading(true);
      const registerData: RegisterData = {
        Nombre: name,
        Apellido_Mat: lastNameFirst,
        Apellido_Pat: lastNameSecond,
        Correo: email,
        Password: password,
      };

      registerService(registerData)
        .then((response: any) => {
          console.log("Registro exitoso:", response.data);
          const token = response.access;

          if (token) {
            localStorage.setItem("access_token", token);
            updateUser();
            navigate("/Home");
          } else {
            console.error("No se recibió token en el registro.");
          }
        })
        .catch((error: any) => {
          console.error("Error al registrar usuario:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const loginNavigate = () => {
    navigate("/login");
  };

  return (
    <div className="Register">
      <div className="ContainerRegister">
        <div className="ContainerImageRegister">
          <img
            src="src/assets/logos/ECINE.png"
            alt="Logo Ecine"
            className="LogoEcineRegister"
          />
          <img
            src="src/assets/images/Palomitas.png"
            alt="Imagen palomitas"
            className="PalomitasRegister"
          />
        </div>
        <div className="FormRegister">
          <div>
            <div className="TitleTextRegister">
              <span>REGISTRO</span>
            </div>
            <div className="FormRegisterInputs">
              <div className="LastNameForm">
                <div className="LastNameFirst">
                  <span>APELLIDO PATERNO</span>
                  <input
                    type="text"
                    id="LastNameFirst"
                    name="LastNameFirst"
                    maxLength={15}
                    value={lastNameFirst}
                    onChange={handleLastNameFirst}
                  />
                  {errorLastNameFirst && (
                    <div className="ErrorMessageRegister">
                      {errorLastNameFirst}
                    </div>
                  )}
                </div>

                <div className="LastNameSecond">
                  <span>APELLIDO MATERNO</span>
                  <input
                    type="text"
                    id="LastNameSecond"
                    name="LastNameSecond"
                    value={lastNameSecond}
                    onChange={handleLastNameSecond}
                  />
                  {errorLastNameSecond && (
                    <div className="ErrorMessageRegister">
                      {errorLastNameSecond}
                    </div>
                  )}
                </div>
              </div>

              <div className="Name">
                <span>NOMBRE(S)</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleName}
                />
                {errorName && (
                  <div className="ErrorMessageRegister">{errorName}</div>
                )}
              </div>

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
                  <div className="ErrorMessageRegister">{errorEmail}</div>
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
                  <div className="ErrorMessageRegister">{errorPassword}</div>
                )}
              </div>

              <div className="ConfirmPassword">
                <span>CONFIRMAR CONTRASEÑA</span>
                <div className="PasswordInput">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="ConfirmPassword"
                    name="ConfirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                  />
                  <img
                    onClick={passwordVisibility}
                    src={imageEye}
                    alt="Ojo"
                    className="EyeIcon"
                  />
                </div>
                {errorConfirmPassword && (
                  <div className="ErrorMessageRegister">
                    {errorConfirmPassword}
                  </div>
                )}
              </div>
            </div>

            <div className="buttonsRegisterLogin">
              <CustomButton
                fill="black"
                placeholder="REGISTRARSE"
                width="470px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="500"
                fontSize="24px"
                onClick={registerUser}
              />

              <div className="divider-container">
                <div className="divider"></div>
                <span className="divider-text">¿Ya tienes una cuenta?</span>
                <div className="divider"></div>
              </div>

              <CustomButton
                fill="white"
                placeholder="INGRESAR"
                width="470px"
                color="black"
                border="2px solid black"
                padding="10px 20px"
                fontFamily="Source Sans 3, sans-serif"
                fontWeight="500"
                fontSize="24px"
                onClick={loginNavigate}
              />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
      <LoadingModal isVisible={isLoading} />
    </div>
  );
};

export default Register;
