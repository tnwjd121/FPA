package com.fpa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.fpa.domain.FinancialProduct;

@CrossOrigin
public interface FpaRepository extends JpaRepository<FinancialProduct, Long> {
	
	List<FinancialProduct> findByBankName(String bankName);

}
