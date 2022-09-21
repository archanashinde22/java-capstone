package com.archana.school.studentmanagement.repositories;

import com.archana.school.studentmanagement.entities.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Integer> {


    Optional<Faculty> findByUsername(String username);
    Optional<Faculty> findByFirstNameIgnoreCase(String firstName);
    Optional<Faculty> findByEmailIgnoreCase(String email);

}
