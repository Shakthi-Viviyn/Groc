package com.groc.backend.service;

import com.groc.backend.model.projection.ProductPriceProjection;
import com.groc.backend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductPriceService {

    @Autowired
    BillRepository billRepo;

    public ProductPriceProjection getProductPriceInfo(Long storeId, Long productId){
        return billRepo.findProductPrice(storeId, productId);
    }
}
