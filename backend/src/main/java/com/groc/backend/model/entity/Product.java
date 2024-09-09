package com.groc.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String name;
    private String category;
    private String units;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<BillProduct> billProducts;

    public Product(String brand, String name, String units, String category) {
        this.brand = brand;
        this.name = name;
        this.units = units;
        this.category = category;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", brand='" + brand + '\'' +
                ", units='" + units + '\'' +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
//                ", billProducts=" + billProducts +
                '}';
    }
}
