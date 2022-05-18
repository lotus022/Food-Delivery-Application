package com.cg.fds.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.fds.entities.Item;
import com.cg.fds.entities.Restaurant;
import com.cg.fds.repositories.IItemRepository;
import com.cg.fds.repositories.IRestaurantRepository;

@Service
@Transactional
public class RestaurantService implements IRestaurantService {

	@Autowired
	IRestaurantRepository repository;
	
	@Autowired
	IItemRepository repo2;
	
	Logger logger=LoggerFactory.getLogger(RestaurantService.class);
	
	@Override
	public Restaurant addRestaurant(Restaurant res) {
		
		logger.info("Inside service add restaurant method");
		repository.save(res);
		return res;
	}

	@Override
	public Restaurant updateRestaurant(Restaurant restaurant) {
		
		logger.info("Inside service update restaurant method");
		repository.save(restaurant);
		return restaurant;
	}
	
	@Override
	public String removeRestaurantById(int Rid) {
		
		logger.info("Inside service remove restaurant by Id method");
		Restaurant rest=repository.findById(Rid).orElse(null);
		List<Item> list=repo2.findItemsByRestaurant(rest.getRestaurantName());
		for(int i=0;i<list.size();i++)
		{
			Item item=list.get(i);
			int id=item.getItemId();
			repo2.deleteById(id);
		}
		repository.deleteById(Rid);
		
		String msg="Remove restaurant successfull !!!";
		return msg;
	}

	@Override
	public List<Restaurant> viewAllRestaurants() {
		
		logger.info("Inside service view all restaurants method");
		List<Restaurant> list=repository.findAll();
		return list;
	}
	
	@Override
	public Restaurant viewRestaurantById(int id) {
		
		logger.info("Inside service view restaurant by Id method");
		Restaurant restaurant = repository.findById(id).orElse(null);
		return restaurant;	
	}


	@Override
	public List<Restaurant> viewNearByRestaurant(String location) {
		
		logger.info("Inside service view nearby restaurant method");
		List<Restaurant> list = repository.viewNearByRestaurant(location);
		return list;
	}


	@Override
	public List<Restaurant> viewRestaurantByItemName(String restaurantName) {
		
		logger.info("Inside service view restaurant by item name method");
		List<Restaurant> list=repository.viewRestaurantByItemName(restaurantName);
		return list;
	}

	@Override
	public Restaurant candidateLogin(String username, String password) {

		logger.info("Inside service restaurant login method");
		Restaurant restaurant=repository.findRestaurantByEmail(username);
		String usr=restaurant.getEmail();
		String pwd=restaurant.getPassword();
		if(restaurant!=null)
		{
			if(usr.equals(username) && pwd.equals(password))
			{
				return restaurant;
			}
		}
		return null;
	}

	@Override
	public String candidateLogout() {

		return "Logout successfull...";
	}

	@Override
	public List<Restaurant> viewRestaurantByName(String name) {
		
		logger.info("Inside service view restaurant by name method");
		List<Restaurant> list = repository.findRestaurantByRestaurantName(name);
		return list;
	}

}
