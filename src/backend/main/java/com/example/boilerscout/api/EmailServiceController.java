package com.example.boilerscout.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.security.SecureRandom;
import java.util.concurrent.ThreadLocalRandom;
import java.util.*;


public class EmailServiceController extends ValidationUtility {


    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public JavaMailSender emailSender;
    static final String characterRange = "01234567890BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    static SecureRandom rnd = new SecureRandom();

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
    public int generateVerificationCode(int prev){
        int randomNum = ThreadLocalRandom.current().nextInt(100, 1999999999);
        if(randomNum==prev){
            generateVerificationCode(prev);
        }
        return randomNum;
    }

    public String generateRandomString(){
        StringBuilder sb = new StringBuilder(10);
        for(int i=0; i< 10; i++){
            sb.append(characterRange.charAt(rnd.nextInt(characterRange.length())));
        }
        return sb.toString();
    }
    
    public Map<String, Object> sendVerification(@RequestBody Map<String, String> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        String email = body.get("email");
        Integer existingEmail = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE email='" + email + "'", Integer.class);
        //CHECK user exists
        if (existingEmail <= 0) {
            throw new RuntimeException("[BadRequest] - No user associated with this email!");
        }
        try {
            //got email
            String userId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email='" + email + "'", String.class);
            int currentStatus =  jdbcTemplate.queryForObject("SELECT email_verified FROM users WHERE email='" + email + "'", int.class);
            if(currentStatus==1){
                response.put("userId",userId);
                response.put("Message","Already verified.");
                response.put("status",HttpStatus.BAD_REQUEST);
                return response;
            }
            String to = email;
            //generate new verification code
            int verificationCode = ThreadLocalRandom.current().nextInt(100000, 1999999999);

            jdbcTemplate.update("UPDATE users SET email_verified=" + verificationCode + " WHERE user_id='" + userId + "'");
            String subject ="BoilerScout. Account verification.";
            String text = "Hi,\nYou are now one step closer to your BoilerScout account.\n\nPlease verifiy your account with the following link:\n\n\tlocalhost:8080/verify?id=";
            sendSimpleMessage(to,subject,text + userId + "&query=" + verificationCode);
            response.put("status",HttpStatus.OK);
            response.put("userId",userId);
            return response;


        } catch (DataAccessException ex) {

            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }

    }

    public Map<String, Object> sendNewPasswordLink(@RequestBody Map<String, Object> body){
        Map<String, Object> response = new HashMap<String, Object>();
        String email = body.get("email").toString();
        Integer existingEmail = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE email='" + email + "'", Integer.class);
        //CHECK user exists
        if (existingEmail <= 0) {
            throw new RuntimeException("[BadRequest] - No user associated with this email!");
        }

        try {

            List<Map<String, Object>> userInfo;
            //get email, and current hashed pass

            String userId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email='" + email + "'", String.class);
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String hashedEmail = encoder.encode(email);
            String to = email;
            String subject ="BoilerScout. New password requested.";
            String text = "Hi,\n\n You have requested to reset your password.  Please click the following link:\n\n\tlocalhost:3000/validate-reset?query=";
            //this is were frontend would want to change to 3000 for testing.
            text = text + "" + hashedEmail; //append hashedEmail
            text = text + "&id=" + userId;  //append id, these are both for sec checks
            sendSimpleMessage(to,subject,text);
            
            response.put("status",HttpStatus.OK);
            response.put("userId",userId);
            return response;

        } catch (DataAccessException ex) {

            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }

    }

}
