import React, { createContext, useState } from 'react'

//method --1)create context

export const AddProjectRes = createContext()
export const editProjectRes = createContext()
export const  isAuthoContext = createContext ()

//3)destrcutre children(predefined ) -- to access content by every component

function ContextSh({children}) {

    //2)create state in component

    const [AddResponse, setAddResponse] = useState({})
    const [editResponse,setEditResponse] = useState({})
    const [isAuthorized,setIsAuthorized] = useState(true)
 
    return (
        ///4)pass children for the context(here AddProjectRes ) to access

        //5)in value attribute write what can be accesd
        <AddProjectRes.Provider value={{ AddResponse, setAddResponse }}>
            <editProjectRes.Provider value={{editResponse,setEditResponse}}>
              <isAuthoContext.Provider value={{isAuthorized,setIsAuthorized}}>  
                 {children}
                 </isAuthoContext.Provider>
                </editProjectRes.Provider>
            
        </AddProjectRes.Provider>

    )
}

export default ContextSh