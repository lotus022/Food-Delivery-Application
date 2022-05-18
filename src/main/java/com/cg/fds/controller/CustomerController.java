package com.cg.fds.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cg.fds.entities.Customer;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.invalidNameException;
import com.cg.fds.exceptions.removeFailedException;
import com.cg.fds.service.ICustomerService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class CustomerController {

	@Autowired
	ICustomerService service;
	
	Logger logger=LoggerFactory.getLogger(CustomerController.class);
	
	@PostMapping("/addCustomer") 
	public ResponseEntity<Customer> addCustomer(@Valid @RequestBody Customer customer) 
	{
		logger.error("Inside add customer method");
	    Customer customer2=service.addCustomer(customer);
		return new ResponseEntity<Customer>(customer2,HttpStatus.OK);
	}
	
	@PutMapping("/updateCustomer")
	public ResponseEntity<Customer> updateCustomer(@Valid @RequestBody Customer customer) throws IdNotFoundException
	{
		logger.info("Inside update customer method");
		Customer customer1=service.viewCustomerById(customer.getCustomerId());
		if(customer1==null)
		{
			throw new IdNotFoundException("Customer id not found to update !!!");
		}
		else
		{
			Customer customer2=service.updateCustomer(customer);
			return new ResponseEntity<Customer>(customer2,HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/removeCustomer/{customerId}")
	public ResponseEntity<String> deleteCustomer(@PathVariable("customerId") int id) throws removeFailedException, IdNotFoundException
	{
		logger.info("Inside delete customer method");
		Customer customer=service.viewCustomerById(id);
		if(customer==null)
		{
			throw new removeFailedException("Delete customer operation failed !!!");
		}
		else
		{
			String result=service.removeCustomerById(id);
			return new ResponseEntity<String>(result,HttpStatus.OK);
		}
			
	}
	
	@GetMapping("/viewCustomer/{customerId}")
	public ResponseEntity<Customer> viewCustomerById(@PathVariable("customerId") int id) throws IdNotFoundException
	{
		logger.info("Inside view customer by Id method");
		Customer customer=service.viewCustomerById(id);
	    if(customer==null)
	    {
	    	throw new IdNotFoundException("Customer id not found !!!");
	    }
		return new ResponseEntity<Customer>(customer,HttpStatus.OK);
	}
	
	@GetMapping("/viewAllCustomerByRestaurant/{restaurantName}")
	public ResponseEntity<List<Customer>> viewAllCustomer(@PathVariable("restaurantName") String name) throws invalidNameException
	{
		logger.info("Inside view customer by restaurant name method");
	    List<Customer> customer=service.viewAllCustomer(name);
	    if(customer.isEmpty())
	    {
	    	throw new invalidNameException("Invalid restaurant name !!!");
	    }
		return new ResponseEntity<List<Customer>>(customer,HttpStatus.OK);
	}
}
