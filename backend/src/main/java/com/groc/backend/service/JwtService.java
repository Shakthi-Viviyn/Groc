package com.groc.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET = "EVAKb3SI7dj3IULYpqIEatHJ1RjWERqWEIAAdj7XR9Y=";

//    public JwtService(){
//        this.SECRET = generateSecret();
//    }

//    public String generateSecret(){
//        try{
//            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
//            SecretKey secret = keyGen.generateKey();
//            return Base64.getEncoder().encodeToString(secret.getEncoded());
//
//        }catch (NoSuchAlgorithmException e){
//            throw new RuntimeException(e);
//        }
//    }

    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
                .signWith(getKey(), Jwts.SIG.HS256)
                .compact();
    }

    public SecretKey getKey(){
        byte[] secretBytes = Decoders.BASE64.decode(SECRET);

        return Keys.hmacShaKeyFor(secretBytes);
    }

    public String extractUserName(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        try {
            final Claims claims = extractAllClaims(token);
            return claimResolver.apply(claims);
        }catch (Exception e){
            return null;
        }
    }

    private Claims extractAllClaims(String token) throws Exception {
        try{
            return Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new Exception(e);
        }
    }

    public boolean validateToken(String token) {
        final String userName = extractUserName(token);
        if (userName == null) return false;

        return !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

}
