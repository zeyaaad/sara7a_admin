import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/context'
import LoadingPage from '../components/LoadingPage'

export default function Messages() {
    const[messages,setMessages]=useState(null)
    const{Host,token}=useContext(MyContext)
    useEffect(()=>{
        getMessages()
    },[]
    )
    async function getMessages(){
        try {
            let res=await axios.get(`${Host}/api/v1/admin/messages`,{
                headers:{
                    "token":token
                }
            })
            setMessages(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
    <div>
        {messages!=null?<>
        <div class="container text-center">
      <h1 className='text-center mt-2' > جميع الرسائل  </h1>
        <table className='table table-hover table-dark  mt-5  mx-auto' >
            <thead>
                <th> #  </th>
                <th> اسم المستخدم  </th>
                <th> البريد </th>
                <th>  رسالة  </th>
            </thead>
        <tbody className='text-center'>
            {messages.map((message,i)=>
            <tr>
                <td> {i+1} </td>
                <td> {message.userId.name} </td>
                <td> {message.userId.email} </td>
                <td> {message.messageText||"لا يوجد"} </td>
            </tr>)}
        </tbody>
        </table>

        </div>
        
        </>:<LoadingPage/>}
        
      
    </div>
  )
}
