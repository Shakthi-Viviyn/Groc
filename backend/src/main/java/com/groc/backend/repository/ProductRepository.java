package com.groc.backend.repository;

import com.groc.backend.model.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByNameStartingWithIgnoreCaseAndBrandStartingWithIgnoreCase(String name, String brand, Pageable pageable);
}
