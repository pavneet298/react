import React, { useContext } from 'react'
import { NameContext } from './Component1'

const Component3 = () => {
    const {name, setName} = useContext(NameContext)
    
  return (
    <>
    <div>{name}</div>
    <input onChange={(e)=>setName(e.target.value)}/>
    
    </>
  )
}

export default Component3