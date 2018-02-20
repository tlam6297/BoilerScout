package com.example.boilerscout.api;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.Assert;

/**
 * Created by terrylam on 2/20/18.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class ValidateUserSpec extends ValidateUser {

    @Test
    public void testTokenValidation() {
        String jwt = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsYW00NUBwdXJkdWUuZWR1IiwidXNlcklkIjoiZDYyNDc3OTMtYTgzMi00NjhmLWJ" +
                "jZDMtYTcyM2RiOTE2YThkIiwiZXhwIjoxNTE5OTM5NDU2fQ.3E6v85WD8YbZdtHUmHWsGRbvVBXIviegOVOKa_kNkik3XTlxsrqn5GGEm41NtNr89i1FwMS9Y987qgp-KQ4oBQ";
        String userId = "d6247793-a832-468f-bcd3-a723db916a8d";
        Assert.isTrue(validateToken(jwt, userId), "This token is valid!");
    }

}
