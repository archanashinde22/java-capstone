package com.archana.school.studentmanagement.services;

import com.archana.school.studentmanagement.dtos.FacultyDto;
import com.archana.school.studentmanagement.entities.Faculty;
import com.archana.school.studentmanagement.exception.EntityNotFoundException;
import com.archana.school.studentmanagement.repositories.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


     @Override
     @Transactional
    public List<String> addFaculty(FacultyDto facultyDto){
         Optional<Faculty> savedFacultyByEmail = facultyRepository.findByEmailIgnoreCase(facultyDto.getEmail());
         Optional<Faculty> savedFacultyByUsername = facultyRepository.findByUsername(facultyDto.getUsername());
         if(savedFacultyByEmail.isPresent()){
             throw new EntityNotFoundException("Faculty already exists with given email: "+ facultyDto.getEmail());
         } else if(savedFacultyByUsername.isPresent()) {
             throw new EntityNotFoundException("Faculty already exists with given username: "+ facultyDto.getUsername());
         }
        List<String> response = new ArrayList<>();
        Faculty faculty = new Faculty(facultyDto);
        facultyRepository.saveAndFlush(faculty);
        response.add("User Added Successfully");
//        response.add("http://localhost:8080/login.html");
        return  response;
    }

    // change Password
    @Override
    @Transactional
    public void changePassword(int facultyId, String passwordHash){
        Optional<Faculty> facultyOptional = facultyRepository.findById(facultyId);
        facultyOptional.ifPresent(faculty-> {
            faculty.setPassword(passwordHash);
            facultyRepository.saveAndFlush(faculty);
        });
    }

    //Faculty login
    @Override
    @Transactional
    public List<String> facultyLogin(FacultyDto facultyDto){
        List<String> response = new ArrayList<>();
        Optional<Faculty> facultyOptional = facultyRepository.findByUsername(facultyDto.getUsername());
        if(facultyOptional.isPresent()){
            if(passwordEncoder.matches(facultyDto.getPassword(),facultyOptional.get().getPassword())){
                System.out.println("password and username correct");
                response.add("http://localhost:8080/home.html");
                response.add(String.valueOf(facultyOptional.get().getId()));
            } else {
                response.add("Username or password incorrect");
            }
        } else {
            response.add("Username or password incorrect");
        }
        return response;

    }

// Only Admin i.e. Role ==1 can see all faculties else will see only there information
    @Override
    @Transactional
    public List<FacultyDto> findAllFaculty() {
                 List<Faculty> facultyList = facultyRepository.findAll();
                 if(!facultyList.isEmpty()) {
                     return facultyList.stream().map(faculty -> new FacultyDto(faculty)).collect(Collectors.toList());
                 }
                 return Collections.emptyList();
    }

     // update faculty by Id
    @Override
    @Transactional
    public void updateFacultyById(FacultyDto facultyDto){
        Optional<Faculty> facultyOptional = facultyRepository.findById(facultyDto.getId());
        facultyOptional.ifPresent(faculty-> {
            faculty.setFirstName(facultyDto.getFirstName());
            faculty.setLastName(facultyDto.getLastName());
            faculty.setDob(facultyDto.getDob());
            faculty.setEmail(facultyDto.getEmail());
            faculty.setGrade(facultyDto.getGrade());
            faculty.setGender(facultyDto.getGender());
            faculty.setRole(facultyDto.getRole());
            faculty.setPhoneNumber(facultyDto.getPhoneNumber());
            facultyRepository.saveAndFlush(faculty);
        });
    }

  // delete Faculty by faculty Id

    @Override
    @Transactional
    public void deleteFacultyById(int facultyId){
        Optional<Faculty> facultyOptional = facultyRepository.findById(facultyId);
        facultyOptional.ifPresent(faculty-> facultyRepository.delete(faculty));
    }


    //Find Faculty by FirstName
    @Override
    @Transactional
    public Optional<FacultyDto> getFacultyByFirstName(String firstName){
        Optional<Faculty> facultyOptional = facultyRepository.findByFirstNameIgnoreCase(firstName);
        if(facultyOptional.isPresent()){
            return Optional.of(new FacultyDto(facultyOptional.get()));
        }
        return  Optional.empty();
    }

    //Find Faculty By email
    @Override
    @Transactional
    public Optional<FacultyDto> getFacultyByEmail(String email){
        Optional<Faculty> facultyOptional = facultyRepository.findByEmailIgnoreCase(email);
        if(facultyOptional.isPresent()){
            return Optional.of(new FacultyDto(facultyOptional.get()));
        }
        return  Optional.empty();
    }

}

