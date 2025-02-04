import React, { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// ✅ Create AuthContext with setUser included
const AuthContext = createContext({
    user: null,
    setUser: () => { }, // ✅ Ensure setUser is available in context
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Invalid credentials");
            console.log(user);

            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        Navigate("/"); 
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
