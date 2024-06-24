
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main'
import Add from './pages/Add'
import Detail from './pages/Detail'
import './App.css'
import Modal from './pages/Modal';
import Search from './pages/Search';
import Ranking from './pages/Ranking';
import Calc from './pages/Calc';

function App() {
  
  return (
    <Router>
      <>
        <Header/>
        <div id='nav-background'>
          <nav id='nav'>
            <ul id='nav-text'>
              <li><Link to='/Add'>예적금 등록</Link></li>
              <li><Link to='/Search'>예적금 검색</Link></li>
              <li><Link to='/Ranking'>예적금 랭킹</Link></li>
              <li><Link to='/Calc'>이자 계산기</Link></li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path='/' element={<Main/>} /> 
          <Route path='/Add' element={<Add />} /> 
          <Route path='/Modal' element={<Modal />} /> 
          <Route path='/Detail/:id' element={<Detail />} /> 
          <Route path='/Search' element={<Search />} /> 
          <Route path='/Ranking' element={<Ranking/>} /> 
          <Route path='/Calc' element={<Calc/>} /> 
        </Routes>
        <Footer/>
      </>
    </Router>
  )
}

export default App;
