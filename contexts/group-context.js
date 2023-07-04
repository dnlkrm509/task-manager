import React, { createContext, useReducer } from "react";
import { groupsReducer } from "../reducers/groupsReducer";

export const GroupContext = createContext();

const GroupContextProvider = ({children}) => {
    const [groups, dispatch] = useReducer(groupsReducer, []);

    return (
        <GroupContext.Provider value={{groups, dispatch}}>
            {children}
        </GroupContext.Provider>
    )
};

export default GroupContextProvider;