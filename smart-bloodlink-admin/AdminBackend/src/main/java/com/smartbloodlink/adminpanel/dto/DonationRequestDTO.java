package com.smartbloodlink.adminpanel.dto;

import java.time.LocalDate;

public class DonationRequestDTO {

    private String id;
    private String name;
    private int age;
    private String gender;
    private String bloodGroup;
    private String phone;
    private String email;
    private String address;
    private double weight;
    private String medicalHistory;
    private LocalDate lastDonationDate;   // Use Instant here too
    private LocalDate preferredDate;
    private String allergies;
    private String emergencyContact;
    private String status;
    private String createdBy;
    private String bloodBankName;
    private double latitude;
    private double longitude;

    public DonationRequestDTO(String id, String name, int age, String gender, String bloodGroup,
                              String phone, String email, String address, double weight,
                              String medicalHistory, LocalDate lastDonationDate, LocalDate preferredDate,
                              String allergies, String emergencyContact, String status, String createdBy,
                              String bloodBankName, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.bloodGroup = bloodGroup;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.weight = weight;
        this.medicalHistory = medicalHistory;
        this.lastDonationDate = lastDonationDate;
        this.preferredDate = preferredDate;
        this.allergies = allergies;
        this.emergencyContact = emergencyContact;
        this.status = status;
        this.createdBy = createdBy;
        this.bloodBankName = bloodBankName;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters only (or add setters if needed)

    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public String getBloodGroup() { return bloodGroup; }
    public String getPhone() { return phone; }
    public String getEmail() { return email; }
    public String getAddress() { return address; }
    public double getWeight() { return weight; }
    public String getMedicalHistory() { return medicalHistory; }
    public LocalDate getLastDonationDate() { return lastDonationDate; }
    public LocalDate getPreferredDate() { return preferredDate; }
    public String getAllergies() { return allergies; }
    public String getEmergencyContact() { return emergencyContact; }
    public String getStatus() { return status; }
    public String getCreatedBy() { return createdBy; }
    public String getBloodBankName() { return bloodBankName; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
}
