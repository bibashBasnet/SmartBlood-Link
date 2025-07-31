package com.smartbloodlink.adminpanel.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartbloodlink.adminpanel.dto.MapDTO;
import com.smartbloodlink.adminpanel.model.DonateModel;
import com.smartbloodlink.adminpanel.model.RequestModel;
import com.smartbloodlink.adminpanel.repository.DonateRepository;
import com.smartbloodlink.adminpanel.repository.RequestRepository;

@RestController
@RequestMapping("/api/map")
@CrossOrigin(origins = "*")
public class MapController {
    @Autowired RequestRepository requestRepository;
    @Autowired DonateRepository donateRepository;
    @GetMapping("/request")
    public List<MapDTO> getDonationRequest(){
        List<RequestModel> list = requestRepository.findAll();
        List<MapDTO> result = new ArrayList<>();
        for(RequestModel r : list){
            result.add(new MapDTO(
                r.getLatitude(),
                r.getLongitude()
            ));
        }
        return  result;
    }
    @GetMapping("/donate")
    public List<MapDTO> getBloodRequest(){
        List<DonateModel> list = donateRepository.findAll();
        List<MapDTO> result = new ArrayList<>();
        for(DonateModel r : list){
            result.add(new MapDTO(
                r.getLatitude(),
                r.getLongitude()
            ));
        }
        return  result;
    }
}
