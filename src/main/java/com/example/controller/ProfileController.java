package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Profile;
import com.example.service.ProfileService;

@RestController
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	@GetMapping("/")
	public List<Profile> items() {
		return profileService.findAll();
	}

}
