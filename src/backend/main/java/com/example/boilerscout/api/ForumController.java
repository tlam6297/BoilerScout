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

/**
 * Created by terrylam on 3/27/18.
 */

@Service
public class ForumController extends ValidationUtility {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;


    //TODO code documentation
    //ADMIN ONLY FUNCTIONALITY ONLY
    public void removeForum(String forumName) {
        try {
            jdbcTemplate.update("DELETE FROM forums WHERE forum_name='" + forumName + "'");
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
    }

    public void insertForum(String forumName, String description) {
        try {
            String newForumId = UUID.randomUUID().toString();
            jdbcTemplate.update("INSERT INTO forums(forum_id, forum_name, forum_description) VALUES (?, ?, ?)", newForumId, forumName, description);
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
    }

    public Map<String, Object> updateForum(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        String forumName = body.get("forumName").toString();
        String action = body.get("action").toString(); //insert or remove

        switch (action) {
            case "insert":
                String description = body.get("description").toString();
                insertForum(forumName, description);
                response.put("status", HttpStatus.OK);
                break;
            case "remove":
                if (forumExists(forumName)) {
                    removeForum(forumName);
                    response.put("status", HttpStatus.OK);
                } else {
                    response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - Forum could not be removed: does not exist!");
                } break;
            default:
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - Could not perform action (insert/remove only)");
        }
        return response;
    }


    //Forum controller functions
    public Map<String, Object> getForums(@RequestParam String userId,
                                         @RequestParam String token) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("userId", userId);
        response.put("token", token);
        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {
                List<Map<String, Object>> listOfForums = jdbcTemplate.queryForList("SELECT * FROM forums");
                response.put("forums", listOfForums);
            } catch (DataAccessException ex) {
                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
        }
        response.put("status", HttpStatus.OK);
        return response;

    }


    public Map<String, Object> startThread(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        Date d = new Date();
        Timestamp threadDate = new Timestamp(d.getTime());

        String userId = body.get("userId").toString();
        String token = body.get("token").toString();
        String newThreadId = UUID.randomUUID().toString();
        String forumId = body.get("forumId").toString();
        String threadTitle = body.get("threadTitle").toString();
        String threadBody = body.get("threadBody").toString();


        //Perform user validation

        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        } else {
            try {
                jdbcTemplate.update("INSERT INTO threads (thread_id, forum_id, user_id, thread_title, thread_body, thread_date) " +
                        "VALUES (?, ?, ?, ?, ?, ?)", newThreadId, forumId, userId, threadTitle, threadBody, threadDate);
            } catch (DataAccessException ex) {
                log.info("Exception Message" + ex.getMessage());
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                throw new RuntimeException("[InternalServerError] - Error accessing data.");
            }
            response.put("userId", userId);
            response.put("token", token);
            response.put("status", HttpStatus.OK);
            return response;
        }

    }

    public Map<String, Object> postReply(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<String, Object>();

        return response;

    }

}
