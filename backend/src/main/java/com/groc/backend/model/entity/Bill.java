package com.groc.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
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

    private BigDecimal totalAmount;
    private LocalDate date;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<BillProduct> billProducts;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "store_id")
    private Store store;

    public Bill(BigDecimal totalAmount, LocalDate date, User user, Store store) {
        this.totalAmount = totalAmount;
        this.date = date;
        this.user = user;
        this.store = store;
        this.billProducts = new HashSet<>();
    }

    public void addBillProduct(BillProduct billProduct) {
        this.billProducts.add(billProduct);
    }

    @Override
    public String toString() {
        return "Bill{" +
                "id=" + id +
                ", storeName='" + store.getName() + '\'' +
                ", location='" + store.getLocation() + '\'' +
                ", totalAmount=" + totalAmount +
                ", date=" + date +
//                ", billProducts=" + billProducts +
                '}';
    }
}
