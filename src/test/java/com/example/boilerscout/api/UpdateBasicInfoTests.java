package com.example.boilerscout.api;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
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
public class UpdateBasicInfoTests extends ProfileController {

    @Test
    public void nonexistentUserTest(){
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId","FAKE_USER");
        input.put("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low");
        input.put("major","Computer Science");
        input.put("grad_year","2019");
        input.put("fullName", "Gustavo Guevara");
        Map<String, Object> output = new HashMap<String, Object>();
        output = updateProfile(input);
        Assert.assertTrue("User doesnt exist!",output.get("status").equals(HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!"));
    }
    @Test
    public void invalidTokenTest(){
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("userId","f249f1e5-4b38-48ba-8817-f7c9be1668e9");
        input.put("token","lkIjoiZjI0OWYxZTUt_INVALID_TOKEN_njagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low");
        input.put("major","Computer Science");
        input.put("grad_year","2019");
        input.put("fullName", "Gustavo Guevara");
        Map<String, Object> output = new HashMap<String, Object>();
        output = updateProfile(input);
        Assert.assertTrue("User doesnt exist!",output.get("status").equals(HttpStatus.INTERNAL_SERVER_ERROR + " - This token is not valid!"));
    }
    @Test
    public void updateName(){
        Map<String, Object> input = new HashMap<String, Object>();
        String id = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        input.put("userId",id);
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low";
        input.put("token",token);
        String name = "Gustavo Guevara";
        input.put("fullName", name);
        Map<String, Object> output = new HashMap<String, Object>();
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));
        Map<String, Object> profile = new HashMap<String, Object>();
        profile = getProfile(id,token,id);
        Assert.assertTrue("Values did change.",profile.get("Name").equals(name));

        //==============and change the name back ======
        name = "Hardy Montoya";
        input.put("fullName", name);
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));

        profile = getProfile(id,token,id);
        Assert.assertTrue("Values did change.",profile.get("Name").equals(name));
    }
    @Test
    public void updateYear(){
        Map<String, Object> input = new HashMap<String, Object>();
        String id = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        input.put("userId",id);
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low";
        input.put("token",token);
        String year = "2019";
        input.put("grad_year",year);
        Map<String, Object> output = new HashMap<String, Object>();
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));
        Map<String, Object> profile = new HashMap<String, Object>();
        profile = getProfile(id,token,id);
        int  y =  Integer.parseInt(year);
        Assert.assertTrue("Values did change.",profile.get("Graduation").equals(y));

        //==============and change the name back ======
        year = "2020";
        input.put("grad_year", year);
        y =  Integer.parseInt(year);
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));

        profile = getProfile(id,token,id);
        Assert.assertTrue("Values did change.",profile.get("Graduation").equals(y));
    }
    @Test
    public void updateMajor(){
        Map<String, Object> input = new HashMap<String, Object>();
        String id = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        input.put("userId",id);
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low";
        input.put("token",token);
        String major = "Computer Science";
        input.put("major", major);
        Map<String, Object> output = new HashMap<String, Object>();
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));
        Map<String, Object> profile = new HashMap<String, Object>();
        profile = getProfile(id,token,id);
        Assert.assertTrue("Values did change.",profile.get("Major").equals(major));

        //==============and change the name back ======
        major = "Anthroplogy";
        input.put("major", major);
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));
        profile = getProfile(id,token,id);
        Assert.assertTrue("Values did change.",profile.get("Major").equals(major));
    }
    @Test
    public void updateAll(){
        Map<String, Object> input = new HashMap<String, Object>();
        String id = "f249f1e5-4b38-48ba-8817-f7c9be1668e9";
        input.put("userId",id);
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJobW9udG95YUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZjI0OWYxZTUtNGIzOC00OGJhLTg4MTctZjdjOWJlMTY2OGU5IiwiZXhwIjoxNTI0OTY4NTMyfQ.scO7RjGsmgFxA3FgCFNSThN077sohXFonjagZfIQ3xQlOx5AiRjjxTMuigoRcHw2Tyc0s6R5826Hg8Zk0r-Low";
        input.put("token",token);
        String name = "Gustavo Guevara";
        input.put("fullName", name);
        String major = "Computer Science";
        input.put("major", major);
        String year = "2019";
        input.put("grad_year",year);
        int  y =  Integer.parseInt(year);
        Map<String, Object> output = new HashMap<String, Object>();
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));
        Map<String, Object> profile = new HashMap<String, Object>();
        profile = getProfile(id,token,id);
        Assert.assertTrue("Values did change.",profile.get("Name").equals(name));
        Assert.assertTrue("Values did change.",profile.get("Major").equals(major));
        Assert.assertTrue("Values did change.",profile.get("Graduation").equals(y));

        //==============and change the name back ======
        name = "Hardy Montoya";
        input.put("fullName", name);
        major = "Anthroplogy";
        input.put("major", major);
        year = "2020";
        input.put("grad_year", year);
        y =  Integer.parseInt(year);
        output = updateProfile(input);
        Assert.assertTrue("The valid input worked!",output.get("status").equals(HttpStatus.OK));
        profile = new HashMap<String, Object>();
        profile = getProfile(id,token,id);
        Assert.assertTrue("Values did change.",profile.get("Name").equals(name));
        Assert.assertTrue("Values did change.",profile.get("Major").equals(major));
        Assert.assertTrue("Values did change.",profile.get("Graduation").equals(y));
    }
}
