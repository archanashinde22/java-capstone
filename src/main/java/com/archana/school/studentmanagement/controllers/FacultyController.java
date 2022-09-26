package com.archana.school.studentmanagement.controllers;

import com.archana.school.studentmanagement.dtos.FacultyDto;
import com.archana.school.studentmanagement.services.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/faculties")
public class FacultyController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private FacultyService facultyService;

    @PostMapping("/register")
    public List<String> addFaculty(@RequestBody FacultyDto facultyDto){
        String passHash = passwordEncoder.encode(facultyDto.getPassword());
        facultyDto.setPassword(passHash);
        return facultyService.addFaculty(facultyDto);
    }

    @PostMapping("/login")
    public List<String> facultyLogin(@RequestBody FacultyDto facultyDto){
        return facultyService.facultyLogin(facultyDto);
    }
    @PutMapping("/{facultyId}/{password}")
    public void changePassword(@PathVariable int facultyId , @PathVariable String password){
        String passHash = passwordEncoder.encode(password);
        facultyService.changePassword(facultyId,passHash);
    }

    @DeleteMapping("/{facultyId}")
    public void deleteFacultyById(@PathVariable int facultyId){
        facultyService.deleteFacultyById(facultyId);
    }
    @GetMapping
    public List<FacultyDto> findAllFaculty(){
        return facultyService.findAllFaculty();
    }
    @GetMapping("/email/{email}")
    public Optional<FacultyDto> getFacultyByEmail(@PathVariable String email){
        return facultyService.getFacultyByEmail(email);

    }
//    @GetMapping("/{firstName}")
    @GetMapping("/firstname/{firstName}")
    public List<FacultyDto> getFacultyByFirstName(@PathVariable String firstName){
        return facultyService.getFacultyByFirstName(firstName);
    }

    @GetMapping("/grade/{grade}")
    public List<FacultyDto> getFacultyByGrade(@PathVariable String grade){
        return facultyService.getFacultyByGrade(grade);
    }
    @GetMapping("/{facultyId}")
    public Optional<FacultyDto> getFacultyByFacultyId(@PathVariable int facultyId){
        return facultyService.getFacultyById(facultyId);
    }

    @PutMapping
    public void updateFacultyById(@RequestBody FacultyDto facultyDto){
        facultyService.updateFacultyById(facultyDto);
    }


}
