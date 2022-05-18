package com.cg.fds.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.cg.fds.entities.Bill;
import com.cg.fds.entities.OrderDetails;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.removeFailedException;
import com.cg.fds.service.IBillService;
import com.cg.fds.service.IOrderService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class BillController {
	
	@Autowired
	IBillService service;
	
	@Autowired
	IOrderService ser;
	
	Logger logger=LoggerFactory.getLogger(BillController.class);
	
	@PostMapping("/addBill/{Order_id}")
	public ResponseEntity<Bill> addBill(@PathVariable("Order_id") int id) throws IdNotFoundException
	{ 
		logger.info("Inside add bill method");
		OrderDetails order=ser.viewOrderById(id);
		Bill bill2=service.addBill(order);
		if(bill2==null)
		{
			throw new IdNotFoundException("Cannot add order");
		}
		else
		return new ResponseEntity<Bill>(bill2,HttpStatus.OK);
		
	}
		
	@DeleteMapping("/removeBill/{Bill_id}")
	public ResponseEntity<String> removeBill(@PathVariable("Bill_id") int id) throws removeFailedException
	{ 
		logger.info("Inside remove bill method");
		Bill bill=service.viewBillById(id);
		if(bill==null)
		{
			throw new removeFailedException("Bill removal failed !!!");	
		}
		else
		{
			String msg=service.removeBill(bill);
			return new ResponseEntity<String>(msg,HttpStatus.OK);
		}
	}
	
	
	@GetMapping("/viewBillByBillId/{Bill_id}")
	public ResponseEntity<Bill> viewBillById(@PathVariable("Bill_id") int id) throws IdNotFoundException
	{ 
		logger.info("Inside view bill by Id method");
		Bill bill2=service.viewBillById(id);
		if(bill2==null)
		{
			throw new IdNotFoundException("Bill Id not found !!!");
		}
		else
		{
			return new ResponseEntity<Bill>(bill2,HttpStatus.OK);
		}
	}
	
	
	@GetMapping("/viewBillByCustomerId/{Customer_id}")
	public ResponseEntity<List<Bill>>  viewBillsByCustomerId(@PathVariable("Customer_id") int id) throws IdNotFoundException{
		
		logger.info("Inside view bills by customer Id method");
		List<Bill> billList = service.viewBillsByCustomerId(id);
		if(billList==null)
		{
			throw new IdNotFoundException("Invalid customer Id !!!");
		}
		else
		{
			return new ResponseEntity<List<Bill>>(billList, HttpStatus.OK);
		}
	}
	
	
	@GetMapping("/viewBillByOrderDate/{Start_date}/{End_date}")
	public ResponseEntity<List<Bill>> viewBillsBetweenDates(@PathVariable String Start_date, @PathVariable String End_date){
		
		logger.info("Inside view bills between dates method");
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startDate = LocalDate.parse(Start_date, dateTimeFormatter);
		LocalDate endDate = LocalDate.parse(End_date, dateTimeFormatter);
		List<Bill> billList = service.viewBillsBetweenDates(startDate,endDate);
	
		return new ResponseEntity<List<Bill>>(billList, HttpStatus.OK);
	}
	
	
	@GetMapping("/calculateTotalCost/{Bill_id}")
	public ResponseEntity<String> calculateTotalCost(@PathVariable("Bill_id") int id) throws IdNotFoundException{
		
		logger.info("Inside calculate total cost of bill method");
		Bill bill=service.viewBillById(id);
		if(bill==null)
		{
			throw new IdNotFoundException("Unable to calculate Total cost due to invalid Bill Id...");
		}
		else
		{
			String billList = service.calculateTotalCost(bill);
		    return new ResponseEntity<String>(billList, HttpStatus.OK);
		}
		    
	}
}

