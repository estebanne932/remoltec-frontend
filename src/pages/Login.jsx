import { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('BOTÓN FUNCIONANDO');

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            password,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Error al iniciar sesión.'
                    );
                }

                console.log('Login correcto:', data);

                localStorage.setItem('token', data.token);
                localStorage.setItem(
                    'user',
                    JSON.stringify(data.user)
                );

               window.location.href = '/admin';

            } catch (error) {

                console.error(error);

                alert(error.message);

            }
        };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    <img
                        src="/images/logo.png"
                        alt="Remoltec"
                    />
                </div>

                <div className="login-header">
                    <h1>Administración</h1>

                    <p>
                        Ingresa para administrar tu sitio
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="email">
                            Correo electrónico
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="correo@remoltec.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Iniciar sesión
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;