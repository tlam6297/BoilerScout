package com.example.boilerscout.api;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import javax.xml.bind.DatatypeConverter;
import java.util.*;

/**
 * Created by terrylam on 2/10/18.
 */
@Service
public class SignUpController {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> test(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        String token = body.get("token");
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary("TerryLam"))
                .parseClaimsJws(token).getBody();
        response.put("user_id", claims.get("userId"));
        response.put("expiration", claims.getExpiration());
        response.put("subject", claims.getSubject());
        return response;
    }

    public Map<String, Object> signUp(@RequestBody Map<String, String> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        try {
            String newUserId = UUID.randomUUID().toString();
            String email = body.get("email");
            String password = body.get("password");

            //Verify that no prior email exists
            List<Map<String, Object>> existingEmails = jdbcTemplate.queryForList("SELECT * FROM users WHERE email='" + email + "'");
            if (existingEmails.size() != 0) {
                throw new RuntimeException("[BadRequest] - User with this email already exists!");
            }

            //Hash the password passed over SSL
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(password);

            //Insert a new user into database;
            jdbcTemplate.update("INSERT INTO users (user_id, password, email) VALUES (?, ?, ?)",
                    newUserId, hashedPassword, email);
            response.put("status", HttpStatus.OK);
            return response;

        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
    }


}


