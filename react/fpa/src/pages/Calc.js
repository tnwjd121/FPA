import React, { useState } from 'react'
import '../css/calc.css'
import { GrPowerReset } from "react-icons/gr";

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

  const [resultMoney, setResultMoney] = useState(0);
  const [roundIA, setRoundIA] = useState(0);
  const [principal, setPrincipal] = useState(0)


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
      //예금 이자
      const interestAmount = inputData.depositAmount*parseFloat(inputData.rate/100)*(inputData.period/12)
      // 예금 이자 반올림
      setRoundIA(Math.round(interestAmount))
      setPrincipal(parseFloat(inputData.depositAmount))
      if(inputData.tax=='일반과세'){
        setRoundIA(Math.round(interestAmount*0.846)) 
        setResultMoney(parseInt(inputData.depositAmount)+roundIA)
      }else{
        setResultMoney(parseInt(inputData.depositAmount) + roundIA);
      }
    }else{
      // 적금 이자
      let sInterestAmount = 0
      let money = 0
      for(let i=1; i<=inputData.period; i++){
        sInterestAmount += inputData.depositAmount*parseFloat(inputData.rate/100)*(i/12)
        money += parseInt(inputData.depositAmount)
      }
      setPrincipal(money)
      setRoundIA(Math.round(sInterestAmount))
      if(inputData.tax=='일반과세'){
        setRoundIA(Math.round(sInterestAmount*0.846)) 
        setResultMoney(money + roundIA);
      }else{
        setResultMoney(money + roundIA);
      }
    }
  }

  const resetSubmit = () =>{
    setInputData({
      category : "",
      depositAmount : "",
      period : "",
      rate : "",
      tax : ""
    })

    setResultMoney(0);
  }

  return (
    <div id='body'>
      <h1 id='title'>이자 계산기(단리 기준)</h1>
        <div id='calc-body'>
        <label>
          <span className='sc-size' >구분</span>
          <select onChange={handleChange} value={inputData.category} id='category'>
            <option>예금</option>
            <option>적금</option>
          </select>
        </label>
        <label>
          <span className='sc-size'>납입액</span>
          <input type='number' onChange={handleChange} value={inputData.depositAmount} id='depositAmount'/>
          <span>원</span>
        </label>
        <p id='clac-p'>❗ 예금은 전체 납입액, 적금은 매월 납입액 기재</p>
        <label>
          <span className='sc-size'>예금기간</span>
          <input type='number'  onChange={handleChange} value={inputData.period} id='period'/>
          <span>개월</span>
        </label>
        <label>
          <span className='sc-size'>연이자율</span>
          <input type='text' onChange={handleChange} value={inputData.rate} id='rate'/>
          <span>%</span>
        </label>
        <label>
          <span className='sc-size'>구분</span>
          <select onChange={handleChange} value={inputData.tax} id='tax'>
            <option>일반과세</option>
            <option>비과세</option>
          </select>
        </label>
        <div id='button-div'>
          <button id='reset-button' onClick={resetSubmit}><GrPowerReset /></button>
          <button id='calc-button' onClick={calcSubmit}>계산하기</button>
        </div>
        <div>
          {resultMoney>0 && (
            <>
              <h2 id='result-text'>결과:    {resultMoney.toLocaleString()}원 수령하실 수 있습니다.</h2>
              <p id='calc-p'>원금 : {principal.toLocaleString()}</p>
              <p id='calc-p'>이자 : {roundIA.toLocaleString()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
