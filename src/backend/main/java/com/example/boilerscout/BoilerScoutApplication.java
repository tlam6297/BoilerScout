package com.example.boilerscout;

import com.example.boilerscout.api.SignUp;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@SpringBootApplication
public class BoilerScoutApplication {
	private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private SignUp su;

	@RequestMapping(value = "/test")
	public String test() {
		return "this is a test!";
	}

	@RequestMapping(value = "/sign-up", method = RequestMethod.GET)
	public List<Map<String, Object>> signUp() {
		return su.test();
	}




	public static void main(String[] args) {
		SpringApplication.run(BoilerScoutApplication.class, args);
	}

}
