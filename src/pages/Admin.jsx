
function Admin() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h1>Panel de Administración</h1>

            <p>
                Bienvenido, {user?.name || 'Administrador'}
            </p>

            <button
                onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }}
            >
                Cerrar sesión
            </button>
        </div>
    );
}

export default Admin;

