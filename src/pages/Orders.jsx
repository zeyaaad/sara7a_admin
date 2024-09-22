import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/context'
import LoadingPage from '../components/LoadingPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import styles
import ButtonLoading from '../components/ButtonLoading';
export default function Orders() {
    const[orders,setOrders]=useState(null)
    const{Host,token}=useContext(MyContext)
    let[loaing,setLoading]=useState(false)
    useEffect(()=>{
        getOrders()
    },[]
    )
    async function getOrders(){
        try {
            let res=await axios.get(`${Host}/api/v1/admin/orders`,{
                headers:{
                    "token":token
                }
            })
            setOrders(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }


    async function accsept(orderId,userId,type){
        setLoading(true)
        try {
            let res=await axios.post(`${Host}/api/v1/admin/${type}`,{
                orderId:orderId,
                profileId:userId
            },{
                headers:{
                    "token":token
                }
            })
            toast.success(" تم بنجاح ")
                getOrders()
                setLoading(false)
            } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }


    return (
    <div>
        <ToastContainer/>
        {orders!=null?<>
        <div class="container text-center">
      <h1 className='text-center mt-2' >  جميع طلبات تريقة الحساب  </h1>
      {orders.length>0?<table className='table table-hover table-dark  mt-5  mx-auto' >
            <thead>
                <th> #  </th>
                <th> اسم المستخدم  </th>
                <th> البريد </th>
                <th>  رسالة الطلب </th>
                <th> سبب الطلب </th>
                <th> الموافقه او الرفض </th>
            </thead>
        <tbody className='text-center'>

            {orders.map((order,i)=>
            <tr>
                <td> {i+1} </td>
                <td> {order.userId.name} </td>
                <td> {order.userId.email} </td>
                <td> {order.messageText||"لا يوجد"} </td>
                <td> {order.why} </td>
                <td> 
                    <button onClick={()=>accsept(order._id,order.userId._id,"accsept")} className='btn btn-primary' > {loaing?<ButtonLoading/>:"موافقه"} </button>
                    <button onClick={()=>accsept(order._id,order.userId._id,"no")}  className='btn btn-danger me-1' > {loaing?<ButtonLoading/>:"رفض"} </button>
                     </td>
            </tr>)}
        </tbody>
        </table>:<h4 className='text-center mt-5'> لا يوجد اي طلبات تريقة حتي الان </h4>}
        

        </div>
        
        </>:<LoadingPage/>}
        
      
    </div>
  )
}
