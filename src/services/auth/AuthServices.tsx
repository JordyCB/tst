import { dev } from "../../config";

interface RegisterData {
  Nombre: string;
  Apellido_Mat: string;
  Apellido_Pat: string;
  Correo: string;
  Password: string;
}

interface LoginData {
  Correo: string;
  Password: string;
}

const registerService = (registerData: RegisterData) => {
  return fetch(`${dev.BASE_URL}/api/users/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error al registrar usuario:", error);
    });
};

const loginService = (loginData: LoginData) => {
  return fetch(`${dev.BASE_URL}/api/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.detail || `Error ${response.status}: ${response.statusText}`
          );
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    });
};

export { registerService, loginService };
