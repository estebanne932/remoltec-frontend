import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Categorias from './pages/admin/Categorias';
import Productos from './pages/admin/Productos';
import Categoria from './pages/Categoria';
import Home from './pages/Home';

function App() {

    const token = localStorage.getItem('token');

    return (
        <BrowserRouter>

            <Routes>

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={
                        token
                            ? <Navigate to="/admin" replace />
                            : <Login />
                    }
                />

                {/* PANEL ADMINISTRATIVO */}
                <Route
                    path="/admin"
                    element={
                        token
                            ? <AdminLayout />
                            : <Navigate to="/login" replace />
                    }
                >

                    {/* DASHBOARD */}
                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="categorias"
                        element={<Categorias />}
                    />

                  


                    <Route
                        path="productos"
                        element={<Productos />}
                    />

                   

                </Route>

                {/* CUALQUIER OTRA RUTA */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

                 <Route path="/" element={<Home />} />

                   <Route
                        path="/categoria/:id"
                        element={<Categoria />}
                    />

            </Routes>

        </BrowserRouter>
    );
}

export default App;