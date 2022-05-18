package com.cg.fds.exceptions;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ErrorDetails {
	
	private String errorMessage;
	private LocalDate date;
	private String desc;
	
	public ErrorDetails(String msg, LocalDate date, String desc) {
		super();
		this.errorMessage = msg;
		this.date = date;
		this.desc = desc;
	}
	public String getMsg() {
		return errorMessage;
	}
	public void setMsg(String msg) {
		this.errorMessage = msg;
	}
	public LocalDate getDt() {
		return date;
	}
	public void setDt(LocalDate date) {
		this.date = date;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	
}
