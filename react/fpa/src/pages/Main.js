import React, { useEffect, useState } from 'react'
import {SERVER_URL} from '../components/Api.js'
import axios from 'axios';
import { GrCaretPrevious,GrCaretNext } from "react-icons/gr";
import '../css/main.css'
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from './Modal.js';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 15;

export default function Main() {
  const [fpa, setFpa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // 서버 연결
  useEffect(()=>{
    fetchfpas()
  }, [])

  const fetchfpas = async () =>{
    try{
      const response = await axios.get(`${SERVER_URL}/api/financialProducts`)
      setFpa(response.data._embedded.financialProducts)
    } catch (error){
      console.log("리스트 에러 발생 :", error)
    }
  }

  const deleteSubmit = async (url) => {
    try {
      const response = await axios.delete(`${url}`)
      console.log(`ID ${url} 삭제됨`);
      fetchfpas()
    } catch (error) {
      console.error("상품 삭제 실패: ", error)
    }
  }

  const totalPages = Math.ceil(fpa.length / PAGE_SIZE)
  const currentFpas = fpa.slice((currentPage - 1)* PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleNextPage = () =>{
    setCurrentPage(next => Math.min(next + 1, totalPages))
  }

  const handlePrevPage = () =>{
    setCurrentPage(prev => Math.min(prev - 1, 1))
  }

  //ID 추출하는 함수
  const getId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf('/') + 1)
    navigate(`/Detail/${id}`);
  }

  return (
    <div id='body'>
      <div id='main-body'>
        <h1 id='title'>예적금 현황</h1>
        <table id='main-table'>
          <thead>
            <tr>
              <th id='bank-name'>은행명</th>
              <th id='category'>구분</th>
              <th id='bank-product-name'>상품명</th>
              <th id='base-rate'>기본금리</th>
              <th id='interest-rate'>최대금리</th>
              <th id='period'>기간</th>
              <th id='edit'>수정버튼</th>
              <th id='delete'>삭제버튼</th>
            </tr>
          </thead>
          <tbody>
            {currentFpas.map(fpa =>(
              <tr key={fpa.id}>
                <td onClick={()=>getId(fpa)}>{fpa.bankName} </td>
                <td onClick={()=>getId(fpa)}>{fpa.category}</td>
                <td onClick={()=>getId(fpa)}>{fpa.productName}</td>
                <td onClick={()=>getId(fpa)}>{fpa.baseRate}%</td>
                <td onClick={()=>getId(fpa)}>{fpa.interestRate}%</td>
                <td onClick={()=>getId(fpa)}>{fpa.period}개월</td>
                <td><Modal fpa={fpa} fetchfpas={fetchfpas}/></td>
                <td><RiDeleteBin5Line id='delete-button' onClick={()=>deleteSubmit(fpa._links.self.href)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='page-button'>
        <button id='left-button' onClick={handlePrevPage} disabled={currentPage === 1}><GrCaretPrevious /></button>
          <button id='right-button' onClick={handleNextPage} disabled={currentPage === totalPages}><GrCaretNext /></button>
        </div>
      </div>
    </div>
  )
}
