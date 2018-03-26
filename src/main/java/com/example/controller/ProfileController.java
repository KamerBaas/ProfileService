package com.example.controller;

import java.util.List;

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

	@PostMapping("/profile")
    public int saveProfile(Profile profile){
	    return profileService.save(profile);

	}

    @PutMapping("/profile/{id}")
    public Profile updateProfile(@PathVariable int id,  Profile profile){
        return profileService.updateProfile(id, profile);
    }

    @GetMapping("/profile/{id}")
    public Profile getProfileById(@PathVariable int id){
        return profileService.findById(id);
    }



}
