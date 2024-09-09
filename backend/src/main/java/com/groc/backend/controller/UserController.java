package com.groc.backend.controller;

import com.groc.backend.model.entity.User;
import com.groc.backend.security.UserPrincipal;
import com.groc.backend.security.CustomUserDetailsService;
import com.groc.backend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController{

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null) return ResponseEntity.status(400).body("Username or Password not found");
        if(userDetailsService.saveUser(user)){
            return ResponseEntity.status(200).body("Account successfully registered");
        }else{
            return ResponseEntity.status(400).body("Account already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        UserPrincipal authenticatedUser = (UserPrincipal) authentication.getPrincipal();
        if (authentication.isAuthenticated()){
            return ResponseEntity.status(200).body(jwtService.generateToken(authenticatedUser.getId()));
        }else{
            return ResponseEntity.status(400).body("Invalid username or password");
        }

    }
}
