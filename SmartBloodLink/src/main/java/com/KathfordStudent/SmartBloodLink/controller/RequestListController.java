package com.KathfordStudent.SmartBloodLink.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.model.RequestListModel;
import com.KathfordStudent.SmartBloodLink.repository.RequestListRepository;

@RestController
@RequestMapping("/requestList")
public class RequestListController {
    @Autowired RequestListRepository requestListRepository;

    @GetMapping("/get")
    public ResponseEntity<?> getRequest(){
        List<RequestListModel> list = requestListRepository.findAll();
        return ResponseEntity.ok(list);
    }
}
