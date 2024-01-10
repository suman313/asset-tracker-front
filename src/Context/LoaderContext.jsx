import React, { useState } from 'react'
import { createContext } from 'react'

export const LoaderContext = createContext(false);

export const LoaderContextProvider = ({children}) => {
    const [loader, setLoader] = useState(false)
  return (
    <LoaderContext.Provider value={[loader, setLoader]}>{children}</LoaderContext.Provider>
  )
}
