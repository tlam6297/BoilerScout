package com.example.boilerscout;

import com.example.boilerscout.api.*;
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

    //TODO code documentation

    @Autowired
    private SignUpController signUpController;

    @Autowired
    private LoginController loginController;

    @Autowired
    private ProfileController profileController;

    @Autowired
    private SearchController searchController;

    @Autowired
    private ForumController forumController;


    @CrossOrigin
    @RequestMapping(value = "/sign-up", method = RequestMethod.POST)
    @ResponseBody
    //TODO implement meaningful exception handling for badly formatted requests
    public Map<String, Object> signUp(@Valid @RequestBody Map<String, Object> body) {
        return signUpController.signUp(body);
    }

    @CrossOrigin
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> login(@Valid @RequestBody Map<String, String> body) {
        return loginController.login(body);

    }

    @CrossOrigin
    @RequestMapping(value = "/update-profile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateProfile(@Valid @RequestBody Map<String, Object> body) {
        return profileController.updateProfile(body);
    }

    @CrossOrigin
    @RequestMapping(value = "/scout", method = RequestMethod.GET)
    public Map<String, Object> queryForUsers(@RequestParam String userId,
                                      @RequestParam String token,
                                      @RequestParam String type,
                                      @RequestParam String query) {
        return searchController.search(userId, token, type, query);
    }

    @CrossOrigin
    @RequestMapping(value = "/community/start-thread", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> startForumThread(@Valid @RequestBody Map<String, Object> body) {
        return forumController.startThread(body);
    }

    @CrossOrigin
    @RequestMapping(value = "/community", method = RequestMethod.GET)
    public Map<String, Object> queryForUsers(@RequestParam String userId,
                                             @RequestParam String token) {
        return forumController.getForums(userId, token);
    }

    //ADMIN ONLY ENDPOINT (not for frontend use)
    @RequestMapping(value = "/community/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateForum(@Valid @RequestBody Map<String, Object> body) {
        return forumController.updateForum(body);
    }



    public static void main(String[] args) {
        SpringApplication.run(BoilerScoutApplication.class, args);
    }

}
