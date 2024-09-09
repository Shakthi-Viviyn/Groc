package com.groc.backend.controller;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.model.entity.Bill;
import com.groc.backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillController {

    @Autowired
    private BillService billService;

    private Long getRequestUserId(){
        return Long.valueOf((String)SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    @PostMapping("/bills")
    public ResponseEntity<String> createBill(@RequestBody BillDto bill){
        Long userId = getRequestUserId();

        try {
            billService.createBill(bill, userId);
            return ResponseEntity.status(201).body("Created");
        }catch (UsernameNotFoundException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/bills")
    public List<Bill> getAllBills(){
        Long userId = getRequestUserId();
        return billService.getAllBills(userId);
    }

    @GetMapping("/bills/{billId}")
    public ResponseEntity<?> getDetailedBill(@PathVariable Long billId){
        Long userId = getRequestUserId();

        try{
            BillDto billInfo = billService.getDetailedBill(billId, userId);
            return ResponseEntity.status(200).body(billInfo);
        }catch(Exception e){
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/bills/{billId}")
    public ResponseEntity<String> deleteBill(@PathVariable Long billId){
        Long userId = getRequestUserId();

        try{
            billService.deleteBill(billId, userId);
            return ResponseEntity.status(200).body("Deleted");
        }catch (Exception e){
            return ResponseEntity.status(404).body("Bill not found");
        }
    }

}
