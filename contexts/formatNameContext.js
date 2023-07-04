import React, { createContext, useState } from "react";

export const FormatNameContext = createContext();

const FormatNameContextProvider = ({children}) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [fLetterName, setFLetterName] = useState('');
    const [fullName, setFullName] = useState('');
    
    function getFormatedName(f, l) {
        const fNameLength = f.length;
        const lNameLength = l.length;
        
        const newFName = f[0].toUpperCase();
        const newLName = l[0].toUpperCase();

        const newFName2 = f[0].toUpperCase() + f.slice(1, fNameLength).toLowerCase();
        const newLName2 = l[0].toUpperCase() + l.slice(1, lNameLength).toLowerCase();

        setFLetterName(newFName + newLName);
        setFName(newFName2);
        setLName(newLName2);
        setFullName(newFName2 + " " + newLName2);
        return {
            fName,
            lName,
            fullName,
            fLetterName,
        }
    }

    return (
        <FormatNameContext.Provider
            value={{
                getFormatedName
            }}
        >
            {children}
        </FormatNameContext.Provider>
    )
};

export default FormatNameContextProvider