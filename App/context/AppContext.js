import React, { createContext, useContext, useEffect } from 'react';
import { useReducer } from 'react';
import { reducer } from './reducer';
import { ACTIONS } from './actions';
// import { useGoogleLogin } from '@react-oauth/google';
const AppContext = createContext({ user: null, token: null });
export const AppContextProvider = ({ children }) => {
    const initialProps = {
        user: null,
        token:null,
    };
    const [state, dispatch] = useReducer(reducer, initialProps);

    //controllers
    const logout = ()=>{
        dispatch({type:ACTIONS.LOGOUT})
    }
    const getUser = ()=>{
        dispatch({type:ACTIONS.GET_USER})
    }
    const setUser = (payload)=>{
        dispatch({type:ACTIONS.SET_USER,payload})
    }
    
    // const googleLoginSuccess = async res => {
    //     const token = res?.access_token;
    //     const data = await getData(
    //         `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    //     );
    //     let user = {
    //         name: data?.name,
    //         profilePic: data?.picture,
    //         email: data?.email,
    //     };
    //     console.log(user);
    // };
    // const googleLoginFailure = res => {
    //     console.log('login failure', res);
    // };
    // const loginWithGoogle = useGoogleLogin({
    //     onError: res => googleLoginFailure(res),
    //     onSuccess: res => googleLoginSuccess(res),
    // });
    const share = {
        ...state,
        // loginWithGoogle,
        setUser,
        logout
    };


    return (
        <AppContext.Provider value={{ ...share }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
