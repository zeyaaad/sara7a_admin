import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/context'
import LoadingPage from '../components/LoadingPage'

export default function Users() {
    const[users,setUsers]=useState(null) 
    const{Host,token}=useContext(MyContext)
    useEffect(()=>{
        getusers()
    },[]
    )
    async function getusers(){
        try {
            let res=await axios.get(`${Host}/api/v1/admin/users`,{
                headers:{
                    "token":token
                }
            })
            setUsers(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
    <div>
        {users!=null?<>
        <div class="container text-center">
      <h1 className='text-center mt-2' > جميع المستخدمين المسجلين بالموقع  </h1>
        <table className='table table-hover table-dark  mt-5  mx-auto' >
            <thead>
                <th> #  </th>
                <th> الاسم  </th>
                <th> البريد </th>
                <th> الجنس </th>
                <th> السيره الذاتيه </th>
                <th> نوع المستخدم </th>
            </thead>
        <tbody className='text-center'>
            {users.map((user,i)=>
            <tr>
                <td> {i+1} </td>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> {user.gender} </td>
                <td> {user.bio||"لا يوجد"} </td>
                <td> {user.type} </td>
            </tr>)}
        </tbody>
        </table>

        </div>
        
        </>:<LoadingPage/>}
        
      
    </div>
  )
}
