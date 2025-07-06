package com.KathfordStudent.SmartBloodLink.dto;

public class NearbyRequest {
    private String id;
    private String name;
    private String phone;
    private String locationText;
    private double longitude;
    private double latitude;
    private double distance;

    public NearbyRequest() {}

    // Getters and Setters
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

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocationText() {
        return locationText;
    }
    public void setLocationText(String locationText) {
        this.locationText = locationText;
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

    public double getDistance() {
        return distance;
    }
    public void setDistance(double distance) {
        this.distance = distance;
    }
}
