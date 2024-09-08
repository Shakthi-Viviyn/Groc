package com.groc.backend.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;

public class BillRepositoryNativeFuncImpl implements BillRepositoryNativeFunc{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<?> findSpendFromPastYear(Long userId) {

        String sql = "SELECT to_char(date_trunc('month', bill.date), 'YYYY-MM') AS yearMonth, " +
                        "SUM(bill.total_amount) AS total_amount " +
                        "FROM bill " +
                        "WHERE bill.user_id = :userId " +
                        "AND bill.date >= date_trunc('year', CURRENT_DATE) - interval '1 year'" +
                        "GROUP BY yearMonth " +
                        "ORDER BY yearMonth";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("userId", userId);

        return query.getResultList();

    }
}
