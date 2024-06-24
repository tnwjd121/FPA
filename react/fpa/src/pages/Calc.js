import React, { useState } from 'react'
import '../css/calc.css'

export default function Calc() {
  /* 
  단리만 하기
  예금 계산법(월)
  단리 이자금액 - 원금 x 이자율 x 기간(?/12개월)
  
  일반과세, 비과세
  이자금액 * 84.6%

  적금 계산법(월)
  단리 - 매월 납부금액 * 이자율 * 기간(?/12) => 월별로 다 더해야함 누적 쌓이는거
  복리 - 매월 납부금액(누적되서 올라감)* 이자율 * 기간(?/12)

  구분 - 예금, 적금
  납입액 - 적금 월납입액으로 기재
  예금기간 - 개월
  연 이자율(단리) - %
  이자과세 - 일반과세 비과세 초이스
  */
  const [inputData, setInputData] = useState({
    category : "",
    depositAmount : "",
    period : "",
    rate : "",
    tax : ""

  })

  const handleChange = (e) =>{
    const{id, value} = e.target
    setInputData({
      ...inputData,
      [id]:value
    })
  }

  const calcSubmit = () =>{
    const inputs = document.querySelectorAll("input");
    let isFormValue = true;
    inputs.forEach(input =>{
      if(input.value === ''){
        isFormValue = false
      }
    })
    if(!isFormValue){
      alert("모든 정보 입력 부탁드립니다.")
      return
    }
    // console.log(inputData)
    if(inputData.category=='예금'){
      const interestAmount = inputData.depositAmount*inputData.rate*(inputData.period/12)
      if(inputData.tax=='일반과세'){
        console.log("계산중")
      }else{
        console.log(interestAmount)
      }
    }
  }

  return (
    <div id='body'>
      <h1 id='title'>이자 계산기(단리 기준)</h1>
        <div id='calc-body'>
        <label>
          <span className='sc' >구분</span>
          <select onChange={handleChange} value={inputData.category} id='category'>
            <option>예금</option>
            <option>적금</option>
          </select>
        </label>
        <label>
          <span className='sc'>납입액</span>
          <input type='number' onChange={handleChange} value={inputData.depositAmount} id='depositAmount'/>
          <span>원</span>
        </label>
        <label>
          <span className='sc'>예금기간</span>
          <input type='number'  onChange={handleChange} value={inputData.period} id='period'/>
          <span>개월</span>
        </label>
        <label>
          <span className='sc'>연이자율</span>
          <input type='text' onChange={handleChange} value={inputData.rate} id='rate'/>
          <span>%</span>
        </label>
        <label>
          <span className='sc'>구분</span>
          <select onChange={handleChange} value={inputData.tax} id='tax'>
            <option>일반과세</option>
            <option>비과세</option>
          </select>
        </label>
        <div>
          <button>초기화</button>
          <button onClick={calcSubmit}>계산하기</button>
        </div>
      </div>
    </div>
  )
}
