package com.example.isabloodbank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class IsaBloodBankApplication {

	public static void main(String[] args) {
		SpringApplication.run(IsaBloodBankApplication.class, args);
	}

}
