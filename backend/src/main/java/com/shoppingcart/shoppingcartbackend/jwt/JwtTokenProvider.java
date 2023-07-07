package com.shoppingcart.shoppingcartbackend.jwt;

import com.shoppingcart.shoppingcartbackend.security.CustomUserDetails;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    @Value("${com.shoppingcart.shoppingcartbackend.jwt.secret}")
    private String JWT_SECRET;
    @Value("${com.shoppingcart.shoppingcartbackend.jwt.expiration}")
    private Long JWT_EXPIRATION;

    public String generateToken(CustomUserDetails customUserDetails) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + JWT_EXPIRATION);

        return Jwts.builder().setSubject(customUserDetails.getUsername()).setIssuedAt(now)
                .setExpiration(expiredDate).signWith(SignatureAlgorithm.ES512, JWT_SECRET).compact();
    }

    public String getUserNameFromJwt(String token) {
        Claims claims = Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty");
        }

        return false;
    }
}
