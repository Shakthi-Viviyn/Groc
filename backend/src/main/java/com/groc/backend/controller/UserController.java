package com.groc.backend.controller;

import com.groc.backend.model.entity.User;
import com.groc.backend.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class UserController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if(userDetailsService.saveUser(user)){
            return ResponseEntity.status(200).body("Account successfully registered");
        }else{
            return ResponseEntity.status(400).body("Account already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            return ResponseEntity.status(200).body("Successfully logged in");
        }else{
            return ResponseEntity.status(400).body("Invalid username or password");
        }

    }
}
