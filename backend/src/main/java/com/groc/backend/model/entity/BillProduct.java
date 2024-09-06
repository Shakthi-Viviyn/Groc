package com.groc.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class BillProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private BigDecimal quantity;
    private String units;
    private BigDecimal price;

    @ManyToOne()
    @JoinColumn(name = "bill_id")
    @JsonIgnore
    private Bill bill;

    @ManyToOne()
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    public BillProduct(BigDecimal quantity, String units, BigDecimal price, Bill bill, Product product) {
        this.quantity = quantity;
        this.units = units;
        this.price = price;
        this.bill = bill;
        this.product = product;
    }

    public BillProduct() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Bill getBill() {
        return bill;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "BillProduct{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", units='" + units + '\'' +
                ", price=" + price +
                ", product=" + product +
//                ", bill=" + bill +
                '}';
    }
}
