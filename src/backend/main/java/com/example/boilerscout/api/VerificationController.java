package com.example.boilerscout.api;


import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VerificationController extends EmailServiceController{
    @Autowired
    private JdbcTemplate jdbcTemplate;


    private static final Logger log = LoggerFactory.getLogger(Application.class);
    public Map<String, Object> verify(String userId, int verificationCode) {
        //verified==1; not verified!=1; verification email sent (!=0 && !=1)
        Map<String, Object> response = new HashMap<String, Object>();
        try {

            //Check if email exists
            Integer existingID = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE user_id='" + userId + "'", Integer.class);
            if (existingID <= 0) {
                throw new RuntimeException("[BadRequest] - No user associated with this ID!");
            }
            List<Map<String, Object>> verificationStatus;
            verificationStatus = jdbcTemplate.queryForList("SELECT email_verified from users where user_id =  '" + userId +"'");
            if(verificationStatus.size()>0){
                //goes in here if status isn't verified
                if(!verificationStatus.get(0).get("email_verified").equals(1)){
                    int compare = (Integer) verificationStatus.get(0).get("email_verified");
                    //MATCH, verify user
                    if(verificationStatus.get(0).get("email_verified").equals(verificationCode)){
                        jdbcTemplate.update("UPDATE users SET email_verified=" + 1 + " WHERE user_id='" + userId + "'");
                        response.put("Response","Verified");
                        response.put("status",HttpStatus.OK);
                        return response;
                    } else {
                        //NO MATCH, inform this verification email isnt valid
                        String message = "This verification email has either expired, or is not valid.";
                        message = message + "  Please check your inbox for a more recent one, or request a new one.";
                        response.put("Response",message);
                        response.put("status", HttpStatus.OK);
                        response.put("email_verified",(verificationStatus.get(0).get("email_verified")));
                        response.put("test",compare);
                        response.put("verification code", verificationCode);
                        return response;
                    }


                    //USER ALREADY VERIFIED
                } else {
                    //response.put("St",verificationStatus.get(0));
                    response.put("Response","Email previously verified.");
                    response.put("status",HttpStatus.BAD_REQUEST);
                    return response;
                }
            }else {
                //Should never reach here, as all users should have a verified field
                response.put("Response", "Critical error, email or id do not exist");
                response.put("status",HttpStatus.BAD_REQUEST);
                return response;
            }
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
    }


}
