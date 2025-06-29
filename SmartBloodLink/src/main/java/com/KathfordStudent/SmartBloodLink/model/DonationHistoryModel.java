package com.KathfordStudent.SmartBloodLink.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donationHistory")
public class DonationHistoryModel {
    @Id
    private String id;
    private String location;
    private String time;
    private String belongsTo;
    private String status;

     public DonationHistoryModel() {
    }

    public DonationHistoryModel(String id, String location, String time, String belongsTo, String status) {
        this.id = id;
        this.location = location;
        this.time = time;
        this.belongsTo = belongsTo;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getBelongsTo() {
        return belongsTo;
    }

    public void setBelongsTo(String belongsTo) {
        this.belongsTo = belongsTo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
