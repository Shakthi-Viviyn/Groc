package com.groc.backend.repository;

import com.groc.backend.model.entity.BillProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillProductRepository extends JpaRepository<BillProduct, Long> {
}
