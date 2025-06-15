import React from 'react';

import { createContext } from 'react';
import { useReducer} from 'react';
import { useEffect } from 'react';


const INITIAL_STATE = {
 user: JSON.parse(localStorage.getItem("user")) || null, // Get user data from local storage or set to null if not found
 loading: false,
 error: null,   

};

export const AuthContext = createContext(INITIAL_STATE);
// https://chatgpt.com/share/6836271b-0a58-8006-bff4-5b0231228e50   
 // This is the link to the chatgpt conversation abput context provider and reducer for passing Auth data in react app without using props drilling
// create cotext helps to create a context for authentication state management that can be accessed throughout the application without passing props down manually at every level.
// useReducer helps to manage the state of the authentication process




const AuthReducer = (state, action) => {
     switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
             case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
            
             case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //  useeEffect for string user data in local storage and  for checking if user is logged in or not

useEffect(() => {
   localStorage.setItem("user", JSON.stringify(state.user));
}, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};