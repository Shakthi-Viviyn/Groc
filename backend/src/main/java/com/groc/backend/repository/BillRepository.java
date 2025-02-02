package com.groc.backend.repository;

import com.groc.backend.model.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long>, BillRepositoryNativeFunc {

    List<Bill> findAllByUserId(Long userId);

    Bill findBillByIdAndUserId(Long id, Long userId);

    @Query("SELECT COUNT(b), SUM(b.totalAmount) FROM Bill b WHERE b.user.id = :userId AND EXTRACT(MONTH FROM b.date) = EXTRACT(MONTH FROM CURRENT_DATE) AND EXTRACT(YEAR FROM b.date) = EXTRACT(YEAR FROM CURRENT_DATE)")
    Object[] findBillCountAndTotalAmountByUserIdForCurrentMonth(@Param("userId") Long userId);
}
