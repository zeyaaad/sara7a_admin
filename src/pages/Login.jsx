import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import { MyContext } from '../context/context';
import ButtonLoading from '../components/ButtonLoading';

function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[errs,seterrs]=useState({})
    const {isLogIn,setIsLogIn,Host } = useContext(MyContext);
  const[loading,setLoading]=useState(false)
let go=useNavigate();
     const schema=Yup.object().shape({
        email:Yup.string().required("يرجي كتابه البريد الالكتروني").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"يرجي بريد الالكتروني صحيح "),
        pass:Yup.string().required("اكتب الباسوورد")
    });


  const handleSubmit = async (e) => {
    setLoading(true)
    
    e.preventDefault();
      try {
            await schema.validate({"email":email.trim(),"pass":password.trim()},{abortEarly:false});
            seterrs({});
              try {
                 const response = await axios.post(`${Host}/api/v1/admin/login`,
                 JSON.stringify({email:email.trim() , password:password.trim()}) , {
                      headers: {
                    'Content-Type': 'application/json',
                    }
                 });
                if (response.data.message=="success") {
                  let userData=jwtDecode(response.data.token)
                  localStorage.setItem("user_data",JSON.stringify(userData))
                  localStorage.setItem("admin_token",response.data.token)
                  setError(null)
                  setIsLogIn(true)
                  go("/users")
                } else {
                  setError(response.data.err);
                }
                setLoading(false)
              } catch(err) {
                if(err.response.status==400){
                  setError("البريد او الباسوورد خطأ")
                }else{
                  setError(" حدث خطأ ما حاول مره اخرى")
                  console.log(err)
                }
                setLoading(false)
              }
              
              setLoading(false)
            } catch (validationErrors) {
              var errors={}
              validationErrors?.inner?.forEach(err => {
                errors[err.path]=err.message;
                
            });
            seterrs(errors)
            
            setLoading(false)
        }

  };

  return (
    <div className="loginpage">
      <div className="container">
        <form className='w-md-75 w-lg-75 w-sm-100  p-4 contform mx-auto mt-5' onSubmit={handleSubmit}>
      <h2 className='text-center'>  تسجيل الدخول لصفحة الادمن    </h2>
            {error && <p className='alert alert-danger'>{error}</p>}

      <label className='mt-3 ' htmlFor="">البريد الالكتروني:</label>
      <input className='form-control '
        type="text"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
                  {errs.email &&<p className='text-danger'>{errs.email}</p>}

      <label className='mt-3' htmlFor="">كلمه السر:</label>
      <input
      
      className='form-control '
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    {errs.pass &&<p className='text-danger'>{errs.pass}</p>}
      <button className='btn btn-primary mt-5' type="submit"> {loading?<ButtonLoading/>:"تسجيل الدخول"} </button>
    </form>
      </div>
    </div>  
    
  );
}

export default Login;

