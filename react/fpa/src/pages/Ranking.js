import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../components/Api'
import '../css/ranking.css'

export default function Ranking() {

  const [selectOption, setSelectOption] = useState('예금')
  const [fpadata, setFpadata] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    filterfpas()
  }, [selectOption])

  const filterfpas = async () =>{
    try{
      const response = await axios.get(`${SERVER_URL}/api/financialProducts`)
      const allFpa = response.data._embedded.financialProducts
      const filteredFpa = allFpa.filter(fpa => fpa.category === selectOption)
      const sortedFpa = filteredFpa.sort((a,b) => b.interestRate - a.interestRate)
      setFpadata(sortedFpa)
    } catch (error){
      console.log("리스트 에러 발생 :", error)
    }
  }

  const getId = (data) => {
    const href = data._links.self.href;
    const id = href.substring(href.lastIndexOf('/') + 1)
    navigate(`/Detail/${id}`);
  }

  return (
    <div id='body'>
      <div id='ranking-body'>
        <h1 id='title'>상품 랭킹</h1>
        <select id='ranking-select' value={selectOption} onChange={(e)=> setSelectOption(e.target.value)}>
          <option value='예금'>예금</option>
          <option value='적금'>적금</option>
        </select>
        <table id='main-table'>
          <thead>
            <tr>
              <th id='rank'>순위</th>
              <th id='bank-name'>은행명</th>
              <th id='category'>구분</th>
              <th id='bank-product-name'>상품명</th>
              <th id='base-rate'>기본금리</th>
              <th id='interest-rate'>최대금리</th>
              <th id='period'>기간</th>
            </tr>
          </thead>
          <tbody>
            {fpadata.map((fpa, i) =>(
              <tr key={fpa.id} onClick={()=> getId(fpa)}>
                <td>{++i}위</td>
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
    </div>
  )
}
