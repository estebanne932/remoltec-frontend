import { useEffect, useState } from 'react';

function Dashboard() {

    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {

        try {

            const [categoriasResponse, productosResponse] = await Promise.all([
                fetch('http://127.0.0.1:8000/api/categorias'),
                fetch('http://127.0.0.1:8000/api/productos')
            ]);

            const categoriasData = await categoriasResponse.json();
            const productosData = await productosResponse.json();

            setCategorias(categoriasData);
            setProductos(productosData);

        } catch (error) {

            console.error('Error cargando dashboard:', error);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Resumen general de tu sitio
                    </p>
                </div>

            </div>


            {/* TARJETAS */}

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <div className="dashboard-card-icon">
                        📦
                    </div>

                    <div>
                        <span>Categorías</span>

                        <strong>
                            {loading ? '...' : categorias.length}
                        </strong>
                    </div>

                </div>


                <div className="dashboard-card">

                    <div className="dashboard-card-icon">
                        🛒
                    </div>

                    <div>
                        <span>Productos</span>

                        <strong>
                            {loading ? '...' : productos.length}
                        </strong>
                    </div>

                </div>


                <div className="dashboard-card">

                    <div className="dashboard-card-icon">
                        📋
                    </div>

                    <div>
                        <span>Pedidos</span>

                        <strong>
                            0
                        </strong>
                    </div>

                </div>


                <div className="dashboard-card">

                    <div className="dashboard-card-icon">
                        📊
                    </div>

                    <div>
                        <span>Inventario</span>

                        <strong>
                            0
                        </strong>
                    </div>

                </div>

            </div>


            {/* CONTENIDO */}

            <div className="dashboard-grid">

                <div className="dashboard-panel">

                    <div className="panel-header">

                        <h2>Productos recientes</h2>

                    </div>

                    {loading ? (

                        <p>Cargando productos...</p>

                    ) : productos.length === 0 ? (

                        <p>No hay productos registrados.</p>

                    ) : (

                        <div className="products-list">

                            {productos.slice(0, 5).map((producto) => (

                                <div
                                    className="product-row"
                                    key={producto.id}
                                >

                                    <div className="product-info">

                                        <strong>
                                            {producto.nombre}
                                        </strong>

                                        <span>
                                            SKU: {producto.sku}
                                        </span>

                                    </div>

                                    <span className="product-stock">
                                        Stock: {producto.stock}
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                <div className="dashboard-panel">

                    <div className="panel-header">

                        <h2>Resumen</h2>

                    </div>

                    <div className="summary-item">

                        <span>
                            Categorías registradas
                        </span>

                        <strong>
                            {loading ? '...' : categorias.length}
                        </strong>

                    </div>

                    <div className="summary-item">

                        <span>
                            Productos registrados
                        </span>

                        <strong>
                            {loading ? '...' : productos.length}
                        </strong>

                    </div>

                    <div className="summary-item">

                        <span>
                            Pedidos pendientes
                        </span>

                        <strong>
                            0
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;