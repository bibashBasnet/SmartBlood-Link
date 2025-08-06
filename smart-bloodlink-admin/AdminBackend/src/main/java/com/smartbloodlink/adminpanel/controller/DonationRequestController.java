package com.smartbloodlink.adminpanel.controller;

import com.smartbloodlink.adminpanel.dto.DonationRequestDTO;
import com.smartbloodlink.adminpanel.model.DonationRequest;
import com.smartbloodlink.adminpanel.repository.DonationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationRequestController {

    @Autowired
    private DonationRequestRepository donationRequestRepository;

    // Get all donation requests
    @GetMapping
    public List<DonationRequestDTO> getAllDonationRequests() {
        List<DonationRequest> donations = donationRequestRepository.findAll();
        List<DonationRequestDTO> result = new ArrayList<>();
        for (DonationRequest d : donations) {
            result.add(toDTO(d));
        }
        return result;
    }

    // Get donation requests by status
    @GetMapping("/status/{status}")
    public List<DonationRequestDTO> getDonationRequestsByStatus(@PathVariable String status) {
        List<DonationRequest> donations = donationRequestRepository.findByStatus(status);
        List<DonationRequestDTO> result = new ArrayList<>();
        for (DonationRequest d : donations) {
            result.add(toDTO(d));
        }
        return result;
    }

    // ✅ Unified status update endpoint (approve/reject/pending/etc)
    @PutMapping("/{id}/status")
    public DonationRequestDTO updateDonationStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {
        DonationRequest donation = donationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation request not found with id: " + id));
        donation.setStatus(status); // Can be "Approved", "Rejected", etc.
        DonationRequest saved = donationRequestRepository.save(donation);
        return toDTO(saved);
    }

    // Optional: legacy specific approve/reject (if still needed)
    @PutMapping("/{id}/approve")
    public DonationRequestDTO approveDonationRequest(@PathVariable String id) {
        return updateDonationStatus(id, "Approved");
    }

    @PutMapping("/{id}/reject")
    public DonationRequestDTO rejectDonationRequest(@PathVariable String id) {
        return updateDonationStatus(id, "Rejected");
    }

    // Convert model to DTO
    private DonationRequestDTO toDTO(DonationRequest d) {
        return new DonationRequestDTO(
                d.getId(),
                d.getName(),
                d.getAge(),
                d.getGender(),
                d.getBloodGroup(),
                d.getPhone(),
                d.getEmail(),
                d.getAddress(),
                d.getWeight(),
                d.getMedicalHistory(),
                d.getLastDonationDate(),
                d.getPreferredDate(),
                d.getAllergies(),
                d.getEmergencyContact(),
                d.getStatus(),
                d.getCreatedBy(),
                d.getBloodBankName(),
                d.getLatitude(),
                d.getLongitude()
        );
    }
}
