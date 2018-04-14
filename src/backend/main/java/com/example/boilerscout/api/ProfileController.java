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

import java.util.*;

/**
 * Created by terrylam on 3/1/18.
 */

@Service
public class ProfileController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);
    //TODO code documentation

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

public Map<String, Object> getProfile(@RequestParam String userId, @RequestParam String token, @RequestParam String query) {
        Map<String, Object> response = new HashMap<String, Object>();

        if (!isValidToken(token, userId) || isExpiredToken(token)) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
            return response;
        }

        try {
            //check if id exists
            Integer existingID = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE user_id='" + query + "'", Integer.class);
            if (existingID <= 0) {
                throw new RuntimeException("[BadRequest] - No user associated with this ID!");
            }
            response.put("token",token);
            response.put("userId",userId);

            //get info, THIS is the basic query that should always work, but currently db has some users where some values are not even NULL but simply literally dont exist, cant find, whatever you wanna call it
            List<Map<String, Object>> userInfo = jdbcTemplate.queryForList("SELECT users.user_id, email, skill_name, profiles.bio, profiles.grad_year, profiles.major, profiles.full_name FROM users JOIN user_skills ON users.user_id = user_skills.user_id JOIN skills ON user_skills.skill_id = skills.skill_id JOIN profiles ON users.user_id = profiles.user_id WHERE users.user_id = '" + query + "'");
            if(userInfo.size()>0){
//if this check passes then cool, user has courses,bio, skills, and we reduce the number of pings to db to 2.
                response.put("Email",userInfo.get(0).get("email"));
                response.put("Name", userInfo.get(0).get("full_name"));
                response.put("Major", userInfo.get(0).get("major"));
                response.put("Bio", userInfo.get(0).get("bio"));
                response.put("Graduation",userInfo.get(0).get("grad_year"));
                List<String> skills = new ArrayList<String>();
                for(int i=0; i!=userInfo.size();i++){   // make this into a list not map-in-ma
                    skills.add(userInfo.get(i).get("skill_name").toString());
                }
                if(skills.size()>0){
                    response.put("Skills",skills);
                }
                //now check courses
                userInfo =jdbcTemplate.queryForList("SELECT course_name FROM users JOIN user_courses ON users.user_id=user_courses.user_id JOIN courses ON user_courses.course_id = courses.course_id WHERE users.user_id = '" + query + "'");
                if(userInfo.size()>0){
                    List<String> courses = new ArrayList<String>();
                    for(int i=0; i!=userInfo.size();i++){   // make this into a list not map-in-ma
                        courses.add(userInfo.get(i).get("course_name").toString());
                    }
                    if(courses.size()>0){
                        response.put("Courses",courses);
                    }
                }
                return response;
//user lacks either a bio, courses, or skill, so we need to find out which.
            } else {
                boolean hasBio = false;
                boolean hasSkills = false;
                boolean hasCourses = false;
                //CHECK FOR SKILLS
                List<Map<String, Object>> tempInfo = jdbcTemplate.queryForList("SELECT skill_name from user_skills JOIN skills on  user_skills.skill_id = skills.skill_id where user_id = '" + query + "'");
                if(tempInfo.size() > 0){
                    hasSkills = true;
                    List<String> skills = new ArrayList<String>();
                    for(int i=0; i!=tempInfo.size();i++){   // make this into a list not map-in-ma
                        skills.add(tempInfo.get(i).get("skill_name").toString());
                    }
                    if(skills.size()>0){
                        response.put("Skills",skills);
                    }
                }
                //CHECK FOR COURSES
                tempInfo = jdbcTemplate.queryForList("SELECT course_name from user_courses JOIN courses on  user_courses.course_id = courses.course_id where user_id = '" + query + "'");
                if(tempInfo.size() > 0) {
                    hasCourses = true;
                    List<String> courses = new ArrayList<String>();
                    for (int i = 0; i != tempInfo.size(); i++) {   // make this into a list not map-in-ma
                        courses.add(tempInfo.get(i).get("courses_name").toString());
                    }
                    if (courses.size() > 0) {
                        response.put("Courses", courses);
                    }
                }
                //CHECK for FULL_NAME, BIO, MAJOR and put if exist
                tempInfo = jdbcTemplate.queryForList("SELECT full_name, bio, major, grad_year from profiles where user_id = '" + query +"'");
                if(tempInfo.size()>0){
                    hasBio = true;
                    if(tempInfo.get(0).get("full_name")!=null){
                        response.put("Name",tempInfo.get(0).get("full_name"));
                    }
                    if(tempInfo.get(0).get("bio")!=null){
                        response.put("Bio",tempInfo.get(0).get("bio"));
                    }
                    if(tempInfo.get(0).get("major")!=null){
                        response.put("Major",tempInfo.get(0).get("major"));
                    }
                    if(tempInfo.get(0).get("grad_year")!=null){
                        response.put("Graduation",tempInfo.get(0).get("grad_year"));
                    }
                }
                //GET EMAIL, should never run into issues but just safety check anyways
                tempInfo = jdbcTemplate.queryForList("SELECT email from users where user_id =  '" + query +"'");

                response.put("Email",tempInfo.get(0).get("email"));

                return response;
            }

        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }


    }
    
}
