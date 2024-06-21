import React from 'react'
import '../css/footer.css'

export default function Footer() {
  return (
    <footer>
      <div id='footer-list'>
        <ul>
          <li className='rightLine'>GitGub</li>
          <li>|</li>
          <li>Notion</li>
        </ul>
        <div id='footer-text'>
          <p>저자 : BaekSujung</p>
          <p>이메일 : aojj121@naver.com</p>
          <p>Copyright 2024. cocoder . All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
