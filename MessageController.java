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

/*
Created  by Baris Dingil
 */

@Service
public class MessageController {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> getMessage(@RequestBody Map<String, String> body){

        Map<String, Object> response = new HashMap<String, Object>();

        try {
            String dest = body.get("User_Receiver");
            String message = body.get("Message");
            String sender = body.get("Sender");

            List<Map<String, Object>> existingUser = jdbcTemplate.queryForList("SELECT * FROM users WHERE User_Receiver='" + dest + "'");

            if (existingUser.size() == 0) {
                throw new RuntimeException("User don't exist, check the destination again!");
            }

            jdbcTemplate.update("INSERT INTO Messages (User_Receiver, message, sender) VALUES (?, ?, ?)", dest, message, sender);


            response.put("status", HttpStatus.OK);
            return response;
        }catch(DataAccessException e){

        }
        return response;
    }


}
