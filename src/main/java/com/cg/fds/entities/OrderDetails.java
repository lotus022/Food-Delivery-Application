package com.cg.fds.entities;

import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name="order_details")
public class OrderDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int orderId;
	private LocalDateTime OrderDate;
	 
	@OneToOne
	@JoinColumn(name="custId")
	private Customer customer;
	
	@ManyToMany
	@JoinTable(name="orderItemDetails", joinColumns = { @JoinColumn(name="orderId")},inverseJoinColumns = {@JoinColumn(name="itemId")})
	List<Item> list;
	
	@ManyToOne
	@JoinColumn(name="restaurant_id")
	Restaurant restaurant;

	@NotEmpty
	@Size(min = 4,max=10)
	private String orderStatus;

	public OrderDetails() {
		super();
	}

	public OrderDetails(int orderId, LocalDateTime orderDate, Customer customer, List<Item> list,
			@NotEmpty @Size(min = 4, max = 10) String orderStatus) {
		super();
		this.orderId = orderId;
		OrderDate = orderDate;
		this.customer = customer;
		this.list = list;
		this.orderStatus = orderStatus;
	}

	public OrderDetails(LocalDateTime orderDate, Customer customer, List<Item> list,
			@NotEmpty @Size(min = 4, max = 10) String orderStatus) {
		super();
		OrderDate = orderDate;
		this.customer = customer;
		this.list = list;
		this.orderStatus = orderStatus;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	
	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public LocalDateTime getOrderDate() {
		return OrderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		OrderDate = orderDate;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<Item> getList() {
		return list;
	}

	public void setList(List<Item> list) {
		this.list = list;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	@Override
	public String toString() {
		return "OrderDetails [orderId=" + orderId + ", OrderDate=" + OrderDate + ", customer=" + customer + ", list="
				+ list + ", orderStatus=" + orderStatus + "]";
	}
	
	

}
