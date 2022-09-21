package com.archana.school.studentmanagement.repositories;

import com.archana.school.studentmanagement.entities.Faculty;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class FacultyRepositoryTests {
 @Autowired
 private FacultyRepository facultyRepository;
@Autowired
private StudentRepository studentRepository;

 @Test
 public void givenFacultyObject_whenupdated_thenReturnUpdatedFaculty() throws ParseException {
  //given - precondition - setup
    //when - Action or behaviour that we are going to Test
  Optional<Faculty> facultydb = facultyRepository.findById(15);
  facultydb.get().setFirstName("a4");
  facultydb.get().setEmail("a4j@devmountain.com");
  Faculty updatedFaculty = facultyRepository.save(facultydb.get());
  //then  - verify the Output
  assertThat(updatedFaculty.getEmail()).isEqualTo("a4j@devmountain.com");
  assertThat(updatedFaculty.getFirstName()).isEqualTo("a4");
 }

// @Test
// public void givenFacultyObject_whenDelete_thenRemoveFaculty() throws ParseException {
//  //given - precondition - setup
//  SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-DD");
//  Optional<Faculty> facultydb = facultyRepository.findById(15);
//  //when - Action or behaviour that we are going to Test
//  facultyRepository.deleteById(facultydb.get().getId());
//
//  Optional<Faculty> facultyOptional = facultyRepository.findById(15);
//
//  //then  - verify the Output
//  assertThat(facultyOptional).isEmpty();
// }
}
