package com.groc.backend.repository;

import com.groc.backend.model.entity.Store;
import com.groc.backend.model.projection.SearchProjection;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findAllByNameStartingWithIgnoreCaseAndLocationStartingWithIgnoreCase(String name, String location, Pageable pageable);

    @Query("SELECT DISTINCT s.name AS name FROM Store s WHERE LOWER(s.name) LIKE LOWER(CONCAT(:searchString, '%'))")
    List<SearchProjection> findStoresStartWith(String searchString, Pageable pageable);
}
