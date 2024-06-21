import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/header.css'

export default function Header() {
  const navigate = useNavigate();
    return (
      <>
        <header className='header'>
          <div className='header-left'>
            <div className='logo' onClick={() => navigate('/')}>FPA</div>
          </div>
          <div className='header-right'>
            <div onClick={() => navigate('/Login')}>로그인</div>
            <div onClick={() => navigate('/Join')}>회원가입</div>
          </div>
        </header>
      </>
  )
}
