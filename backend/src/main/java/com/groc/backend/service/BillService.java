package com.groc.backend.service;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.model.dto.ProductDto;
import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.BillProduct;
import com.groc.backend.model.entity.Product;
import com.groc.backend.repository.BillProductRepository;
import com.groc.backend.repository.BillRepository;
import com.groc.backend.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillService {

    @Autowired
    private BillRepository billRepo;

    @Autowired
    private BillProductRepository billProductRepo;

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

    public List<Bill> getAllBills(){
        return billRepo.findAll();
    }

    public BillDto getDetailedBill(Long id) {
        BillDto billDto = BillDto.loadBillEntity(billRepo.findById(id).orElseThrow());
        List<BillProduct> billItems = billProductRepo.findBillItemsByIdDD(id);
        for (BillProduct billItem : billItems) {
            var productDto = ProductDto.loadBillItem(billItem);
            billDto.getProducts().add(productDto);
        }
        return billDto;
    }

    public void deleteBill(Long id){
        Optional<Bill> bill = billRepo.findById(id);
        if (bill.isPresent()){
            billRepo.delete(bill.get());
        }else{
            throw new EntityNotFoundException();
        }
    }
}
