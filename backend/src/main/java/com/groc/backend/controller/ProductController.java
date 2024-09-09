package com.groc.backend.controller;

import com.groc.backend.model.entity.Product;
import com.groc.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/product")
    public List<Product> getProducts(@RequestParam(defaultValue = "") String brand, @RequestParam(defaultValue = "") String name){
        return productService.findProducts(brand, name);
    }

}
