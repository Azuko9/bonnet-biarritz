import react from "react";

const Header: React.FC = () => {
  return (
    <header className="abso">
      <img className="abso logo" src="/img/LOGO_COLOR.png" alt="" />
      <div className="abso ongletA backImg"></div>
      <div>
        <div className="abso ongletB backImg">
          <a href="">hello</a>
        </div>
        <div className="abso ongletC backImg">
          <a href="">hello</a>
        </div>
        <div className="abso ongletD backImg">
          <a href="">hello</a>
        </div>
        <div className="abso ongletE backImg">
          <a href="">CINEMA</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
