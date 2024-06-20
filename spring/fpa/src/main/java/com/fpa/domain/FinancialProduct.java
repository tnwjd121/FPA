package com.fpa.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

// @Data는 아래 어노테이션을 포함하고 있음
// @ToString, @EqualsAndHashCode, @Getter, @Setter, @RequiredArgsConstructor
@Data
public class FinancialProduct {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String bankName;
	private String productName;
	private String category;
	private double baseRate;
	private double interestRate;
	private int period;
	private int minPrice;
	private int maxPrice;
	private String information;
	

}
