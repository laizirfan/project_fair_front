

//register form api

import { serverUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"

 export const registerApi = async(reqBody)=>{

   return await commonAPI('POST',`${serverUrl}/user/register`,reqBody,"")
}

///login 

export const loginApi = async(reqBody)=>{
  return await commonAPI('POST',`${serverUrl}/user/login`,reqBody,"")
}

//add project

 export const addProjectApi = async(reqBody,reqHeader)=>{
 return  await commonAPI('POST',`${serverUrl}/projects`,reqBody,reqHeader)
}

///get home project 

export const gethomeProjectApi = async()=>{
  return await commonAPI('GET',`${serverUrl}/home-project`,"","")
}

///get all projects

export const allProjectApi = async(searchKey)=>{

///query parameter= path?key=value

  return await commonAPI('GET',`${serverUrl}/all-product?search=${searchKey}`,"","")
}


// gett user project

export const getUserProjectApi = async(reqHeader)=>{
  return await commonAPI('GET',`${serverUrl}/user/all-project`,"",reqHeader)
}


//del project from user

export const deleteProjectApi = async(id,reqHeader)=>{
  return await commonAPI('DELETE',`${serverUrl}/delete-project/${id}`,{},reqHeader)
}

//update api

export const updateProjectApi = async(id,reqBody,reqHeader)=>{
  return await commonAPI("PUT",`${serverUrl}/update-project/${id}`,reqBody,reqHeader)

}

//update profile
export const updateProfileApi = async(reqBody,reqHeader)=>{
return await commonAPI("PUT",`${serverUrl}/update-profile`,reqBody,reqHeader)
}



