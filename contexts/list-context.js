import React, { createContext, useReducer } from "react";
import { todosReducer } from "../reducers/todosReducer";

export const ListContext = createContext();

const ListContextProvider = ({children}) => {
    const [todos, dispatch] = useReducer(todosReducer, []);
    const [uncheckedTodos, U_Dispatch] = useReducer(todosReducer, []);
    const [checkedTodos, Ch_Dispatch] = useReducer(todosReducer, []);

    return (
        <ListContext.Provider
            value={{
                    todos,
                    uncheckedTodos,
                    checkedTodos,
                    dispatch,
                    U_Dispatch,
                    Ch_Dispatch
                }}
            >
            {children}
        </ListContext.Provider>
    )
};

export default ListContextProvider;