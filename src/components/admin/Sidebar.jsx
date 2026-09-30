
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    };

    return (
        <aside className="admin-sidebar">

            {/* Logo */}
            <div className="sidebar-logo">
                <img
                    src="/images/logo.png"
                    alt="Remoltec"
                />
            </div>

            {/* Menú */}
            <nav className="sidebar-menu">

                <div className="sidebar-section">
                    <span>GENERAL</span>
                </div>

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="sidebar-icon">⌂</span>
                    <span>Dashboard</span>
                </NavLink>


                <div className="sidebar-section">
                    <span>CATÁLOGO</span>
                </div>

                <NavLink
                    to="/admin/categorias"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="sidebar-icon">▦</span>
                    <span>Categorías</span>
                </NavLink>

                <NavLink
                    to="/admin/productos"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="sidebar-icon">□</span>
                    <span>Productos</span>
                </NavLink>


                <div className="sidebar-section">
                    <span>OPERACIÓN</span>
                </div>

                <NavLink
                    to="/admin/pedidos"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="sidebar-icon">▤</span>
                    <span>Pedidos</span>
                </NavLink>

                <NavLink
                    to="/admin/inventario"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? 'active' : ''}`
                    }
                >
                    <span className="sidebar-icon">▥</span>
                    <span>Inventario</span>
                </NavLink>

            </nav>


            {/* Parte inferior */}
            <div className="sidebar-bottom">

                <button
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    <span className="sidebar-icon">↪</span>
                    <span>Cerrar sesión</span>
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;

