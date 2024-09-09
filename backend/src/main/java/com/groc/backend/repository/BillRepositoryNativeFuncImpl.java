package com.groc.backend.repository;

import com.groc.backend.model.dto.SpendByMonthDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class BillRepositoryNativeFuncImpl implements BillRepositoryNativeFunc{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<SpendByMonthDto> findSpendFromPastYear(Long userId) {

        String sql = "SELECT to_char(date_trunc('month', bill.date), 'YYYY-MM') AS yearMonth, " +
                "SUM(bill.total_amount) AS total_amount " +
                "FROM bill " +
                "WHERE bill.user_id = :userId " +
                "AND bill.date >= date_trunc('year', CURRENT_DATE) - interval '1 year'" +
                "GROUP BY yearMonth " +
                "ORDER BY yearMonth";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("userId", userId);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH);

        List<Object[]> resultList = query.getResultList();
        return resultList.stream().map(result -> new SpendByMonthDto(
                YearMonth.parse((String) result[0]).format(formatter),
                (BigDecimal) result[1]
        )).collect(Collectors.toList());
    }
}
