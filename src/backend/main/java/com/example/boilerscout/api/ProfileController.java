package com.example.boilerscout.api;

import io.jsonwebtoken.JwtException;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Created by terrylam on 3/1/18.
 */

@Service
public class ProfileController extends ValidateUser {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> updateProfile(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();

        //Perform user validation
        String userId = body.get("userId").toString();
        String token = body.get("token").toString();

        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {

            //Update profile
            //TODO Refactor this functionality for PUT and PATCH rather than POSTs
            try {
                //Update bio (if any changes are made)
                if (body.containsKey("bio")) {
                    String bio = body.get("bio").toString();
                    jdbcTemplate.update("UPDATE profiles SET bio='" + bio + "' WHERE user_id='" + userId + "'");
                    log.info("Successfully updated bio for user: " + userId);
                }
                if (body.containsKey("skills")) {
                    List skills = (List) body.get("skills");
                    //for each skill, check if it exists, if not, add it to skills table

                    //remove all the user's skills and re-enter them
                }
                if (body.containsKey("courses")) {
                    List courses = (List) body.get("courses");
                }
            } catch (DataAccessException ex) {
                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
        }


        response.put("status", HttpStatus.OK);
        return response;
    }


}
