package com.groc.backend.controller;

import com.groc.backend.model.dto.MonthMetricsDto;
import com.groc.backend.model.dto.SpendByMonthDto;
import com.groc.backend.model.entity.CategorySpend;
import com.groc.backend.service.SpendAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.time.YearMonth;
import java.util.List;

@RestController
public class SpendAnalyticsController {

    @Autowired
    private SpendAnalyticsService spendAnalyticsService;

    private Long getRequestUserId(){
        return Long.valueOf((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    @GetMapping("/spendPastYear")
    public List<SpendByMonthDto> getSpendPastYear(){
        Long userId = getRequestUserId();
        return spendAnalyticsService.getSpendLastYear(userId);
    }

    @GetMapping("/metricsCurrMonth")
    public ResponseEntity<?> getMetricsCurrMonth() {
        Long userId = getRequestUserId();
        try {
            MonthMetricsDto currMonthMetrics = spendAnalyticsService.getMetricsCurrMonth(userId);
            return ResponseEntity.status(200).body(currMonthMetrics);
        }catch (SQLException e){
            return ResponseEntity.status(500).body(e.getMessage());
        }

    }

    @GetMapping("/spendByCategory")
    public List<CategorySpend> getSpendByCategory(){
        Long userId = getRequestUserId();
        return spendAnalyticsService.getCategorySpendByMonth(userId, YearMonth.now());
    }

}
