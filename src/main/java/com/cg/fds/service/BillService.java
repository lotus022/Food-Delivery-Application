package com.cg.fds.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cg.fds.entities.Item;
import com.cg.fds.entities.Bill;
import com.cg.fds.entities.Customer;
import com.cg.fds.entities.FoodCart;
import com.cg.fds.entities.OrderDetails;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.repositories.IBillRepository;
import com.cg.fds.repositories.IOrderRepository;

@Service
@Transactional
public class BillService implements IBillService {
	
	@Autowired
    IBillRepository repository;
	
	@Autowired
	IOrderRepository repository2;
	
	Logger logger=LoggerFactory.getLogger(BillService.class);
	
	Customer customer;
	FoodCart foodCart;
	Item item;
	
	@Override
	public Bill addBill(OrderDetails order) {
	    
		logger.info("Inside service add bill method");
		Bill bill=new Bill();
		List<Item> list=order.getList();	
		int total_item=list.size();
		int sum=0;
		for(int i=0;i<total_item;i++)
		{
			Item item=list.get(i);
			sum+=item.getCost();
		}
		
		bill.setBillDate(order.getOrderDate());
		bill.setOrder(order);
		bill.setTotalItem(total_item);
		bill.setTotalCost(sum);
		
		repository.save(bill);
		//repository.saveAndFlush(bill);
		return bill;
	}

	@Override
	public String removeBill(Bill bill) {
		
		logger.info("Inside service remove bill method");
		repository.delete(bill);
		String msg="Bill removed Succesfully";
		return msg;
	}

	@Override
	public Bill viewBillById(int id) {
		
		logger.info("Inside service view bill by Id method");
		Bill bill=repository.findById(id).orElse(null);
		System.out.println(bill);
		return bill;
		
	}

	@Override
	public List<Bill> viewBillsBetweenDates(LocalDate startDate, LocalDate endDate) {
        
		logger.info("Inside service view bills between dates method");
		LocalDateTime startDateTime = startDate.atTime(0,0, 0);
        LocalDateTime endDateTime = endDate.atTime(23,59,59);
        List<Bill> bill=repository.findByBillDates(startDateTime, endDateTime);
        System.out.println(bill);
        return bill;
    }

	@Override
	public List<Bill> viewBillsByCustomerId(int custId) {
		
		logger.info("Inside service view bills by customer Id method");
		List<Bill> bill=repository.findByCustId(custId);
		System.out.println(bill);
		return bill;
	}

	@Override
	public String calculateTotalCost(Bill bill) {
		
		logger.info("Inside service view bills by customer Id method");
		Double totalCost=bill.getTotalCost();
		StringBuffer sb=new StringBuffer("Total cost of bill is ");
		sb.append(totalCost);
		String msg=sb.toString();
		return msg;
	}
	
}
