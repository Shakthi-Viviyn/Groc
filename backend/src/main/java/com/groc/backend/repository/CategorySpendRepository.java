package com.groc.backend.repository;

import com.groc.backend.model.entity.CategorySpend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.YearMonth;
import java.util.List;

public interface CategorySpendRepository extends JpaRepository<CategorySpend, Long> {

    List<CategorySpend> findAllByYearMonthAndUserId(YearMonth yearMonth, Long userId);
}
