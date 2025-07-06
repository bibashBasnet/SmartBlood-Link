package com.KathfordStudent.SmartBloodLink.controller;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.support.Repositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.model.DonateModel;
import com.KathfordStudent.SmartBloodLink.repository.DonateRepository;

@RestController
@RequestMapping("donate")
public class DonateController {
    @Autowired DonateRepository donateRepository;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody DonateModel donate){
        boolean exist = donateRepository.existsByCreatedBy(donate.getCreatedBy());
        if(!exist){
            donateRepository.save(donate);
            return ResponseEntity.ok(donate);
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot be Created");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam String createdBy){
        Optional<DonateModel> donate = donateRepository.findByCreatedBy(createdBy);
        if(!donate.isEmpty()){
            donateRepository.delete(donate.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("The Appointment is cancelled");
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The Appointment doesnot exist");
        }
    }


    @GetMapping("/get")
    public ResponseEntity<?> get(@RequestParam String createdBy){
        return ResponseEntity.ok(donateRepository.findByCreatedBy(createdBy));
    }
}
