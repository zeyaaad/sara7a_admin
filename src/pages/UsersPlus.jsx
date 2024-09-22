    import axios from 'axios'
    import React, { useContext, useEffect, useState } from 'react'
    import { MyContext } from '../context/context'
    import LoadingPage from '../components/LoadingPage'
import ButtonLoading from '../components/ButtonLoading'

    export default function UsersPlus() {
        const[users,setUsers]=useState(null)
        const{Host,token}=useContext(MyContext)
        let[loading,setLoaing]=useState(false)


        useEffect(()=>{
            getusers()
        },[]
        )
        async function getusers(){
            try {
                let res=await axios.get(`${Host}/api/v1/admin/usersplus`,{
                    headers:{
                        "token":localStorage.getItem("admin_token")
                    }
                })
                setUsers(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        async function removePro(id){
            setLoaing(true)
            try {
                let res=await axios.post(`${Host}/api/v1/admin/removepro`,{profileId:id},{
                    headers:{
                        "token":localStorage.getItem("admin_token")
                    }
                })
                getusers()
                console.log(res)
                setLoaing(false)
            } catch (error) {
                console.log(error)
                setLoaing(false)
                
            }
        }
        return (
        <div>
            {users!=null?<>
            <div class="container text-center">
        <h1 className='text-center mt-2' > جميع مستخدمين صارحني بلص  </h1>
            {users.length>0? <table className='table table-hover table-dark  mt-5  mx-auto' >
                <thead>
                    <th> #  </th>
                    <th> الاسم  </th>
                    <th> البريد </th>
                    <th> الجنس </th>
                    <th> السيره الذاتيه </th>
                    <th> نوع المستخدم </th>
                    <th> ازاله الميزه </th>
                </thead>
            <tbody className='text-center'>
                {users.map((user,i)=>
                <tr>
                    <td> {i+1} </td>
                    <td> {user.name} </td>
                    <td> {user.email} </td>
                    <td> {user.gender} </td>
                    <td> {user.bio || "لا يوجد"} </td>
                    <td> {user.type} </td>
                    <td>
                        <button onClick={()=>removePro(user._id)} className='btn btn-danger' >  {loading?<ButtonLoading/>:"ازالة الميزه"} </button>
                    </td>
                </tr>)}
            </tbody>
            </table>:<h5 className='text-center mt-5'> لا يوجد اي مستخدم لصارحني بلص حتي الان  </h5>}
        

            </div>
            
            </>:<LoadingPage/>}
            
        
        </div>
    )
    }
