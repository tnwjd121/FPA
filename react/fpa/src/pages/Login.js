import axios from 'axios'
import React, { useState } from 'react'
import { SERVER_URL } from '../components/Api'
import "../css/login.css"
import { useNavigate } from 'react-router-dom'
export default function Login() {

  const[login, setLogin] = useState({
    userid: '',
    password: '',
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {id, value} = e.target
    setLogin({
      ...login,
      [id]:value
    })
  }

  const LoginSubmit = async (e) =>{
    try {
      const response = await axios.get(`${SERVER_URL}/api/users`)
      const userData = response.data._embedded.users
      const loginCheck = userData.filter(users => users.userid === login.userid && users.password === login.password)
      if(loginCheck.length>0){
        alert(`${login.userid}님 로그인 하였습니다.`)
        navigate('/')
      }else{
        alert('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
      } catch (error) {
    console.error("로그인 에러 발생 : ", error)
    }
  }

  return (
    <div id='login-body'>
      <div id='login'>
        <h1 id='login-title'>Login</h1>
        <label>
          <span id='login-span'>아이디</span>
          <input type='text' id='userid' value={login.userid} onChange={handleChange}/>
        </label>
        <label>
          <span id='login-span'>비밀번호</span>
          <input type='password' id='password' value={login.password} onChange={handleChange}/>
        </label>
        <button id='login-button' onClick={LoginSubmit}>로그인</button>
      </div>

    </div>
  )
}
