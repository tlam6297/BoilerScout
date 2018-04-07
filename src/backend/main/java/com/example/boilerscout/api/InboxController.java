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

    public Map<String, Object> getInbox (@RequestParam String user_Id, @RequestParam int sort, @RequestParam String search,@RequestParam int inorout){

        Map<String, Object> response = new HashMap<String, Object>();

        response.put("user_Id", user_Id);
        response.put("sort", sort);
        response.put("search",search);
        response.put("inorout",inorout);

        try {

              List<Map<String, Object>> listOfinbox = jdbcTemplate.queryForList("SELECT * FROM Mes WHERE User_Receiver='" + user_Id + "'");
              if(inorout==0) listOfinbox = jdbcTemplate.queryForList("SELECT * FROM Mes WHERE sender='" + user_Id + "'");


            if(search.equals("")) {
                if (sort == 0) viseVersa(listOfinbox);
                response.put("listofInbox", listOfinbox);

            } else {

                List<Map<String, Object>> listSearch = null;
                listOfinbox.toArray();
                for(int i=0;i < listOfinbox.size();i++){
                    String[] sentence = (listOfinbox.get(i).toString()).split(" ");
                    for(int j=0;j<sentence.length;j++){
                        if(sentence[j].compareTo(search)==1){
                            listSearch.set(1, listOfinbox.get(i));
                        }
                    }
                }
                response.put("listSearch", listOfinbox);
            }

            response.put("status", HttpStatus.OK);

        } catch(DataAccessException e) {

            log.info("Exception Message" + e.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");

        }
        return response;
    }

    public List<Map<String, Object>> viseVersa(List<Map<String, Object>> a){
        for (int i = a.size() - 1, j = 0; i >= (a.size()) / 2;) {
            Map<String, Object> temp = a.get(j);
            a.set(j++, a.get(i));
            a.set(i--, temp);
        }

        return a;
    }
}
