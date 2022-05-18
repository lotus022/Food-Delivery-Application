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

import com.cg.fds.entities.Restaurant;
import com.cg.fds.service.IRestaurantService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class RestaurantLoginController {
		
		@Autowired
		IRestaurantService service;
		
		Logger logger=LoggerFactory.getLogger(RestaurantLoginController.class);
		
		@GetMapping("/restaurantLogin/{username}/{password}")
		public ResponseEntity<Restaurant> candidateLogin(@PathVariable String username,@PathVariable String password) throws NameNotFoundException 
		{
			logger.info("Inside login restaurant login method");
			Restaurant login=service.candidateLogin(username,password);
			if(login==null)
			{
				throw new NameNotFoundException("Invalid credentials !!!");
			}
			return new ResponseEntity<Restaurant>(login, HttpStatus.OK);
		}
		
		@GetMapping("/restaurantLogout")
		public ResponseEntity<String> candidateLogout() 
		{
			logger.info("Inside logout restaurant login method");
			String logout=service.candidateLogout();
			return new ResponseEntity<String>(logout, HttpStatus.OK);
		}
}