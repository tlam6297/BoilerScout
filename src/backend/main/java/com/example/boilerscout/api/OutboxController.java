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

import java.sql.Time;
import java.sql.Timestamp;
import java.util.*;

@Service
public class OutboxController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> getOutbox (@RequestParam String user_Id, @RequestParam int sort, @RequestParam String token) {

        Map<String, Object> response = new HashMap<String, Object>();

        response.put("user_Id", user_Id);
        response.put("token", token);
        response.put("sort", sort);

        if (!isValidToken(token, user_Id) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;

        } else {

            try {

                List<Map<String, Object>> listOfinbox = jdbcTemplate.queryForList("SELECT message, email, dateString FROM Mes WHERE sender='" + user_Id + "'ORDER BY datesent ASC");

                if (sort == 2) {

                    listOfinbox = jdbcTemplate.queryForList("SELECT message, email, dateString  FROM Mes WHERE sender='" + user_Id + "'ORDER BY datesent DESC ");

                }

                response.put("listOfinbox", listOfinbox);
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
