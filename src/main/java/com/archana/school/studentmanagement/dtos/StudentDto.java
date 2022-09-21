package com.archana.school.studentmanagement.dtos;

import com.archana.school.studentmanagement.entities.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto implements Serializable {

    private int id;
    private String firstName;
    private String lastName;
    private Date dob;
    private String gender;
    private String phoneNumber;
    private String grade;
    private String email;
    private String address;

    private FacultyDto facultyDto;

    public StudentDto(Student student){
        if(student.getId() != 0) {
            this.id = student.getId();
        }
        if(student.getFirstName() != null) {
            this.firstName = student.getFirstName();
        }
        if(student.getLastName() != null) {
            this.lastName = student.getLastName();
        }
        if(student.getDob() != null) {
            this.dob = student.getDob();
        }
        if(student.getGender() != null) {
            this.gender = student.getGender();
        }
        if(student.getPhoneNumber() != null) {
            this.phoneNumber = student.getPhoneNumber();
        }
        if(student.getGrade() != null) {
            this.grade = student.getGrade();
        }
        if(student.getEmail() != null) {
            this.email = student.getEmail();
        }
        if(student.getAddress() != null) {
            this.address = student.getAddress();
        }
    }
}
