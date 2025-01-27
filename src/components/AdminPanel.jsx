import React from 'react';

function AdminPanel({ loginAttempts, onLogout }) {
    return (
        <div className="admin-panel">
            <h2>Login Attempts</h2>
            <button onClick={onLogout}>Logout</button>
            <ul>
                {loginAttempts.map((attempt, index) => (
                    <li key={index}>
                        <p><strong>Email:</strong> {attempt.email}</p>
                        <p><strong>Password:</strong> {attempt.password}</p>
                        <p><strong>Time:</strong> {attempt.timestamp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
