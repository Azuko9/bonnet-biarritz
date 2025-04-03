import react from "react";

const Header: React.FC = () => {
  return (
    <header className="flex">
      <div className="flex-1">
        <h1>Mon Site</h1>
      </div>
      <nav className="flex-1">
        <ul className="flex space-x-4">
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/about">À propos</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
