package com.KathfordStudent.SmartBloodLink.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.KathfordStudent.SmartBloodLink.dto.LoginRequest;
import com.KathfordStudent.SmartBloodLink.dto.LoginResponse;
import com.KathfordStudent.SmartBloodLink.dto.UserUpdateDTO;
import com.KathfordStudent.SmartBloodLink.dto.signupDTO;
import com.KathfordStudent.SmartBloodLink.model.UserModel;
import com.KathfordStudent.SmartBloodLink.repository.UserRepository;
import com.KathfordStudent.SmartBloodLink.util.JwtUtil;
import com.KathfordStudent.SmartBloodLink.util.UserMappingUtils;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired UserRepository userRepository;
    @Autowired JwtUtil jwtUtil;
    @Autowired UserMappingUtils userMapping;
    @Value("${upload.dir}")
    private String dir;
    @Value("${image.base.url}")
    private String base_url;

    @GetMapping
    public List<UserModel> getAllUser(){
        return userRepository.findAll();
    }

    @PostMapping(value = "/createUser", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> createUser(
            @ModelAttribute signupDTO user,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            // multiple files under the same key:
            @RequestParam(value = "driverLicenceImages", required = false) List<MultipartFile> driverLicenceImages
    ) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Already exist");
        }

        try {
            UserModel newUser = userMapping.convertToUser(user);

            // Save profile image → /images/profile-picture/...
            if (profileImage != null && !profileImage.isEmpty()) {
                String profileUrl = saveImage(profileImage, "profile-picture");
                newUser.setProfileUrl(profileUrl);
            }

            // Save licence images → /images/licence/...
            List<String> licenceUrls = new ArrayList<>();
            if (driverLicenceImages != null && !driverLicenceImages.isEmpty()) {
                for (MultipartFile file : driverLicenceImages) {
                    if (file == null || file.isEmpty()) continue;
                    licenceUrls.add(saveImage(file, "licence"));
                }
            }
            newUser.setDriverLicenceUrl(licenceUrls);

            userRepository.save(newUser);

            return ResponseEntity.ok(Map.of(
                "message", "User has been created.",
                "id", newUser.getId(),
                "profileUrl", newUser.getProfileUrl(),
                "driverLicenceUrl", newUser.getDriverLicenceUrl()
            ));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Image upload failed: " + e.getMessage());
        }
    }


    @Value("${upload.dir}")
    private String uploadDir;        // e.g. C:/.../Images/images/
    @Value("${image.base.url}")
    private String publicBaseUrl;    // e.g. http://10.0.2.2:8080/images/

    private String saveImage(MultipartFile file, String subFolder) throws IOException {
        String ct = Optional.ofNullable(file.getContentType()).orElse("").toLowerCase();
        if (!ct.startsWith("image/")) throw new IOException("Only image files are allowed");

        String original = Optional.ofNullable(file.getOriginalFilename()).orElse("file.jpg");
        String ext = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0 && dot < original.length() - 1) ext = original.substring(dot + 1).toLowerCase();
        if (ext.isBlank()) ext = "jpg";

        String unique = java.util.UUID.randomUUID().toString().replace("-", "")
                        + "_" + System.currentTimeMillis() + "." + ext;

        java.nio.file.Path folder = java.nio.file.Paths.get(uploadDir, subFolder)
                .toAbsolutePath().normalize();
        java.nio.file.Files.createDirectories(folder);

        java.nio.file.Path savePath = folder.resolve(unique);
        java.nio.file.Files.write(savePath, file.getBytes(), java.nio.file.StandardOpenOption.CREATE_NEW);

        // URL → http://10.0.2.2:8080/images/{subFolder}/{unique}
        return publicBaseUrl + subFolder + "/" + unique;
    }



    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id){
        if(!userRepository.existsById(id)){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exits");
        }
        else{
            userRepository.deleteById(id);
            return ResponseEntity.ok("User has been successfully deleted");
        }
        
    }

    @PatchMapping("/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UserUpdateDTO dto) {
        Optional<UserModel> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        UserModel user = optionalUser.get();

        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPhone() != null) user.setPhone(dto.getPhone());
        if (dto.getAge() != null) user.setAge(dto.getAge());
        if (dto.getGender() != null) user.setGender(dto.getGender());
        if (dto.getBloodType() != null) user.setBloodType(dto.getBloodType());
        if (dto.getAddress() != null) user.setAddress(dto.getAddress());

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }



    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        Optional<UserModel> user = userRepository.findByUsername(loginRequest.getUsername());

        if(user.isPresent()){
            UserModel userDetail = user.get();
            if(userDetail.getPassword().equals(loginRequest.getPassword())){
                if(userDetail.isVerified() == true){
                    String token = jwtUtil.generateToken(userDetail.getId());
                    LoginResponse response = new LoginResponse(
                        userDetail.getId(),
                        userDetail.getName(),
                        userDetail.getEmail(),
                        userDetail.getPhone(),
                        userDetail.getBloodType(),
                        userDetail.getAge(),
                        userDetail.getGender(),
                        userDetail.getAddress(),
                        userDetail.getUserType(),
                        userDetail.getProfileUrl()
                    );
                    return ResponseEntity.ok().body(Map.of(
                        "token", token,
                        "user", response
                    ));
                }
                else{
                    return ResponseEntity.status(401).body("Account is not verified");
                }
                
            }
            else{
                return ResponseEntity.status(401).body("Incorrect Password");
            }
        }
        return ResponseEntity.status(401).body("Incorrect Username");
    }
}
