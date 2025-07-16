package com.smartbloodlink.adminpanel.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

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
    private boolean isFresh;
    private boolean isDelivery;
    private double latitude;
    private double longitude;
    private String hospital;

    public RequestModel() {
        this.time = LocalDate.now();
        this.status = "Pending";
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public LocalDate getTime() { return time; }
    public void setTime(LocalDate time) { this.time = time; }

    public int getAmount() { return amount; }
    public void setAmount(int amount) { this.amount = amount; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isFresh() { return isFresh; }
    public void setFresh(boolean fresh) { isFresh = fresh; }

    public boolean isDelivery() { return isDelivery; }
    public void setDelivery(boolean delivery) { isDelivery = delivery; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getHospital() { return hospital; }
    public void setHospital(String hospital) { this.hospital = hospital; }
}