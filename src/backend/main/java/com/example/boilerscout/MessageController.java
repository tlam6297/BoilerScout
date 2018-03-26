package com.example.boilerscout.api;

import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
            String message = body.get("message");
            String sender = body.get("sender");

            List<Map<String, Object>> existingUser = jdbcTemplate.queryForList("SELECT * FROM profiles WHERE user_id ='" + dest + "'");

            if (existingUser.size() == 0) throw new RuntimeException("User don't exist!");


                jdbcTemplate.update("INSERT INTO Mes (User_Receiver, message, sender) VALUES (?, ?, ?)", dest, message, sender);

                response.put("status", HttpStatus.OK);



        } catch(DataAccessException e){

            log.info("Exception Message" + e.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");

        }
        return response;
    }
}
