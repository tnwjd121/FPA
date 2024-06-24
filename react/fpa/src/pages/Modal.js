import React, { useState } from 'react'
import '../css/modal.css'
import { RiEdit2Line } from "react-icons/ri";
import axios from 'axios';

export default function Modal({fpa, fetchfpas}) {
  const [open, setOpen] = useState(false)
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

  const handleOpen = (e) => {
    console.log(fpa)
    setFormData({
      bankName : fpa.bankName,
      productName : fpa.productName,
      category : fpa.category,
      baseRate : fpa.baseRate,
      interestRate : fpa.interestRate,
      period : fpa.period,
      minPrice : fpa.minPrice,
      maxPrice : fpa.maxPrice,
      information : fpa.information
    })
    setOpen(true)
  }

  const handleClose = (e) =>{
    setOpen(false)
  }
  
  // const handleSave = (e) => {
  //   setOpen(false)
  // }

const saveSubmit = async (url) =>{
  try {
    const response = await axios.put(`${url}`,formData)
    fetchfpas();
    setOpen(false)
  } catch (error) {
    console.log(error)
  }
}

  
  return (
    <>
      <RiEdit2Line onClick={()=>handleOpen()}/>
      <div id='modal' style={{display: open ? 'block' : "none"}}>
      <h2 id='title'>상품 수정</h2>
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
          <div id='button-div'>
            <button id='edit-complete-button' onClick={()=>saveSubmit(fpa._links.self.href)}>수정완료</button>
            <button id='cloese-button' onClick={()=>handleClose()}>닫기</button>
          </div>
      </div>
    </>
  )
}
