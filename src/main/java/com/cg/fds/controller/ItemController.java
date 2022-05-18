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
import com.cg.fds.entities.Item;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.invalidNameException;
import com.cg.fds.exceptions.removeFailedException;
import com.cg.fds.service.IItemService;
import com.cg.fds.service.ItemService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class ItemController {
	
	@Autowired
	IItemService itemservice;
	
	Logger logger=LoggerFactory.getLogger(ItemController.class);

	@PostMapping("/addItem")
	public ResponseEntity<Item> addItem(@Valid @RequestBody Item item) {
		
		logger.info("Inside add item method");
		Item item2 = itemservice.addItem(item);
		return new ResponseEntity<Item>(item2, HttpStatus.OK);
	}

	@PutMapping("/updateItem")
	public ResponseEntity<Item> updateItem(@Valid @RequestBody Item item) throws IdNotFoundException {
		
		logger.info("Inside update item method");
		Item item1 = itemservice.viewItemById(item.getItemId());
		if (item1 == null) {
			throw new IdNotFoundException("Unable to update due to invalid Item Id  !!!");
		} else {
			Item item2 = itemservice.updateItem(item);
			return new ResponseEntity<Item>(item2, HttpStatus.OK);
		}
	}

	@DeleteMapping("/removeItemById/{itemId}")
	public ResponseEntity<String> removeItem(@PathVariable("itemId") int iid) throws removeFailedException {
		
		logger.info("Inside remove item method");
		Item item = itemservice.viewItemById(iid);
		if (item == null) {
			throw new removeFailedException("Unable to delete due to invalid Item Id !!!");
		} else {
			String msg = itemservice.removeItem(item);
			return new ResponseEntity<String>(msg, HttpStatus.OK);
		}
	}

	@GetMapping("/viewItemByItemId/{itemId}")
	public ResponseEntity<Item> viewItemById(@PathVariable("itemId") int iid) throws IdNotFoundException {
		
		logger.info("Inside view item by Id method");
		Item item = itemservice.viewItemById(iid);
		return new ResponseEntity<Item>(item, HttpStatus.OK);

	}

	@GetMapping("/viewAllItemsByCategory/{categoryName}")
	public ResponseEntity<List<Item>> viewAllItemsByCategory(@PathVariable("categoryName") String name)
			throws IdNotFoundException {

		logger.info("Inside view items  by category method");
		List<Item> item2 = itemservice.viewAllItemsByCategory(name);
		if (item2.isEmpty()) {
			throw new IdNotFoundException("Item id not found !!!");
		}
		return new ResponseEntity<List<Item>>(item2, HttpStatus.OK);
	}

	@GetMapping("/viewAllItemsByItemName/{itemName}")
	public ResponseEntity<List<Item>> viewAllItemsByItemName(@PathVariable("itemName") String name)
			throws invalidNameException {
		
		logger.info("Inside view items by item name method");
		List<Item> items = itemservice.viewAllItemsByItemName(name);
		if (items.isEmpty()) {
			throw new invalidNameException("Item name not found !!!");
		}
		return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
	}

	@GetMapping("/findItemsByRestaurant/{restaurantName}")
	public ResponseEntity<List<Item>> findItemsByRestaurant(@PathVariable("restaurantName") String name)
			throws invalidNameException {
		
		logger.info("Inside view items by restaurant name method");
		List<Item> items = itemservice.findItemsByRestaurant(name);
		if (items.isEmpty()) {
			throw new invalidNameException("Item name not found !!!");
		}
		return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
	}

}
