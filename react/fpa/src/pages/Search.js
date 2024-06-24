import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { SERVER_URL } from '../components/Api';
import '../css/search.css'

export default function Search() {
  // 검색 필터 or productName
  const [searchOption, setSearchOption] = useState('bankName')
  // 검색 요청 값
  const [searchInput, setSearchInput] = useState('')
  // 검색 값
  const [searchResults, setSearchResults] = useState([])
  // 검색 여부 확인
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/financialProducts`)
      const allFpa = response.data._embedded.financialProducts;
      const filteredFpa = allFpa.filter(fpa => fpa[searchOption].toLowerCase().includes(searchInput.toLowerCase()))
      setSearchResults(filteredFpa)
      setSearched(true)
    } catch (error) {
      console.error(error)
    }
  }

  const getId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf('/') + 1)
    navigate(`/Detail/${id}`);
  }


  return (
    <div id='body'>
      <div id='search-body'>
        <select value={searchOption} onChange={(e)=> setSearchOption(e.target.value)}>
          <option value='bankName'>은행명</option>
          <option value='productName'>상품명</option>
        </select>
        <input type='text' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
        <button id='search-button' onClick={handleSearch}><FaSearch /></button>
      </div>
      {searched && searchResults.length>0 ? (
        <div>
          <h1 id='title'>검색 결과</h1>
            <table id='main-table'>
            <thead>
              <tr>
                <th id='bank-name'>은행명</th>
                <th id='category'>구분</th>
                <th id='bank-product-name'>상품명</th>
                <th id='base-rate'>기본금리</th>
                <th id='interest-rate'>최대금리</th>
                <th id='period'>기간</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map(fpa =>(
                <tr key={fpa.id} onClick={()=>getId(fpa)}>
                  <td>{fpa.bankName}</td>
                  <td>{fpa.category}</td>
                  <td>{fpa.productName}</td>
                  <td>{fpa.baseRate}</td>
                  <td>{fpa.interestRate}</td>
                  <td>{fpa.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): searched && searchResults.length === 0 ? (
        <div>
          <h1 id='title'>입력한 검색어에 대한 결과가 없습니다.</h1>
        </div>
      ) : null}
    </div>
  )
}
