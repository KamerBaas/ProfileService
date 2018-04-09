package com.example.entity;


import javax.persistence.Entity;

@Entity
public class LandlordProfile extends Profile {




    public LandlordProfile() {
        super();
    }

    public LandlordProfile(int id, String name, String titel, String description) {
        super(id, name, titel, description);
    }
}
