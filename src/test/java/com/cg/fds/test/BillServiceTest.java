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
import com.cg.fds.entities.Bill;
import com.cg.fds.entities.Customer;
import com.cg.fds.entities.OrderDetails;
import com.cg.fds.entities.Restaurant;
import com.cg.fds.repositories.IBillRepository;


@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class BillServiceTest {

	@Autowired
	IBillRepository repository;
	@Test
	void testAddBill() {
	    Bill bill=repository.save(getBill());
		assertNotNull(bill);
	}

	@Test
	void testRemoveBill() {
		repository.deleteById(36);
	}

	@Test
	void testViewBillById() {
		Bill bill=repository.findById(36).orElse(null);
		assertNotNull(bill);
	}

	@Test
	void testViewBillsBetweenDates() {
		String time = "2019-03-27T10:15:30";
		String time2 = "2020-03-27T10:15:30";
		LocalDateTime startDateTime = LocalDateTime.parse(time);
        LocalDateTime endDateTime =LocalDateTime.parse(time2);
		List<Bill> list=repository.findByBillDates(startDateTime,endDateTime);
		assertNotNull(list);
	}

	@Test
	void testViewBillsByCustomerId() {
		List<Bill> list=repository.findByCustId(1);
		int cnt=list.size();
		boolean res=false;
		if(cnt>0)
		{
			res=true;
		}
		assertTrue(res);

	}

	@Test
	void testCalculateTotalCost() {
		Bill bill=new Bill();
		Double totalCost=bill.getTotalCost();
		assertNotNull(totalCost);
	}
	
	public Customer getCustomer()
	{
		Customer cust=new Customer();
		cust.setAddress(getAddress());
		cust.setAge(22);
		cust.setCustomerId(10);
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
	    res.setRestaurantId(3);
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
	 public Bill getBill()
	 {
		 Bill bill=new Bill();
		 bill.setBillDate(LocalDateTime.now());
		 bill.setBillId(22);
		 bill.setOrder(getOrder());
		 bill.setTotalCost(200);
		 bill.setTotalItem(2);
		 return bill;
	 }


}
