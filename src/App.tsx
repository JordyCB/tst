import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserContext";

import loadingGif from "./assets/images/loading.gif";
import UsePanel from "./pages/UserPanel";

const preloadGif = new Image();
preloadGif.src = loadingGif;

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Panel" element={<UsePanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
