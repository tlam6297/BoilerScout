package com.example.boilerscout.api;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

/**
 * make sure the tokens provided as valid match the user by checking the db, as tokens
 * might have changed if the user logged in recently
 *
 * if either validInputToAndFro or validInputTwiceInARow fail, check login to see if the password provided as the initial
 * state is valid
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class UpdatePasswordTests extends SettingsController {
    @Test
    public void nonexistentUserTest(){
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId","NON_REAL_USER");
        //the following fields are not relevant, function should fail when the non-existent user is caught
        input.put("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        input.put("currentPassword","dummy");
        input.put("newPassword","dummy_test");
        input.put("confirmPassword","dummy_test");
        Map<String, Object> output = new HashMap<String, Object>();
        output = updatePassword(input);
        Assert.assertTrue("The user doesnt exist!",output.get("status").equals(HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!"));
    }
    @Test
    public void invalidToken(){
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId","f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token","WRONG_TOKEN");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword","dummy");
        input.put("newPassword","dummy_test");
        input.put("confirmPassword","dummy_test");
        Map<String, Object> output = new HashMap<String, Object>();
        output = updatePassword(input);
        Assert.assertTrue("This token is not valid!",output.get("status").equals(HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!"));

    }
    @Test
    public void wrongPassword() {
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId", "f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword", "wrong!!!");
        input.put("newPassword", "dummy_test");
        input.put("confirmPassword", "dummy_test");
        Map<String, Object> output = new HashMap<String, Object>();
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test failed!", false);
        } catch (RuntimeException ex) {
            Assert.assertTrue("This password is wrong!", ex.getMessage().equals("[BadRequest] - Incorrect password provided!"));
        }
    }
    @Test
    public void noMatchTwice() {
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId", "f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword", "12345");  //THIS SHOULD BE CHANGED WHEN A VALID TEST IS DONE.
        input.put("newPassword", "dummy_test");
        input.put("confirmPassword", "NO_MATCH");
        Map<String, Object> output = new HashMap<String, Object>();
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test failed!", false);
        } catch (RuntimeException ex) {
            Assert.assertTrue("New password doesnt match twice.", ex.getMessage().equals("[BadRequest] - The new passwords don't match each other!"));
        }
    }
    @Test
    public void repeatingPasswords() {
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId", "f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword", "12345");  //<-----------THIS SHOULD BE CHANGED WHEN A VALID TEST IS DONE.
        input.put("newPassword", "12345");
        input.put("confirmPassword", "12345");
        Map<String, Object> output = new HashMap<String, Object>();
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test failed!", false);
        } catch (RuntimeException ex) {
            Assert.assertTrue("New and old password cant match.", ex.getMessage().equals("[BadRequest] - The new password cannot be the same as the old one!"));
        }
    }
    @Test
    public void validInputToAndFro() {
        //============= SET A ===================
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId", "f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword", "12345");  //<-----------THIS SHOULD BE CHANGED WHEN A VALID TEST IS DONE.
        input.put("newPassword", "test123");
        input.put("confirmPassword", "test123");
        Map<String, Object> output = new HashMap<String, Object>();
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test passed! All input valid!", output.get("status").equals("Successful Update"));
        } catch (RuntimeException ex) {
            Assert.assertFalse("Test failed! Check if case B passed!", true);
        }
        //============= SET B fix back to original state ===================
        input.put("userId", "f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword", "test123");  //<-----------THIS SHOULD BE CHANGED WHEN A VALID TEST IS DONE.
        input.put("newPassword", "12345");
        input.put("confirmPassword", "12345");
        output = new HashMap<String, Object>();
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test passed! All input valid!", output.get("status").equals("Successful Update"));
        } catch (RuntimeException ex) {
            Assert.assertFalse("This password is wrong!", true);
        }

    }
    @Test
    public void validInputTwiceInARow() {
        //============= SET A ===================
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId", "f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword", "12345");  //<-----------THIS SHOULD BE CHANGED WHEN A VALID TEST IS DONE.
        input.put("newPassword", "test123");
        input.put("confirmPassword", "test123");
        Map<String, Object> output = new HashMap<String, Object>();
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test passed! All input valid!", output.get("status").equals("Successful Update"));
        } catch (RuntimeException ex) {
            Assert.assertFalse("Test failed! ", true);
        }
        //============= SET B, try A again ===================
        //repeat same operation
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test failed!", false);
        } catch (RuntimeException ex) {
            Assert.assertTrue("This password is wrong!", ex.getMessage().equals("[BadRequest] - Incorrect password provided!"));
        }
        //============= SET C, fix back to original state ===================
        input.put("userId", "f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ");
        //the following fields are not relevant, function should fail when the bad token is caught
        input.put("currentPassword", "test123");  //<-----------THIS SHOULD BE CHANGED WHEN A VALID TEST IS DONE.
        input.put("newPassword", "12345");
        input.put("confirmPassword", "12345");
        output = new HashMap<String, Object>();
        try {
            output = updatePassword(input);
            //reach here if test fails. smooth exit by function
            Assert.assertTrue("Test passed! All input valid!", output.get("status").equals("Successful Update"));

        } catch (RuntimeException ex) {
            Assert.assertFalse("Test failed!", true);
        }
    }
    
}
