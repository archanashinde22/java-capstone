package com.archana.school.studentmanagement.repositories;

import com.archana.school.studentmanagement.entities.Faculty;
import com.archana.school.studentmanagement.entities.Student;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class StudentRepositoryTests {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private FacultyRepository facultyRepository;

    @Test
    public void givenFacultyStudentObject_whenSave_thenReturnSavedFaculty() throws ParseException {
        //given - precondition - setup
//        String dateString = "1985-09-19";
        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-DD");
//        Date date = format.parse(dateString);
//
        Faculty faculty =  Faculty.builder()
                .firstName("h1")
                .lastName("jo")
                .email("h1@gmail.com")
                .grade("Second")
                .role(2)
                .gender("female")
                .phoneNumber("554612313")
                .dob(format.parse("1970-05-26"))
                .username("h1j").build();


        Student student = Student.builder()
                .firstName("h2").lastName("j2").dob(format.parse("1985-02-04")).gender("female").phoneNumber("7852121323").grade("First")
                .email("h2j@gmail.com").address("Detroit MI").build();
         faculty.addStudent(student);

        //when - Action or behaviour that we are going to Test
        Faculty savedFaculty = facultyRepository.save(faculty);
       //then  - verify the Output
        assertThat(savedFaculty).isNotNull();
        assertThat(savedFaculty.getId()).isGreaterThan(0);
    }


    @Test
    public void givenStudentObject_whenSave_thenReturnSavedStudent() throws ParseException {
        //given - precondition - setup
//        String dateString = "1985-09-19";
        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-DD");
//        Date date = format.parse(dateString);
//        Set<Student> studentSet = new HashSet<>();
        Faculty faculty =  Faculty.builder()
                .firstName("")
                .lastName("Frank")
                .email("RobertFrank@gmail.com")
                .grade("First")
                .role(1)
                .gender("male")
                .phoneNumber("1235455654")
                .dob(format.parse("1970-05-26"))
                .username("frankrob").build();
        Faculty savedFaculty = facultyRepository.save(faculty);

        Student student = Student.builder()
                .firstName("Carl").lastName("Eric").dob(format.parse("1985-02-04")).gender("female").phoneNumber("1234667890").grade("First")
                .email("carl@gmail.com").address("Detroit MI").faculty(savedFaculty).build();


        //when - Action or behaviour that we are going to Test

        Student savedStudent = studentRepository.saveAndFlush(student);

        //then  - verify the Output
        assertThat(savedStudent).isNotNull();
        assertThat(savedStudent.getId()).isGreaterThan(0);
    }
    //given - precondition - setup
    //when - Action or behaviour that we are going to Test
    //then  - verify the Output

    // Junit test for get all students operations

    // Junit test for get all Faculty


    @Test
    public void givenFacultyList_whenFindAll_thenFacultyList() throws ParseException {
        //given - precondition - setup




        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-DD");
//
////
        Faculty faculty =  Faculty.builder()
                .firstName("a1")
                .lastName("jo1")
                .email("a1j@gmail.com")
                .grade("Second")
                .role(2)
                .gender("female")
                .phoneNumber("55465512313")
                .dob(format.parse("1970-05-26"))
                .username("a1j").build();

        Faculty faculty1 =  Faculty.builder()
                .firstName("a2")
                .lastName("jo2")
                .email("a2j@gmail.com")
                .grade("Second")
                .role(2)
                .gender("female")
                .phoneNumber("554612313")
                .dob(format.parse("1970-05-26"))
                .username("a2j").build();

        facultyRepository.save(faculty);
        facultyRepository.save(faculty1);

        //when - Action or behaviour that we are going to Test
        List<Faculty> facultyList = facultyRepository.findAll();
        //then  - verify the Output

        assertThat(facultyList).isNotNull();
        assertThat(facultyList.size()).isEqualTo(14);
    }
        @Test
        public void givenFacultyObject_whenFindById_thenReturnEmplyeeObject() throws ParseException {
                //given - precondition - setup
            SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-DD");
            Faculty faculty =  Faculty.builder()
                    .firstName("a3")
                    .lastName("jo3")
                    .email("aj3@gmail.com")
                    .grade("Second")
                    .role(2)
                    .gender("female")
                    .phoneNumber("55465512313")
                    .dob(format.parse("1970-05-26"))
                    .username("aj3").build();

            Student student = Student.builder()
                    .firstName("s3").lastName("k3").dob(format.parse("1985-02-04"))
                    .gender("female").phoneNumber("7852121323").grade("First")
                    .email("sk3@gmail.com").address("Detroit MI").build();
            faculty.addStudent(student);
            facultyRepository.save(faculty);

                //when - Action or behaviour that we are going to Test
            Optional<Faculty> facultydb = facultyRepository.findById(faculty.getId());
            List<Student> studentList = studentRepository.findAllByFacultyEquals(faculty);
                //then  - verify the Output
            assertThat(facultydb).isNotNull();
            assertThat(studentList).isNotNull();
            assertThat(studentList.size()).isEqualTo(1);
        }
    @Test
    public void givenStudentObject_whenDelete_thenRemoveStudent() throws ParseException {
        //given - precondition - setup
        SimpleDateFormat format = new SimpleDateFormat("YYYY-MM-DD");
        Optional<Student> studentOptional = studentRepository.findById(11);
        //when - Action or behaviour that we are going to Test
        studentRepository.deleteById(studentOptional.get().getId());

        Optional<Student> student = studentRepository.findById(11);

        //then  - verify the Output
        assertThat(student).isEmpty();
    }

    @Test
    public void givenFacultyObject_whenFindByFirstName_thenReturnEmplyeeObject() throws ParseException {
        //given - precondition - setup
        List<Faculty> facultydb = facultyRepository.findByFirstNameIgnoreCase("admin");
        facultydb.get(0).getFirstName();

        //then  - verify the Output

        assertThat(facultydb.size()).isEqualTo(2);
        assertThat(facultydb.get(0).getFirstName()).isEqualTo("Admin");
    }
}
