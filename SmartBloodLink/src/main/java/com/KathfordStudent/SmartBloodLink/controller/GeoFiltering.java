package com.KathfordStudent.SmartBloodLink.controller;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.KathfordStudent.SmartBloodLink.dto.NearbyRequest;
import com.KathfordStudent.SmartBloodLink.model.BloodBankModel;
import com.KathfordStudent.SmartBloodLink.repository.GeoFilteringRepository;
import com.KathfordStudent.SmartBloodLink.util.GeoUtils;

@RestController
@RequestMapping("/geoFiltering")
public class GeoFiltering {

    @Autowired
    private GeoFilteringRepository geoFilteringRepository;

    @GetMapping("/nearby")
    public List<NearbyRequest> findNearby(
        @RequestParam double lat,
        @RequestParam double lng,
        @RequestParam(defaultValue = "5") double radius
    ) {
        List<BloodBankModel> allBanks = geoFilteringRepository.findAll();

        return allBanks.stream()
            .map(bank -> {
                double bankLat = bank.getLatitude();   // ✅ Correct field
                double bankLng = bank.getLongitude();  // ✅ Correct field
                double distance = GeoUtils.haversine(lat, lng, bankLat, bankLng); // ✅ Correct utility class name

                if (distance <= radius) {
                    NearbyRequest dto = new NearbyRequest();  // ✅ Correct DTO name
                    dto.setId(bank.getId());
                    dto.setName(bank.getName());
                    dto.setPhone(bank.getPhone());
                    dto.setLocationText(bank.getLocation());
                    dto.setDistance(distance);
                    dto.setLatitude(bankLat);
                    dto.setLongitude(bankLng);
                    return dto;
                }
                return null;
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }
}
