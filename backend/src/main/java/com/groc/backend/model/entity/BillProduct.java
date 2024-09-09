package com.groc.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BillProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private BigDecimal quantity;
    private BigDecimal price;

    @ManyToOne()
    @JoinColumn(name = "bill_id")
    @JsonIgnore
    private Bill bill;

    @ManyToOne()
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    public BillProduct(BigDecimal quantity, BigDecimal price, Bill bill, Product product) {
        this.quantity = quantity;
        this.price = price;
        this.bill = bill;
        this.product = product;
    }

    @Override
    public String toString() {
        return "BillProduct{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", price=" + price +
//                ", product=" + product +
//                ", bill=" + bill +
                '}';
    }
}
