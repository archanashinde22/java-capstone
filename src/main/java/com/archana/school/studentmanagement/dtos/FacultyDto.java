package com.archana.school.studentmanagement.dtos;

import com.archana.school.studentmanagement.entities.Faculty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

import java.util.Set;
import java.util.HashSet;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacultyDto implements Serializable {

    private int id;
    private String firstName;
    private String lastName;

    private Date dob;
    private String gender;
    private String phoneNumber;
    private String grade;
    private String username;

    private String password;
    private String address;
    private int role;
    private String email;
    private Set<StudentDto> studentDtoSet= new HashSet<>();

    public FacultyDto(Faculty faculty){
        if(faculty.getId() != 0) {
            this.id = faculty.getId();
        }
        if(faculty.getFirstName() != null) {
            this.firstName = faculty.getFirstName();
        }
        if(faculty.getLastName() != null) {
            this.lastName = faculty.getLastName();
        }
        if(faculty.getDob() != null) {
            this.dob = faculty.getDob();
        }
        if(faculty.getGender() != null) {
            this.gender = faculty.getGender();
        }
        if(faculty.getPhoneNumber() != null) {
            this.phoneNumber = faculty.getPhoneNumber();
        }
        if(faculty.getGrade() != null) {
            this.grade = faculty.getGrade();
        }
        if(faculty.getEmail() != null) {
            this.email = faculty.getEmail();
        }
        if(faculty.getUsername()!= null) {
            this.username = faculty.getUsername();
        }
        if(faculty.getPassword() != null) {
            this.password = faculty.getPassword();
        }
        if(faculty.getRole() != 0  ) {
            this.role = faculty.getRole();
        }
        if(faculty.getAddress() != null  ) {
            this.address = faculty.getAddress();
        }
    }


}
