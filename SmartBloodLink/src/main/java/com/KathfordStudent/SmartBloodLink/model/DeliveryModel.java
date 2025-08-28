package com.KathfordStudent.SmartBloodLink.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "delivery")
public class DeliveryModel {
    @Id
    private String id;

    @Field("driver_id")
    @JsonProperty("driver_id")
    private String driverId;

    private String request_id;

    // --- Constructors ---
    public DeliveryModel() {
        // no-args constructor required by Spring Data
    }

    public DeliveryModel(String id, String driver_id, String request_id) {
        this.id = id;
        this.driverId = driver_id;
        this.request_id = request_id;
    }

    // --- Getters & Setters ---
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDriver_id() {
        return driverId;
    }

    public void setDriver_id(String driver_id) {
        this.driverId = driver_id;
    }

    public String getRequest_id() {
        return request_id;
    }

    public void setRequest_id(String request_id) {
        this.request_id = request_id;
    }
}
