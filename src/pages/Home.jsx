import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {

    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
    try {
        setLoading(true);

        // Cargar categorías
        const categoriasResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/categorias`
        );

        if (!categoriasResponse.ok) {
            throw new Error(
                `Error categorías: ${categoriasResponse.status}`
            );
        }

        const categoriasData = await categoriasResponse.json();

        setCategorias(categoriasData);

       // Cargar productos
        const productosResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/productos`
        );

        if (!productosResponse.ok) {
            throw new Error(
                `Error productos: ${productosResponse.status}`
            );
        }

        const productosData = await productosResponse.json();

        setProductos(productosData);

        console.log('Categorías:', categoriasData);
        console.log('Productos:', productosData);

    } catch (error) {

        console.error(
            'Error cargando información:',
            error
        );

    } finally {

        setLoading(false);


        
        }
    };

    return (

        <div className="home">

            {/* =========================
                HEADER
            ========================= */}

            <header className="home-header">

                <div className="home-header-container">

                    <a
                        href="/"
                        className="home-logo"
                    >
                        <img
                            src="/images/logo.png"
                            alt="Remoltec"
                        />
                    </a>

                    <nav className="home-nav">

                        <a href="#inicio">
                            Inicio
                        </a>

                        <a href="#categorias">
                            Categorías
                        </a>

                        <a href="#productos">
                            Productos
                        </a>

                        <a href="#nosotros">
                            Nosotros
                        </a>

                        <a href="#contacto">
                            Contacto
                        </a>

                    </nav>

                    <a
                        href="#contacto"
                        className="home-header-button"
                    >
                        Cotizar
                    </a>

                </div>

            </header>


      
                        
            {/* =========================
                HERO
            ========================= */}

            <section
                id="inicio"
                className="hero"
            >
                {/* Imagen de fondo */}
                <div className="hero-background"></div>

                {/* Capa oscura sobre la imagen */}
                <div className="hero-overlay"></div>

                <div className="hero-container">

                    <motion.div
                        className="hero-content"
                        initial={{
                            opacity: 0,
                            y: 40
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.8
                        }}
                    >

                        <span className="hero-tag">
                            REMOLTEC
                        </span>

                        <h1>
                            Soluciones para
                            <span>
                                el transporte
                            </span>
                        </h1>

                        <p>
                            Remolques, partes y soluciones
                            diseñadas para el trabajo que
                            realmente importa.
                        </p>

                        <div className="hero-buttons">

                            <a
                                href="#productos"
                                className="btn-primary"
                            >
                                Ver productos
                            </a>

                         

                        </div>

                    </motion.div>

                </div>

                <div className="hero-bottom-line"></div>

            </section>



            {/* =========================
                CATEGORÍAS
            ========================= */}

            <section
                id="categorias"
                className="categories-section"
            >

                <div className="section-container">

                    <motion.div
                        className="section-heading"
                        initial={{
                            opacity: 0,
                            y: 30
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                    >

                        <span>
                            CATÁLOGO
                        </span>

                        <h2>
                            Explora nuestras categorías
                        </h2>

                        <p>
                            Encuentra las partes y soluciones
                            que necesitas para tu remolque.
                        </p>

                    </motion.div>


                    <div className="categories-grid">

                        {loading ? (

                            <p className="loading-text">
                                Cargando categorías...
                            </p>

                        ) : categorias.length === 0 ? (

                            <p className="empty-text">
                                No hay categorías disponibles.
                            </p>

                        ) : (

                            categorias
                                .slice(0, 6)
                                .map((categoria, index) => (

                                    <motion.div
                                        className="category-card"
                                        key={categoria.id}
                                        initial={{
                                            opacity: 0,
                                            y: 40
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        viewport={{
                                            once: true
                                        }}
                                        transition={{
                                            delay: index * 0.08
                                        }}
                                    >
                                        <Link
                                            to={`/categoria/${categoria.id}`}
                                            className="category-link"
                                        >
                                            <div className="category-image">
                                                {categoria.imagen ? (
                                                    <img
                                                        src={`${import.meta.env.VITE_API_URL}/storage/${categoria.imagen}`}
                                                        alt={categoria.nombre}
                                                    />
                                                ) : (
                                                    <div className="category-placeholder">
                                                        RT
                                                    </div>
                                                )}
                                            </div>

                                            <div className="category-info">
                                                <h3>
                                                    {categoria.nombre}
                                                </h3>

                                                <span>
                                                    Ver productos →
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>

                                ))

                        )}

                    </div>

                </div>

            </section>


            {/* =========================
                PRODUCTOS
            ========================= */}

            <section
                id="productos"
                className="products-section"
            >

                <div className="section-container">

                    <div className="section-heading products-heading">

                        <div>

                            <span>
                                PRODUCTOS
                            </span>

                            <h2>
                                Productos destacados
                            </h2>

                        </div>

                        <a
                            href="/productos"
                            className="view-all"
                        >
                            Ver catálogo completo →
                        </a>

                    </div>


                    <div className="products-grid">

                        {loading ? (

                            <p className="loading-text">
                                Cargando productos...
                            </p>

                        ) : (

                            productos
                                .slice(0, 8)
                                .map((producto, index) => (

                                    <motion.a
                                        href={`/producto/${producto.id}`}
                                        className="product-card"
                                        key={producto.id}
                                        initial={{
                                            opacity: 0,
                                            y: 30
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0
                                        }}
                                        viewport={{
                                            once: true
                                        }}
                                        transition={{
                                            delay: index * 0.05
                                        }}
                                    >

                                        <div className="product-image">

                                            {producto.imagenes &&
                                            producto.imagenes.length > 0 ? (

                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/storage/${producto.imagenes[0].ruta}`}
                                                    alt={producto.nombre}
                                                />

                                            ) : (

                                                <div className="product-placeholder">
                                                    REMOLTEC
                                                </div>

                                            )}

                                            {producto.etiqueta && (

                                                <span className="product-tag">
                                                    {producto.etiqueta}
                                                </span>

                                            )}

                                        </div>

                                        <div className="product-info">

                                            <span className="product-category">
                                                {producto.categoria?.nombre}
                                            </span>

                                            <h3>
                                                {producto.nombre}
                                            </h3>

                                            <div className="product-bottom">

                                                <strong>
                                                    ${Number(
                                                        producto.precio
                                                    ).toLocaleString(
                                                        'es-MX',
                                                        {
                                                            minimumFractionDigits: 2
                                                        }
                                                    )}
                                                </strong>

                                                <span className="product-arrow">
                                                    →
                                                </span>

                                            </div>

                                        </div>

                                    </motion.a>

                                ))

                        )}

                    </div>

                </div>

            </section>


            {/* =========================
                NOSOTROS
            ========================= */}

            <section
                id="nosotros"
                className="about-section"
            >

                <div className="section-container">

                    <div className="about-grid">

                        <motion.div
                            className="about-content"
                            initial={{
                                opacity: 0,
                                x: -40
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{
                                once: true
                            }}
                        >

                            <span>
                                REMOLTEC
                            </span>

                            <h2>
                                Diseñados para
                                <strong>
                                    trabajar contigo
                                </strong>
                            </h2>

                            <p>
                                En Remoltec encontrarás soluciones,
                                partes y accesorios para mantener
                                tus remolques listos para el trabajo.
                            </p>

                            <p>
                                Nuestro catálogo está pensado para
                                ofrecer productos confiables y
                                soluciones prácticas.
                            </p>

                            <a
                                href="#contacto"
                                className="btn-primary"
                            >
                                Conoce más
                            </a>

                        </motion.div>


                        <motion.div
                            className="about-visual"
                            initial={{
                                opacity: 0,
                                x: 40
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0
                            }}
                            viewport={{
                                once: true
                            }}
                        >

                            <div className="about-logo-box">

                                <img
                                    src="/images/logo.png"
                                    alt="Remoltec"
                                />

                            </div>

                        </motion.div>

                    </div>

                </div>

            </section>


            {/* =========================
                CONTACTO
            ========================= */}

            <section
                id="contacto"
                className="contact-section"
            >

                <div className="contact-container">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                    >

                        <span>
                            ¿NECESITAS AYUDA?
                        </span>

                        <h2>
                            Encuentra la pieza
                            que necesitas.
                        </h2>

                        <p>
                            Contáctanos y te ayudaremos a
                            encontrar la solución adecuada
                            para tu remolque.
                        </p>

                        <a
                            href="#"
                            className="contact-button"
                        >
                            Solicitar información
                        </a>

                    </motion.div>

                </div>

            </section>


            {/* =========================
                FOOTER
            ========================= */}

            <footer className="home-footer">

                <div className="footer-container">

                    <div className="footer-brand">

                        <img
                            src="/images/logo.png"
                            alt="Remoltec"
                        />

                        <p>
                            Soluciones para el transporte
                            y la carga.
                        </p>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Navegación
                        </h4>

                        <a href="#inicio">
                            Inicio
                        </a>

                        <a href="#categorias">
                            Categorías
                        </a>

                        <a href="#productos">
                            Productos
                        </a>

                    </div>


                    <div className="footer-column">

                        <h4>
                            Información
                        </h4>

                        <a href="#nosotros">
                            Nosotros
                        </a>

                        <a href="#contacto">
                            Contacto
                        </a>

                    </div>

                </div>


                <div className="footer-bottom">

                    <span>
                        © {new Date().getFullYear()} Remoltec.
                        Todos los derechos reservados.
                    </span>

                </div>

            </footer>

        </div>
    );
}

export default Home;