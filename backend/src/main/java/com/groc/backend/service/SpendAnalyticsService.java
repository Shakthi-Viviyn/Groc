package com.groc.backend.service;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.model.dto.MonthMetricsDto;
import com.groc.backend.model.dto.ProductDto;
import com.groc.backend.model.dto.SpendByMonthDto;
import com.groc.backend.model.entity.CategorySpend;
import com.groc.backend.model.entity.User;
import com.groc.backend.repository.BillRepository;
import com.groc.backend.repository.CategorySpendRepository;
import com.groc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SpendAnalyticsService {

    @Autowired
    private BillRepository billRepo;

    @Autowired
    private CategorySpendRepository categorySpendRepo;

    @Autowired
    private UserRepository userRepository;

    public List<SpendByMonthDto> getSpendLastYear(Long userId) {
        return billRepo.findSpendFromPastYear(userId);
    }

    public List<CategorySpend> getCategorySpendByMonth(Long userId, YearMonth yearMonth) {
        return categorySpendRepo.findAllByYearMonthAndUserId(yearMonth, userId);
    }

    @Async
    public void processBill(BillDto bill, Long userId) {
        YearMonth date = YearMonth.from(bill.getDate());

        List<ProductDto> billItems = bill.getProducts();
        Map<String, CategorySpend> categorySpendMap = getCategorySpendByMonth(userId, date).stream().collect(Collectors.toMap(CategorySpend::getCategory, spend -> spend));

        billItems.forEach((billItem) -> {
            BigDecimal itemAmount = billItem.getQuantity().multiply(billItem.getPrice());
            String currCategory = billItem.getCategory();

            CategorySpend categorySpend = categorySpendMap.get(currCategory);
            if (categorySpend != null){
                categorySpend.setAmount(categorySpend.getAmount().add(itemAmount));
                categorySpendMap.put(currCategory, categorySpend);
            }else{
                User user = userRepository.getReferenceById(userId);

                CategorySpend newCategorySpend = new CategorySpend(date,itemAmount,currCategory,user);
                categorySpendMap.put(currCategory, newCategorySpend);
            }
        });

        categorySpendMap.forEach((category, categorySpendInfo) -> categorySpendRepo.save(categorySpendInfo));

    }

    public MonthMetricsDto getMetricsCurrMonth(Long userId) {
        Object[] result = (Object[]) ((Object[]) billRepo.findBillCountAndTotalAmountByUserIdForCurrentMonth(userId))[0];

        Long numBills = (Long) result[0];
        BigDecimal totalAmount = (BigDecimal) result[1];
        return new MonthMetricsDto(totalAmount, totalAmount.divide(BigDecimal.valueOf(numBills)));

    }
}
