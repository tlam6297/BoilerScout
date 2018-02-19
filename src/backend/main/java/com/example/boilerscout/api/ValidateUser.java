package com.example.boilerscout.api;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.DatatypeConverter;

/**
 * Created by terrylam on 2/19/18.
 */

/**
 * This is a utility class written to validate different aspects of a user
 */


public class ValidateUser {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    /**
     *
     * Takes in a JWT and parses it, looking for its userId claim. It matches
     * with the given userId to see if the token is valid and assigned
     *
     * @param jwt
     * @param userId
     * @return
     */
    public static boolean validateToken(String jwt, String userId) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary("TerryLam"))
                    .parseClaimsJws(jwt).getBody();

            Object jwtUserId = claims.get("userId");
            if (!jwtUserId.equals(userId)) {
                return false;
            }
        } catch (JwtException ex) {
            log.info("Error validating token. Exception Message " + ex.getMessage());
            return false;
        }
        return true;
    }
}
