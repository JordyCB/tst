import "../../styles/layout/Footer.css";

const FooterComponent = () => {
  return (
    <div className="Footer">
      <div className="ContainerFooter">
        <div className="ContainerImageFooter">
          <img
            className="FooterImage"
            src="src/assets/logos/ECINE_white.png"
            alt="logonegro.png"
          />
        </div>
        <div className="ContainerTextFooter">
          <span className="FooterText">
            © 2025 ECINE México. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
