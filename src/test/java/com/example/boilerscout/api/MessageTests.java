package com.example.boilerscout;

import com.example.boilerscout.api.MessageController;

import org.junit.Assert;
import org.springframework.http.HttpStatus;
import com.example.boilerscout.BoilerScoutApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
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

@RunWith(SpringRunner.class)
@SpringBootTest(classes = BoilerScoutApplication.class)
@WebAppConfiguration
public class MessageTests extends MessageController {

    private MockMvc mvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

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


    String inboxUserId = "6b8ed454-eaba-4cf3-88ef-8f21f36f920f";
    String inboxToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYmxhY2tAcHVyZHVlLmVkdSIsInVzZXJJZCI6IjZiOGVkNDU0LWVhYmEtNGNmMy04OGVmLThmMjFmMzZmOTIwZiIsImV4cCI6MTUyNTAxODExNH0.1TumNEy-xw6LZwnxDMvXQUAv5NL7TnGH1xFH0w7TwR1Qcj0ffh6Hvkykvup8xrZfw5au6S7FWbjrzF78hVlyAA";

    String outboxUserId = "86b6be19-9d32-4b1a-ab4b-a29a7a90cc98";
    String outboxToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb2JlcnRvbWVsZ2FyY0BwdXJkdWUuZWR1IiwidXNlcklkIjoiODZiNmJlMTktOWQzMi00YjFhLWFiNGItYTI5YTdhOTBjYzk4IiwiZXhwIjoxNTI0OTcxMzE2fQ.7_MHA4JOfCxdQRHvsJlXFbvVtb52XrBqiDxqOZJQxAQpVwiS4TqRfAHE-YA4NNLUtwWlxq32mI7NojeNwjIeqg";

    @Before
    public void setup() throws Exception {
        this.mvc = webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void nonExistingUserTest(){
        Map<String,String> input = new HashMap<String, String>();
        input.put("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb2JlcnRvbWVsZ2FyY0BwdXJkdWUuZWR1IiwidXNlcklkIjoiODZiNmJlMTktOWQzMi00YjFhLWFiNGItYTI5YTdhOTBjYzk4IiwiZXhwIjoxNTI0OTcxMzE2fQ.7_MHA4JOfCxdQRHvsJlXFbvVtb52XrBqiDxqOZJQxAQpVwiS4TqRfAHE-YA4NNLUtwWlxq32mI7NojeNwjIeqg");
        input.put("userId", "86b6be19-9d32-4b1a-ab4b-a29a7a90cc98");
        input.put("recipientEmail","nonexistinguser@purdue.edu");
        input.put("message","This is a message.");

        Map<String, Object> output = new HashMap<String, Object>();

        try {
            output = sendMessage(input);
            Assert.assertTrue("Test failed!", false);

        }catch(RuntimeException e){
            Assert.assertTrue("The user receiver don't exist!", e.getMessage().equals("[InternalServerError] - Error accessing data."));
        }
    }

    @Test
    public void everythingWorksMessage() throws Exception {
        Map<String,String> input = new HashMap<String, String>();

        input.put("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb2JlcnRvbWVsZ2FyY0BwdXJkdWUuZWR1IiwidXNlcklkIjoiODZiNmJlMTktOWQzMi00YjFhLWFiNGItYTI5YTdhOTBjYzk4IiwiZXhwIjoxNTI0OTcxMzE2fQ.7_MHA4JOfCxdQRHvsJlXFbvVtb52XrBqiDxqOZJQxAQpVwiS4TqRfAHE-YA4NNLUtwWlxq32mI7NojeNwjIeqg");
        input.put("userId", "86b6be19-9d32-4b1a-ab4b-a29a7a90cc98");
        input.put("recipientEmail","lam45@purdue.edu");
        input.put("messageBody","This is a message.");

        String output = json(input);

        mvc.perform(post("/send-message")
                .contentType(contentType)
                .content(output))
                .andExpect(status().isOk());

    }

    @Test
    public void emptyMessage() throws Exception {
        Map<String,String> input = new HashMap<String, String>();

        input.put("token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb2JlcnRvbWVsZ2FyY0BwdXJkdWUuZWR1IiwidXNlcklkIjoiODZiNmJlMTktOWQzMi00YjFhLWFiNGItYTI5YTdhOTBjYzk4IiwiZXhwIjoxNTI0OTcxMzE2fQ.7_MHA4JOfCxdQRHvsJlXFbvVtb52XrBqiDxqOZJQxAQpVwiS4TqRfAHE-YA4NNLUtwWlxq32mI7NojeNwjIeqg");
        input.put("userId", "86b6be19-9d32-4b1a-ab4b-a29a7a90cc98");
        input.put("recipientEmail","lam45@purdue.edu");
        input.put("messageBody","");

        String output = json(input);

        mvc.perform(post("/send-message")
                .contentType(contentType)
                .content(output))
                .andExpect(status().isOk());

    }


    @Test
    public void noInputforSortInbox() throws Exception {
        mvc.perform(get("/inbox")
                .param("userId", inboxUserId)
                .param("token", inboxToken)
                .param("sort","")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));

    }

    @Test
    public void noInputforSortOutbox() throws Exception{
        mvc.perform(get("/outbox")
                .param("userId", outboxUserId)
                .param("token", outboxToken)
                .param("sort","")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testASCforInbox() throws Exception {
        mvc.perform(get("/inbox")
                .param("userId", inboxUserId)
                .param("token", inboxToken)
                .param("sort","ASC")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));



    }

    @Test
    public void testDESCforInbox() throws Exception{
        mvc.perform(get("/inbox")
                .param("userId", inboxUserId)
                .param("token", inboxToken)
                .param("sort","DESC")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testASCforOutbox() throws Exception {
        mvc.perform(get("/outbox")
                .param("userId", outboxUserId)
                .param("token", outboxToken)
                .param("sort","ASC")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testDESCforOutbox() throws Exception {
        mvc.perform(get("/outbox")
                .param("userId", outboxUserId)
                .param("token", outboxToken)
                .param("sort","DESC")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));

    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }


}
