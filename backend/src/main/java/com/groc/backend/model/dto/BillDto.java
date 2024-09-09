package com.groc.backend.model.dto;

import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class BillDto {

    private Long id;
    private String storeName;
    private String location;
    private BigDecimal totalAmount;
    private LocalDate date;
    private List<ProductDto> products;

    public static BillDto loadBillEntity(Bill bill) {
        var billDto = new BillDto();
        billDto.setId(bill.getId());
        billDto.setStoreName(bill.getStoreName());
        billDto.setLocation(bill.getLocation());
        billDto.setTotalAmount(bill.getTotalAmount());
        billDto.setDate(bill.getDate());
        billDto.setProducts(new ArrayList<>());
        return billDto;
    }

    public Bill newBillEntity(User user){
        return new Bill(storeName, location, totalAmount, date, user);
    }

}
