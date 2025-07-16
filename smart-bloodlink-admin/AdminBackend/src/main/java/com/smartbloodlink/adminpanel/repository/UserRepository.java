package com.smartbloodlink.adminpanel.repository;

import com.smartbloodlink.adminpanel.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserModel, String> {
    Optional<UserModel> findByUsername(String username);
    List<UserModel> findByUserType(int userType);
    List<UserModel> findByIsVerifiedFalse();
    List<UserModel> findByUserTypeAndIsVerifiedFalse(int userType);
    long countByUserType(int userType);
    long countByUserTypeAndIsVerifiedTrue(int userType);
}