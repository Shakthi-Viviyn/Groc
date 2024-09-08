package com.groc.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BillProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double quantity;
    private String units;
    private double price;

    @ManyToOne()
    @JoinColumn(name = "bill_id")
    @JsonIgnore
    private Bill bill;

    @ManyToOne()
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    public BillProduct(double quantity, String units, double price, Bill bill, Product product) {
        this.quantity = quantity;
        this.units = units;
        this.price = price;
        this.bill = bill;
        this.product = product;
    }

    @Override
    public String toString() {
        return "BillProduct{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", units='" + units + '\'' +
                ", price=" + price +
//                ", product=" + product +
//                ", bill=" + bill +
                '}';
    }
}
