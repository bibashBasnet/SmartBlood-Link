package com.KathfordStudent.SmartBloodLink;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class SmartBloodLinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartBloodLinkApplication.class, args);
	}

}
