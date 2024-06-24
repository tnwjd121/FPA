import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../components/Api'
import { useParams } from 'react-router-dom';
import '../css/detail.css'

export default function Detail() {
  const [fpaData, setFpaData] = useState(null)
  const { id } = useParams();

  useEffect(()=>{
    detailfpas()
  },[id])

  const detailfpas = async () =>{
    try {
      const response = await axios.get(`${SERVER_URL}/api/financialProducts/${id}`)
      setFpaData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (!fpaData) {
    return (
      <div id='body'>
          Loading...
      </div>
    )
  }

  return (
    <div id='body'>
      <div id='detail-body'>
        <h1 id='title'>{fpaData.productName}</h1>
        <p><strong>은행명:</strong> {fpaData.bankName}</p>
        <p><strong>구분:</strong> {fpaData.category}</p>
        <p><strong>기본금리:</strong> {fpaData.baseRate} %</p>
        <p><strong>최대금리:</strong> {fpaData.interestRate} %</p>
        <p><strong>기간:</strong> {fpaData.period} 개월</p>
        <p><strong>최소납입금액:</strong> {fpaData.minPrice} 만원</p>
        <p><strong>최대납입금액:</strong> {fpaData.maxPrice} 만원</p>
        <p><strong>상세정보:</strong> {fpaData.information}</p>

      </div>
    </div>
  )
}
