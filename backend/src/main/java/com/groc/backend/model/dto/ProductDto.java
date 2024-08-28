package com.groc.backend.model.dto;

import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.BillProduct;
import com.groc.backend.model.entity.Product;

import java.math.BigDecimal;

public class ProductDto {
    private String brand;
    private String name;
    private BigDecimal price;
    private BigDecimal quantity;
    private String units;
    private String category;

    public Product newProductEntity(){
        return new Product(brand, name, "Dairy");
    }

    public BillProduct newBillItemEntity(Bill bill, Product product){
        return new BillProduct(quantity, units, price, bill, product);
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnits() {
        return units;
    }

    public void setUnits(String units) {
        this.units = units;
    }
}
