package com.cg.fds.controller;

import java.util.ArrayList;
import java.util.List;

import javax.naming.NameNotFoundException;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cg.fds.entities.Restaurant;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.invalidItemNameException;
import com.cg.fds.exceptions.invalidLocationException;
import com.cg.fds.exceptions.removeFailedException;
import com.cg.fds.service.IRestaurantService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class RestaurantController {
	
	@Autowired
	IRestaurantService service;
	
	Logger logger=LoggerFactory.getLogger(RestaurantController.class);
	
	@PostMapping("/addRestaurant")
	public ResponseEntity<Restaurant> addRestaurant(@Valid @RequestBody Restaurant restaurant){
		
		logger.info("Inside add restaurant method");
		Restaurant restaurant2 = service.addRestaurant(restaurant);
		return new ResponseEntity<Restaurant>(restaurant2, HttpStatus.OK);
	}
	
	@PutMapping("/updateRestaurant")
	public ResponseEntity<Restaurant> updateRestaurant(@Valid @RequestBody Restaurant restaurant) throws IdNotFoundException{
		
		logger.info("Inside update restaurant method");
		Restaurant restaurant1=service.viewRestaurantById(restaurant.getRestaurantId());
		if(restaurant1==null)
		{
			throw new IdNotFoundException("Restaurant not available to update !!!");
		}
		else
		{
			Restaurant restaurant2 = service.updateRestaurant(restaurant);
			return new ResponseEntity<Restaurant>(restaurant2, HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/removeRestaurantById/{restaurantId}")
	public ResponseEntity<String> removeRestaurantById(@PathVariable("restaurantId") int Rid) throws removeFailedException{
		
		logger.info("Inside remove restaurant by Id method");
		Restaurant restaurant=service.viewRestaurantById(Rid);
		if(restaurant==null)
		{
			throw new removeFailedException("Remove restaurant failed !!!");
		}
		else
		{
			String msg = service.removeRestaurantById(Rid); 
			return new ResponseEntity<String>(msg, HttpStatus.OK);
		}
		
	}
	
	@GetMapping("/viewAllRestaurants")
	public ResponseEntity<List<Restaurant>> viewAllRestaurants(){
		
		logger.info("Inside view all restaurants method");
		List <Restaurant> list = new ArrayList<Restaurant>();
		for(Restaurant r : service.viewAllRestaurants())
		{
			Restaurant r1 = new Restaurant();
			r1.setRestaurantId(r.getRestaurantId());
			r1.setRestaurantName(r.getRestaurantName());
			r1.setManagerName(r.getManagerName());
			r1.setContactNumber(r.getContactNumber());
			r1.setAddress(r.getAddress());
			list.add(r1);
			
		}
		return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
		
	}
	
	@GetMapping("/viewRestaurantByItemName/{itemName}")
	public ResponseEntity<List<Restaurant>> viewRestaurantByItemName(@PathVariable String itemName) throws invalidItemNameException{
		
		logger.info("Inside view restaurant by item name method");
		List <Restaurant> list =  service.viewRestaurantByItemName(itemName);
		System.err.println(list);
		if(list==null)
		{
			throw new invalidItemNameException("Item not available !!!");
		}
		else
		{
			return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
		}		
		
	}
	
	@GetMapping("/viewNearByRestaurant/{location}")
	public ResponseEntity<List<Restaurant>> viewNearByRestaurant(@PathVariable String location) throws invalidLocationException{
		
		logger.info("Inside view nearby restaurant method");
		List <Restaurant> list = service.viewNearByRestaurant(location);
		if(list==null)
		{
			throw new invalidLocationException("Location not available !!!");
		}
		else
		{
			return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
		}		
	}
	
	@GetMapping("/viewRestaurantByName/{name}")
	public ResponseEntity<List<Restaurant>> viewRestaurantByName(@PathVariable String name) throws NameNotFoundException{
		
		logger.info("Inside view restaurant by name method");
		List <Restaurant> list = service.viewRestaurantByName(name);
		if(list==null)
		{
			throw new NameNotFoundException("Restaurant with this name not available !!!");
		}
		else
		{
			return new ResponseEntity<List<Restaurant>>(list, HttpStatus.OK);
		}		
	}

	@GetMapping("/viewRestaurantById/{restaurantId}")
	public ResponseEntity<Restaurant> viewRestaurantById(@PathVariable("restaurantId") int id) throws IdNotFoundException{
		
		logger.info("Inside view restaurant by Id method");
		Restaurant rest2 = new Restaurant();
		Restaurant restaurant = service.viewRestaurantById(id);
		if(restaurant==null)
		{
			throw new IdNotFoundException("Restaurant Id not found !!!");
		}
		else
		{
			rest2.setContactNumber(restaurant.getContactNumber());
			rest2.setManagerName(restaurant.getManagerName());
			rest2.setRestaurantName(restaurant.getRestaurantName());
			rest2.setRestaurantId(restaurant.getRestaurantId());
			rest2.setAddress(restaurant.getAddress());
			rest2.setEmail(restaurant.getEmail());
			rest2.setPassword(restaurant.getPassword());
			return new ResponseEntity<Restaurant>(rest2, HttpStatus.OK);
	
		}
	}
}
