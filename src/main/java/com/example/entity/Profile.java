package com.example.entity;


import javax.persistence.*;
import java.util.Date;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Profile {

	@Id
	@GeneratedValue
	private int id;

	private String name;
	private String titel;
	private String description;

	private String gender;
    private Date dateOfBirth;
    private String spokenLanguages;
    private String livesInCountry;
    private String residence;
    private String status; // Job, searching, student, working student
    private boolean smokeInHouse;
    private boolean studentenVereniging;
    private String educationLevel;



	public Profile() {
	}


    public Profile(int id, String name, String titel, String description) {
        this.id = id;
        this.name = name;
        this.titel = titel;
        this.description = description;
    }


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSpokenLanguages() {
        return spokenLanguages;
    }

    public void setSpokenLanguages(String spokenLanguages) {
        this.spokenLanguages = spokenLanguages;
    }

    public String getLivesInCountry() {
        return livesInCountry;
    }

    public void setLivesInCountry(String livesInCountry) {
        this.livesInCountry = livesInCountry;
    }

    public String getResidence() {
        return residence;
    }

    public void setResidence(String residence) {
        this.residence = residence;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isSmokeInHouse() {
        return smokeInHouse;
    }

    public void setSmokeInHouse(boolean smokeInHouse) {
        this.smokeInHouse = smokeInHouse;
    }

    public boolean isStudentenVereniging() {
        return studentenVereniging;
    }

    public void setStudentenVereniging(boolean studentenVereniging) {
        this.studentenVereniging = studentenVereniging;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }
}
