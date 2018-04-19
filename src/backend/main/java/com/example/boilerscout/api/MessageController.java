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
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.*;

@Service
public class MessageController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> sendMessage(@RequestBody Map<String, String> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        Date d = new Date();
        Timestamp messageDate = new Timestamp(d.getTime());

        String recipientEmail = body.get("recipientEmail");
        String message = body.get("messageBody");
        String userId = body.get("userId");
        String token = body.get("token");
        String newMessageId = UUID.randomUUID().toString();

        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {
                String recipientId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email ='" + recipientEmail + "'", String.class);
                jdbcTemplate.update("INSERT INTO user_messages (message_id, recipient_id, sender_id, message_body, message_date) VALUES (?, ?, ?, ?,?)", newMessageId, recipientId, userId, message, messageDate);
                response.put("status", HttpStatus.OK);
            } catch (DataAccessException e) {
                log.info("Exception Message" + e.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
            return response;
        }
    }

    public Map<String, Object> getInbox(@RequestParam String userId, @RequestParam String sort, @RequestParam String token) {

        Map<String, Object> response = new HashMap<String, Object>();

        response.put("userId", userId);
        response.put("token", token);
        response.put("sort", sort);

        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {
                List<Map<String, Object>> userInbox = new ArrayList<Map<String, Object>>();

                switch (sort) {
                    case "ASC":
                        userInbox = jdbcTemplate.queryForList("SELECT um.message_id, um.message_body, p.full_name, u.email, um.message_date FROM user_messages um INNER JOIN profiles p ON um.sender_id=p.user_id INNER JOIN users u ON u.user_id=um.sender_id WHERE recipient_id='" + userId + "'ORDER BY message_date ASC");
                        break;
                    case "DESC":
                        userInbox = jdbcTemplate.queryForList("SELECT um.message_id, um.message_body, p.full_name, u.email, um.message_date FROM user_messages um INNER JOIN profiles p ON um.sender_id=p.user_id INNER JOIN users u ON u.user_id=um.sender_id WHERE recipient_id='" + userId + "'ORDER BY message_date DESC ");
                        break;
                    default:
                        userInbox = jdbcTemplate.queryForList("SELECT um.message_id, um.message_body, p.full_name, u.email, um.message_date FROM user_messages um INNER JOIN profiles p ON um.sender_id=p.user_id INNER JOIN users u ON u.user_id=um.sender_id WHERE recipient_id='" + userId + "'ORDER BY message_date ASC");
                        break;
                }
                response.put("userInbox", userInbox);
                response.put("status", HttpStatus.OK);
            } catch (DataAccessException e) {
                log.info("Exception Message" + e.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
            return response;
        }
    }

    public Map<String, Object> getOutbox(@RequestParam String userId, @RequestParam String sort, @RequestParam String token) {

        Map<String, Object> response = new HashMap<String, Object>();

        response.put("userId", userId);
        response.put("token", token);
        response.put("sort", sort);

        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {
                List<Map<String, Object>> userOutbox = new ArrayList<Map<String, Object>>();
                switch (sort) {
                    case "ASC":
                        userOutbox = jdbcTemplate.queryForList("SELECT um.message_id, um.message_body, p.full_name, u.email, um.message_date FROM user_messages um INNER JOIN profiles p ON um.recipient_id=p.user_id INNER JOIN users u ON u.user_id=um.recipient_id WHERE sender_id='" + userId + "'ORDER BY message_date ASC");
                        break;
                    case "DESC":
                        userOutbox = jdbcTemplate.queryForList("SELECT um.message_id, um.message_body, p.full_name, u.email, um.message_date FROM user_messages um INNER JOIN profiles p ON um.recipient_id=p.user_id INNER JOIN users u ON u.user_id=um.recipient_id WHERE sender_id='" + userId + "'ORDER BY message_date DESC");
                        break;
                    default:
                        userOutbox = jdbcTemplate.queryForList("SELECT um.message_id, um.message_body, p.full_name, u.email, um.message_date FROM user_messages um INNER JOIN profiles p ON um.recipient_id=p.user_id INNER JOIN users u ON u.user_id=um.recipient_id WHERE sender_id='" + userId + "'ORDER BY message_date ASC");
                        break;
                }
                response.put("userOutbox", userOutbox);
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
