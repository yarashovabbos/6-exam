import { Nav } from "react-bootstrap";
import logo from "../assets/images/logo.svg";
import settings from "../assets/images/settings.svg";
import korzina from "../assets/images/korzina.svg";

const Sidebar = () => {
  return (
    <Nav
      variant="blue"
      className="col-md-12 d-none d-md-block sidebar sidebar-all"
    >
      <div className="sidebar-sticky">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="logo-bottom">
          <div className="settings">
            <img src={settings} alt="" />
          </div>
          <div className="korzina">
            <img src={korzina} alt="" />
          </div>  
        </div>
      </div>
    </Nav>
  );
};

export default Sidebar;
