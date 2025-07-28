import React, { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
import { loadingContext } from "./LoadingContext";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {

    const{setLoading ,  setError} = useContext(loadingContext);

    const [user, setUser] = useState(false);
    const [userId, setUserId] = useState(null);

    

    const verifyUser = async () => {
        if(user && userId){
            console.log('user is already logged in');
            return true;
        }
        setLoading(true);
        const response = await axios.get('https://eminent-hagfish-winning.ngrok-free.app/api/auth/verify',
            {
                headers: {
                  "ngrok-skip-browser-warning": "69420",
                  "Content-Type": "application/json",
                },
                withCredentials: true
              },
             );
        if (response.data.error) {
             setError(response.data.error);
            setLoading(false);
            return false;
        }
        setError(null);
        setUserId(response.data.id);
        setUser(true);
        setLoading(false);
        return true;
    }

    const signup = async (email, password , firstName , lastName) => {
        setLoading(true);
        const response = await axios.post(
            'https://eminent-hagfish-winning.ngrok-free.app/api/auth/register',
            { email, password, firstName , lastName }, // Data (payload)
            {
              headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
              },
              withCredentials: true, // Should be inside config
            }
          );
          
        if (response.data.error) {
            setError(response.data.error);
            setLoading(false);
            return false;
        }
        setError(null);
        setLoading(false);
        return true;
    }

    const login = async (email, password) => {
        setLoading(true);
        const response = await axios.post('https://eminent-hagfish-winning.ngrok-free.app/api/auth/login', { email, password },
            {
                headers: {
                  "ngrok-skip-browser-warning": "69420",
                  "Content-Type": "application/json",
                },
                 withCredentials: true 
              },
        );
        if (response.data.error) {
            console.log("this is the error : ", response.data.error);
            setLoading(false);
            setError(response.data.error);
            return false;
        }
        setError(null);
        setLoading(false);
        return response.data;
    }

    const logout = async () => {
        setLoading(true);
        const response = await axios.get('https://eminent-hagfish-winning.ngrok-free.app/api/auth/logout',
            {
                headers: {
                  "ngrok-skip-browser-warning": "69420",
                  "Content-Type": "application/json",
                },
              },
            { withCredentials: true });
        if (response.data.error) {
            setError(response.data.error);
            setLoading(false);
            return;
        }
        setError(null);
        setUser(false);
        setLoading(false);
        verifyUser();
    }

    return (
        <authContext.Provider value={{ user, userId , signup , login , logout , verifyUser }}>
            {children}
        </authContext.Provider>
    )
}