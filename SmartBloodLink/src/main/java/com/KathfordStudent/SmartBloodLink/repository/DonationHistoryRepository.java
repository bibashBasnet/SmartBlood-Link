package com.KathfordStudent.SmartBloodLink.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KathfordStudent.SmartBloodLink.model.DonationHistoryModel;


public interface DonationHistoryRepository extends MongoRepository<DonationHistoryModel, String>{
    List<DonationHistoryModel> findAllByBelongsTo(String id);
}
