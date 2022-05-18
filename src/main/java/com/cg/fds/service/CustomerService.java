
package com.cg.fds.service;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.fds.entities.Customer;
import com.cg.fds.entities.FoodCart;
import com.cg.fds.repositories.ICartRepository;
import com.cg.fds.repositories.ICustomerRepository;

@Service
@Transactional
public class CustomerService implements ICustomerService{

	@Autowired
	ICustomerRepository repository;
	
	@Autowired
	ICartRepository cartRepository;
	
	@Autowired
	CartService cartService;
	
	Logger logger=LoggerFactory.getLogger(CustomerService.class);
	
	@Override
	public Customer addCustomer(Customer customer)  {
		
		logger.info("Inside service add customer method");
		repository.save(customer);
		FoodCart cart= new FoodCart();
		cart.setCustomer(customer);
		cartRepository.save(cart);
		return customer;
	}

	@Override
	public Customer updateCustomer(Customer customer) {
		
		logger.info("Inside service update customer method");
		repository.save(customer);
		return customer;
	}

	@Override
	public String removeCustomerById(int id) {
	
		logger.info("Inside service delete customer method");
		int cartId=cartRepository.findcartByCustomerId(id);
		cartService.clearCart(cartId);
		cartRepository.deleteById(cartId);
		repository.deleteById(id);
		String msg="Customer Removed successfully...";
		return msg;
	}

	@Override
	public Customer viewCustomerById(int id) {
		
		logger.info("Inside service view customer by Id method");
		Customer customer=repository.findById(id).orElse(null);
		return customer;
	}

	@Override
	public List<Customer> viewAllCustomer(String restaurantName) {
		
		logger.info("Inside service view customer by restaurant name method");
		List<Customer> list=repository.findByRestaurantName(restaurantName);
		return list;
	}

	@Override
	public Customer CustomerLogin(String username, String password) {

		logger.info("Inside service customer login method");
		Customer customer=repository.findCustomerByEmail(username);
		String usr=customer.getEmail();
		String pwd=customer.getPassword();
		if(customer!=null)
		{
			if(usr.equals(username) && pwd.equals(password))
			{
				return customer;
			}
		}
		return null;
	}

	@Override
	public String CustomerLogout() {
		return "Logout successfull...";
	}


}
