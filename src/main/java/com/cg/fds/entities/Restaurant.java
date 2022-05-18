package com.cg.fds.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
public class Restaurant {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int restaurantId;
	@NotEmpty(message = "Enter valid restaurant name")
	@Size(min = 2,max = 10,message = "Name should be within range")
	private String restaurantName;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="addId")
	private Address address;
	
	private String managerName;
	private String email;
	private String password;
	private String contactNumber;
	
	public Restaurant() {
		super();
	}

	public Restaurant( String restaurantName, Address address, String managerName, String email, String password, String contactNumber) {
		super();
		this.restaurantName = restaurantName;
		this.address = address;
		this.managerName = managerName;
		this.email = email;
		this.password = password;
		this.contactNumber = contactNumber;
	}

	public Restaurant(int restaurantId, String restaurantName,	Address address, String managerName, String email, String password, String contactNumber) {
		super();
		this.restaurantId = restaurantId;
		this.restaurantName = restaurantName;
		this.address = address;
		this.managerName = managerName;
		this.email = email;
		this.password = password;
		this.contactNumber = contactNumber;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getManagerName() {
		return managerName;
	}

	public void setManagerName(String managerName) {
		this.managerName = managerName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	@Override
	public String toString() {
		return "Restaurant [restaurantId=" + restaurantId + ", restaurantName=" + restaurantName + ", address="
				+ address + ", managerName=" + managerName + ", email=" + email + ", password=" + password
				+ ", contactNumber=" + contactNumber + "]";
	}
			
}
