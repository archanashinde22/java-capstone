package com.archana.school.studentmanagement.services;

import com.archana.school.studentmanagement.dtos.StudentDto;
import com.archana.school.studentmanagement.entities.Faculty;
import com.archana.school.studentmanagement.entities.Student;
import com.archana.school.studentmanagement.repositories.FacultyRepository;
import com.archana.school.studentmanagement.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;


    // add student  by Faculty ID
    @Override
    @Transactional
    public List<String> addStudent(StudentDto studentDto, int facultyId){
        Optional<Student> savedStudent = studentRepository.findByEmailIgnoreCase(studentDto.getEmail());
        List<String> response = new ArrayList<>();
        if(savedStudent.isPresent()){
            response.add("Student already exists with given email.");
            return  response;
        }
        Optional<Faculty> facultyOptional = facultyRepository.findById(facultyId);
//        System.out.println("Student Birth date :" + studentDto.getDob());

        Student student = new Student(studentDto);
        if(facultyOptional.isPresent()){
           if(facultyOptional.get().getRole()==1) {
               student.setFaculty(null);
           }
           else{
               student.setFaculty(facultyOptional.get());
               student.setGrade(facultyOptional.get().getGrade());
           }
        }
        studentRepository.saveAndFlush(student);
        response.add("User Added Successfully");
        return response;
    }


    @Override
    @Transactional
    public void assignFacultyToStudentByStudentId(int studentId, int facultyId){

        Optional<Student> studentOptional = studentRepository.findById(studentId);
        Optional<Faculty> facultyOptional = facultyRepository.findById(facultyId);
        if(studentOptional.isPresent() && facultyOptional.isPresent()) {
            if(studentOptional.get().getGrade() != facultyOptional.get().getGrade()){
                studentOptional.get().setGrade(facultyOptional.get().getGrade());
            }
            studentOptional.get().setFaculty(facultyOptional.get());
            studentRepository.saveAndFlush(studentOptional.get());
            facultyOptional.get().addStudent(studentOptional.get());
            facultyRepository.saveAndFlush(facultyOptional.get());

        }

    }

    // find all student by Faculty id
    @Override
    @Transactional
    public List<StudentDto> getAllStudentByFacultyId(int facultyId){
        Optional<Faculty> facultyOptional = facultyRepository.findById(facultyId);

        if(facultyOptional.isPresent()){
            if(facultyOptional.get().getRole() == 1){
                List<Student> studentList = studentRepository.findAll();
                if(!studentList.isEmpty()) {
                    return studentList.stream().map(student -> new StudentDto(student)).collect(Collectors.toList());
                }
            } else {
                List<Student> studentList = studentRepository.findAllByFacultyId(facultyOptional.get().getId());
                return studentList.stream().map(student -> new StudentDto(student)).collect(Collectors.toList());
            }
        }
        return Collections.emptyList();
    }
    //find students by grade

    @Override
    @Transactional
    public List<StudentDto> getStudentByGrade(String grade){
        List<Student> studentList = studentRepository.findByGradeIgnoreCase(grade);
        if(!studentList.isEmpty()){
            return studentList.stream().map(student -> new StudentDto(student)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    //Find Student by FirstName
    @Override
    @Transactional
    public List<StudentDto> getStudentByFirstName(String firstName){
        List<Student> studentList = studentRepository.findByFirstNameIgnoreCase(firstName);
        if(!studentList.isEmpty()){
            return studentList.stream().map(student -> new StudentDto(student)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    //Find Student By email
    @Override
    @Transactional
    public Optional<StudentDto> getStudentByEmail(String email){
        Optional<Student> studentOptional = studentRepository.findByEmailIgnoreCase(email);
        if(studentOptional.isPresent()){
            return Optional.of(new StudentDto(studentOptional.get()));
        }
        return  Optional.empty();
    }

    // delete Student  by Student ID

    @Override
    @Transactional
    public Optional<StudentDto> getStudentByStudentId(int studentId){
        Optional<Student> studentOptional = studentRepository.findById(studentId);
//        System.out.println("get Student ID : Bith date : "+ studentOptional.get().getDob();
        System.out.println("get Student ID : Bith date : "+ studentOptional.get().getDob());
        if(studentOptional.isPresent()){
            return Optional.of(new StudentDto(studentOptional.get()));
        }
        return  Optional.empty();
    }
    @Override
    @Transactional
    public void deleteStudentById(int studentId){
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        studentOptional.ifPresent(student -> studentRepository.delete(student));
    }

    // update Student record
    @Override
    @Transactional
    public void updateStudentById(StudentDto studentDto){
        Optional<Student> studentOptional = studentRepository.findById(studentDto.getId());

        studentOptional.ifPresent(student -> {
            student.setFirstName(studentDto.getFirstName());
            student.setLastName(studentDto.getLastName());
            student.setDob(studentDto.getDob());


             student.setGender(studentDto.getGender());
            student.setGrade(studentDto.getGrade());

            student.setAddress(studentDto.getAddress());
            student.setEmail(studentDto.getEmail());
            student.setPhoneNumber(studentDto.getPhoneNumber());
            studentRepository.saveAndFlush(student);
        });


    }

//    @Override
//    @Transactional
//    public void assignFacultyToStudentId(StudentDto studentDto){
//        Optional<Student> studentOptional = studentRepository.findById(studentDto.getId());
//
//        studentOptional.ifPresent(student -> {
//            student.setFirstName(studentDto.getFirstName());
//            student.setLastName(studentDto.getLastName());
//            student.setDob(studentDto.getDob());
//
//
//            student.setGender(studentDto.getGender());
//            student.setGrade(studentDto.getGrade());
//
//            student.setAddress(studentDto.getAddress());
//            student.setEmail(studentDto.getEmail());
//            student.setPhoneNumber(studentDto.getPhoneNumber());
//            studentRepository.saveAndFlush(student);
//        });
}
