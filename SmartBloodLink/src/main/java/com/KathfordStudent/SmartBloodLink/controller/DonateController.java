package com.KathfordStudent.SmartBloodLink.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.model.DonateModel;
import com.KathfordStudent.SmartBloodLink.repository.DonateRepository;

@RestController
@RequestMapping("donate")
public class DonateController {
    @Autowired DonateRepository donateRepository;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody DonateModel donate) {
        // Find all requests by the same user
        List<DonateModel> list = donateRepository.findAllByCreatedBy(donate.getCreatedBy());

        // Check if any request is still pending
        boolean hasPending = list.stream()
            .anyMatch(d -> "pending".equalsIgnoreCase(d.getStatus()));  
        hasPending = list.stream()
            .anyMatch(d -> "approved".equalsIgnoreCase(d.getStatus()));

        if (hasPending) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body("A pending request already exists. Please complete or cancel it first.");
        }

        // Otherwise create a new one
        DonateModel saved = donateRepository.save(donate);
        return ResponseEntity.ok(saved);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){
        Optional<DonateModel> donate = donateRepository.findById(id);
        if(!donate.isEmpty()){
            donateRepository.delete(donate.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("The Appointment is cancelled");
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The Appointment doesnot exist");
        }
    }


    @GetMapping("/get/{createdBy}")
    public ResponseEntity<?> get(@PathVariable String createdBy){
        List<DonateModel> list = donateRepository.findAllByCreatedBy(createdBy);
        return ResponseEntity.ok(list);
    }
}
