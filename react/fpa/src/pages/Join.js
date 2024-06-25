import axios from 'axios'
import React, { useState } from 'react'
import { SERVER_URL } from '../components/Api'
import '../css/join.css'
import { useNavigate } from 'react-router-dom'
export default function Join() {

  const[user, setUser] = useState({
    userid: '',
    password: '',
    email:'',
    name: '',
    gender: '남성',
    birth:''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {id, value} = e.target
    setUser({
      ...user,
      [id]:value
    })
  }


  const JoinSubmit = async (e) =>{
    const inputs = document.querySelectorAll("input")
    let isFormValid = true;
    inputs.forEach(input => {
      if(input.vlaue === ''){
        isFormValid = false;
      }
    })
    if(!isFormValid){
      alert("모든 정보 작성 부탁드립니다.")
      return
    }

    const responseUser = await axios.get(`${SERVER_URL}/api/users`)
    const userData = responseUser.data._embedded.users
    const userIdCheck = userData.filter(users => users.userid === user.userid)
    if(userIdCheck.length> 0){
      alert("중복된 아이디가 있습니다.")
      return
    }

    try {
      const response = await axios.post(`${SERVER_URL}/api/users`, user)
      alert(`${response.data.userid}님 회원가입 완료되었습니다.`)
      navigate(`/Login`);

    } catch (error) {
      console.error("로그인 에러 발생 : ", error)
    }
  }
  return (
    <div id='join-body'>
      <div id='join'>
        <h1 id='join-title'>Join</h1>
        <label>
          <span id='join-span'>아이디</span>
          <input type='text' id='userid' value={user.userid} onChange={handleChange}/>
        </label>
        <label>
          <span id='join-span'>비밀번호</span>
          <input type='password' id='password' value={user.password} onChange={handleChange}/>
        </label>
        <label>
          <span id='join-span'>이메일</span>
          <input type='email' id='email' value={user.email} onChange={handleChange}/>
        </label>
        <label>
          <span id='join-span'>이름</span>
          <input type='text' id='name' value={user.name} onChange={handleChange}/>
        </label>
        <label>
          <span id='join-span'>성별</span>
          <select id='gender' value={user.gender} onChange={handleChange}>
            <option>남성</option>
            <option>여성</option>
          </select>
        </label>
        <label>
          <span id='join-span'>생년월일</span>
          <input type='date' id='birth' value={user.birth} onChange={handleChange}/>
        </label>
        <button id='join-button' onClick={JoinSubmit}>회원가입</button>
      </div>

    </div>
  )
}
