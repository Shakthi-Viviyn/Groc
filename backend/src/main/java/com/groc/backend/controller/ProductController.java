package com.groc.backend.controller;

import com.groc.backend.model.projection.SearchProjection;
import com.groc.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/brand")
    public List<SearchProjection> getBrands(@RequestParam(defaultValue = "") String name) {
        return productService.findBrands(name);
    }

    @GetMapping("/product")
    public ResponseEntity<?> getProducts(@RequestParam(defaultValue = "") String brand, @RequestParam(defaultValue = "") String name){

        if (brand.isEmpty()){
            return ResponseEntity.status(400).body("Brand name cannot be empty");
        }
        return ResponseEntity.status(200).body(productService.findProducts(brand, name));
    }
}
