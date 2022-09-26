package com.archana.school.studentmanagement.services;

import com.archana.school.studentmanagement.dtos.FacultyDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface FacultyService {
    @Transactional
    List<String> addFaculty(FacultyDto facultyDto);

    // change Password
    @Transactional
    void changePassword(int facultyId, String passwordHash);

    //Faculty login
    @Transactional
    List<String> facultyLogin(FacultyDto facultyDto);

    // Only Admin i.e. Role ==1 can see all faculties else will see only there information
    @Transactional
    List<FacultyDto> findAllFaculty();

    // delete faculty by Id
    @Transactional
    void updateFacultyById(FacultyDto facultyDto);

    @Transactional
    void deleteFacultyById(int facultyId);

    //Find Faculty by FirstName
    @Transactional
    List<FacultyDto> getFacultyByFirstName(String firstName);

    //Find Faculty By email
    @Transactional
    Optional<FacultyDto> getFacultyByEmail(String email);

    @Transactional
    List<FacultyDto> getFacultyByGrade(String grade);

    @Transactional
    Optional<FacultyDto> getFacultyById(int facultyId);
}
