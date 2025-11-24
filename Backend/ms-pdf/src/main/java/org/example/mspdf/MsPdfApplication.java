package org.example.mspdf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class MsPdfApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsPdfApplication.class, args);
    }

}
