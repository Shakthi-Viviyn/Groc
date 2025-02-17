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

    @Query( "SELECT p.brand as name FROM Product p " +
            "JOIN BillProduct bp ON p.id = bp.product.id " +
            "JOIN Bill b ON b.id = bp.bill.id " +
            "WHERE b.store.id = :storeId " +
            "AND LOWER(p.brand) LIKE LOWER(CONCAT(:searchString, '%'))")
    List<SearchProjection> findBrandsFromStoreStartWith(Long storeId, String searchString, Pageable pageable);

    @Query( "SELECT p " +
            "FROM Product p " +
            "JOIN BillProduct bp ON p.id = bp.product.id " +
            "JOIN Bill b ON b.id = bp.bill.id " +
            "WHERE b.store.id = :storeId " +
            "AND LOWER(p.brand) LIKE LOWER(CONCAT(:brandString, '%'))" +
            "AND LOWER(p.name) LIKE LOWER(CONCAT(:nameString, '%'))")
    List<Product> findProductsFromStoreStartWith(Long storeId, String brandString, String nameString, Pageable pageable);
}
