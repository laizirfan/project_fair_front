import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'bootstrap';
import { addProjectApi } from '../services/allAPI';
import { AddProjectRes } from '../context/ContextSh';

function Add() {
  const{setAddResponse} = useContext(AddProjectRes)
  ///states
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })

  //console.log(videoDetails);

  const [show, setShow] = useState(false);

  //url
  const [preview, setPreview] = useState("")

  //key for the onchange to invoke ie-- for upload same image  ---key attritube which can invoke onchange

  const[key,setKey]=useState(false)

  ///for token
  const[token,setToken] =useState("")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //to clear 
  const handleClose1 = () => {
    setVideoDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""

    }),
      setPreview("")
      setKey(!key)
  }

  //for adding
  const handleAdd = async(e) => {

    e.preventDefault()


    const { title, language, github, website, overview, projectImage } = videoDetails
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info('Kindly fill the form completly')
    }
    else {
       //how to handle upload
       //1)create object for formData class
       const reqbody = new FormData()

      //to add data append 
      reqbody.append("title",title)
      reqbody.append("language",language)
      reqbody.append("github",github)
      reqbody.append("website",website)
      reqbody.append("overview",overview)
      reqbody.append("projectImage",projectImage)
      
      if(token){
  
        let reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
  
  
        const result = await addProjectApi(reqbody,reqHeader)
  
      /*console.log(result)*/
     if(result.status==200){
      handleClose1()
      handleClose()
      setAddResponse(result.data)
     }
     else{
      toast.error('sometingg went wrong')
      handleClose1()
      handleClose()

     }

      }
    }

    
    
    


  }


useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }
  else{
    setToken("")
  }
},[])

console.log(token);



  useEffect(() => {
    if (videoDetails.projectImage) {
      //convertion of url
      setPreview(URL.createObjectURL(videoDetails.projectImage))
    }
  }, [videoDetails.projectImage])

  //console.log(preview);


  return (
    <>
      <Button variant="success" onClick={handleShow}>Add Project</Button>

      <Modal show={show} onHide={handleClose} size='lg'>

        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="image" >
                
                <input id="image" type="file" 

                key={key} style={{ display: 'none' }} 

                onClick={(e) => setVideoDetails({ ...videoDetails, projectImage: e.target.files[0] })} />
                <img src=
                  {preview ? preview : "https://th.bing.com/th/id/R.a2328c02d93bc0dac86bc2808788944b?rik=LjRjnuuK6IWFPw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fcartoon-camera-transparent%2fcartoon-camera-transparent-1.png&ehk=SIR7D2bQwEXYA%2fcyFOCIQY%2bkHtuT%2fjL2WK2nfHp4%2bj4%3d&risl=&pid=ImgRaw&r=0<p></p>"}
                  alt="no image" className='w-100' />

              </label>
            </Col>

            <Col sm={12} md={6}>
              <form>
                <div className='mb-3 mt-3'>
                  <input type="text" placeholder='Title ' value={videoDetails.title} onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })} className='form-control w-100' />
                </div>
                <div className='mb-3'>
                  <input type="text" placeholder='Language ' value={videoDetails.language} onChange={(e) => setVideoDetails({ ...videoDetails, language: e.target.value })} className='form-control w-100' />
                </div>
                <div className='mb-3'>
                  <input type="text" placeholder='Github ' value={videoDetails.github} onChange={(e) => setVideoDetails({ ...videoDetails, github: e.target.value })} className='form-control w-100' />
                </div>
                <div className='mb-3'>
                  <input type="text" placeholder='Website' value={videoDetails.website} onChange={(e) => setVideoDetails({ ...videoDetails, website: e.target.value })} className='form-control w-100' />
                </div>
                <div className='mb-3'>
                  <textarea row={4} placeholder='Overview' value={videoDetails.overview} onChange={(e) => setVideoDetails({ ...videoDetails, overview: e.target.value })} className='form-control w-100'>

                  </textarea>
                </div>

              </form>

            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme='colored' position='top-center' autoClose='2000' />


    </>
  )
}

export default Add