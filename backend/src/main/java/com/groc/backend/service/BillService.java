package com.groc.backend.service;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.model.dto.ProductDto;
import com.groc.backend.model.entity.Bill;
import com.groc.backend.model.entity.BillProduct;
import com.groc.backend.model.entity.Product;
import com.groc.backend.model.entity.User;
import com.groc.backend.repository.BillProductRepository;
import com.groc.backend.repository.BillRepository;
import com.groc.backend.repository.ProductRepository;

import com.groc.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private SpendAnalyticsService grocerySpendService;

    public void createBill(BillDto billData, Long userId) {

        Optional<User> user = userRepo.findById(userId);
        if (user.isEmpty()) throw new UsernameNotFoundException("User not found");

        Bill bill = billData.newBillEntity(user.get());
        for (ProductDto prodItr : billData.getProducts()){
            Product product = prodItr.newProductEntity();
            productRepo.save(product);

            BillProduct billItem = prodItr.newBillItemEntity(bill, product);
            bill.addBillProduct(billItem);
        }
        billRepo.save(bill);

        grocerySpendService.addGrocerySpend(bill, userId);
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
}
