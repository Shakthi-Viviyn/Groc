package com.groc.backend.repository;

import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.projection.MonthMetricsProjection;
import com.groc.backend.model.projection.ProductPriceProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long>, BillRepositoryNativeFunc {

    List<Bill> findAllByUserId(Long userId);

    Bill findBillByIdAndUserId(Long id, Long userId);

    @Query("SELECT COUNT(b) AS numBills, SUM(b.totalAmount) AS totalAmount FROM Bill b WHERE b.user.id = :userId AND EXTRACT(MONTH FROM b.date) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM b.date) = EXTRACT(YEAR FROM CURRENT_DATE)")
    MonthMetricsProjection findBillCountAndTotalAmountByUserIdForCurrentMonth(@Param("userId") Long userId);

    @Query("SELECT b.date AS date, bp.price AS price, b.store.id AS storeId, bp.product.id AS productId FROM Bill b JOIN BillProduct bp ON b.id = bp.bill.id WHERE b.store.id = :storeId AND bp.product.id = :productId ORDER BY b.date DESC LIMIT 1")
    ProductPriceProjection findProductPrice(Long storeId, Long productId);
}
