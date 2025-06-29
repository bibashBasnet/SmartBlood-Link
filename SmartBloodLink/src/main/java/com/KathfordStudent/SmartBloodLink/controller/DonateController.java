package com.KathfordStudent.SmartBloodLink.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    @GetMapping("/get")
    public ResponseEntity<?> get(@RequestParam String createdBy){
        return ResponseEntity.ok(donateRepository.findByCreatedBy(createdBy));
    }
}
