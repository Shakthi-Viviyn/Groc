package com.groc.backend.service;

import com.groc.backend.model.entity.Store;
import com.groc.backend.model.projection.SearchProjection;
import com.groc.backend.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepo;

    public List<Store> findLocations(String name, String location){
        Pageable pageable = PageRequest.of(0, 20);
        return storeRepo.findAllByNameStartingWithIgnoreCaseAndLocationStartingWithIgnoreCase(name, location, pageable);
    }

    public List<SearchProjection> findStores(String searchString) {
        return storeRepo.findStoresStartWith(searchString, PageRequest.of(0, 20));
    }
}
