package com.groc.backend.repository;

import com.groc.backend.model.entity.BillProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BillProductRepository extends JpaRepository<BillProduct, Long> {

    @Query("SELECT bp FROM BillProduct bp JOIN FETCH bp.product p WHERE bp.bill.id = :billId")
    List<BillProduct> findBillItemsById(@Param("billId") Long billId);

}
