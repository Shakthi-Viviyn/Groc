package com.groc.backend.repository;

import com.groc.backend.model.entity.Product;
import com.groc.backend.model.projection.SearchProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByNameStartingWithIgnoreCaseAndBrandStartingWithIgnoreCase(String name, String brand, Pageable pageable);

    @Query("SELECT DISTINCT p.brand AS name FROM Product p WHERE LOWER(p.brand) LIKE LOWER(CONCAT(:searchString, '%'))")
    List<SearchProjection> findBrandsStartWith(String searchString, Pageable pageable);
}
