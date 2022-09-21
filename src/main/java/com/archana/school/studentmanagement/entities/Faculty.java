package com.archana.school.studentmanagement.entities;
import com.archana.school.studentmanagement.dtos.FacultyDto;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "faculties")
//@Getter
//@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faculty {
// declare the table columns

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
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
    @Column(columnDefinition = "text")
    private String address;

    @Column(unique = true)
    private String username;
    @Column
    private String password;
    @Column
    private int role;
    @Column(name = "email" , unique = true)
    private String email;
//, CascadeType.MERGE,CascadeType.DETACH,CascadeType.REFRESH
    @OneToMany(mappedBy = "faculty", fetch= FetchType.LAZY , cascade = {CascadeType.PERSIST})
    @JsonManagedReference
    private Set<Student> studentSet;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

// set Faculty to Student when faculty add Student
//    add e methods for Bi-directional relationship
    public void addStudent(Student student){
        this.getStudentSet().add(student);
        student.setFaculty(this);

    }
    public Set<Student> getStudentSet() {
        if(studentSet == null){
            studentSet = new HashSet<Student>();
        }
        return studentSet;
    }

    public void setStudentSet(Set<Student> studentSet) {

        this.studentSet = studentSet;
    }

    public Faculty(FacultyDto facultyDto){

        if(facultyDto.getFirstName() != null) {
            this.firstName = facultyDto.getFirstName();
        }
        if(facultyDto.getLastName() != null) {
            this.lastName = facultyDto.getLastName();
        }
        if(facultyDto.getDob() != null) {
            this.dob = facultyDto.getDob();
        }
        if(facultyDto.getGender() != null) {
            this.gender = facultyDto.getGender();
        }
        if(facultyDto.getPhoneNumber() != null) {
            this.phoneNumber = facultyDto.getPhoneNumber();
        }
        if(facultyDto.getGrade() != null) {
            this.grade = facultyDto.getGrade();
        }
        if(facultyDto.getEmail() != null) {
            this.email = facultyDto.getEmail();
        }
        if(facultyDto.getUsername()!= null) {
            this.username = facultyDto.getUsername();
        }
        if(facultyDto.getPassword() != null) {
            this.password = facultyDto.getPassword();
        }
        if(facultyDto.getRole() != 0  ) {
            this.role = facultyDto.getRole();
        }
        if(facultyDto.getAddress() != null) {
            this.address = facultyDto.getAddress();
        }
    }

    @Override
    public String toString() {
        return "Faculty{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dob=" + dob +
                ", gender='" + gender + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", grade='" + grade + '\'' +
                ", address='" + address + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", email='" + email + '\'' +
                ", studentSet=" + studentSet +
                '}';
    }
}
