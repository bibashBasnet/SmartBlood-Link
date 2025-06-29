package com.KathfordStudent.SmartBloodLink.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.model.DonationHistoryModel;
import com.KathfordStudent.SmartBloodLink.repository.DonationHistoryRepository;


@RestController
@RequestMapping("/donationHistory")
public class DonationHistoryController {
    @Autowired DonationHistoryRepository donationHistoryRepository;

    @GetMapping("/get")
    public ResponseEntity<?> getHistory(@RequestParam String id){
        List<DonationHistoryModel> list = donationHistoryRepository.findAllByBelongsTo(id);
        return ResponseEntity.ok(list);
    }
}
