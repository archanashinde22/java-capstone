package com.archana.school.studentmanagement.entities;
import com.archana.school.studentmanagement.dtos.StudentDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "students")
//@Getter
//@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder   // to build the object
public class Student {

    // declare the table columns
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name" , nullable = false)
    private String lastName;
    @Column(name = "birth_date")
    @DateTimeFormat(pattern = "YYYY-MM-DD")
    private Date dob;
    @Column(name = "gender")
    private String gender;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "grade")
    private String grade;
    @Column(name = "email" , unique = true)
    private String email;
    @Column(columnDefinition = "text")
    private String address;

// define many-to-one relationship between student and faculty

    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JsonBackReference
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public Student(StudentDto studentDto){
        if(studentDto.getFirstName() != null) {
            this.firstName = studentDto.getFirstName();
        }
        if(studentDto.getLastName() != null) {
            this.lastName = studentDto.getLastName();
        }
        if(studentDto.getDob() != null) {
            this.dob = studentDto.getDob();
        }
        if(studentDto.getGender() != null) {
            this.gender = studentDto.getGender();
        }
        if(studentDto.getPhoneNumber() != null) {
            this.phoneNumber = studentDto.getPhoneNumber();
        }
        if(studentDto.getGrade() != null) {
            this.grade = studentDto.getGrade();
        }
        if(studentDto.getEmail() != null) {
            this.email = studentDto.getEmail();
        }
        if(studentDto.getAddress() != null) {
            this.address = studentDto.getAddress();
        }
    }

}
