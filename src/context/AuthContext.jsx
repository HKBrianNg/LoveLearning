import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserInfo();
    }
  }, [token]);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/info');
      if (res.data.code === 200) {
        setUser(res.data.user);
      }
    } catch (err) {
      logout();
    }
  };

  const login = async (username, password) => {
    const res = await axios.post('http://localhost:5000/api/user/login', {
      username, password
    });
    if (res.data.code === 200) {
      const t = res.data.token;
      localStorage.setItem('token', t);
      setToken(t);
      setUser(res.data.user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
      return true;
    }
    return false;
  };

  const updateUser = async (data) => {
    await axios.post('http://localhost:5000/api/user/profile', data);
    fetchUserInfo();
  };

  const changePwd = async (oldPwd, newPwd) => {
    const res = await axios.post('http://localhost:5000/api/user/changepwd', {
      oldPwd, newPwd
    });
    return res.data.code === 200;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, updateUser, changePwd, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);