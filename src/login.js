import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    const [name , setName ] = useState('')
    const [password , setPassword ] = useState('')
    const navigate = useNavigate()
    const onLogin = async() => {
        try {
            const response = await fetch('http://localhost:6001/login',{
                method : 'POST',
                headers : {'Content-type' : 'application/json'},
                body : JSON.stringify({name , password})
            })
            if(!response.ok){
                console.log('could get user');
            }
            let user = await response.json();
            localStorage.setItem('user' , user[0].id)
            navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <div className="absolute top-1/3 left-1/3 h-64 w-1/3  text-white shadow-md  p-8">
           <div className="flex flex-col gap-7 text-lg " >
             <label>Name :      <input type="text" value={name} onChange={e => setName(e.target.value)} className=" ml-7 text-green-600 shadow-md shadow-white bg-gray-400 bg-opacity-20"/></label>
            <label  >Password : <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="text-green-600 shadow-md shadow-white bg-gray-400 bg-opacity-20" /></label>
            </div>
            <button onClick={() => onLogin()} className="h-10 shadow-sm shadow-green-500 w-36 mt-10 ml-28" >Submit</button>
            
        </div>

        </>
    )
}
export default Login