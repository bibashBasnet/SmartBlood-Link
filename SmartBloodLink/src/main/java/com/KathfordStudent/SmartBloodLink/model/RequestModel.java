package com.KathfordStudent.SmartBloodLink.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "requests")
public class RequestModel {

    @Id
    private String id;

    
    private LocalDate time;

    private String name;
    private String address;
    private String type;
    private String phone;

    public RequestModel() {
        this.time = LocalDate.now();
    }

    public RequestModel(String name, String address, String type, String phone) {
        this.time = LocalDate.now();
        this.name = name;
        this.address = address;
        this.type = type;
        this.phone = phone;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDate getTime() { return time; }
    public void setTime(LocalDate time) { this.time = time; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
