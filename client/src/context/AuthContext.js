import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/auth/getUserRole`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          setRole(response.data.role);
        } catch (error) {
          console.error("Failed to fetch user information:", error);
          setRole(null); // Set role to null if no token is found
          navigate("/login", { replace: true });
        }
      } else {
        console.warn("Token not found in localStorage.");
        setRole(null); // Set role to null if no token is found
        navigate("/login");
      }
      setLoading(false); // Set loading to false after fetching
    };
    fetchRole();

    const handleStorageChange = () => {
      fetchRole();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, role, setRole]); // Ensure this effect runs on mount

  return (
    <AuthContext.Provider value={{ role, setRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
