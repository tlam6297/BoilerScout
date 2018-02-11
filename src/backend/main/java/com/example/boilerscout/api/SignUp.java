package com.example.boilerscout.api;

import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.integration.IntegrationProperties;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by terrylam on 2/10/18.
 */
public class SignUp {
    private DataSource dataSource;
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> signUp() {
        try {
            String sql = "SELECT * FROM users";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql);
            return ls;
        } catch (DataAccessException ex) {
            log.info("Exception Message" + ex.getMessage());
            throw new RuntimeException("[InternalServerError] - Error accessing data.");
        }
    }
}
