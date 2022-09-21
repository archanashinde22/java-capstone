package com.archana.school.studentmanagement.services;

import com.archana.school.studentmanagement.dtos.StudentDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface StudentService {
    // add student  by Faculty ID
    @Transactional
    void addStudent(StudentDto studentDto, int facultyId);

    // findAll students
//    @Transactional
//    List<StudentDto> getAllStudents();

    @Transactional
    List<StudentDto> getStudentByGrade(String grade);

    @Transactional
    List<StudentDto> getAllStudentByFacultyId(int facultyId);

    //Find Student by FirstName
    @Transactional
    List<StudentDto> getStudentByFirstName(String firstName);

    //Find Student By email
    @Transactional
    Optional<StudentDto> getStudentByEmail(String email);

    @Transactional
    Optional<StudentDto> getStudentByStudentId(int studentId);

    @Transactional
    void deleteStudentById(int studentId);

    // update Student record
    @Transactional
    void updateStudentById(StudentDto studentDto);
}
