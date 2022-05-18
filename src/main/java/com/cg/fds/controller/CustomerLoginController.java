package com.cg.fds.controller;

import javax.naming.NameNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cg.fds.entities.Customer;
import com.cg.fds.service.ICustomerService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class CustomerLoginController {
	
	@Autowired
	ICustomerService service;
	
	Logger logger=LoggerFactory.getLogger(CustomerLoginController.class);
	
	@GetMapping("/customerLogin/{username}/{password}")
	public ResponseEntity<Customer> CustomerLogin(@PathVariable String username,@PathVariable String password) throws NameNotFoundException 
	{
		logger.info("Inside login cutomer login method");
		Customer login=service.CustomerLogin(username,password);
		if(login==null)
		{
			throw new NameNotFoundException("Invalid credentials !!!");
		}
		return new ResponseEntity<Customer>(login, HttpStatus.OK);
	}
	
	@GetMapping("/customerLogout")
	public ResponseEntity<String> candidateLogout() 
	{
		logger.info("Inside logout cutomer login method");
		String logout=service.CustomerLogout();
		return new ResponseEntity<String>(logout, HttpStatus.OK);
	}
}

