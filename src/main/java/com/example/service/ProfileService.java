package com.example.service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.example.entity.LandlordProfile;
import com.example.entity.RenterProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.entity.Profile;
import com.example.repository.ProfileRepository;

@Service
public class ProfileService {
	
	@Autowired
	private ProfileRepository profileRepository;
	
	@Transactional
	@PostConstruct
	public void init() {
		profileRepository.save(new RenterProfile(1, "A", "Titel1", "Description", 20, "Arnhem"));
		profileRepository.save(new LandlordProfile(2, "B", "Titel1", "Description"));
		profileRepository.save(new RenterProfile(3, "C", "Titel1", "Description", 29, "Arnhem"));
	}
	
	public List<Profile> findAll() {
		return profileRepository.findAll();
	}

    public int save(Profile profile) {
	    profileRepository.save(profile);
	    return profile.getId();
    }

    public Profile findById(int id) {
	    return profileRepository.findOne(id);
    }

    public void updateProfile(int id, Profile profile) {
	    profileRepository.save(profile);
    }
}
