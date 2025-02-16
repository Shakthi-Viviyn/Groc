package com.groc.backend.model.dto;

import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.Store;
import com.groc.backend.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BillDto {

    private Long id;
    private BigDecimal totalAmount;
    private LocalDate date;
    private List<ProductDto> products;
    private StoreDto store;

    public static BillDto loadBillEntity(Bill bill) {
        var billDto = new BillDto();
        var storeDto = StoreDto.loadStore(bill.getStore());

        billDto.setId(bill.getId());
        billDto.setTotalAmount(bill.getTotalAmount());
        billDto.setDate(bill.getDate());
        billDto.setStore(storeDto);
        billDto.setProducts(new ArrayList<>());
        return billDto;
    }

    public Bill newBillEntity(User user, Store store){
        return new Bill(totalAmount, date, user, store);
    }

}
