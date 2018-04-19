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
import org.springframework.jdbc.core.JdbcTemplate;


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


    @Before
    public void setup() throws Exception {
        this.mvc = webAppContextSetup(webApplicationContext).build();
    }

    String user_id = "80ebe00d-bba8-443f-81b2-fefbe884b6ab";
    String token_ = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW00NUBwdXJkdWUuZWR1IiwidXNlcklkIjoiODBlYmUwMGQtYmJhOC00NDNmLTgxYjItZmVmYmU4ODRiNmFiIiwiZXhwIjoxNTI1MDM0NTEzfQ.duUpwGJXCdbivBbTuH92UzPPS4JrWZISOvQbxCWrCha-vLh_Mj6BYK8k55tHqNzBdd-yT0kuvrq9l652x2gLoA";
    String email = "jmieczni@purdue.edu";

    @Test
    public void nonExistingUserTest(){
        Map<String,String> input = new HashMap<String, String>();
        input.put("token",token_);
        input.put("userId", user_id);
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

        input.put("token",token_);
        input.put("userId", user_id);
        input.put("recipientEmail",email);
        input.put("messageBody","This is a message.");

        String output = json(input);

        mvc.perform(post("/send-message")
                .contentType(contentType)
                .content(output))
                .andExpect(status().isOk());

        jdbcTemplate.update("DELETE FROM user_messages WHERE sender_id='" + user_id + "'ORDER BY message_date DESC LIMIT 1");

    }


    @Test
    public void emptyMessage() throws Exception {
        Map<String,String> input = new HashMap<String, String>();

        input.put("token",token_);
        input.put("userId", user_id);
        input.put("recipientEmail",email);
        input.put("messageBody","");

        String output = json(input);

        mvc.perform(post("/send-message")
                .contentType(contentType)
                .content(output))
                .andExpect(status().isOk());

        jdbcTemplate.update("DELETE FROM user_messages WHERE sender_id='" + user_id + "'ORDER BY message_date DESC LIMIT 1");

    }


    @Test
    public void noInputforSortInbox() throws Exception {
        mvc.perform(get("/inbox")
                .param("userId", user_id)
                .param("token", token_)
                .param("sort","")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));

    }

    @Test
    public void noInputforSortOutbox() throws Exception{
        mvc.perform(get("/outbox")
                .param("userId", user_id)
                .param("token", token_)
                .param("sort","")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testASCforInbox() throws Exception {
        mvc.perform(get("/inbox")
                .param("userId", user_id)
                .param("token", token_)
                .param("sort","ASC")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));



    }

    @Test
    public void testDESCforInbox() throws Exception{
        mvc.perform(get("/inbox")
                .param("userId", user_id)
                .param("token", token_)
                .param("sort","DESC")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testASCforOutbox() throws Exception {
        mvc.perform(get("/outbox")
                .param("userId", user_id)
                .param("token", token_)
                .param("sort","ASC")
        )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testDESCforOutbox() throws Exception {
        mvc.perform(get("/outbox")
                .param("userId", user_id)
                .param("token", token_)
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
