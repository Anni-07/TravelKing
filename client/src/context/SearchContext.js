import React from 'react';

import { createContext } from 'react';
import { useReducer} from 'react';


const INITIAL_STATE = {
  city: undefined,
  dates: [],
  // dates is an array of objects with startDate and endDate
  options:{
    adult:undefined,
    children: undefined,
    room: undefined,
  } 
};

export const SearchContext = createContext(INITIAL_STATE);
// https://chatgpt.com/share/6836271b-0a58-8006-bff4-5b0231228e50   
 // This is the link to the chatgpt conversation abput context provider and reducer for passing search data in react app without using props drilling



const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
        return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE;
            default :
            return state;
    }
}

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};