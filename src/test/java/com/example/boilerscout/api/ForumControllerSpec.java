package com.example.boilerscout.api;

import com.example.boilerscout.BoilerScoutApplication;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.Charset;

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

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    @Autowired
    private WebApplicationContext webApplicationContext;

    String userId = "bee4f10f-8f1f-43ee-b54f-a810f853cae9";

    String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW00NUBwdXJkdWUuZWR1IiwidXNlcklkIjoiYmVlNGYxMGYtOGYxZi00M2VlLWI1N" +
            "GYtYTgxMGY4NTNjYWU5IiwiZXhwIjoxNTI0NjgxNzg3fQ.PWdkHvZZ12l3wymI0pasVa3TQ0IGGhptvZ1-PQkxlNLXq8q36tFIXkB2Jvtk" +
            "P5GvfeW1xRhYHS-mtQoILVV5eg";

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
    public void forumAccess() throws Exception {
        mvc.perform(get("/community")

        .param("userId", "d")
        .param("token", "d")
        ).andExpect(mvcResult -> )
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(content()
                    .contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

}
