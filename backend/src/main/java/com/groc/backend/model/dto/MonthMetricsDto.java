package com.groc.backend.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class MonthMetricsDto {
    public MonthMetricsDto(BigDecimal totalAmount, BigDecimal avgAmountPerBill) {
        this.totalAmount = totalAmount;
        this.avgAmountPerBill = avgAmountPerBill;
    }

    private BigDecimal totalAmount;
    private BigDecimal avgAmountPerBill;
}
