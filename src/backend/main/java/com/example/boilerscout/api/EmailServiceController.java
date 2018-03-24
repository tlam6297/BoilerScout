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
        String userId = body.get("id");
        Integer existingID = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE user_id='" + userId + "'", Integer.class);
        if (existingID <= 0) {
            throw new RuntimeException("[BadRequest] - No user associated with this ID!");
        }
        try {
            List<Map<String, Object>> email;
            //got email
            email = jdbcTemplate.queryForList("SELECT email from users where user_id =  '" + userId +"'");
            String to = email.get(0).get("email").toString();
            //generate new verification code
            //  List<Map<String, Object>> prevVerificationCode = jdbcTemplate.queryForList("SELECT email from users where user_id =  '" + userId +"'");
            // int prev = (Integer) prevVerificationCode.get(0).get("email_verified"); //always is an int so this should be okay
            //  int verificationCode = generateVerificationCode(prev);
            int verificationCode = ThreadLocalRandom.current().nextInt(100000, 1999999999);
            jdbcTemplate.update("UPDATE users SET email_verified=" + verificationCode + " WHERE user_id='" + userId + "'");
            //verification code stored in email_verified value, to be passed as parameter for verification GET
            //if the GET matches the number in table, then status will change to 1.



            String subject ="BoilerScout. Account verification.";
            String text = "Hi, you are now one step closer to your BoilerScout account.\n\n";
            text = text + "Please verifiy your account with the following link:\n\n\tlocalhost:8080/verify/get?id=";
            String id = body.get("id");
            sendSimpleMessage(to,subject,text + userId + "&query=" + verificationCode);
            response.put("ok","ok");
            response.put("userId",id);
            return response;


        } catch (DataAccessException ex) {

            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }

    }

    public Map<String, Object> sendNewPassword(@RequestBody Map<String, String> body){
        Map<String, Object> response = new HashMap<String, Object>();
        String email = body.get("email");
       // String token = body.get("token").toString();
        Integer existingEmail = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE email='" + email + "'", Integer.class);
        //CHECK user exists
        if (existingEmail <= 0) {
            throw new RuntimeException("[BadRequest] - No user associated with this email!");
        }
        //CHECK token is valid
      //  if (!isValidToken(token, userId) || isExpiredToken(token)) {
      //      response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
      //      return response;
      //  }
        try {

            List<Map<String, Object>> userInfo;
            //get email, and current hashed pass
            String oldPassword = jdbcTemplate.queryForObject("SELECT password FROM users WHERE email='" + email + "'", String.class);
            String userId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email='" + email + "'", String.class);

            String to = email;
              BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
              String newPassword;
              String hashedNewPass;
             //make sure old password isnt generated by chance.
              do {
                  newPassword = generateRandomString();
                  hashedNewPass = passwordEncoder.encode(newPassword);
            } while (hashedNewPass.equals(oldPassword));
             //update password in db, hashed already
            hashedNewPass = '"'+hashedNewPass+'"';
            jdbcTemplate.update("UPDATE users SET password=" + hashedNewPass + " WHERE user_id='" + userId + "'");

            String subject ="BoilerScout. New password requested.";
            String text = "Hi,\n\n You have requested a new password for your account.\n";
            text = text + "Note that if you have recently requested more than one new password, ";
            text = text + "the one contained in this email might be outdated.  ";
            text = text + "Please ensure this is the most recent email of this kind you have recieved.\n\n";
            text = text + "Please login with the following password, and change it as soon as possible:\n\n\t";
            text = text + newPassword;
            sendSimpleMessage(to,subject,text);
            //send email with unhashed new pass
            response.put("ok","ok");
            response.put("userId",userId);
           // response.put("new",hashedNewPass);
            //response.put("userId",userId);
            return response;

        } catch (DataAccessException ex) {

            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }

    }

}
