package com.cg.fds.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.cg.fds.entities.Address;
import com.cg.fds.entities.Restaurant;
import com.cg.fds.repositories.IRestaurantRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class RestaurantServiceTest {

	@Autowired
	IRestaurantRepository repository;
	
	@Test
	void testAddRestaurant() {
		
		Restaurant restaurant=repository.save(getRestaurant());
		assertNotNull(restaurant);
	}

	@Test
	void testUpdateRestaurant() {

		Restaurant restaurant=repository.save(getRestaurant());
		assertNotNull(restaurant);
	}

	@Test
	void testViewAllRestaurants() {
		
		List<Restaurant> list=repository.findAll();
		assertNotNull(list);
	}

	@Test
	void testViewRestaurantById() {

		Restaurant restaurant=repository.findById(4).orElse(null);
		assertNotNull(restaurant);
	}

	@Test
	void testViewNearByRestaurant() {
		
		List<Restaurant> restaurants=repository.viewNearByRestaurant("pune");
		assertNotNull(restaurants);
	}

	@Test
	void testViewRestaurantByItemName() {

		List<Restaurant> restaurants=repository.viewRestaurantByItemName("Paneer");
		assertNotNull(restaurants);
	}
	
	public Restaurant getRestaurant()
	{
		Restaurant restaurant = new Restaurant();
		restaurant.setAddress(getAddress());
		restaurant.setRestaurantId(4);
		restaurant.setRestaurantName("Ashoka Dhaba");
		restaurant.setManagerName("Dhanashree");
		restaurant.setContactNumber("9876543210");
		return restaurant;
	}
	
	
	public Address getAddress()
	{
		Address add=new Address();
		add.setAddressId(2);
		add.setArea("Hadapsar");
		add.setBuildingName("Pebble");
		add.setCity("Pune");
		add.setCountry("India");
		add.setPincode("41160");
		add.setState("Maharashtra");
		add.setStreetNo("93");
		return add;
	}

}
