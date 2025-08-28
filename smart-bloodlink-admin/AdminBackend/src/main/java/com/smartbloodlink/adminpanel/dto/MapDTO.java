package com.smartbloodlink.adminpanel.dto;

import java.time.Instant;

public class MapDTO {

    private double latitude;
    private double longitude;
    private Instant createdAt;

    // No-argument constructor
    public MapDTO() {
    }

    // Parameterized constructor
    public MapDTO(double latitude, double longitude, Instant createdAt) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
    }

    // Getter and Setter for latitude
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    // Getter and Setter for longitude
    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Instant getCreatedAt(){
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt){
        this.createdAt = createdAt;
    }
}
