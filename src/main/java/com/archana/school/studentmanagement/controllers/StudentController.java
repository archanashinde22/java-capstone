package com.archana.school.studentmanagement.controllers;

import com.archana.school.studentmanagement.dtos.StudentDto;
import com.archana.school.studentmanagement.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/faculty/{facultyId}")
    public void addStudent(@RequestBody StudentDto studentDto , @PathVariable int facultyId){
        studentService.addStudent(studentDto,facultyId);
    }
    @DeleteMapping("/{studentId}")
    public void deleteStudentById(@PathVariable int studentId){
        studentService.deleteStudentById(studentId);
    }
    @GetMapping("/faculty/{facultyId}")
    public List<StudentDto> getAllStudentByFacultyId(@PathVariable int facultyId){
        return studentService.getAllStudentByFacultyId(facultyId);
    }
    @GetMapping("/email/{email}")
    public Optional<StudentDto> getStudentByEmail(@PathVariable String email){
       return studentService.getStudentByEmail(email);
    }
    @GetMapping("/firstname/{firstName}")
    public List<StudentDto> getStudentByFirstName(@PathVariable String firstName){
        return studentService.getStudentByFirstName(firstName);
    }
    @GetMapping("/grade/{grade}")
    public List<StudentDto> getStudentByGrade(@PathVariable String grade){
        return studentService.getStudentByGrade(grade);
    }

    @GetMapping("/{studentId}")
    public Optional<StudentDto> getStudentByStudentId(@PathVariable int studentId){
        return studentService.getStudentByStudentId(studentId);
    }
    @PutMapping
    public void updateStudentById(@RequestBody StudentDto studentDto){
        studentService.updateStudentById(studentDto);
    }
}
