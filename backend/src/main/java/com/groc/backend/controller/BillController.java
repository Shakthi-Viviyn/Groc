package com.groc.backend.controller;

import com.groc.backend.model.dto.BillDto;
import com.groc.backend.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/bill")
    public String createBill(@RequestBody BillDto bill){

        billService.createBill(bill);

        return "Success";
    }

}
