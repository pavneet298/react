import React, { createContext, useState } from 'react'
import Component2 from './Component2'

export const NameContext = createContext();

const Component1 = () => {
  const [name, setName] = useState("Dheeraj");

  return (
    <NameContext.Provider value={{name, setName}}>
    <div>Component1</div>
    <Component2 />
    </NameContext.Provider>
    
  )
}

export default Component1