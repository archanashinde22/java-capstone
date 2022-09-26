package com.archana.school.studentmanagement.repositories;

import com.archana.school.studentmanagement.entities.Faculty;
import com.archana.school.studentmanagement.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    List<Student> findAllByFacultyEquals(Faculty faculty);

//    @Query("SELECT * FROM students s WHERE s.first_name ")
    List<Student> findByFirstNameIgnoreCase(String firstName);


    Optional<Student> findByEmailIgnoreCase(String email);

    List<Student> findByGradeIgnoreCase(String grade);

    List<Student> findAllByFacultyId(int facultyId);



}
