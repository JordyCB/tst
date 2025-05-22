// context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface UserContextType {
  name: string | undefined;
  isAdmin: boolean;
  updateUser: () => void;
}

const UserContext = createContext<UserContextType>({
  name: undefined,
  isAdmin: false,
  updateUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  const updateUser = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const data = jwtDecode<any>(token);
      setName(data?.Nombre);
      setIsAdmin(data?.rol_id === 2);
    } else {
      setName(undefined);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <UserContext.Provider value={{ name, isAdmin, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
