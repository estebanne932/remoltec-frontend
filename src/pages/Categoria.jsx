import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import './Categoria.css';

function Categoria() {
    const { id } = useParams();
    

    const [categoria, setCategoria] = useState(null);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [busqueda, setBusqueda] = useState('');
    const [orden, setOrden] = useState('destacados');

    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarCategoria();
        cargarCategorias();
    }, [id]);

    

    const cargarCategoria = async () => {
        try {
            setLoading(true);

            const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/categorias/${id}/productos`
);

            if (!response.ok) {
                throw new Error('No se pudieron cargar los productos');
            }

            const data = await response.json();

            setProductos(data);

            if (data.length > 0 && data[0].categoria) {
                setCategoria(data[0].categoria);
            }
        } catch (error) {
            console.error('Error cargando categoría:', error);
        } finally {
            setLoading(false);
        }
    };

    const cargarCategorias = async () => {
        try {
            const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/categorias`
);

            const data = await response.json();

            setCategorias(data);
        } catch (error) {
            console.error('Error cargando categorías:', error);
        }
    };

    const productosFiltrados = useMemo(() => {
        let resultado = [...productos];

        // BUSCADOR
        if (busqueda.trim()) {
            const texto = busqueda.toLowerCase();

            resultado = resultado.filter((producto) =>
                producto.nombre?.toLowerCase().includes(texto) ||
                producto.sku?.toLowerCase().includes(texto) ||
                producto.descripcion?.toLowerCase().includes(texto)
            );
        }

        // PRECIO MÍNIMO
        if (precioMin !== '') {
            resultado = resultado.filter(
                (producto) =>
                    Number(producto.precio) >= Number(precioMin)
            );
        }

        // PRECIO MÁXIMO
        if (precioMax !== '') {
            resultado = resultado.filter(
                (producto) =>
                    Number(producto.precio) <= Number(precioMax)
            );
        }

        // ORDENAMIENTO
        switch (orden) {
            case 'nombre':
                resultado.sort((a, b) =>
                    a.nombre.localeCompare(b.nombre)
                );
                break;

            case 'precio-menor':
                resultado.sort(
                    (a, b) => Number(a.precio) - Number(b.precio)
                );
                break;

            case 'precio-mayor':
                resultado.sort(
                    (a, b) => Number(b.precio) - Number(a.precio)
                );
                break;

            default:
                break;
        }

        return resultado;
    }, [
        productos,
        busqueda,
        precioMin,
        precioMax,
        orden
    ]);

    const limpiarFiltros = () => {
        setBusqueda('');
        setPrecioMin('');
        setPrecioMax('');
        setOrden('destacados');
    };

    const obtenerImagen = (producto) => {
        if (
            producto.imagenes &&
            producto.imagenes.length > 0
        ) {
            return producto.imagenes[0].url ||
                producto.imagenes[0].imagen ||
                producto.imagenes[0].ruta;
        }

        return '/images/producto-placeholder.jpg';
    };

    if (loading) {
        return (
            <div className="categoria-loading">
                <div className="loader"></div>
                <p>Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="categoria-page">

            {/* BARRA DE BENEFICIOS */}
            <div className="benefits-bar">

                <div>
                    🚚
                    <span>Envío a toda la República</span>
                </div>

                <div>
                    ⚙
                    <span>Garantía de fábrica</span>
                </div>

                <div>
                    🔒
                    <span>Pago 100% seguro</span>
                </div>

                <div>
                    ◉
                    <span>Atención por WhatsApp</span>
                </div>

            </div>

            {/* CONTENIDO */}
            <div className="categoria-container">

                {/* SIDEBAR */}
                <aside className="categoria-sidebar">

                    <h3>Categorías</h3>

                    <div className="sidebar-title">
                        Todos los productos
                    </div>

                    <Link to="/productos">
                        Todos
                    </Link>

                    <div className="sidebar-categorias">

                        {categorias.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/categoria/${cat.id}`}
                                className={
                                    Number(cat.id) === Number(id)
                                        ? 'categoria-activa'
                                        : ''
                                }
                            >
                                {cat.nombre}

                                {cat.productos_count !== undefined && (
                                    <span>
                                        {cat.productos_count}
                                    </span>
                                )}
                            </Link>
                        ))}

                    </div>

                </aside>

                {/* CONTENIDO PRINCIPAL */}
                <main className="categoria-main">

                    {/* BREADCRUMB */}
                    <div className="breadcrumb">

                        <Link to="/">
                            Inicio
                        </Link>

                        <span>/</span>

                        <Link to="/productos">
                            Productos
                        </Link>

                        <span>/</span>

                        <strong>
                            {categoria?.nombre || 'Categoría'}
                        </strong>

                    </div>

                    {/* HEADER */}
                    <div className="categoria-header">

                        <div>
                            <span className="categoria-label">
                                REMOLTEC
                            </span>

                            <h1>
                                {categoria?.nombre || 'Productos'}
                            </h1>

                            {categoria?.descripcion && (
                                <p>
                                    {categoria.descripcion}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* BUSCADOR Y ORDEN */}
                    <div className="catalog-toolbar">

                        <div className="search-box">

                            <input
                                type="text"
                                placeholder={`Buscar en ${
                                    categoria?.nombre || 'esta categoría'
                                }`}
                                value={busqueda}
                                onChange={(e) =>
                                    setBusqueda(e.target.value)
                                }
                            />

                            <span>⌕</span>

                        </div>

                        <div className="sort-box">

                            <label>
                                Ordenar:
                            </label>

                            <select
                                value={orden}
                                onChange={(e) =>
                                    setOrden(e.target.value)
                                }
                            >
                                <option value="destacados">
                                    Destacados
                                </option>

                                <option value="nombre">
                                    Nombre
                                </option>

                                <option value="precio-menor">
                                    Precio: menor a mayor
                                </option>

                                <option value="precio-mayor">
                                    Precio: mayor a menor
                                </option>
                            </select>

                        </div>

                    </div>

                    <div className="catalog-layout">

                        {/* FILTROS */}
                        <aside className="filters">

                            <div className="filters-header">

                                <h3>
                                    Filtrar
                                </h3>

                                <button
                                    onClick={limpiarFiltros}
                                >
                                    Limpiar
                                </button>

                            </div>

                            <div className="filter-section">

                                <h4>
                                    Precio
                                </h4>

                                <div className="price-inputs">

                                    <input
                                        type="number"
                                        placeholder="Mínimo"
                                        value={precioMin}
                                        onChange={(e) =>
                                            setPrecioMin(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <span>—</span>

                                    <input
                                        type="number"
                                        placeholder="Máximo"
                                        value={precioMax}
                                        onChange={(e) =>
                                            setPrecioMax(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="filter-section">

                                <h4>
                                    Disponibilidad
                                </h4>

                                <label className="check-filter">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                    />
                                    <span>
                                        Productos activos
                                    </span>
                                </label>

                            </div>

                        </aside>

                        {/* PRODUCTOS */}
                        <section className="products-section">

                            <div className="products-count">
                                {productosFiltrados.length}{' '}
                                productos
                            </div>

                            {productosFiltrados.length === 0 ? (

                                <div className="no-products">

                                    <div>
                                        🔍
                                    </div>

                                    <h3>
                                        No encontramos productos
                                    </h3>

                                    <p>
                                        Intenta cambiar los filtros
                                        o realizar otra búsqueda.
                                    </p>

                                    <button
                                        onClick={limpiarFiltros}
                                    >
                                        Limpiar filtros
                                    </button>

                                </div>

                            ) : (

                                <div className="products-grid">

                                    {productosFiltrados.map(
                                        (producto) => (

                                            <article
                                                className="store-product-card"
                                                key={producto.id}
                                            >

                                                {producto.etiqueta && (
                                                    <div className="product-badge">
                                                        {producto.etiqueta}
                                                    </div>
                                                )}

                                                <Link
                                                    to={`/producto/${producto.id}`}
                                                    className="product-image"
                                                >
                                                    <img
                                                        src={obtenerImagen(
                                                            producto
                                                        )}
                                                        alt={
                                                            producto.nombre
                                                        }
                                                    />
                                                </Link>

                                                <div className="product-card-body">

                                                    <span className="product-sku">
                                                        SKU: {producto.sku}
                                                    </span>

                                                    <Link
                                                        to={`/producto/${producto.id}`}
                                                    >
                                                        <h2>
                                                            {
                                                                producto.nombre
                                                            }
                                                        </h2>
                                                    </Link>

                                                    <p className="product-description">
                                                        {
                                                            producto.descripcion
                                                        }
                                                    </p>

                                                    <div className="product-bottom">

                                                        <div className="product-price">
                                                            $
                                                            {Number(
                                                                producto.precio
                                                            ).toLocaleString(
                                                                'es-MX',
                                                                {
                                                                    minimumFractionDigits: 2
                                                                }
                                                            )}

                                                            <small>
                                                                MXN
                                                            </small>
                                                        </div>

                                                        <button
                                                            className="quote-button"
                                                            onClick={() =>
                                                                window.open(
                                                                    `https://wa.me/?text=${encodeURIComponent(
                                                                        `Hola, me interesa el producto ${producto.nombre} (SKU: ${producto.sku})`
                                                                    )}`,
                                                                    '_blank'
                                                                )
                                                            }
                                                        >
                                                            Cotizar
                                                        </button>

                                                    </div>

                                                </div>

                                            </article>

                                        )
                                    )}

                                </div>

                            )}

                        </section>

                    </div>

                </main>

            </div>

            {/* WHATSAPP */}
            <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-floating"
            >
                <span>◉</span>
            </a>

        </div>
    );
}

export default Categoria;