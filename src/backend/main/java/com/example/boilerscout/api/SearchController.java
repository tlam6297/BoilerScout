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

import java.util.*;

/**
 * Created by terrylam on 3/15/18.
 */
@Service
public class SearchController extends ValidationUtility {

    private static final Logger log = LoggerFactory.getLogger(Application.class);
    //TODO code documentation
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
                if (type.equals("name")) {
                    List<Map<String, Object>> queryOfUsers = jdbcTemplate.queryForList("SELECT * FROM profiles WHERE full_name LIKE '%" + query + "%'");
                    response.put("query", queryOfUsers);
                } else if (type.equals("skill")) {
                    List<String> skillIds = jdbcTemplate.queryForList("SELECT skill_id FROM skills WHERE skill_name LIKE '%" + query + "%'", String.class);
                    HashSet<String> userIdsWithSkill = new HashSet<String>();
                    //get all the userIds associated with the skills
                    for (int i = 0; i < skillIds.size(); i++) {
                        String sid = skillIds.get(i);
                        HashSet<String> hs = new HashSet<String>(jdbcTemplate.queryForList("SELECT user_id FROM user_skills WHERE skill_id='" + sid + "'", String.class));
                        userIdsWithSkill.addAll(hs);
                    }

                    //now need to return fullname with the userId (maybe the profiles?)
                    List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
                    for (Iterator<String> it = userIdsWithSkill.iterator(); it.hasNext(); ) {
                        String uid = it.next();
                        result.addAll(jdbcTemplate.queryForList("SELECT * FROM profiles WHERE user_id='" + uid + "'"));
                    }
                    response.put("query", result);
                } else { //type is a course
                    List<String> courseIds = jdbcTemplate.queryForList("SELECT course_id FROM courses WHERE course_name LIKE '%" + query + "%'", String.class);
                    HashSet<String> userIdsWithCourse = new HashSet<String>();
                    for (int i = 0; i < courseIds.size(); i++) {
                        String cid = courseIds.get(i);
                        HashSet<String> hs = new HashSet<String>(jdbcTemplate.queryForList("SELECT user_id FROM user_courses WHERE course_id='" + cid + "'", String.class));
                        userIdsWithCourse.addAll(hs);
                    }

                    List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
                    for (Iterator<String> it = userIdsWithCourse.iterator(); it.hasNext(); ) {
                        String uid = it.next();
                        result.addAll(jdbcTemplate.queryForList("SELECT * FROM profiles WHERE user_id='" + uid + "'"));
                    }

                    response.put("query", result);

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
