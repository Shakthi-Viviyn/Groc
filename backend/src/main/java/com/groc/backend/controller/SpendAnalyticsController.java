package com.groc.backend.controller;

import com.groc.backend.model.entity.GrocerySpend;
import com.groc.backend.service.SpendAnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SpendAnalyticsController {

    @Autowired
    private SpendAnalyticsService grocerySpendService;

    private Long getRequestUserId(){
        return Long.valueOf((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    @GetMapping("/spendAnalytics")
    public List<GrocerySpend> getSpendPastYear(){
        Long userId = getRequestUserId();
        return grocerySpendService.getSpendLastYear(userId);
    }
}
