package com.groc.backend.model.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String storeName;
    private String location;
    private int totalAmount;
    private LocalDate date;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL)
    private Set<BillProduct> billProducts;

    public Bill() {
    }

    public Bill(String storeName, String location, int totalAmount, LocalDate date) {
        this.storeName = storeName;
        this.location = location;
        this.totalAmount = totalAmount;
        this.date = date;
        this.billProducts = new HashSet<>();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Set<BillProduct> getBillProducts() {
        return billProducts;
    }

    public void setBillProducts(Set<BillProduct> billProducts) {
        this.billProducts = billProducts;
    }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", storeName='" + storeName + '\'' +
                ", location='" + location + '\'' +
                ", totalAmount=" + totalAmount +
                ", date=" + date +
                '}';
    }
}
