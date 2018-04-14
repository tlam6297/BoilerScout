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

import java.sql.Types;
import java.util.*;


/*
Created  by Baris Dingil
*/

@Service
public class MessageController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> getMessage(@RequestBody Map<String, String> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        String dest = body.get("User_Receiver");
        String message = body.get("message");
        String sender = body.get("sender");
        String token = body.get("token");

        if (!isValidToken(token, sender) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {

                List<Map<String, Object>> existingUser = jdbcTemplate.queryForList("SELECT user_id FROM users WHERE email ='" + dest + "'");


                if (existingUser.size() == 0) throw new RuntimeException("User don't exist!");

                String user_ = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email ='" + dest + "'", String.class);
              //  String user_s = jdbcTemplate.queryForObject("SELECT email FROM users WHERE user_id ='" + sender + "'", String.class);
               // String userReceive = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email ='" + dest + "'", String.class);

                java.sql.Timestamp a = new java.sql.Timestamp(System.currentTimeMillis());
//                Object[] params = new Object[]{
//                        user_,
//                        message,
//                        sender,
//                        a,
//                        a.toString(),
//                        dest,
//                        user_s
//                };
//
//                int[] types = new int[]{
//                        Types.VARCHAR, Types.VARCHAR, Types.VARCHAR, Types.TIMESTAMP, Types.VARCHAR,Types.VARCHAR,Types.VARCHAR
//                };
//

                jdbcTemplate.update("INSERT INTO Mes (User_Receiver, message,sender,datesent) VALUES (?, ?, ?,?)", user_,message,sender,a);

                response.put("status", HttpStatus.OK);


            } catch (DataAccessException e) {

                log.info("Exception Message" + e.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");

            }

            return response;
        }
    }
}
