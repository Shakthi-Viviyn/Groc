package com.groc.backend.service;

import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.GrocerySpend;
import com.groc.backend.model.entity.User;
import com.groc.backend.repository.GrocerySpendRepository;
import com.groc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;

@Service
public class SpendAnalyticsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GrocerySpendRepository grocerySpendRepo;

    public void addGrocerySpend(Bill bill, Long userId) {
        User user = userRepository.getReferenceById(userId);

        YearMonth yearMonth = YearMonth.of(bill.getDate().getYear(), bill.getDate().getMonthValue());
        double billValue = bill.getTotalAmount();

        GrocerySpend gs = grocerySpendRepo.findGrocerySpendByYearMonth(yearMonth);
        if (gs != null){
            gs.setSpend(gs.getSpend() + billValue);
        }else{
            gs = new GrocerySpend(yearMonth, billValue, user);
        }
        grocerySpendRepo.save(gs);
    }

    public List<GrocerySpend> getSpendLastYear(Long userId) {
        YearMonth from = YearMonth.now().minusMonths(12);
        YearMonth to = YearMonth.now();
        return grocerySpendRepo.findGrocerySpendsByYearMonthBetweenAndUserIdOrderByYearMonth(from, to, userId);
    }

}
