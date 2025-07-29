import React, { useState } from 'react';

const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/doctor/login', {
                method: 'POST',
                credentials: 'include', // ⚠️ Necessary to allow cookies to be stored (for token)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message || 'Login failed');
                setSuccessMessage('');
            } else {
                setSuccessMessage('Login successful');
                setErrorMessage('');

                // Example: Redirect after login
                window.location.href = '/doctor/dashboard';
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred during login');
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Doctor Login</h2>

                {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full mt-1 p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full mt-1 p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default DoctorLogin;
