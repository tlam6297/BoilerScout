package com.example.boilerscout.api;

import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by terrylam on 3/15/18.
 */
@Service
public class SearchController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public Map<String, Object> search(@RequestParam String userId,
                                      @RequestParam String token,
                                      @RequestParam String type,
                                      @RequestParam String query) {

        Map<String, Object> response = new HashMap<String, Object>();


        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            //search
            try {
                if(type.equals("name")) {

                } else if(type.equals("skill")) {

                } else { //type is a course

                }

            } catch (DataAccessException ex) {
                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
        }

        response.put("userId", userId);
        response.put("token", token);
        response.put("status", HttpStatus.OK);
        return response;
    }


}
