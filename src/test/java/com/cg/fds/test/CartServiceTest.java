package com.cg.fds.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.cg.fds.entities.Address;
import com.cg.fds.entities.Category;
import com.cg.fds.entities.Customer;
import com.cg.fds.entities.FoodCart;
import com.cg.fds.entities.Item;
import com.cg.fds.entities.Restaurant;
import com.cg.fds.repositories.ICartRepository;

class CartServiceTest {

	@Autowired
	ICartRepository repository;
	
	/*@Test
	void testAddItemToCart() {
		
		FoodCart cart= repository.save(getCart());
		assertNotNull(cart);
	}*/

	@Test
	void testIncreaseQuantity() {
		
		FoodCart cart=getCart();
		List<Item> list=cart.getItemList();
		int size1=list.size();
		Item item=new Item(5,"Fries",4,200.0,getCategory(),getRestaurant());
		list.add(item);
		int size2=list.size();
		boolean r;
		if(size1<size2)
		{
			r=true;
		}
		else
		{
			r=false;
		}
		assertTrue(r);
	}

	@Test
	void testReduceQuantity() {
		
		FoodCart cart=getCart();
		List<Item> list=cart.getItemList();
		int size1=list.size();
		list.remove(0);
		int size2=list.size();
		boolean r;
		if(size1>size2)
		{
			r=true;
		}
		else
		{
			r=false;
		}
		assertTrue(r);
	}

	@Test
	void testRemoveItem() {

		FoodCart cart=getCart();
		List<Item> list=cart.getItemList();
		int size1=list.size();
		list.remove(0);
		int size2=list.size();
		boolean r;
		if(size1>size2)
		{
			r=true;
		}
		else
		{
			r=false;
		}
		assertTrue(r);
	}

	@Test
	void testClearCart() {
	}
	
	
	public FoodCart getCart()
	{
		FoodCart cart=new FoodCart();
		cart.setCartId(3);
		cart.setCustomer(getCustomer());
		List<Item> list=new ArrayList<Item>();
		list.add(getItem());
		cart.setItemList(list);
		return cart;
	}
	
	public Customer getCustomer()
	{
		Customer cust=new Customer();
		cust.setAddress(getAddress());
		cust.setAge(22);
		cust.setCustomerId(1);
		cust.setEmail("Amit@gmail.com");
		cust.setFirstName("Amit");
		cust.setGender("M");
		cust.setLastName("Shinde");
		cust.setMobileNumber("987456242");
		return cust;
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
	
	public Item getItem()
	{
		Item item=new Item(1,"Paneer",2,200.0,getCategory(),getRestaurant());
		return item;
	}

}
