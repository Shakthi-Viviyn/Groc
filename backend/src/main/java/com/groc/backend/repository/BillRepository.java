package com.groc.backend.repository;

import com.groc.backend.model.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long>, BillRepositoryNativeFunc {

    List<Bill> findAllByUserId(Long userId);

    Bill findBillByIdAndUserId(Long id, Long userId);

}
