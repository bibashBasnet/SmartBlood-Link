package com.smartbloodlink.adminpanel.dto;

public class MapDTO {

    private double latitude;
    private double longitude;

    // No-argument constructor
    public MapDTO() {
    }

    // Parameterized constructor
    public MapDTO(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
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
}
