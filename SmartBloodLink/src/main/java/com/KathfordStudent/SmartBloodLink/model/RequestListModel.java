package com.KathfordStudent.SmartBloodLink.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "requestList")
public class RequestListModel {
    @Id
    private String id;
    private String name;
    private String time;
    private String bloodType;
    private String address;
    private String phone;
    private String email;
    private String status;
    private String belongsTo;

    public RequestListModel() {
    }

    public RequestListModel(String id, String name, String time, String bloodType, String address, String phone, String email, String status, String belongsTo) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.bloodType = bloodType;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.belongsTo = belongsTo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getBelongsTo() {
        return belongsTo;
    }

    public void setBelongsTo(String belongsTo) {
        this.belongsTo = belongsTo;
    }
}
