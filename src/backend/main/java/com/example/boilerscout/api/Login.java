package com.example.boilerscout.api;

import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.HashMap;
import java.util.Map;

/**
 * Created by terrylam on 2/14/18.
 */

@Component
public class Login {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> login(@RequestBody Map<String, String> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        try {
            String email = body.get("email");
            String password = body.get("password");
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            //Check if email exists
            Integer existingEmail = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE email='" + email + "'", Integer.class);
            if(existingEmail <= 0) {
                throw new RuntimeException("[BadRequest] - No user associated with this email address!");
            }

            //Check if password matches
            String dbPassword = jdbcTemplate.queryForObject("SELECT password FROM users WHERE email='" + email + "'", String.class);
            if(!passwordEncoder.matches(password, dbPassword)) {
                throw new RuntimeException("[BadRequest] - Incorrect password provided!");
            }

            //Otherwise generate new JWT access token





        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }

        return response;


    }


}
