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
    private Boolean isFresh;
    private Boolean isDelivery;
    private double latitude;
    private double longitude;
    private String hospital;
    private String bloodBank;
    private String acceptedBy;  // Who accepted the request

    public RequestModel() {
        this.time = LocalDate.now();
        this.status = "Pending";
        this.hospital = "";
        this.longitude = 0;
        this.latitude = 0;
        this.acceptedBy = "";
    }

    public RequestModel(String id,
                        String createdBy,
                        LocalDate time,
                        int amount,
                        String name,
                        String location,
                        String type,
                        String phone,
                        String email,
                        String status,
                        Boolean isFresh,
                        Boolean isDelivery,
                        double latitude,
                        double longitude,
                        String hospital,
                        String acceptedBy, String bloodBank) {
        this.id = id;
        this.createdBy = createdBy;
        this.time = time;
        this.amount = amount;
        this.name = name;
        this.location = location;
        this.type = type;
        this.phone = phone;
        this.email = email;
        this.status = status;
        this.isFresh = isFresh;
        this.isDelivery = isDelivery;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hospital = hospital;
        this.acceptedBy = acceptedBy;
        this.bloodBank = bloodBank;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
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

    public Boolean getIsFresh() {
        return isFresh;
    }

    public void setIsFresh(Boolean isFresh) {
        this.isFresh = isFresh;
    }

    public Boolean getIsDelivery() {
        return isDelivery;
    }

    public void setIsDelivery(Boolean isDelivery) {
        this.isDelivery = isDelivery;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public String getAcceptedBy() {
        return acceptedBy;
    }

    public void setAcceptedBy(String acceptedBy) {
        this.acceptedBy = acceptedBy;
    }
    public String getBloodBank() {
        return bloodBank;
    }

    public void setBloodBank(String bloodBank) {
        this.bloodBank = bloodBank;
    }
}
