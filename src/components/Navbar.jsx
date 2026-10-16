
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <header className="home-header productos-header">
            <div className="home-header-container">
                <Link to="/" className="home-logo">
                    <img src="/images/logo.png" alt="Remoltec" />
                </Link>

                <nav className="home-nav">
                    <Link to="/">Inicio</Link>
                    <Link to="/#categorias">Categorías</Link>
                    <Link to="/#productos">Productos</Link>
                    <Link to="/#nosotros">Nosotros</Link>
                    <Link to="/#contacto">Contacto</Link>
                </nav>

                <Link to="/#contacto" className="home-header-button">
                    Cotizar
                </Link>
            </div>
        </header>
    );
}

export default Navbar;
