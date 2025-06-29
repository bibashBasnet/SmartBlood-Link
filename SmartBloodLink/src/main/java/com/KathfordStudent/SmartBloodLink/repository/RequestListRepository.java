package com.KathfordStudent.SmartBloodLink.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KathfordStudent.SmartBloodLink.model.RequestListModel;

public interface RequestListRepository extends MongoRepository<RequestListModel, String>{
    List<RequestListModel> findAll();
}
