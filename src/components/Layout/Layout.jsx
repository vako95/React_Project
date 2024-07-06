import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Fragment, useCallback, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import InfoApp from "../content/InfoApp/InfoApp";
import './Layout.css';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import img1 from '../../assets/img/hong-kong-cityscape1.jpg';
import img2 from '../../assets/img/pexels-photo-830891.jpeg';

const myStyle = ({ isActive }) => (isActive ? 'myStyle nav' : 'nav');

const Layout = () => {
  const [bgImage, setBgImage] = useState(img1);

  useEffect(() => {
    const savedImage = localStorage.getItem('bgImage');
    if (savedImage) {
      setBgImage(savedImage);
    }
  }, []);

  const chColor = useCallback(() => {
    setBgImage((prevImage) => {
      const newImage = prevImage === img1 ? img2 : img1;
      localStorage.setItem('bgImage', newImage);
      return newImage;
    });
  }, []);

  const location = useLocation();

  return (
    <Fragment>
      <header>
        <NavLink className={myStyle} to="/">Home</NavLink>
        <NavLink className={myStyle} to="/about">About</NavLink>
        <NavLink className={myStyle} to="/contact">Contact</NavLink>
        <span className="material-icons-outlined">
          <div style={{ color: 'dark' }} onClick={chColor}>
            <DarkModeIcon />
          </div>
        </span>
      </header>
      <div className="lay" style={{ backgroundImage: `url(${bgImage})` }}>
        <Outlet />
        {location.pathname === '/' && <InfoApp />}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;