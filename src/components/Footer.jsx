
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="home-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <img src="/images/logo.png" alt="Remoltec" />
                    <p>Soluciones para el transporte y la carga.</p>
                </div>

                <div className="footer-column">
                    <h4>Navegación</h4>
                    <Link to="/">Inicio</Link>
                    <Link to="/#categorias">Categorías</Link>
                    <Link to="/#productos">Productos</Link>
                </div>

                <div className="footer-column">
                    <h4>Información</h4>
                    <Link to="/#nosotros">Nosotros</Link>
                    <Link to="/#contacto">Contacto</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <span>
                    © {new Date().getFullYear()} Remoltec.
                    Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
}

export default Footer;
