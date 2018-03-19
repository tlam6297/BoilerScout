package com.example.boilerscout.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProfileGetController {


    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> getProfile(String idid, String token) {

        ValidateUser vu = new ValidateUser();
        Map<String, Object> response = new HashMap<String, Object>();
        if(  !vu.validateToken(token,idid)){
            response.put("Error", "User token not valid in  getProfile.");
            return response;
        }


        try {
            //check if id exists
            Integer existingID = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE user_id='" + idid + "'", Integer.class);
            if (existingID <= 0) {
                throw new RuntimeException("[BadRequest] - No user associated with this ID!");
            }


            //get info, THIS is the basic query that should always work, but currently db has some users where some values are not even NULL but simply literally dont exist, cant find, whatever you wanna call it
            List<Map<String, Object>> userInfo = jdbcTemplate.queryForList("SELECT users.user_id, email, skill_name, profiles.bio, profiles.major, profiles.full_name FROM users JOIN user_skills ON users.user_id = user_skills.user_id JOIN skills ON user_skills.skill_id = skills.skill_id JOIN profiles ON users.user_id = profiles.user_id WHERE users.user_id = '" + idid + "'");
            if(userInfo.size()>0){
//if this check passes then cool, user has courses,bio, skills, and we reduce the number of pings to db to 2.
                response.put("Email",userInfo.get(0).get("email"));
                response.put("Name", userInfo.get(0).get("full_name"));
                response.put("Major", userInfo.get(0).get("major"));
                response.put("Bio", userInfo.get(0).get("bio"));
                List<String> skills = new ArrayList<String>();
                for(int i=0; i!=userInfo.size();i++){   // make this into a list not map-in-ma
                    skills.add(userInfo.get(i).get("skill_name").toString());
                }
                if(skills.size()>0){
                    response.put("Skills",skills);
                }
                //now check courses
                userInfo =jdbcTemplate.queryForList("SELECT course_name FROM users JOIN user_courses ON users.user_id=user_courses.user_id JOIN courses ON user_courses.course_id = courses.course_id WHERE users.user_id = '" + idid + "'");
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
                List<Map<String, Object>> tempInfo = jdbcTemplate.queryForList("SELECT skill_name from user_skills JOIN skills on  user_skills.skill_id = skills.skill_id where user_id = '" + idid + "'");
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
                tempInfo = jdbcTemplate.queryForList("SELECT course_name from user_courses JOIN courses on  user_courses.course_id = courses.course_id where user_id = '" + idid + "'");
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
                tempInfo = jdbcTemplate.queryForList("SELECT full_name, bio, major from profiles where user_id = '" + idid +"'");
                if(tempInfo.size()>0){
                    hasBio = true;
                    if(tempInfo.get(0).get("full_name")!=null){
                        response.put("Full Name",tempInfo.get(0).get("full_name"));
                    }
                    if(tempInfo.get(0).get("bio")!=null){
                        response.put("Bio",tempInfo.get(0).get("bio"));
                    }
                    if(tempInfo.get(0).get("major")!=null){
                        response.put("Major",tempInfo.get(0).get("major"));
                    }
                }
                //GET EMAIL, should never run into issues but just safety check anyways
                tempInfo = jdbcTemplate.queryForList("SELECT email from users where user_id =  '" + idid +"'");

                response.put("Email",tempInfo.get(0).get("email"));

                return response;
            }

          /*  List<String> skills = new ArrayList<String>();
            for(int i=0; i!=userInfo.size();i++){   // make this into a list not map-in-ma
                skills.add(userInfo.get(i).get("skill_name").toString());
            }

            if(skills.size()>0) {
                response.put("skills", skills);
            }
            userInfo =jdbcTemplate.queryForList("SELECT course_name FROM users JOIN user_courses ON users.user_id=user_courses.user_id JOIN courses ON user_courses.course_id = courses.course_id WHERE users.user_id = '" + idid + "'");
            List<String> courses = new ArrayList<String>();
            for(int i=0; i!=userInfo.size();i++){   // make this into a list not map-in-ma
                courses.add(userInfo.get(i).get("course_name").toString());
            }
            if(courses.size()>0) {
                response.put("courses", courses);
            }*/
        } catch (DataAccessException ex) {

        }
        return response;

    }


}
