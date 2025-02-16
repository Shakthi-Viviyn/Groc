package com.groc.backend.controller;

import com.groc.backend.model.projection.SearchProjection;
import com.groc.backend.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StoreController {

    @Autowired
    StoreService storeService;

    @GetMapping("/storeName")
    public List<SearchProjection> getStores(@RequestParam(defaultValue = "") String name) {
        return storeService.findStores(name);
    }

    @GetMapping("/store")
    public ResponseEntity<?> getStoresWithLocation(@RequestParam(defaultValue = "") String name, @RequestParam(defaultValue = "") String location){

        if (name.isEmpty()){
            return ResponseEntity.status(400).body("Brand name cannot be empty");
        }
        return ResponseEntity.status(200).body(storeService.findLocations(name, location));
    }
}
