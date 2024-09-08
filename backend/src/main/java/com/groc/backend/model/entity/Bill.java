package com.groc.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String storeName;
    private String location;
    private double totalAmount;
    private LocalDate date;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<BillProduct> billProducts;

    public Bill(String storeName, String location, double totalAmount, LocalDate date, User user) {
        this.storeName = storeName;
        this.location = location;
        this.totalAmount = totalAmount;
        this.date = date;
        this.user = user;
        this.billProducts = new HashSet<>();
    }

    public void addBillProduct(BillProduct billProduct) {
        this.billProducts.add(billProduct);
    }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", storeName='" + storeName + '\'' +
                ", location='" + location + '\'' +
                ", totalAmount=" + totalAmount +
                ", date=" + date +
//                ", billProducts=" + billProducts +
                '}';
    }
}
