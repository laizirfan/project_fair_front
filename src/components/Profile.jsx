import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'

import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { serverUrl } from '../services/baseUrl';
import { updateProfileApi } from '../services/allAPI';
import { toast } from 'react-toastify';


function Profile() {

  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: ""

  })
  const [existingImage, setExsistingImage] = useState("")
  const [preview, setPreview] = useState("")
  const [updateStatus,setUpdateStatus]=useState(false)

  const handleUpdate = async(e)=>{
   e.preventDefault()
   const{github,linkedin,username,email,password,profile} =userDetails
   if(!github || !linkedin) {
    alert('please fill the form completely')
   }
   else{
     const reqbody = new FormData()

   
     reqbody.append("username",username)
     reqbody.append("email",email)
     reqbody.append("password",password)
     reqbody.append("github",github)
     reqbody.append("linkedin",linkedin)
     preview?reqbody.append("profile",profile):reqbody.append("profile",existingImage)

     const token = sessionStorage.getItem("token")
     if(preview){
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization" : `Bearer ${token}`
      }

     const result = await updateProfileApi(reqbody,reqHeader)
     if(result.status==200){
      toast.success('Profile updated')
      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      setUpdateStatus(!updateStatus)
     }
     else{
      console.log(result);
      toast.error('Something went wrong')
     }


     }
     else{
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await updateProfileApi(reqbody,reqHeader)
     if(result==200){
      toast.success('Profile updated')
      sessionStorage.setItem("existingUser",JSON.stringify(result.data))
      setUpdateStatus(!updateStatus)
     }
     else{
      console.log(result);
      toast.error('something went wrong')
     }
     }


   }
  }

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userDetails, username: user.username,
        email: user.mailId, password: user.password, github: user.Github, linkedin: user.linkedin
      })
      setExsistingImage(user.Profile)
    }
  }, [updateStatus])

  useEffect(() => {
    if (userDetails.profile) {

      console.log(URL.createObjectURL(userDetails.profile));
      setPreview(URL.createObjectURL(userDetails.profile))
    }
    else {
      setPreview("")
    }

  }, [userDetails.profile])

  console.log(userDetails);
  console.log(existingImage);

  return (
    <>
      <div className='my-5 mx-4 shadow p-4 rounded' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>

        <div className='d-flex justify-content-between'>

          <h3 className='mt-3'>Profile</h3>

          <div className='mt-3'>
            <button type='button' onClick={() => setOpen(!open)}
              className='btn btn-outline-info'><FontAwesomeIcon icon={faAngleDown} /></button>
          </div>

        </div>

        <Collapse in={open}>

          <div>

            <div className='mt-4 d-flex justify-content-center align-items-center flex-column'>

              <label htmlFor='image'>
                <input type="file" id='image' style={{ display: 'none' }}
                  onChange={(e) => setUserDetails({ ...userDetails, profile: e.target.files[0] })} />



                {existingImage == '' ?
                  <img src={preview ? preview : "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png"}
                    width={'150px'} height={'150px'} alt="no image" />
                  :
                  <img src={preview ? preview : `${serverUrl}/uploads/${existingImage}`} height={'150px'} alt="" />
                }
              </label>

              <div className='mb-3 w-100'>

                <input type="text" placeholder='Github' value={userDetails.github} onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })}
                  className='form-control w-100' />
              </div>
              <div className='mb-3 w-100'>
                <input type="text" placeholder='linkedin' value={userDetails.linkedin} onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} className='form-control w-100' />
              </div>

              <div className='mb-3 w-100'>

                <button className='w-100 btn-outline' style={{ backgroundColor: 'lightblue' }} onClick={ handleUpdate}  > Update</button>
              </div>

            </div>

          </div>

        </Collapse>




      </div>
    </>
  )
}

export default Profile