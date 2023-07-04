import React, { createContext, useReducer } from "react";
import { todosReducer } from "../reducers/todosReducer";

export const ListContext = createContext();

const ListContextProvider = ({children}) => {
    const [todos, dispatch] = useReducer(todosReducer, []);

    return (
        <ListContext.Provider value={{todos, dispatch}}>
            {children}
        </ListContext.Provider>
    )
};

export default ListContextProvider;