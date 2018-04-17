package com.example.boilerscout.api;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;

/**
 * Created by terrylam on 2/19/18.
 */

/**
 * This is a utility class written to validate different aspects of a user and their JWTs
 */


public class ValidationUtility {
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    //TODO code documentation

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Takes in a JWT and parses it, looking for its userId claim. It matches
     * with the given userId to see if the token is valid and assigned
     *
     * @param jwt    - JWT token
     * @param userId - A user's UUID
     * @return - true or false
     */

    public boolean isValidToken(String jwt, String userId) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary("TerryLam"))
                    .parseClaimsJws(jwt).getBody();

            String jwtUserId = claims.get("userId").toString();
            if (!jwtUserId.equals(userId)) {
                return false;
            } else {
                return true;
            }
        } catch (JwtException ex) {
            log.info("Error validating token. Exception Message " + ex.getMessage());
            return false;
        }
    }

    /**
     * Takes in a JWT and parses it, looking for the expiration claim. It
     * will check the expiration against the current System time.
     * If the expiration time is `before` the current time, that means the token is stale.
     *
     * @param jwt - JWT token
     * @return - true or false
     */

    public boolean isExpiredToken(String jwt) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary("TerryLam"))
                    .parseClaimsJws(jwt).getBody();
            Date expiration = claims.getExpiration();
            //If the expiration Date is a time BEFORE the current time, it is expired
            if (expiration.before(new Date())) {
                return true;
            } else {
                return false;
            }
        } catch (JwtException ex) {
            log.info("Error validating token. Exception Message " + ex.getMessage());
            return true;
        }
    }

    public boolean skillExists(String skillName) {
        Integer existingSkill = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM skills WHERE skill_name='" + skillName + "'", Integer.class);
        if (existingSkill == 0) {
            return false;
        } else {
            return true;
        }
    }

    public boolean courseExists(String courseName) {
        Integer existingCourse = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM courses WHERE course_name='" + courseName + "'", Integer.class);
        if (existingCourse == 0) {
            return false;
        } else {
            return true;
        }
    }

    public boolean forumExists(String forumName) {
        Integer existingForum = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM forums WHERE forum_name='" + forumName + "'", Integer.class);
        if (existingForum == 0) {
            return false;
        } else {
            return true;
        }
    }
}
