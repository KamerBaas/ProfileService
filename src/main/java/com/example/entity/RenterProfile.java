package com.example.entity;


import javax.persistence.Entity;

@Entity
public class RenterProfile extends Profile {

    private int roomSize;
    private String location;


    public RenterProfile() {
    }

    public RenterProfile(int id, String name, String titel, String description, int roomSize, String location) {
        super(id, name, titel, description);
        this.roomSize = roomSize;
        this.location = location;
    }

    public int getRoomSize() {
        return roomSize;
    }

    public void setRoomSize(int roomSize) {
        this.roomSize = roomSize;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
