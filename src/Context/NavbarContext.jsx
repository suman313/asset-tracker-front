import React, { useState } from 'react'
import { createContext } from 'react'

export const NavbarContext = createContext(1);

export const NavbarContextProvider = ({children}) => {
    const [navState, setNavState] = useState(1)
  return (
    <NavbarContext.Provider value={[navState, setNavState]}>{children}</NavbarContext.Provider>
  )
}
