package com.fpa.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fpa.domain.FinancialProduct;

@SpringBootTest
class FpaRepositoryTest {
	
	@Autowired
	FpaRepository fpaRepository;

	@Test
	@DisplayName(value = "create fpa")
	public void addFpa() {
		FinancialProduct fpa = new FinancialProduct();
		fpa.setBankName("SH수협은행");
		fpa.setProductName("Sh첫만남우대예금");
		fpa.setCategory("예금");
		fpa.setBaseRate(2.85);
		fpa.setInterestRate(3.90);
		fpa.setMaxPrice(10000000);
		fpa.setMinPrice(1000000);
		fpa.setPeriod(12);
		fpa.setInformation("특판\r\n"
				+ "(금리) 기본금리 연 2.85%에 우대금리 최대 연 1.05% 적용시 최고 연 3.90% 금리 제공\r\n"
				+ "(조건) 비대면(인터넷뱅킹, 스마트폰뱅킹)으로 신규 가입하고 우대금리 조건을 충족한 만기해지 계좌에 한하여 적용\r\n"
				+ "\r\n"
				+ "판매한도 100,000좌\r\n"
				+ "- 판매한도 소진시 별도 안내없이 자동 판매종료되며, 판매한도 내에서도 기준금리 변동 등의 사유 발생시 금리가 변동될 수 있습니다.");
		
		FinancialProduct savedFpa = fpaRepository.save(fpa);
		
	}
	
	@Test
	public void getFpa() {
		List<FinancialProduct> fpaList = fpaRepository.findAll();
		for(FinancialProduct fpa : fpaList) {
			System.out.println(fpa);
		}
	}

}
