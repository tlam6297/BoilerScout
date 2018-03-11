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

import java.util.*;

/**
 * Created by terrylam on 3/1/18.
 */

@Service
public class ProfileController extends ValidationUtility {

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
                    String bio = body.get("bio").toString().replace("'", "''");
                    jdbcTemplate.update("UPDATE profiles SET bio='" + bio + "' WHERE user_id='" + userId + "'");
                    log.info("Successfully updated bio for user: " + userId);
                }
                if (body.containsKey("skills")) {
                    //TODO this really needs to be refactored so we don't hit the database so much
                    List ls = (List) body.get("skills");
                    HashSet<String> listOfSkills = new HashSet<String>(ls);
                    log.info(listOfSkills.toString());

                    if (listOfSkills.isEmpty()) {
                        //Just clear all user's skills from user_skills
                        jdbcTemplate.update("DELETE FROM user_skills WHERE user_id='" + userId + "'");
                    } else {
                        //For each skill, check if it exists, if not, add it to skills table. Then re-add old and new to user_skills table
                        jdbcTemplate.update("DELETE FROM user_skills WHERE user_id='" + userId + "'");
                        for (Iterator<String> it = listOfSkills.iterator(); it.hasNext();) {
                            String skillName = it.next();
                            if (!skillExists(skillName)) {
                                String newSkillId = UUID.randomUUID().toString();
                                jdbcTemplate.update("INSERT INTO skills (skill_id, skill_name) VALUES (?, ?)", newSkillId, skillName);
                                jdbcTemplate.update("INSERT INTO user_skills (user_id, skill_id) VALUES (?, ?)", userId, newSkillId);
                            } else {
                                String skillId = jdbcTemplate.queryForObject("SELECT skill_id FROM skills WHERE skill_name='" + skillName + "'", String.class);
                                jdbcTemplate.update("INSERT INTO user_skills (user_id, skill_id) VALUES (?, ?)", userId, skillId);
                            }
                        }
                    }
                }
                if (body.containsKey("courses")) {
                    //TODO this really needs to be refactored so we don't hit the database so much
                    List ls = (List) body.get("courses");
                    HashSet<String> listOfCourses = new HashSet<String>(ls);
                    log.info(listOfCourses.toString());

                    if (listOfCourses.isEmpty()) {
                        //Just clear all user's courses from user_courses
                        jdbcTemplate.update("DELETE FROM user_courses WHERE user_id='" + userId + "'");
                    } else {
                        //For each course, check if it exists, if not, add it to courses table. Then re-add old and new to user_courses table
                        jdbcTemplate.update("DELETE FROM user_courses WHERE user_id='" + userId + "'");
                        for (Iterator<String> it = listOfCourses.iterator(); it.hasNext();) {
                            String courseName = it.next();
                            if (!courseExists(courseName)) {
                                String newCourseId = UUID.randomUUID().toString();
                                jdbcTemplate.update("INSERT INTO courses (course_id, course_name) VALUES (?, ?)", newCourseId, courseName);
                                jdbcTemplate.update("INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)", userId, newCourseId);
                            } else {
                                String courseId = jdbcTemplate.queryForObject("SELECT course_id FROM courses WHERE course_name='" + courseName + "'", String.class);
                                jdbcTemplate.update("INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)", userId, courseId);
                            }
                        }
                    }
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
