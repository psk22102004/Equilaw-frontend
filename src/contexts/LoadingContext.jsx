import React , {useState , createContext} from 'react';

export const loadingContext = createContext();

export const LoadingProvider = ({children})=>{
    const [loading , setLoading] = useState(null);
    const [error , setError] = useState(null);

    return(
        <loadingContext.Provider value={{loading , setLoading , error , setError}}>
            {children}
        </loadingContext.Provider>
    )
}

