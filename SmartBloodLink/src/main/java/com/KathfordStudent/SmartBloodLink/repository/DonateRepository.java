package com.KathfordStudent.SmartBloodLink.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KathfordStudent.SmartBloodLink.model.DonateModel;

public interface DonateRepository extends MongoRepository<DonateModel, String>{
    DonateModel findByCreatedBy(String createdBy);
    boolean existsByCreatedBy(String createdBy);
}
