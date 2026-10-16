
import { useEffect, useState } from 'react';
import API_URL from "../../api";

function Categorias() {

    const [categorias, setCategorias] = useState([]);

    const [loading, setLoading] = useState(true);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [categoriaEditando, setCategoriaEditando] = useState(null);

    const [archivoImagen, setArchivoImagen] = useState(null);

    const [vistaPrevia, setVistaPrevia] = useState('');

    const [formulario, setFormulario] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
        orden: 0,
        activo: true,
    });




    // ========================================
    // CARGAR CATEGORÍAS
    // ========================================

    const cargarCategorias = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/categorias`
            );

            if (!response.ok) {
                throw new Error(
                    'No se pudieron cargar las categorías.'
                );
            }

            const data = await response.json();

            setCategorias(data);

        } catch (error) {

            console.error(error);

            alert(error.message);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        cargarCategorias();

    }, []);


    // ========================================
    // CAMBIAR CAMPOS DEL FORMULARIO
    // ========================================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormulario({
            ...formulario,

            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        });
    };


    // ========================================
    // ABRIR FORMULARIO PARA NUEVA CATEGORÍA
    // ========================================

    const nuevaCategoria = () => {

        setCategoriaEditando(null);

        setFormulario({
            nombre: '',
            descripcion: '',
            imagen: '',
            orden: 0,
            activo: true,
        });

        setMostrarFormulario(true);
    };


    // ========================================
    // EDITAR CATEGORÍA
    // ========================================

    const editarCategoria = (categoria) => {

        setArchivoImagen(null);
setVistaPrevia('');

        setCategoriaEditando(categoria);
        setVistaPrevia(categoria.imagen || '');

        setFormulario({
            nombre: categoria.nombre || '',
            descripcion: categoria.descripcion || '',
            imagen: categoria.imagen || '',
            orden: categoria.orden || 0,
            activo: categoria.activo ?? true,
        });

        setMostrarFormulario(true);
    };


    // ========================================
    // CANCELAR FORMULARIO
    // ========================================

    const cancelarFormulario = () => {

        setMostrarFormulario(false);

        setCategoriaEditando(null);

        setFormulario({
            nombre: '',
            descripcion: '',
            imagen: '',
            orden: 0,
            activo: true,
        });
    };


   
const guardarCategoria = async (e) => {
    e.preventDefault();

    setArchivoImagen(null);
setVistaPrevia('');

    const token = localStorage.getItem('token');

    const url = categoriaEditando
        ? `${import.meta.env.VITE_API_URL}/api/categorias/${categoriaEditando.id}`
        : `${import.meta.env.VITE_API_URL}/api/categorias`;

    const method = categoriaEditando ? 'PUT' : 'POST';

    try {
        const datos = new FormData();

        datos.append('nombre', formulario.nombre);
        datos.append('descripcion', formulario.descripcion || '');
        datos.append('orden', String(Number(formulario.orden)));
        datos.append('activo', formulario.activo ? '1' : '0');

        // Adjuntar la imagen solo si seleccionaste una nueva.
        if (archivoImagen) {
            datos.append('imagen', archivoImagen);
        }

        // Laravel procesa la actualización mediante POST + _method.
        if (method === 'PUT') {
            datos.append('_method', 'PUT');
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: datos,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error Laravel:', data);

            throw new Error(
                data.message || 'No se pudo guardar la categoría.'
            );
        }

        alert(
            categoriaEditando
                ? 'Categoría actualizada correctamente.'
                : 'Categoría creada correctamente.'
        );

        cancelarFormulario();
        await cargarCategorias();

    } catch (error) {
        console.error('Error guardando categoría:', error);
        alert(error.message);
    }
};



    // ========================================
    // ELIMINAR CATEGORÍA
    // ========================================

    const eliminarCategoria = async (categoria) => {

        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar la categoría "${categoria.nombre}"?`
        );


        if (!confirmar) {
            return;
        }


        const token = localStorage.getItem('token');


        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/categorias/${categoria.id}`,
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
                    data.message ||
                    'No se pudo eliminar la categoría.'
                );

            }


            alert(
                'Categoría eliminada correctamente.'
            );


            cargarCategorias();


        } catch (error) {

            console.error(error);

            alert(error.message);

        }
    };


    // ========================================
    // INTERFAZ
    // ========================================

    return (

        <div className="admin-page">


            {/* ========================================
                ENCABEZADO
            ======================================== */}

            <div className="page-header">

                <div>

                    <h1>
                        Categorías
                    </h1>

                    <p>
                        Administra las categorías de tus productos.
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={
                        mostrarFormulario
                            ? cancelarFormulario
                            : nuevaCategoria
                    }
                >

                    {mostrarFormulario
                        ? 'Cancelar'
                        : '+ Nueva categoría'
                    }

                </button>

            </div>


            {/* ========================================
                FORMULARIO
            ======================================== */}

            {mostrarFormulario && (

                <div className="admin-panel category-form-panel">


                    <div className="form-panel-header">

                        <div>

                            <h2>

                                {categoriaEditando

                                    ? 'Editar categoría'

                                    : 'Nueva categoría'

                                }

                            </h2>


                            <p>

                                {categoriaEditando

                                    ? 'Modifica la información de la categoría.'

                                    : 'Agrega una nueva categoría al catálogo.'

                                }

                            </p>

                        </div>

                    </div>


                    <form
                        className="category-form"
                        onSubmit={guardarCategoria}
                    >


                        {/* NOMBRE */}

                        <div className="form-field">

                            <label htmlFor="nombre">
                                Nombre
                            </label>


                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={formulario.nombre}
                                onChange={handleChange}
                                placeholder="Ej. Ejes"
                                required
                            />

                        </div>


                        {/* DESCRIPCIÓN */}

                        <div className="form-field">

                            <label htmlFor="descripcion">
                                Descripción
                            </label>


                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formulario.descripcion}
                                onChange={handleChange}
                                placeholder="Descripción de la categoría"
                                rows="4"
                            />

                        </div>


                        {/* IMAGEN */}

                        
                        <div className="form-field">
                            <label htmlFor="imagen">
                                Imagen de la categoría
                            </label>

                            <input
                                id="imagen"
                                name="imagen"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => {
                                    const archivo = e.target.files?.[0] || null;

                                    setArchivoImagen(archivo);
                                    setVistaPrevia(
                                        archivo ? URL.createObjectURL(archivo) : vistaPrevia
                                    );
                                }}
                            />

                            {vistaPrevia && (
                                <div className="category-image-preview">
                                    <img
                                        src={
                                            vistaPrevia.startsWith('blob:')
                                                ? vistaPrevia
                                                : `${API_URL}/storage/${vistaPrevia}`
                                        }
                                        alt="Vista previa de la categoría"
                                    />
                                </div>
                            )}

                            <small>
                                Formatos permitidos: JPG, PNG y WebP.
                            </small>
                        </div>



                        {/* ORDEN */}

                        <div className="form-field">

                            <label htmlFor="orden">
                                Orden
                            </label>


                            <input
                                id="orden"
                                name="orden"
                                type="number"
                                value={formulario.orden}
                                onChange={handleChange}
                                min="0"
                            />

                        </div>


                        {/* ACTIVO */}

                        <div className="form-checkbox">

                            <input
                                id="activo"
                                name="activo"
                                type="checkbox"
                                checked={formulario.activo}
                                onChange={handleChange}
                            />


                            <label htmlFor="activo">

                                Categoría activa

                            </label>

                        </div>


                        {/* BOTONES */}

                        <div className="form-actions">


                            <button
                                type="button"
                                className="secondary-button"
                                onClick={cancelarFormulario}
                            >

                                Cancelar

                            </button>


                            <button
                                type="submit"
                                className="primary-button"
                            >

                                {categoriaEditando

                                    ? 'Guardar cambios'

                                    : 'Guardar categoría'

                                }

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ========================================
                TABLA
            ======================================== */}

            <div className="admin-panel">


                {loading ? (

                    <p>
                        Cargando categorías...
                    </p>

                ) : categorias.length === 0 ? (

                    <p>
                        No hay categorías registradas.
                    </p>

                ) : (

                    <table className="admin-table">


                        <thead>

                            <tr>

                                <th>
                                    Nombre
                                </th>

                                <th>
                                    Descripción
                                </th>

                                <th>
                                    Productos
                                </th>

                                <th>
                                    Orden
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

                            {categorias.map(
                                (categoria) => (

                                    <tr
                                        key={categoria.id}
                                    >


                                        {/* NOMBRE */}

                                        <td>

                                            <strong>
                                                {categoria.nombre}
                                            </strong>

                                        </td>


                                        {/* DESCRIPCIÓN */}

                                        <td>

                                            {categoria.descripcion
                                                || '—'
                                            }

                                        </td>


                                        {/* PRODUCTOS */}

                                        <td>

                                            {categoria.productos_count}

                                        </td>


                                        {/* ORDEN */}

                                        <td>

                                            {categoria.orden}

                                        </td>


                                        {/* ESTADO */}

                                        <td>

                                            <span
                                                className={
                                                    categoria.activo
                                                        ? 'status-badge active'
                                                        : 'status-badge inactive'
                                                }
                                            >

                                                {categoria.activo
                                                    ? 'Activa'
                                                    : 'Inactiva'
                                                }

                                            </span>

                                        </td>


                                        {/* ACCIONES */}

                                        <td>

                                            <div className="table-actions">


                                                <button
                                                    onClick={() =>
                                                        editarCategoria(
                                                            categoria
                                                        )
                                                    }
                                                >

                                                    Editar

                                                </button>


                                                <button
                                                    onClick={() =>
                                                        eliminarCategoria(
                                                            categoria
                                                        )
                                                    }
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

                )}

            </div>

        </div>
    );
}

export default Categorias;

