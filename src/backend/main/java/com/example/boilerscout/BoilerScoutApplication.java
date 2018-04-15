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
    private AuthenticationController authenticationController;

    @Autowired
    private ProfileController profileController;

    @Autowired
    private SearchController searchController;

    @Autowired
    private ForumController forumController;


    @Autowired
    private EmailServiceController emailServiceController;

    @Autowired
    private VerificationController verificationController;

    @Autowired
    private MessageController messageController;

    @Autowired
    private InboxController inboxController;

    @Autowired
    private OutboxController outboxController;

    
    @Autowired
    private SettingsController settingsController;

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
    public Map<String, Object> login(@Valid @RequestBody Map<String, Object> body) {
        return authenticationController.login(body);
    }

    @CrossOrigin
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> logout(@Valid @RequestBody Map<String, Object> body) {
        return authenticationController.logout(body);
    }

    @CrossOrigin
    @RequestMapping(value = "/update-profile", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateProfile(@Valid @RequestBody Map<String, Object> body) {
        return profileController.updateProfile(body);
    }

     @CrossOrigin
    @RequestMapping(value = "/profile/get", params = {"id"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> getProfile(@RequestParam String id,@RequestParam String token, @RequestParam String query){
        return profileController.getProfile(id,token,query);
    }
    
    @CrossOrigin
    @RequestMapping(value = "/scout", method = RequestMethod.GET)
    public Map<String, Object> queryForUsers(@RequestParam String userId,
                                             @RequestParam String token,
                                             @RequestParam String type,
                                             @RequestParam String query,
                                             @RequestParam(value = "graduation",required = false) String graduation,
                                             @RequestParam(value = "major", required = false) String major
    ) {
        return searchController.search(userId, token, type, query, graduation, major);
    }



    @CrossOrigin
    @RequestMapping(value = "/community/start-thread", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> startForumThread(@Valid @RequestBody Map<String, Object> body) {
        return forumController.startThread(body);
    }

    @CrossOrigin
    @RequestMapping(value = "/community/get-threads", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> retrieveThreads(@RequestParam String userId,
                                               @RequestParam String token,
                                               @RequestParam String forumId) {
        return forumController.getThreads(userId, token, forumId);
    }

    @CrossOrigin
    @RequestMapping(value = "/community/view-thread", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> viewThread(@RequestParam String userId,
                                               @RequestParam String token,
                                               @RequestParam String threadId) {
        return forumController.viewThread(userId, token, threadId);
    }

    @CrossOrigin
    @RequestMapping(value = "/community/post-reply", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> postReply(@Valid @RequestBody Map<String, Object> body) {
        return forumController.postReply(body);
    }


    @CrossOrigin
    @RequestMapping(value = "/community", method = RequestMethod.GET)
    public Map<String, Object> retrieveForums(@RequestParam String userId,
                                             @RequestParam String token) {
        return forumController.getForums(userId, token);
    }

    //ADMIN ONLY ENDPOINT (not for frontend use)
    @RequestMapping(value = "/community/update", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateForum(@Valid @RequestBody Map<String, Object> body) {
        return forumController.updateForum(body);
    }

    @CrossOrigin
    @RequestMapping(value = "/send/verification", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> sendEmail(@Valid @RequestBody Map<String, String> body) {
        return emailServiceController.sendVerification(body);

    }

    @CrossOrigin
    @RequestMapping(value = "/verify", params = {"id"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> verifyUser(@RequestParam String id, @RequestParam int query){
        return verificationController.verify(id,query);

    }

     @CrossOrigin
    @RequestMapping(value = "/send/forgot-pass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> sendPassword(@Valid @RequestBody Map<String, Object> body) {
        return emailServiceController.sendNewPasswordLink(body);

    }
    
        @RequestMapping(value = "/message", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> message(@Valid @RequestBody Map<String, String> body) {
        return messageController.getMessage(body);

    }

    @RequestMapping(value = "/inbox", method = RequestMethod.GET)
    @ResponseBody
        public Map<String, Object> inbox(@RequestParam String user_Id,@RequestParam String sort,@RequestParam String token){
        return inboxController.getInbox(user_Id, sort,token);

    }

    @RequestMapping(value = "/outbox", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> outbox(@RequestParam String user_id,@RequestParam String sort,@RequestParam String token){
        return outboxController.getOutbox(user_id, sort,token);

    }

    @CrossOrigin
    @RequestMapping(value = "/validate-reset", params = {"query"}, method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> newPassword(@RequestParam String query, @RequestParam String id){
        return settingsController.resetValidation(query, id);

    }

    @CrossOrigin
    @RequestMapping(value = "/reset-pass", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> resetPassword(@Valid @RequestBody Map<String, Object> body) {
        return settingsController.resetPassword(body);

    }

    @CrossOrigin
    @RequestMapping(value = "/update-password", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updatePassword(@Valid @RequestBody Map<String, Object> body) {
        return settingsController.updatePassword(body);
    }


    public static void main(String[] args) {
        SpringApplication.run(BoilerScoutApplication.class, args);
    }

}
