package com.cg.fds.service;

import java.util.List;

import com.cg.fds.entities.Category;
import com.cg.fds.exceptions.IdNotFoundException;
import com.cg.fds.exceptions.removeFailedException;

public interface ICategoryService {

	public Category addCategory(Category cat);
	public Category updateCategory(Category cat);
	public String removeCategory(Category cat) throws removeFailedException;
	public Category viewCategoryById(int id) throws IdNotFoundException;
	public List<Category> viewAllCategory();
}
