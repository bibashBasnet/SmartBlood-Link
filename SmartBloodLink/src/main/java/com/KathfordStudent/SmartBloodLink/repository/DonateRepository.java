package com.KathfordStudent.SmartBloodLink.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KathfordStudent.SmartBloodLink.model.DonateModel;

public interface DonateRepository extends MongoRepository<DonateModel, String>{
    List<DonateModel> findAllByCreatedBy(String createdBy);

}
