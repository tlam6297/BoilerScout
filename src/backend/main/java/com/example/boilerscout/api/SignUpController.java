package com.example.boilerscout.api;

import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by terrylam on 2/10/18.
 */
@Service
public class SignUpController {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //TODO code documentation


    public Map<String, Object> signUp(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        try {
            String newUserId = UUID.randomUUID().toString();
            String email = body.get("email").toString();
            String password = body.get("password").toString();
            String fullName = body.get("fullName").toString();
            String major = body.get("major").toString();
            Integer gradYear = (Integer) body.get("grad_year");

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


            //Create a new default profile for the user
            jdbcTemplate.update("INSERT INTO profiles (user_id, full_name, major, grad_year) VALUES (?, ?, ?, ?)",
                    newUserId, fullName, major, gradYear);

            response.put("status", HttpStatus.OK);
            return response;
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
    }


}


