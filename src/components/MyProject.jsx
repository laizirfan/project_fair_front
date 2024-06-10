import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import EditProject from './EditProject'
import { deleteProjectApi, getUserProjectApi } from '../services/allAPI'
import { Link } from 'react-router-dom'
import { AddProjectRes, editProjectRes } from '../context/ContextSh'

function MyProject() {

  const{AddResponse}=useContext(AddProjectRes)
  const{editResponse}=useContext(editProjectRes)

  const [userProject, setUserProject] = useState([])

  const getAllUserPro = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await getUserProjectApi(reqHeader)
      setUserProject(result.data);

    }

  }


const deleteProject=async(id)=>{
  if (sessionStorage.getItem("token")) {
    const token = sessionStorage.getItem("token")

    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    const result = await deleteProjectApi(id,reqHeader)
    console.log(result);
    if(result.status==200){

      getAllUserPro()
    }
    else{
      alert('something went wrong')
    }

  }

}


  useEffect(() => {
    getAllUserPro()
  }, [AddResponse,editResponse])



  return (

    <div className='m-5 shadow p-4 rounded'>
      <div className='d-flex'>
        <h3 className='mt-4 text-dark'>My Project</h3>
        <div className='ms-auto mt-4'>
          <Add />
        </div>
      </div>

      {userProject?.length > 0 ?
        userProject.map((item) => (<div className='mt-4 p-3 bg-light rounded d-flex ' >
          <h5>{item.title}</h5>
          <div className='ms-auto d-flex align-items-center'>
            <EditProject project={item}/>

            <Link to={item.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='text-success ms-4 ' /></Link>
            <FontAwesomeIcon icon={faTrash} className='text-danger ms-4' onClick={()=>deleteProject(item._id)} />
          </div>

        </div>))

        :
        <p className='text-danger mt-3'>No Project added yet</p>
      }


    </div>
  )
}

export default MyProject