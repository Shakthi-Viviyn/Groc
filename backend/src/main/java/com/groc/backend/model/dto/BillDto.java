package com.groc.backend.model.dto;

import com.groc.backend.model.entity.Bill;

import java.time.LocalDate;
import java.util.List;

public class BillDto {

    private String storeName;
    private String location;
    private int totalAmount;
    private LocalDate date;
    private List<ProductDto> products;

    public Bill newBillEntity(){
        return new Bill(storeName, location, totalAmount, date);
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ProductDto> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDto> products) {
        this.products = products;
    }
}
