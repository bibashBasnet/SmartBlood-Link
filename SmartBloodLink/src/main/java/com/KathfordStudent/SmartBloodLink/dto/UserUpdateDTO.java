package com.KathfordStudent.SmartBloodLink.dto;

public class UserUpdateDTO {
    private String id;
    private String name;
    private String email;
    private String phone;
    private Integer age;
    private String gender;
    private String bloodType;
    private String address;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodType() { return bloodType; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
