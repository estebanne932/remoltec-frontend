
import { useEffect, useState } from 'react';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    const [imagenes, setImagenes] = useState([]);

    const [formulario, setFormulario] = useState({
        nombre: '',
        sku: '',
        categoria_id: '',
        descripcion: '',
        precio: '',
        stock: '',
        etiqueta: '',
        activo: true,
    });

    // ========================================
    // CARGAR PRODUCTOS Y CATEGORÍAS
    // ========================================

    const cargarDatos = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');

            const [productosResponse, categoriasResponse] =
                await Promise.all([
                    fetch(
                        'http://127.0.0.1:8000/api/productos',
                        {
                            headers: {
                                Accept: 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    ),

                    fetch(
                        'http://127.0.0.1:8000/api/categorias',
                        {
                            headers: {
                                Accept: 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    ),
                ]);

            if (!productosResponse.ok) {
                throw new Error(
                    'No se pudieron cargar los productos.'
                );
            }

            if (!categoriasResponse.ok) {
                throw new Error(
                    'No se pudieron cargar las categorías.'
                );
            }

            const productosData =
                await productosResponse.json();

            const categoriasData =
                await categoriasResponse.json();

            setProductos(productosData);
            setCategorias(categoriasData);

        } catch (error) {

            console.error(
                'Error cargando productos:',
                error
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    // ========================================
    // FILTRAR PRODUCTOS
    // ========================================

    const productosFiltrados = productos.filter(
        (producto) => {

            const texto =
                busqueda.toLowerCase().trim();

            return (
                producto.nombre
                    ?.toLowerCase()
                    .includes(texto)
                ||
                producto.sku
                    ?.toLowerCase()
                    .includes(texto)
            );
        }
    );

    // ========================================
    // NUEVO PRODUCTO
    // ========================================

    const nuevoProducto = () => {

        setProductoEditando(null);

        setImagenes([]);

        setFormulario({
            nombre: '',
            sku: '',
            categoria_id: '',
            descripcion: '',
            precio: '',
            stock: '',
            etiqueta: '',
            activo: true,
        });

        setMostrarFormulario(true);
    };

    // ========================================
    // EDITAR PRODUCTO
    // ========================================


    const editarProducto = (producto) => {
        setProductoEditando(producto);

        setFormulario({
            nombre: producto.nombre || '',
            sku: producto.sku || '',
            categoria_id: producto.categoria_id || '',
            descripcion: producto.descripcion || '',
            precio: producto.precio || '',
            stock: producto.stock ?? 0,
            etiqueta: producto.etiqueta || '',
            activo: producto.activo ?? true,
        });

        setImagenes([]);

        setMostrarFormulario(true);
    };

    // ========================================
    // CERRAR FORMULARIO
    // ========================================

    const cerrarFormulario = () => {

        setMostrarFormulario(false);
        setProductoEditando(null);
        setImagenes([]);
    };

    // ========================================
    // CAMBIAR FORMULARIO
    // ========================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormulario({
            ...formulario,

            [name]:
                type === 'checkbox'
                    ? checked
                    : value,
        });
    };

    // ========================================
    // SELECCIONAR IMÁGENES
    // ========================================

    const handleImagenes = (e) => {

        const archivos =
            Array.from(e.target.files);

        setImagenes(archivos);
    };

    // ========================================
    // GUARDAR PRODUCTO
    // ========================================

    const guardarProducto = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem('token');

            const url = productoEditando
                ? `http://127.0.0.1:8000/api/productos/${productoEditando.id}`
                : 'http://127.0.0.1:8000/api/productos';

            const method = productoEditando
                ? 'PUT'
                : 'POST';

            const response = await fetch(
                url,
                {
                    method,
                    headers: {
                        'Content-Type':
                            'application/json',

                        Accept:
                            'application/json',

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body:
                        JSON.stringify(formulario),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                console.error(
                    'Error Laravel:',
                    data
                );

                throw new Error(
                    data.message ||
                    'No se pudo guardar el producto.'
                );
            }

            alert(
                productoEditando
                    ? 'Producto actualizado correctamente.'
                    : 'Producto creado correctamente.'
            );

            cerrarFormulario();

            cargarDatos();

        } catch (error) {

            console.error(
                'Error guardando producto:',
                error
            );

            alert(error.message);
        }
    };

    // ========================================
    // ELIMINAR PRODUCTO
    // ========================================

    const eliminarProducto = async (producto) => {

    const confirmar = window.confirm(
        `¿Seguro que deseas eliminar el producto "${producto.nombre}"?`
    );

    if (!confirmar) {
        return;
    }

    try {

        const token = localStorage.getItem('token');

        const response = await fetch(
            `http://127.0.0.1:8000/api/productos/${producto.id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || 'No se pudo eliminar el producto.'
            );
        }

        alert('Producto eliminado correctamente.');

        cargarDatos();

    } catch (error) {

        console.error(error);

        alert(error.message);
    }
};
    // ========================================
    // RENDER
    // ========================================

    return (

        <div className="productos-page">

            {/* ========================================
                ENCABEZADO
            ======================================== */}

            <div className="page-header">

                <div>

                    <h1>
                        Productos
                    </h1>

                    <p>
                        Administra los productos de tu catálogo.
                    </p>

                </div>

                <button
                    type="button"
                    className="btn-primary"
                    onClick={nuevoProducto}
                >
                    + Nuevo producto
                </button>

            </div>

            {/* ========================================
                BUSCADOR
            ======================================== */}

            <div className="productos-toolbar">

                <input
                    type="text"
                    placeholder="Buscar por nombre o SKU..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                />

            </div>

            {/* ========================================
                TABLA
            ======================================== */}

            <div className="productos-card">

                {loading ? (

                    <div className="loading">
                        Cargando productos...
                    </div>

                ) : productosFiltrados.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            📦
                        </div>

                        <h3>
                            No hay productos
                        </h3>

                        <p>
                            No se encontraron productos registrados.
                        </p>

                        <button
                            type="button"
                            className="btn-primary"
                            onClick={nuevoProducto}
                        >
                            + Agregar producto
                        </button>

                    </div>

                ) : (

                    <div className="table-container">

                        <table className="productos-table">

                            <thead>

                                <tr>

                                    <th>
                                        Producto
                                    </th>

                                    <th>
                                        SKU
                                    </th>

                                    <th>
                                        Categoría
                                    </th>

                                    <th>
                                        Precio
                                    </th>

                                    <th>
                                        Stock
                                    </th>

                                    <th>
                                        Estado
                                    </th>

                                    <th>
                                        Acciones
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {productosFiltrados.map(
                                    (producto) => (

                                        <tr
                                            key={
                                                producto.id
                                            }
                                        >

                                            <td>

                                                <div className="producto-nombre">

                                                    <strong>
                                                        {
                                                            producto.nombre
                                                        }
                                                    </strong>

                                                    {producto.etiqueta && (

                                                        <span className="producto-etiqueta">

                                                            {
                                                                producto.etiqueta
                                                            }

                                                        </span>

                                                    )}

                                                </div>

                                            </td>

                                            <td>

                                                <span className="producto-sku">

                                                    {
                                                        producto.sku ||
                                                        '—'
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                {
                                                    producto.categoria?.nombre ||
                                                    'Sin categoría'
                                                }

                                            </td>

                                            <td>

                                                $
                                                {Number(
                                                    producto.precio || 0
                                                ).toFixed(2)}

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        Number(
                                                            producto.stock
                                                        ) > 0
                                                            ? 'stock-activo'
                                                            : 'stock-agotado'
                                                    }
                                                >

                                                    {
                                                        producto.stock ??
                                                        0
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                {producto.activo ? (

                                                    <span className="estado-activo">
                                                        Activo
                                                    </span>

                                                ) : (

                                                    <span className="estado-inactivo">
                                                        Inactivo
                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <div className="product-actions">

                                                    <button
                                                        type="button"
                                                        className="btn-edit"
                                                        onClick={() => editarProducto(producto)}
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn-delete"
                                                        onClick={() => eliminarProducto(producto)}
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {/* ========================================
                MODAL
            ======================================== */}

            {mostrarFormulario && (

                <div
                    className="product-modal-overlay"
                    onClick={cerrarFormulario}
                >

                    <div
                        className="product-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* HEADER */}

                        <div className="product-modal-header">

                            <div>

                                <h2>

                                    {productoEditando
                                        ? 'Editar producto'
                                        : 'Nuevo producto'}

                                </h2>

                                <p>

                                    {productoEditando
                                        ? 'Modifica la información del producto.'
                                        : 'Agrega un nuevo producto al catálogo.'}

                                </p>

                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={cerrarFormulario}
                            >
                                ×
                            </button>

                        </div>

                        {/* FORMULARIO */}

                        <form
                            className="product-form"
                            onSubmit={guardarProducto}
                        >

                            {/* NOMBRE */}

                            <div className="form-field">

                                <label>
                                    Nombre del producto
                                </label>

                                <input
                                    type="text"
                                    name="nombre"
                                    value={
                                        formulario.nombre
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Ej. Eje para remolque"
                                    required
                                />

                            </div>

                            {/* SKU */}

                            <div className="form-field">

                                <label>
                                    SKU
                                </label>

                                <input
                                    type="text"
                                    name="sku"
                                    value={
                                        formulario.sku
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Ej. REM-001"
                                    required
                                />

                            </div>

                            {/* CATEGORÍA */}

                            <div className="form-field">

                                <label>
                                    Categoría
                                </label>

                                <select
                                    name="categoria_id"
                                    value={
                                        formulario.categoria_id
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Seleccionar categoría
                                    </option>

                                    {categorias.map(
                                        (categoria) => (

                                            <option
                                                key={
                                                    categoria.id
                                                }
                                                value={
                                                    categoria.id
                                                }
                                            >
                                                {
                                                    categoria.nombre
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* PRECIO + STOCK */}

                            <div className="form-row">

                                <div className="form-field">

                                    <label>
                                        Precio
                                    </label>

                                    <input
                                        type="number"
                                        name="precio"
                                        value={
                                            formulario.precio
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                    />

                                </div>

                                <div className="form-field">

                                    <label>
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        name="stock"
                                        value={
                                            formulario.stock
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="0"
                                        min="0"
                                        required
                                    />

                                </div>

                            </div>

                            {/* ETIQUETA */}

                            <div className="form-field">

                                <label>
                                    Etiqueta
                                </label>

                                <input
                                    type="text"
                                    name="etiqueta"
                                    value={
                                        formulario.etiqueta
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Ej. Nuevo, Oferta, Más vendido"
                                />

                            </div>

                            {/* DESCRIPCIÓN */}

                            <div className="form-field">

                                <label>
                                    Descripción
                                </label>

                                <textarea
                                    name="descripcion"
                                    value={
                                        formulario.descripcion
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Descripción del producto..."
                                    rows="4"
                                />

                            </div>

                            {/* IMÁGENES */}

                            <div className="form-field">

                                <label>
                                    Imágenes del producto
                                </label>

                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    multiple
                                    onChange={
                                        handleImagenes
                                    }
                                />

                                <small>
                                    Puedes seleccionar varias imágenes.
                                    JPG, PNG o WebP.
                                </small>

                                {imagenes.length > 0 && (

                                    <div className="selected-images">

                                        <p>

                                            {imagenes.length}

                                            {' '}

                                            imagen
                                            {imagenes.length !== 1
                                                ? 'es'
                                                : ''}

                                            {' '}

                                            seleccionada
                                            {imagenes.length !== 1
                                                ? 's'
                                                : ''}

                                        </p>

                                        <ul>

                                            {imagenes.map(
                                                (
                                                    imagen,
                                                    index
                                                ) => (

                                                    <li
                                                        key={
                                                            index
                                                        }
                                                    >

                                                        {imagen.name}

                                                    </li>

                                                )
                                            )}

                                        </ul>

                                    </div>

                                )}

                            </div>

                            {/* ACTIVO */}

                            <div className="form-checkbox">

                                <input
                                    type="checkbox"
                                    id="producto-activo"
                                    name="activo"
                                    checked={
                                        formulario.activo
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <label
                                    htmlFor="producto-activo"
                                >
                                    Producto activo
                                </label>

                            </div>

                            {/* BOTONES */}

                            <div className="product-form-actions">

                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={
                                        cerrarFormulario
                                    }
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                >

                                    {productoEditando
                                        ? 'Guardar cambios'
                                        : 'Guardar producto'}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Productos;
