package com.cg.fds.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import com.cg.fds.entities.Address;
import com.cg.fds.entities.Category;
import com.cg.fds.entities.Item;
import com.cg.fds.entities.Restaurant;
import com.cg.fds.repositories.IItemRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class ItemServiceTest {
	
	@Autowired
	IItemRepository repository;

	@Test
	void testAddItem() {
		
		Item item =repository.save(getItem());
		assertNotNull(item);
	}

	@Test
	void testUpdateItem() {
		Item item =repository.save(getItem());
		assertNotNull(item);
	}

	@Test
	void testRemoveItem() {
		
		repository.deleteById(8);
	}

	@Test
	void testFindItemsByRestaurant() {
		List<Item> list=repository.findItemsByRestaurant("Savali");
		assertNotNull(list);
	}

	@Test
	void testViewAllItemsByCategory() {
	
		List<Item> list = repository.findItemsByCategory("Veg");
		assertNotNull(list);

	}

	@Test
	void testViewAllItemsByItemName() {
		List<Item> list=repository.findItemsByItemName("Biryani");
		assertNotNull(list);
	}

	@Test
	void testViewItemById() {
		Item item=repository.findById(8).orElse(null);
		assertNotNull(item);
	}

	public Item getItem()
	{
		Item item = new Item(); 
		item.setRestaurant(getRestaurant());
		item.setItemId(22);
		item.setItemName("Biryani");
		item.setQuantity(1);
		item.setCategory(getCategory());
		item.setCost(250);
		return item;
		
	}
		
		public Restaurant getRestaurant()
		{
			Restaurant rest=new Restaurant();
			rest.setRestaurantId(4);
			rest.setRestaurantName("Savali");
			rest.setAddress(getAddress());
			rest.setContactNumber("9874569874");
			rest.setManagerName("Aniket");
			return rest;
		}
		
		public Category getCategory()
		{
			Category cat = new Category();
			cat.setCatId(6);
			cat.setCategoryName("Veg");
			return cat;
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
