package com.KathfordStudent.SmartBloodLink.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "requests")
public class RequestModel {

    @Id
    private String id;

    private String createdBy;

    private LocalDate time;
    private int amount;
    private String name;
    private String location;
    private String type;
    private String phone;
    private String email;
    private String status;

    public RequestModel() {
        this.time = LocalDate.now();
        this.status = "Pending";
    }

     public RequestModel(String id, String createdBy, LocalDate time, String name, String location,
                        String type, String phone,int amount, String email, String status) {
        this.id = id;
        this.createdBy = createdBy;
        this.time = time;
        this.name = name;
        this.location = location;
        this.type = type;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.amount = amount;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getTime() {
        return time;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

        public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
