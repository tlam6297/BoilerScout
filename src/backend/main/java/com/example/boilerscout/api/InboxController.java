package com.example.boilerscout.api;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestParam;


import javax.xml.bind.DatatypeConverter;
import java.util.*;

@Service
public class InboxController {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> getInbox (@RequestParam String user_Id, @RequestParam int sort){//, @RequestParam String token) {


        Map<String, Object> response = new HashMap<String, Object>();
        response.put("user_Id", user_Id);
        response.put("sort", sort);
      //  response.put("token", token);

        try {
            List<Map<String, Object>> listOfinbox = jdbcTemplate.queryForList("SELECT * FROM Mes WHERE User_Receiver='" + user_Id + "'");

            if(sort==1) response.put("listofInbox", listOfinbox);

            else if(sort ==0) {

//                    List<Map<String, Object>> listOfinboxR = listOfinbox;
//                    System.out.print(listOfinbox);
                    int j = 0;
                    int i = listOfinbox.size()-1;
                    while( i >= (listOfinbox.size())/2 ) {
                        Map<String, Object> temp = listOfinbox.get(j);
                        listOfinbox.set(j, listOfinbox.get(i));
                        listOfinbox.set(i--, temp);
                        j++;


//                        listOfinbox.set(j++, listOfinboxR.get(i--));
//
//                        response.put("sizeR", listOfinboxR.size());
//                        response.put("size", listOfinbox.size());

                    }
                    response.put("listofInbox", listOfinbox);
                response.put("iteration",j);
                response.put("iterationi",i);

                }
            response.put("status", HttpStatus.OK);

        } catch(DataAccessException e) {

            log.info("Exception Message" + e.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");

        }

        return response;
    }
}
