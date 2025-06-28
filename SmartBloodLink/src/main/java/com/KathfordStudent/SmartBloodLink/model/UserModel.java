package com.KathfordStudent.SmartBloodLink.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class UserModel {

    @Id
    private String id;
    private String name;
    private String email;
    private String phone;
    private int age;
    private String gender;
    private String bloodType;
    private String username;
    private String password;
    private int userType;
    private String profileUrl = "";
    private List<String> driverLicenceUrl;
    private String address;
    private boolean isVerified = false;

    public UserModel(){
        this.isVerified = false;
        this.profileUrl = "";
    }

    public UserModel(String name, int age, String email, String phone, String bloodType,
                     String password, String username, int userType, String profileUrl, String address, List<String> driverLicenceUrl, String gender) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.bloodType = bloodType;
        this.age = age;
        this.username = username;
        this.password = password;
        this.userType = userType;
        this.profileUrl = profileUrl;
        this.address = address;
        this.driverLicenceUrl = driverLicenceUrl;
        this.gender = gender;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getBloodType() { return bloodType; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getUserType() { return userType; }
    public void setUserType(int userType) { this.userType = userType; }

    public boolean isVerified() { return isVerified; }
    public void setIsVerified(boolean isVerified) { this.isVerified = isVerified; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getProfileUrl() { return profileUrl; }
    public void setProfileUrl(String profileUrl) { this.profileUrl = profileUrl; }

    public List<String> getDriverLicenceUrl() { return driverLicenceUrl; }
    public void getDriverLicenceUrl(List<String> driverLicenceUrl) { this.driverLicenceUrl = driverLicenceUrl; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
}
