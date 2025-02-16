package com.groc.backend.repository;

import com.groc.backend.model.entity.CategorySpend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface CategorySpendRepository extends JpaRepository<CategorySpend, Long> {

    List<CategorySpend> findAllByYearMonthAndUserId(YearMonth yearMonth, Long userId);
}
