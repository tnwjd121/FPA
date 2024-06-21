package com.fpa.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

// @Data는 아래 어노테이션을 포함하고 있음
// @ToString, @EqualsAndHashCode, @Getter, @Setter, @RequiredArgsConstructor
@Data
@Entity
public class FinancialProduct {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column(nullable = false)
	private String bankName;
	@Column(nullable = false)
	private String productName;
	@Column(nullable = false)
	private String category;
	private double baseRate;
	private double interestRate;
	private int period;
	// 만원 기준
	private int minPrice;
	private int maxPrice;
	private String information;
	

}
