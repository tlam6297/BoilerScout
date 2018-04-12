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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
@Service
public class SettingsController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> updatePassword(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        String userId = body.get("userId").toString();
        String token = body.get("token").toString();

        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {
                String currentPass = body.get("currentPassword").toString();
                String newPass = body.get("newPassword").toString();
                String matchPass = body.get("confirmPassword").toString();

                //check that the new and current password are not the same.
                if(currentPass.equals(newPass)){
                    throw new RuntimeException("[BadRequest] - The new password cannot be the same as the old one!");
                }

                //check that the new Password matches twice.
                if(!newPass.equals(matchPass)){
                    throw new RuntimeException("[BadRequest] - The new passwords don't match each other!");
                }

                //check if current password matches the one in database, (I thought it would be better to do this late only once all other requirements are met)
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String dbPassword = jdbcTemplate.queryForObject("SELECT password FROM users WHERE user_id='" + userId + "'", String.class);
                if (!passwordEncoder.matches(currentPass, dbPassword)) {
                    throw new RuntimeException("[BadRequest] - Incorrect password provided!");
                }

                String hashedNewPass = passwordEncoder.encode(newPass);
                hashedNewPass = '"'+hashedNewPass+'"';
                jdbcTemplate.update("UPDATE users SET password=" + hashedNewPass + " WHERE user_id='" + userId + "'");

                response.put("status","Successful Update");
                response.put("userId",userId);
                response.put("token",token);


            } catch (DataAccessException ex) {
                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }


        }

        return response;
    }


    public Map<String, Object> resetValidation(@RequestParam String query, @RequestParam String userId) {
        String hashedEmail = query;
        Integer existingUser = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE user_id='" + userId + "'", Integer.class);

        //check user exists
        if(existingUser<=0){
                throw new RuntimeException("[BadRequest] - No user associated with this email!");
        }
        String email = jdbcTemplate.queryForObject("SELECT email FROM users WHERE user_id='" + userId + "'", String.class);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        //check that the query is a match for someone and that it is valid for said person
        if (!encoder.matches(email, hashedEmail)) {
            throw new RuntimeException("[BadRequest] - Invalid link!");
        }
        String hashId = encoder.encode(userId);
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("userId",userId);
        response.put("status","valid");
        response.put("hashedEmail",hashedEmail);
        response.put("hashedId",hashId);

        return response;
    }


    public Map<String, Object> resetPassword(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        String userId = body.get("userId").toString();
        String hashedEmail = body.get("hashedEmail").toString();
        String hashedId = body.get("hashedId").toString();

            try {
                String newPass = body.get("newPassword").toString();
                String matchPass = body.get("confirmPassword").toString();


                //check that the new Password matches twice.
                if(!newPass.equals(matchPass)){
                    throw new RuntimeException("[BadRequest] - The new passwords don't match each other!");
                }


                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

                //security checks, the hashed values cannot be accessed unless the user has accesed this page from a valid link
                String email = jdbcTemplate.queryForObject("SELECT email FROM users WHERE user_id='" + userId + "'", String.class);
                if (!encoder.matches(email, hashedEmail)) {
                    throw new RuntimeException("[BadRequest] - Invalid attempt!");
                }

                if(!encoder.matches(userId,hashedId)){
                    throw new RuntimeException("[BadRequest] - Invalid attempt!");
                }



                newPass = encoder.encode(newPass);
                newPass = '"'+newPass+'"';
                jdbcTemplate.update("UPDATE users SET password=" + newPass + " WHERE user_id='" + userId + "'");

                response.put("status","Successful Reset");
                response.put("userId",userId);


            } catch (DataAccessException ex) {
                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }


        return response;
    }

}

