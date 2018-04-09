package com.example.controller;

import java.util.List;

import com.example.entity.LandlordProfile;
import com.example.entity.RenterProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.entity.Profile;
import com.example.service.ProfileService;

@RestController
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	@GetMapping("/profile")
	public List<Profile> items() {
		return profileService.findAll();
	}

    @GetMapping("/profile/{id}")
    public Profile getProfileById(@PathVariable int id){
        return profileService.findById(id);
    }

	@PostMapping("/profile/renter")
    public int saveProfile(RenterProfile profile){
        return profileService.save(profile);

    }

    @PostMapping("/profile/landlord")
    public int saveProfile(LandlordProfile profile){
        return profileService.save(profile);

    }

    @PutMapping("/profile/{id}/renter")
    public void updateProfile(@PathVariable int id,  RenterProfile profile){
        profileService.updateProfile(id, profile);
    }


    @PutMapping("/profile/{id}/landlord")
    public void updateProfile(@PathVariable int id,  LandlordProfile profile){
        profileService.updateProfile(id, profile);
    }





}
