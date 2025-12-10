import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("auth:isAuthenticated");
    if (stored === "true") setIsAuthenticated(true);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth:isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("auth:isAuthenticated", "false");
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
