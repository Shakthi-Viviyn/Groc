package com.groc.backend.service;

import com.groc.backend.model.entity.Product;
import com.groc.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepo;

    public List<Product> findProducts(String brand, String name){
        Pageable pageable = PageRequest.of(0, 20);
        return productRepo.findAllByNameStartingWithIgnoreCaseAndBrandStartingWithIgnoreCase(name, brand, pageable);
    }
}
