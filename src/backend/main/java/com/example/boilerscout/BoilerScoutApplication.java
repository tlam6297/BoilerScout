package com.example.boilerscout;

import com.example.boilerscout.api.InboxController;
import com.example.boilerscout.api.LoginController;
import com.example.boilerscout.api.MessageController;
import com.example.boilerscout.api.SignUpController;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

import static com.example.boilerscout.api.InboxController.*;

@RestController
@SpringBootApplication
public class BoilerScoutApplication {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private SignUpController signUpController;

    @Autowired
    private LoginController loginController;

    @Autowired
    private MessageController messageController;

    @Autowired
    private InboxController inboxController;

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

    @RequestMapping(value = "/message", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> message(@Valid @RequestBody Map<String, String> body) {
        return messageController.getMessage(body);

    }

    @RequestMapping(value = "/inbox", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> inbox(@RequestParam String user_Id,@RequestParam int sort, @RequestParam String search,@RequestParam int inorout ){//,@RequestParam String token ) {
        return inboxController.getInbox(user_Id, sort, search, inorout);//, token);

    }

    public static void main(String[] args) {
        SpringApplication.run(BoilerScoutApplication.class, args);
    }

}
