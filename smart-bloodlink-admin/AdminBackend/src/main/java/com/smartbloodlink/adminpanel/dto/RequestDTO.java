package com.smartbloodlink.adminpanel.dto;

import java.time.LocalDate;

public class RequestDTO {
    private String id;
    private String name;
    private String type;
    private String hospital;
    private String status;
    private LocalDate time;
    private String phone;
    private String email;
    private int amount;
    private String location;
    private boolean isFresh;
    private boolean isDelivery;
    private double latitude;
    private double longitude;

    public RequestDTO(String id, String name, String type, String hospital, String status, LocalDate time,
                      String phone, String email, int amount, String location, boolean isFresh,
                      boolean isDelivery, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.hospital = hospital;
        this.status = status;
        this.time = time;
        this.phone = phone;
        this.email = email;
        this.amount = amount;
        this.location = location;
        this.isFresh = isFresh;
        this.isDelivery = isDelivery;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public String getHospital() { return hospital; }
    public String getStatus() { return status; }
    public LocalDate getTime() { return time; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public int getAmount() { return amount; }
    public String getLocation() { return location; }
    public boolean isFresh() { return isFresh; }
    public boolean isDelivery() { return isDelivery; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
}
