package com.smartbloodlink.adminpanel.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donate")
public class DonateModel {
    @Id
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

    private String lastDonationDate;
    private String preferredDate;

    private String allergies;
    private String emergencyContact;
    private String status;
    private String createdBy;
    private String bloodBankName;
    private double latitude;
    private double longitude;


    public DonateModel(String id, String name, int age, String gender, String bloodGroup, String phone, String email,
                       String address, double weight, String medicalHistory, String lastDonationDate,
                       String preferredDate, String allergies, String emergencyContact, String status, String createdBy, String bloodBankName,
                       double latitude, double longitude) {
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

    public DonateModel() {
        this.status = "Pending";
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }

    public String getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(String medicalHistory) { this.medicalHistory = medicalHistory; }

    public String getLastDonationDate() { return lastDonationDate; }
    public void setLastDonationDate(String lastDonationDate) { this.lastDonationDate = lastDonationDate; }

    public String getPreferredDate() { return preferredDate; }
    public void setPreferredDate(String preferredDate) { this.preferredDate = preferredDate; }

    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public String getBloodBankName() { return bloodBankName; }
    public void setBloodBankName(String bloodBankName) { this.bloodBankName = bloodBankName; }

    public double getLongitude(){return longitude;}
    public void setLongitude(double longitude){this.longitude = longitude;}

    public double getLatitude(){return latitude;}
    public void setLatitude(double latitude){this.latitude = latitude;}

}
