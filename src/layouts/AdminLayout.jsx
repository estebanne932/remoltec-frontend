
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';

function AdminLayout() {
    return (
        <div className="admin-layout">

            {/* Menú lateral */}
            <Sidebar />

            {/* Área principal */}
            <div className="admin-main">

                {/* Encabezado */}
                <Header />

                {/* Contenido de cada página */}
                <main className="admin-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default AdminLayout;

