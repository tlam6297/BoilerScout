package com.example.boilerscout.api;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ExpandedSearchTests extends SearchController {
    @Test
    public void nonexistentUserTest(){
        Map<String, Object> input = new HashMap<String, Object>();
        String userId = "FAKE_USER";
        //the following fields are not relevant, function should fail when the non-existent user is caught
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTU0NzQ0fQ.xDKIHS-o56suMSWhDTQ_wmOxwDI96W9ksNXHTRQBw2zp3a4H-zKxCxKuTaWF6lbXE0ZgRlqcy2wpI-0R4WxKCQ";
        String type = "skill";
        String query = "Testing";
        String graduation = "2019";
        Map<String, Object> output = new HashMap<String, Object>();
        output = search(userId,token,type,query,graduation,null);
        Assert.assertTrue("User doesnt exist!",output.get("status").equals(HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!"));
    }
    @Test
    public void invalidToken(){
        Map<String, Object> input = new HashMap<String, Object>();
        String userId = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        //the following fields are not relevant, function should fail when the non-existent user is caught
        String token = "FAKE_TOKEN";
        String type = "skill";
        String query = "Testing";
        String graduation = "2019";
        Map<String, Object> output = new HashMap<String, Object>();
        output = search(userId,token,type,query,graduation,null);
        Assert.assertTrue("User doesnt exist!",output.get("status").equals(HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!"));
    }
    @Test
    public void validSearchWithGraduation(){
        Map<String, Object> input = new HashMap<String, Object>();
        String userId = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        //the following fields are not relevant, function should fail when the non-existent user is caught
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low";
        String type = "skill";
        String query = "Testing";
        String graduation = "2019";
        Map<String, Object> output = new HashMap<String, Object>();
        output = search(userId,token,type,query,graduation,null);
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        result = (ArrayList)output.get("query");
        if(result.get(0).get("full_name").equals("Ramiro Velaochaga") && result.get(1).get("full_name").equals("Diego Perez")){
            Assert.assertTrue("Expected users found",true);
            return;
        }
        Assert.assertTrue("Expected users NOT found",false);
    }
    @Test
    public void validSearchWithMajor(){
        Map<String, Object> input = new HashMap<String, Object>();
        String userId = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        //the following fields are not relevant, function should fail when the non-existent user is caught
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low";
        String type = "skill";
        String query = "Testing";
        String major = "Biology";
        Map<String, Object> output = new HashMap<String, Object>();
        output = search(userId,token,type,query,null,major);
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        result = (ArrayList)output.get("query");
        if(result.get(0).get("full_name").equals("Lyes Infante") && result.get(1).get("full_name").equals("Diego Perez")){
            Assert.assertTrue("Expected users found",true);
            return;
        }
        Assert.assertTrue("Expected users NOT found",false);
    }
    @Test
    public void validSearchWithBoth(){
        Map<String, Object> input = new HashMap<String, Object>();
        String userId = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        //the following fields are not relevant, function should fail when the non-existent user is caught
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low";
        String type = "skill";
        String query = "Testing";
        String major = "Biology";
        String graduation = "2020";
        Map<String, Object> output = new HashMap<String, Object>();
        output = search(userId,token,type,query,graduation,major);
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        result = (ArrayList)output.get("query");
        if(result.get(0).get("full_name").equals("Lyes Infante") && result.size()==1){
            Assert.assertTrue("Expected user found",true);
            return;
        }
        Assert.assertTrue("Expected users NOT found",false);
    }
}
