package com.groc.backend.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SpendByMonthDto {

    private String month;
    private BigDecimal amount;

    public SpendByMonthDto(String month, BigDecimal amount) {
        this.month = month;
        this.amount = amount;
    }
}
