package com.groc.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.YearMonth;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"yearMonth", "user_id", "category"}))
public class CategorySpend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    private YearMonth yearMonth;
    private BigDecimal spend;
    private String category;

    public CategorySpend(YearMonth yearMonth, BigDecimal spend, String category, User user) {
        this.yearMonth = yearMonth;
        this.spend = spend;
        this.category = category;
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
