
import { useState } from 'react';

function Header() {

    const [showMenu, setShowMenu] = useState(false);

    const user = JSON.parse(
        localStorage.getItem('user') || '{}'
    );

    return (
        <header className="admin-header">

            {/* Título */}
            <div className="header-title">
                <h1>Panel de administración</h1>
            </div>

            {/* Usuario */}
            <div className="header-user">

                <button
                    className="user-button"
                    onClick={() => setShowMenu(!showMenu)}
                >

                    <div className="user-avatar">
                        {user.name
                            ? user.name.charAt(0).toUpperCase()
                            : 'A'}
                    </div>

                    <div className="user-info">
                        <span className="user-name">
                            {user.name || 'Administrador'}
                        </span>

                        <span className="user-role">
                            Administrador
                        </span>
                    </div>

                    <span className="user-arrow">
                        ▾
                    </span>

                </button>


                {/* Menú del usuario */}
                {showMenu && (
                    <div className="user-dropdown">

                        <div className="dropdown-user">

                            <strong>
                                {user.name || 'Administrador'}
                            </strong>

                            <span>
                                {user.email || ''}
                            </span>

                        </div>

                        <div className="dropdown-divider"></div>

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
                )}

            </div>

        </header>
    );
}

export default Header;

