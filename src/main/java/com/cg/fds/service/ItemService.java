package com.cg.fds.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.cg.fds.entities.Item;
import com.cg.fds.repositories.IItemRepository;

@Service
@Transactional
public class ItemService implements IItemService{

	@Autowired
	IItemRepository repository;
	
	Logger logger=LoggerFactory.getLogger(ItemService.class);
	
	@Override
	public Item addItem(Item item) {
		
		logger.info("Inside service add item method");
		Item item1 = repository.save(item);	
		return item1;
	}

	@Override
	public Item updateItem(Item item) {
		
		logger.info("Inside service update item method");
		Item item1=repository.save(item);
		return item1;
	}

	@Override
	public String removeItem(Item item) {
		
		logger.info("Inside service remove item method");
		repository.delete(item);
		return "Item removed successfully...";
	}

	@Override
	public List<Item> findItemsByRestaurant(String name) {
		
		logger.info("Inside service view items by restaurant name method");
		List<Item> list=repository.findItemsByRestaurant(name);
		return list;		
	}

	@Override
	public List<Item> viewAllItemsByCategory(String name) {
		
		logger.info("Inside service view items  by category method");
		List<Item> list=repository.findItemsByCategory(name);
		return list;
		
	}

	@Override
	public List<Item> viewAllItemsByItemName(String name) {
		
		logger.info("Inside service view items by item name method");
		List<Item> list=repository.findItemsByItemName(name);
		return list;
	}

	
	@Override
	public Item viewItemById(int id) {
	
		logger.info("Inside service view item by Id method");
		Item item=repository.findById(id).orElse(null);
		return item;
	}

}
