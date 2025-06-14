package com.KathfordStudent.SmartBloodLink.repository;
import com.KathfordStudent.SmartBloodLink.model.UserModel;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserModel, String>{
    Optional<UserModel> findById(String id);
    List<UserModel> findAll();
    void deleteById(String id);
}
