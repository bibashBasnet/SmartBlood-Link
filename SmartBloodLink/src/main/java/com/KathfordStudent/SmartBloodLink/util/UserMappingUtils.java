package com.KathfordStudent.SmartBloodLink.util;

import org.springframework.stereotype.Component;

import com.KathfordStudent.SmartBloodLink.dto.signupDTO;
import com.KathfordStudent.SmartBloodLink.model.UserModel;


@Component
public class UserMappingUtils {
    public UserModel convertToUser(signupDTO dto){
        UserModel user = new UserModel();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAge(dto.getAge());
        user.setGender(dto.getGender());
        user.setBloodType(dto.getBloodType());
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setUserType(dto.getUserType()); //1 for delivery person and 0 for normal user
        user.setAddress(dto.getAddress());
        return user;
    }
}
