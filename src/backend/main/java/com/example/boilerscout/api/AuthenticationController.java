package com.example.boilerscout.api;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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


import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by terrylam on 2/14/18.
 */

@Service
public class AuthenticationController extends ValidationUtility {
    private static final Logger log = LoggerFactory.getLogger(Application.class);
    static final long EXPIRATIONTIME = 864_000_000; // 10 days
    static final String SECRET = "TerryLam";
    //TODO code documentation


    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> login(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();
        try {
            String email = body.get("email").toString();
            String password = body.get("password").toString();
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            //Check if email exists
            Integer existingEmail = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users WHERE email='" + email + "'", Integer.class);
            if (existingEmail <= 0) {
                throw new RuntimeException("[BadRequest] - No user associated with this email address!");
            }

            //Check if email is verified
            Integer verifiedEmail = jdbcTemplate.queryForObject("SELECT email_verified FROM users WHERE email='" + email + "'", Integer.class);
            if (verifiedEmail != 1) {
                throw new RuntimeException("[BadRequest] - The associated email is not verified!");
            }

            //Check if password matches
            String dbPassword = jdbcTemplate.queryForObject("SELECT password FROM users WHERE email='" + email + "'", String.class);
            if (!passwordEncoder.matches(password, dbPassword)) {
                throw new RuntimeException("[BadRequest] - Incorrect password provided!");
            }

            //Grab user_id
            String user_id = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email='" + email + "'", String.class);

            //Otherwise generate new JWT access token
            String JWT = Jwts.builder()
                    .setSubject(email)
                    .claim("userId", user_id)
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                    .signWith(SignatureAlgorithm.HS512, SECRET)
                    .compact();

            //Insert the token into the database
            jdbcTemplate.update("UPDATE users SET authentication_token='" + JWT + "'" + " WHERE email ='" + email + "'");

            response.put("userId", user_id);
            response.put("token", JWT);

        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
        return response;
    }

    public Map<String, Object> logout(@RequestBody Map<String,Object> body) {
        Map<String, Object> response = new HashMap<String, Object>();
        try {
            String userId = body.get("userId").toString();
            String token = body.get("token").toString();
            if (!isValidToken(token, userId) || isExpiredToken(token)) {
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!");
                return response;
            } else {
                jdbcTemplate.update("UPDATE users SET authentication_token = NULL WHERE user_id='" + userId + "'");
                response.put("status", HttpStatus.OK);
            }
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
        return response;
    }
}
