
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main'
import Add from './pages/Add'
import Detail from './pages/Detail'
import './App.css'
import Modal from './pages/Modal';


function App() {
  
  return (
    <Router>
      <>
        <Header/>
        <div id='nav-background'>
          <nav id='nav'>
            <ul id='nav-text'>
              <li><Link to='/Add'>상품 등록</Link></li>
              <li><Link to='/Modal'>모달 테스트</Link></li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path='/' element={<Main/>} /> 
          <Route path='/Add' element={<Add />} /> 
          <Route path='/Modal' element={<Modal />} /> 
        </Routes>
        <Footer/>
      </>
    </Router>
  )
}

export default App;
