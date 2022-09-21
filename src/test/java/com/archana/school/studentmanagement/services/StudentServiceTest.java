package com.archana.school.studentmanagement.services;

import com.archana.school.studentmanagement.repositories.StudentRepository;
import com.archana.school.studentmanagement.services.StudentService;
import com.archana.school.studentmanagement.services.StudentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {
    private StudentRepository studentRepository;

    private StudentService studentService;

    @BeforeEach
    public void setup(){
        studentRepository = Mockito.mock(StudentRepository.class);  // mock the StudentRepository class
        studentService = new StudentServiceImpl();
    }

}
