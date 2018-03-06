package com.example.boilerscout.api;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

/**
 * Created by terrylam on 2/20/18.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class ValidationUtilitySpec extends ValidationUtility {

    static final long EXPIRATIONTIME = 1_864_000_000; // 10 days
    static final String SECRET = "TerryLam";

    @Test
    public void testTokenValidation() {
        String jwt = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW00NUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZDYyNDc3OTMtYTgzMi00NjhmLWJ" +
                "jZDMtYTcyM2RiOTE2YThkIiwiZXhwIjoxNTE5OTM5NDU2fQ.3E6v85WD8YbZdtHUmHWsGRbvVBXIviegOVOKa_kNkik3XTlxsrqn5GG" +
                "Em41NtNr89i1FwMS9Y987qgp-KQ4oBQ";
        String userId = "d6247793-a832-468f-bcd3-a723db916a8d";
        Assert.assertTrue("This token is valid!", isValidToken(jwt, userId));
    }

    @Test
    public void testTokenExpiration() {
        //Doesn't expire until 2/24/2050
        String validJWT = Jwts.builder()
                .setSubject("someEmail@purdue.edu")
                .claim("userId", "someUserId")
                .setExpiration(new Date(System.currentTimeMillis() + (EXPIRATIONTIME * 100))) //This is about 6 years
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        String expiredJWT = Jwts.builder()
                .setSubject("someEmail@purdue.edu")
                .claim("userId", "someUserId")
                .setExpiration(new Date(System.currentTimeMillis() - 86400000)) //This is yesterday
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        Assert.assertTrue("This token is expired!", isExpiredToken(expiredJWT));
        Assert.assertFalse("This token is not expired!", isExpiredToken(validJWT));
    }

}
