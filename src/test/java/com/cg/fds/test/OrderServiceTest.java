package com.cg.fds.test;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.cg.fds.entities.Address;
import com.cg.fds.entities.Customer;
import com.cg.fds.entities.OrderDetails;
import com.cg.fds.entities.Restaurant;
import com.cg.fds.repositories.IOrderRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class OrderServiceTest {

	@Autowired
	IOrderRepository repository;
	
	@Test
	void testAddOrder() {
		OrderDetails order=repository.save(getOrder());
		assertNotNull(order);
	}

	@Test
	void testUpdateOrder() {
		OrderDetails order=repository.save(getOrder());
		assertNotNull(order);
	}

	@Test
	void testRemoveOrderById() {
		repository.deleteById(11);
	}

	@Test
	void testViewOrderById() {
		OrderDetails order=repository.findById(11).orElse(null);
		assertNotNull(order);
	}

	@Test
	void testViewAllOrdersByCustomer() {
		List<OrderDetails> list=repository.findAllOrdersByCustomer(1);
		int cnt=list.size();
		boolean res=false;
		if(cnt>0)
		{
			res=true;
		}
		assertTrue(res);
		}

	/*@Test
	void testViewAllOrdersByRestaurant() {
		List<OrderDetails> list=repository.findAllByRestaurant("Annapurna");
		assertNotNull(list);

	}*/

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
		Restaurant res=new Restaurant();
		res.setAddress(getAddress());
		res.setContactNumber("9866042006");
	    res.setManagerName("ravi");
	    res.setRestaurantId(4);
	    res.setRestaurantName("Annapurna");
	    return res;
	}
	public OrderDetails getOrder()
	{
		OrderDetails ord=new OrderDetails();
		ord.setCustomer(getCustomer());
		ord.setList(null);
		ord.setOrderDate(LocalDateTime.now());
		ord.setOrderId(11);
		ord.setOrderStatus("delivered");
		ord.setRestaurant(getRestaurant());
		return ord;
	}
}
