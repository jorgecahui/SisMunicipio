package com.mstramite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = {"com.mstramite.client"})
@SpringBootApplication
public class MsTramiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsTramiteApplication.class, args);
    }

}
