package com.groc.backend.service;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.model.dto.ProductDto;
import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.BillProduct;
import com.groc.backend.model.entity.Product;
import com.groc.backend.repository.BillRepository;
import com.groc.backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepo;

    @Autowired
    private ProductRepository productRepo;

    public void createBill(BillDto billData) {
        Bill bill = billData.newBillEntity();
        for (ProductDto prodItr : billData.getProducts()){
            Product product = prodItr.newProductEntity();
            productRepo.save(product);
            BillProduct billItem = prodItr.newBillItemEntity(bill, product);
            bill.getBillProducts().add(billItem);
        }
        billRepo.save(bill);
    }
}
