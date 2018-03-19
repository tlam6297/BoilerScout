package com.example.boilerscout;

import com.example.boilerscout.api.LoginController;
import com.example.boilerscout.api.ProfileController;
import com.example.boilerscout.api.ValidationUtility;
import com.example.boilerscout.api.SignUpController;
import com.example.boilerscout.api.ProfileGetController;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@SpringBootApplication
public class BoilerScoutApplication {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private SignUpController signUpController;

    @Autowired
    private LoginController loginController;

    @Autowired
    private ProfileController profileController;
    
    @Autowired
    private ProfileGetController profileGetController;

    @RequestMapping(value = "/test")
    public Map<String, Object> t(@RequestBody Map<String, String> body) {
        return signUpController.test(body);
    }

    @RequestMapping(value = "/sign-up", method = RequestMethod.POST)
    @ResponseBody
    //TODO implement meaningful exception handling for badly formatted requests
    public Map<String, Object> signUp(@Valid @RequestBody Map<String, String> body) {
        return signUpController.signUp(body);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> login(@Valid @RequestBody Map<String, String> body) {
        return loginController.login(body);

    }

    @RequestMapping(value = "/update-profile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateProfile(@Valid @RequestBody Map<String, Object> body) {
        return profileController.updateProfile(body);
    }

    
    @RequestMapping(value = "/get-profile/get", params = {"id"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getProfile(@RequestParam("id") String id,@RequestParam("token") String token){
        return profileGetController.getProfile(id,token);
    }
    
    public static void main(String[] args) {
        SpringApplication.run(BoilerScoutApplication.class, args);
    }

}
