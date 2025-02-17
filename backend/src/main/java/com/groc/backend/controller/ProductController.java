package com.groc.backend.controller;

import com.groc.backend.model.projection.SearchProjection;
import com.groc.backend.service.ProductPriceService;
import com.groc.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductPriceService productPriceService;

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

    @GetMapping("/store/{storeId}/brand")
    public List<SearchProjection> getBrandsFromStore(@PathVariable Long storeId, @RequestParam(defaultValue = "") String name) {
        return productService.findBrandsFromStore(storeId, name);
    }

    @GetMapping("/store/{storeId}/product")
    public ResponseEntity<?> getProductsFromStore(@PathVariable Long storeId, @RequestParam(defaultValue = "") String brand, @RequestParam(defaultValue = "") String name) {

        if (brand.isEmpty()){
            return ResponseEntity.status(400).body("Brand name cannot be empty");
        }
        return ResponseEntity.status(200).body(productService.findProductsFromStore(storeId, brand, name));
    }

    @GetMapping("/store/{storeId}/product/{productId}/price")
    public ResponseEntity<?> getPriceInfo(@PathVariable Long storeId, @PathVariable Long productId) {
        if (productId == null || storeId == null){
            return ResponseEntity.status(400).body("Product id or store id cannot be empty");
        }
        var productPriceInfo = productPriceService.getProductPriceInfo(storeId, productId);
        return ResponseEntity.status(200).body(productPriceInfo);
    }
}
