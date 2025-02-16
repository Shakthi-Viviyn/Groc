package com.groc.backend.service;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.model.dto.CategorizationDto;
import com.groc.backend.model.dto.ProductDto;
import com.groc.backend.model.entity.*;
import com.groc.backend.repository.*;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BillService {

    private static final Logger log = LoggerFactory.getLogger(BillService.class);

    @Autowired
    private BillRepository billRepo;

    @Autowired
    private BillProductRepository billProductRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CategorizationApiService categorizeService;

    @Autowired
    private SpendAnalyticsService spendAnalyticsService;

    @Autowired
    private StoreRepository storeRepo;

    public void createBill(BillDto billData, Long userId) {

        User user = userRepo.getReferenceById(userId);

        Store store;
        Long storeId = billData.getStore().getId();
        if (storeId != null){
            store = storeRepo.getReferenceById(storeId);
        }else{
            store = billData.getStore().newStoreEntity();
        }
        Bill bill = billData.newBillEntity(user, store);

        try {
            this.addMissingCategoriesToProducts(billData);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        billData.getProducts().forEach(productDto -> {
            Product product;
            if (productDto.getId() == null){
                product = productDto.newProductEntity();
                productRepo.save(product);
            }else{
                product = productRepo.getReferenceById(productDto.getId());
            }
            BillProduct billItem = productDto.newBillItemEntity(bill, product);
            bill.addBillProduct(billItem);
        });

        billRepo.save(bill);

        spendAnalyticsService.processBill(billData, userId);
    }

    public List<Bill> getAllBills(Long userId){
        return billRepo.findAllByUserId(userId);
    }

    public BillDto getDetailedBill(Long billId, Long userId){

        Bill bill = billRepo.findBillByIdAndUserId(billId, userId);
        if (bill == null) throw new EntityNotFoundException("Bill not found");

        BillDto billDto = BillDto.loadBillEntity(bill);
        List<BillProduct> billItems = billProductRepo.findBillItemsById(billId);
        for (BillProduct billItem : billItems) {
            var productDto = ProductDto.loadBillItem(billItem);
            billDto.getProducts().add(productDto);
        }
        return billDto;
    }

    public void deleteBill(Long billId, Long userId){
        Bill bill = billRepo.findBillByIdAndUserId(billId, userId);
        if (bill != null){
            billRepo.delete(bill);
        }else{
            throw new EntityNotFoundException("Bill not found");
        }
    }

    private void addMissingCategoriesToProducts(BillDto billData){

        List<CategorizationDto> uncategorizedProductList = billData.getProducts().stream()
                .filter(product -> product.getCategory() == null)
                .map(product -> new CategorizationDto(product.getName()))
                .collect(Collectors.toList());

        if (!uncategorizedProductList.isEmpty()){

            List<CategorizationDto> categorizedProductList = categorizeService.getCategoriesForProducts(uncategorizedProductList);

            Map<String, String> categoryMap = categorizedProductList.stream()
                    .collect(Collectors.toMap(CategorizationDto::getName, CategorizationDto::getCategory));

            billData.getProducts().forEach(product -> {
                if (product.getCategory() == null){
                    product.setCategory(categoryMap.get(product.getName()));
                }
            });
        }

    }
}
