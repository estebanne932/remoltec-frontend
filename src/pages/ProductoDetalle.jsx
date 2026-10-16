
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ProductoDetalle.css';
import '../pages/NavbarProductos.css';



const API_URL = import.meta.env.VITE_API_URL;

function ProductoDetalle() {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [indiceImagen, setIndiceImagen] = useState(0);
    const [zoomAbierto, setZoomAbierto] = useState(false);

    useEffect(() => {
        const cargarProducto = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await fetch(
                    `${API_URL}/api/productos/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        response.status === 404
                            ? 'No encontramos este producto.'
                            : 'No se pudo cargar el producto.'
                    );
                }

                const data = await response.json();
                setProducto(data);
            } catch (err) {
                console.error('Error cargando producto:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        cargarProducto();
    }, [id]);

    const obtenerImagen = (ruta) => {
        if (!ruta) return '';

        if (/^https?:\/\//i.test(ruta)) {
            return ruta;
        }

        return `${API_URL}/storage/${ruta.replace(/^\/?storage\//, '')}`;
    };

    if (loading) {
    return (
        <>
            <Navbar />
            <main className="detalle-estado">
                Cargando producto...
            </main>
            <Footer />
        </>
    );
}

    if (error || !producto) {
    return (
        <>
            <Navbar />

            <main className="detalle-estado">
                <h2>{error || 'Producto no disponible'}</h2>

                <Link to="/" className="detalle-volver">
                    Volver al inicio
                </Link>
            </main>

            <Footer />
        </>
    );
}
    const imagenes = producto.imagenes || [];
    const imagenSeleccionada = imagenes[indiceImagen] || imagenes[0];

    const imagenSrc = imagenSeleccionada
        ? obtenerImagen(imagenSeleccionada.ruta)
        : '';

  

    return (
    <>
        <Navbar />
        <main className="producto-detalle">
            <div className="detalle-container">

                <nav className="detalle-migas">
                    <Link to="/">Inicio</Link>
                    <span>/</span>
                    <Link to="/#productos">Productos</Link>
                    <span>/</span>
                    <span>{producto.nombre}</span>
                </nav>

                <motion.section
                    className="detalle-layout"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                   
<div className="detalle-galeria">
    <div className="detalle-imagen-principal">
        {imagenSrc ? (
            <>
                <img
                    src={imagenSrc}
                    alt={producto.nombre}
                    key={imagenSrc}
                />

                <button
                    type="button"
                    className="detalle-boton-zoom"
                    onClick={() => setZoomAbierto(true)}
                    aria-label="Ampliar imagen"
                    title="Ampliar imagen"
                >
                    <span aria-hidden="true">⌕</span>
                </button>
            </>
        ) : (
            <div className="detalle-sin-imagen">
                REMOLTEC
            </div>
        )}
    </div>

    {imagenes.length > 1 && (
        <div className="detalle-galeria-controles">
            <button
                type="button"
                className="detalle-flecha"
                onClick={() =>
                    setIndiceImagen((actual) =>
                        actual === 0 ? imagenes.length - 1 : actual - 1
                    )
                }
                aria-label="Imagen anterior"
            >
                ‹
            </button>

            <div className="detalle-miniaturas">
                {imagenes.map((imagen, indice) => (
                    <button
                        type="button"
                        key={imagen.id ?? imagen.ruta}
                        className={`detalle-miniatura ${
                            indice === indiceImagen ? 'activa' : ''
                        }`}
                        onClick={() => setIndiceImagen(indice)}
                        aria-label={`Ver imagen ${indice + 1}`}
                        aria-pressed={indice === indiceImagen}
                    >
                        <img
                            src={obtenerImagen(imagen.ruta)}
                            alt={`${producto.nombre}, imagen ${indice + 1}`}
                            loading="lazy"
                        />
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="detalle-flecha"
                onClick={() =>
                    setIndiceImagen((actual) =>
                        actual === imagenes.length - 1 ? 0 : actual + 1
                    )
                }
                aria-label="Imagen siguiente"
            >
                ›
            </button>
        </div>
    )}

    {zoomAbierto && imagenSrc && (
        <div
            className="detalle-zoom-overlay"
            onClick={() => setZoomAbierto(false)}
            role="presentation"
        >
            <button
                type="button"
                className="detalle-zoom-cerrar"
                onClick={() => setZoomAbierto(false)}
                aria-label="Cerrar imagen ampliada"
            >
                ×
            </button>

            <img
                src={imagenSrc}
                alt={`${producto.nombre} ampliado`}
                className="detalle-zoom-imagen"
                onClick={(evento) => evento.stopPropagation()}
            />

            {imagenes.length > 1 && (
                <>
                    <button
                        type="button"
                        className="detalle-zoom-flecha izquierda"
                        onClick={(evento) => {
                            evento.stopPropagation();
                            setIndiceImagen((actual) =>
                                actual === 0
                                    ? imagenes.length - 1
                                    : actual - 1
                            );
                        }}
                        aria-label="Imagen anterior"
                    >
                        ‹
                    </button>

                    <button
                        type="button"
                        className="detalle-zoom-flecha derecha"
                        onClick={(evento) => {
                            evento.stopPropagation();
                            setIndiceImagen((actual) =>
                                actual === imagenes.length - 1
                                    ? 0
                                    : actual + 1
                            );
                        }}
                        aria-label="Imagen siguiente"
                    >
                        ›
                    </button>
                </>
            )}
        </div>
    )}
</div>


                    <div className="detalle-informacion">
                        <span className="detalle-etiqueta">
                            {producto.categoria?.nombre || 'REFACCIONES'}
                        </span>

                        <h1>{producto.nombre}</h1>

                        {producto.sku && (
                            <p className="detalle-sku">
                                SKU: {producto.sku}
                            </p>
                        )}

                        <div className="detalle-separador" />

                        <h2>Descripción del producto</h2>

                        <p className="detalle-descripcion">
                            {producto.descripcion ||
                                'Contáctanos para obtener más información sobre este producto.'}
                        </p>

                        <a
                            href="#contacto"
                            className="detalle-cotizar"
                        >
                            Solicitar cotización
                            <span aria-hidden="true">→</span>
                        </a>

                        <p className="detalle-nota">
                            Consulta disponibilidad y detalles con nuestro equipo.
                        </p>

                        <Link to="/" className="detalle-regresar">
                            ← Volver al catálogo
                        </Link>
                    </div>
                </motion.section>
                       </div>
        </main>

        <Footer />
    </>
);
}

export default ProductoDetalle;
