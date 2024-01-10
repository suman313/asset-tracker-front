import React, { useState } from 'react'
import { createContext } from 'react'

export const PermissionContext = createContext([]);

export const PermissionContextProvider = ({children}) => {
    const [perms, setPerms] = useState([])
    return (
        <PermissionContext.Provider value={[perms, setPerms]}>{children}</PermissionContext.Provider>
    )
}