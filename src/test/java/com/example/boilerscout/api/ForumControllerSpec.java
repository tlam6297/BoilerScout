package com.example.boilerscout.api;

import com.example.boilerscout.BoilerScoutApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

/**
 * Created by terrylam on 4/17/18.
 */

@RunWith(SpringRunner.class)
@SpringBootTest(classes = BoilerScoutApplication.class)
@WebAppConfiguration
public class ForumControllerSpec {

    private MockMvc mvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }


    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private WebApplicationContext webApplicationContext;


    //Static values, may need to be updated?
    //TODO create a token that never expires
    String userId = "80ebe00d-bba8-443f-81b2-fefbe884b6ab";

    String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW00NUBwdXJkdWUuZWR1IiwidXNlcklkIjoiODBlYmUwMGQtYmJhOC00NDNmLTgxYj" +
            "ItZmVmYmU4ODRiNmFiIiwiZXhwIjoxNTI1MDM0NTEzfQ.duUpwGJXCdbivBbTuH92UzPPS4JrWZISOvQbxCWrCha-vLh_Mj6BYK8k55tHq" +
            "NzBdd-yT0kuvrq9l652x2gLoA";

    String forumId = "528fc18a-ebbc-4b0a-9ca3-bd00d6db006c";

    String threadId = "75abbb83-10f7-45f4-a267-4aaa04b036ed";

    @Before
    public void setup() throws Exception {
        this.mvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void validForumAccess() throws Exception {
        mvc.perform(get("/community")
                .param("userId", userId)
                .param("token", token)
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void validStartThread() throws Exception {
        Map<String, Object> startThreadMap = new HashMap<String, Object>();
        String threadTitle = "Automatic Bitcoin Miner";
        startThreadMap.put("userId", userId);
        startThreadMap.put("token", token);
        startThreadMap.put("forumId", forumId);
        startThreadMap.put("threadTitle", threadTitle);
        startThreadMap.put("threadBody", "I'm looking to get rich quick!");

        String startThreadJson = json(startThreadMap);
        this.mvc.perform(post("/community/start-thread")
        .contentType(contentType)
        .content(startThreadJson)).andExpect(status().isOk());

        jdbcTemplate.update("DELETE FROM threads WHERE thread_title='" + threadTitle + "'");
    }

    @Test
    public void validRetrieveThreads() throws Exception {
        mvc.perform(get("/community/get-threads")
        .param("userId", userId)
        .param("token", token)
        .param("forumId", forumId))
                .andExpect(status().isOk());

    }

    @Test
    public void validViewThread() throws Exception {
        mvc.perform(get("/community/view-thread")
        .param("userId", userId)
        .param("token", token)
        .param("threadId", threadId))
                .andExpect(status().isOk());

    }

    @Test
    public void validPostReply() throws Exception {
        Map<String, Object> postReplyMap = new HashMap<String, Object>();
        String postBody = "I would love to help...some call me a stallion.";
        postReplyMap.put("userId", userId);
        postReplyMap.put("token", token);
        postReplyMap.put("threadId", threadId);
        postReplyMap.put("postBody", postBody);
        String postReplyJson = json(postReplyMap);
        mvc.perform(post("/community/post-reply")
        .contentType(contentType)
        .content(postReplyJson))
                .andExpect(status().isOk());
        jdbcTemplate.update("DELETE FROM thread_posts WHERE post_body='" + postBody + "'");
    }

    @Test
    public void validForumUpdate() throws Exception {
        Map<String, Object> updateMap = new HashMap<String, Object>();
        updateMap.put("forumName", "someForum");
        updateMap.put("description", "someDescription");
        updateMap.put("action", "remove");
        String updateJson = json(updateMap);
        mvc.perform(post("/community/update")
        .contentType(contentType)
        .content(updateJson))
                .andExpect(status().isOk());

    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }



}