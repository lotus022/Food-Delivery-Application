package com.cg.fds.service;

import java.util.List;

import com.cg.fds.entities.Customer;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.removeFailedException;

public interface ICustomerService {

	public Customer addCustomer(Customer customer);
	public Customer updateCustomer(Customer customer);
	public Customer viewCustomerById(int id ) throws IdNotFoundException;
	public List<Customer> viewAllCustomer(String restaurantname);
	public String removeCustomerById(int id)  throws removeFailedException;
	public Customer CustomerLogin(String username, String password);
	public String CustomerLogout();
	 
}
