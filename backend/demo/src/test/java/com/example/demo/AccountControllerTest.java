package com.example.demo;

import org.springframework.boot.test.context.SpringBootTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.annotations.Check;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(DemoApplication.class)
@ContextConfiguration(classes = DemoApplication.class)
public class AccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private AccountController accountController;

    @InjectMocks
    private AccountService accountService;

    @Before
    public void initMocks(){
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
    }

    @Test
    public void getAccountTest() throws Exception{
        mockMvc.perform(get("/accounts/checking")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
    }

    @Test
    public void updateAccountTest() throws Exception{
        mockMvc.perform(put("/accounts/checking")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
    }

}
