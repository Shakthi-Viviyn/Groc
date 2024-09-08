package com.groc.backend.repository;

import com.groc.backend.model.entity.GrocerySpend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface GrocerySpendRepository extends JpaRepository<GrocerySpend, Long> {

    List<GrocerySpend> findGrocerySpendsByYearMonthBetweenAndUserIdOrderByYearMonth(YearMonth from, YearMonth to, Long userId);

    GrocerySpend findGrocerySpendByYearMonth(YearMonth yearMonth);
}