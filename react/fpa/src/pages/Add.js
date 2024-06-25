import React, { useState } from 'react'
import '../css/add.css'
import axios from 'axios';
import { SERVER_URL } from '../components/Api';

export default function Add() {

  const[formData, setFormData] = useState({
    bankName : "",
    productName : "",
    category : "예금",
    baseRate : "",
    interestRate : "",
    period : "",
    minPrice : "",
    maxPrice : "",
    information : ""
  })

  const handleChange = (e) =>{
    const{id, value} = e.target;
    setFormData({
      ...formData,
      [id]:value
    })
  }

  const addSubmit = async (e) => {
    const inputs = document.querySelectorAll("input");
    const textarea = document.querySelector("textarea");
    let isFormValue = true;
    inputs.forEach(input =>{
      if(input.value === ''){
        isFormValue = false
      }
    })
    if(textarea.value === ''){
      isFormValue = false
    }
    if(!isFormValue){
      alert("모든 정보 입력 부탁드립니다.")
      return
    }
    try {
      const response = await axios.post(`${SERVER_URL}/api/financialProducts`, formData)
      alert(`${response.data.productName} 등록 완료되었습니다.`)
      setFormData({
        bankName : "",
        productName : "",
        category : "예금",
        baseRate : "",
        interestRate : "",
        period : "",
        minPrice : "",
        maxPrice : "",
        information : ""
      })
    } catch (error) {
      console.error('예적금 등록 에러 발생: ', error)
    }
  }

  return (
    <div id='body'>
      <div id="add-body">
          <h1 id='title'>상품 등록</h1>
          <label>
            <span className='sc'>은행명</span>
            <input id='bankName' type='text' value={formData.bankName} onChange={handleChange}/>
          </label>
          <label>
            <span className='sc'>상품명</span>
            <input id='productName' type='text' value={formData.productName} onChange={handleChange}/>
          </label>
          <label>
            <span className='sc' >구분</span>
            <select onChange={handleChange} value={formData.category} id='category'>
              <option className='option-font'>예금</option>
              <option className='option-font'>적금</option>
            </select>
          </label>
          <label>
            <span className='sc'>기본금리</span>
            <input id='baseRate' onChange={handleChange} value={formData.baseRate} type='text'/>
          </label>
          <label>
            <span className='sc'>최대금리</span>
            <input id='interestRate' onChange={handleChange} value={formData.interestRate} type='text'/>
          </label>
          <label>
            <span className='sc'>기간</span>
            <input id='period' onChange={handleChange} value={formData.period} type='number'/>
            <span>개월</span>
          </label>
          <label>
            <span className='sc'>최소납입금액</span>
            <input id='minPrice' onChange={handleChange} value={formData.minPrice} type='number'/>
            <span>만원</span>
          </label>
          <label>
            <span className='sc'>최대납입금액</span>
            <input id='maxPrice' onChange={handleChange} value={formData.maxPrice} type='number'/>
            <span>만원</span>
          </label>
          <label>
            <span className='sc'>상세정보</span>
            <textarea id='information' onChange={handleChange} cols={40} rows={7} value={formData.information}></textarea>
          </label>
      <button onClick={addSubmit} id='add-button'>Add</button>
      </div>
    </div>
  )
}
