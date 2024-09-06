package com.groc.backend.controller;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.model.entity.Bill;
import com.groc.backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/bills")
    public ResponseEntity<String> createBill(@RequestBody BillDto bill){
        billService.createBill(bill);
        return ResponseEntity.status(201).body("Created");
    }

    @GetMapping("/bills")
    public List<Bill> getAllBills(){
        return billService.getAllBills();
    }

    @GetMapping("/bills/{id}")
    public ResponseEntity<?> getDetailedBill(@PathVariable Long id){
        try{
            return ResponseEntity.status(200).body(billService.getDetailedBill(id));
        }catch(Exception e){
            return ResponseEntity.status(404).body("Bill Not Found");
        }
    }

    @DeleteMapping("/bills/{id}")
    public ResponseEntity<String> deleteBill(@PathVariable Long id){
        try{
            billService.deleteBill(id);
            return ResponseEntity.status(200).body("Deleted");
        }catch (Exception e){
            return ResponseEntity.status(404).body("Bill not found");
        }
    }

}
