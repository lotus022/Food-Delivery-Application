package com.cg.fds.service;

import java.util.List;

import com.cg.fds.entities.Item;
import com.cg.fds.entities.Restaurant;

public interface IItemService {

	public Item addItem(Item item);
	public Item viewItemById(int id);
	public Item updateItem(Item item);
	public String removeItem(Item item);
	public List<Item> findItemsByRestaurant(String name);
	public List<Item> viewAllItemsByItemName(String name);
	public List<Item> viewAllItemsByCategory(String name);
	
}
