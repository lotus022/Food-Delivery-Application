package com.cg.fds.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.validation.constraints.NotEmpty;

@Entity
public class Category {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int catId;
    @NotEmpty(message = "Category name should not be empty...")
    private String categoryName;
	
    public Category() {
		super();
	}

	public Category(@NotEmpty(message = "Category name should not be empty...") String categoryName) {
		super();
		this.categoryName = categoryName;
	}

	public Category(int catId, @NotEmpty(message = "Category name should not be empty...") String categoryName) {
		super();
		this.catId = catId;
		this.categoryName = categoryName;
	}
	
	
	public int getCatId() {
		return catId;
	}

	public void setCatId(int catId) {
		this.catId = catId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	@Override
	public String toString() {
		return "Category [catId=" + catId + ", categoryName=" + categoryName + "]";
	}
    	
}
