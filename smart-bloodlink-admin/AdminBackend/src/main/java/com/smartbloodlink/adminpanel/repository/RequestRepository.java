package com.smartbloodlink.adminpanel.repository;

import com.smartbloodlink.adminpanel.model.RequestModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RequestRepository extends MongoRepository<RequestModel, String> {
    List<RequestModel> findByStatus(String status);
    List<RequestModel> findAll();
    long count();

}