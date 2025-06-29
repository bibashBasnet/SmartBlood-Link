package com.KathfordStudent.SmartBloodLink.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KathfordStudent.SmartBloodLink.model.RequestModel;

public interface RequestRepository extends MongoRepository<RequestModel, String>{
    List<RequestModel> findAll();
    Optional<RequestModel> findById(String id);
    void deleteById(String id);
    List<RequestModel> findAllByCreatedBy(String id);
}
