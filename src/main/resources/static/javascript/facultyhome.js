const facultyBaseUrl = "http://localhost:8080/api/v1/faculties";
const studentBaseUrl = "http://localhost:8080/api/v1/students";

const headers = {
  "Content-Type": "application/json",
};

console.log(document.cookie)

//Cookie
const cookieArr = document.cookie.split("=");
const facultyId = cookieArr[1];

//let routerParameter;

console.log(document.cookie)

function handleLogout() {
  let c = document.cookie.split(";");
  console.log(c)
  for (let i in c) {
    document.cookie =
      /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      console.log(document.cookie)

  }
}

const dataContainer = document.getElementById("data-container");
console.log("faculty id " + facultyId);
const submitBtn = document.getElementById("submit-button")
const submitForm = document.getElementById("form");
const addStudentBtn = document.getElementById("add_student");
const addFacultyBtn = document.getElementById("add_faculty");
const studentListBtn = document.getElementById("student_list");
const facultyListBtn = document.getElementById("faculty_list");
const genderBtns = document.querySelectorAll(`input[name="gender"]`);
const formContainer = document.getElementById("form-container");
const formTitle = document.getElementById("form-title");
const usernameForm = document.getElementById("username-reg");
const passwordForm = document.getElementById("password-reg");
const roleForm = document.getElementById("role-reg");
const idForm = document.getElementById("id-reg");
let router;

// form input elements
const id = document.getElementById("id");
const username = document.getElementById("username");
const password = document.getElementById("password");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const dateOfBirth = document.getElementById("dateOfBirth");
const grade = document.getElementById("grade");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const email = document.getElementById("email");

const dataTable = document.getElementById("table-body");
const tableHeader = document.getElementById("table-header");


const populateEditForm = (data) => {

    const gender = document.querySelector(`input[name=gender]`);

    id.value = data.id;
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    dateOfBirth.value = data.dob;
    grade.value = data.grade;
    console.log(data.gender)
    gender.value = data.gender;
    phone.value = data.phoneNumber;
    address.value = data.address;
    email.value = data.email;

}


async function getStudentList() {
  console.log("faculty id :" + facultyId);

  await fetch(`${studentBaseUrl}/faculty/${facultyId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => createStudentTable(data))
    .catch((err) => console.error(err));
}
//async function getFacultyList() {
//  await fetch(`${facultyBaseUrl}`, {
//    method: "GET",
//    headers: headers,
//  })
//    .then((response) => response.json())
//    .then((data) => createFacultyTable(data))
//    .catch((err) => console.error(err));
//}

const createStudentTable = (data) => {
    console.log(data)
  dataContainer.classList.remove("hide");
  const tableTitle = document.getElementById("add-title");
  tableTitle.textContent = "Student List";
  tableHeader.innerHTML = `  <tr>
                                         <th scope="col">ID</th>
                                         <th scope="col">First Name</th>
                                         <th scope="col">Last Name</th>
                                         <th scope="col">Gender</th>
                                         <th scope="col">Birthdate</th>
                                         <th scope="col">Email</th>
                                         <th scope="col">Phone Number</th>
                                         <th scope="col">Grade</th>
                                         <th scope="col">Address</th>
                                         <th scope="col">Action</th>


                                     </tr>`;
  dataTable.innerHTML = "";
  data.forEach((element) => {
    const trString = ` <tr>
                <td>${element.id}</td>
                <td>${element.firstName}</td>
                <td>${element.lastName}</td>
                <td>${element.gender}</td>

                 <td>${element.dob}</td>
                <td>${element.email}</td>
                <td>${element.phoneNumber}</td>
                <td>${element.grade}</td>
                <td>${element.address}</td>
                 <td>
                    <button   class="change-btn" onclick="updateStudentById(${element.id})">Edit</button>
                  </td>


          </tr>
    `;
    dataTable.innerHTML += trString;
  });
};
//
//const createFacultyTable = (data) => {
//  dataContainer.classList.remove("hide");
//  const tableTitle = document.getElementById("add-title");
//  tableTitle.textContent = "Faculty List";
//  tableHeader.innerHTML = `         <tr>
//                                                                          <th scope="col">ID</th>
//                                                                          <th scope="col">First Name</th>
//                                                                          <th scope="col">Last Name</th>
//                                                                          <th scope="col">Gender</th>
//                                                                          <th scope="col">Birthdate</th>
//                                                                          <th scope="col">Email</th>
//                                                                          <th scope="col">Phone Number</th>
//                                                                          <th scope="col">Grade</th>
//                                                                          <th scope="col">Username</th>
//                                                                          <th scope="col">Role</th>
//                                                                          <th scope="col">Address</th>
//                                                                          <th scope="col">Action</th>
//                                                               </tr>`;
//  dataTable.innerHTML = "";
//  data.forEach((element) => {
//    const trString = ` <tr>
//                                                                           <td>${element.id}</td>
//                                                                           <td>${element.firstName}</td>
//                                                                           <td>${element.lastName}</td>
//                                                                           <td>${element.gender}</td>
//                                                                           <td>${element.dob}</td>
//                                                                           <td>${element.email}</td>
//                                                                           <td>${element.phoneNumber}</td>
//                                                                           <td>${element.grade}</td>
//                                                                           <td>${element.username}</td>
//                                                                           <td>${element.role}</td>
//                                                                           <td>${element.address}</td>
//                                                                            <td>
//                                                                                           <button   class="change-btn" onclick="updateFacultyById(${element.id})">Edit</button> /
//                                                                                           <button   class="change-btn" onclick="deleteByFacultyId(${element.id})">Delete</button>
//                                                                             </td>
//                                                              </tr>
//                                                               `;
//    dataTable.innerHTML += trString;
//  });
//};


async function getStudentByStudentId(studentId){
console.log("getStudentByStudentId")
      await fetch(`${studentBaseUrl}/${studentId}`, {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => populateEditForm(data))
            .catch(err => console.error(err))

}

//async function getFacultyByFacultyId(faculty){
//console.log("getFacultyByFacultyId")
//      await fetch(`${facultyBaseUrl}/${faculty}`, {
//            method: "GET",
//            headers: headers
//        })
//            .then(response => response.json())
//            .then(data => populateEditForm(data))
//            .catch(err => console.error(err))
//
//}
//async function deleteByStudentId(studentId) {
//  await fetch(`${studentBaseUrl}/${studentId}`, {
//    method: "DELETE",
//    headers: headers,
//  }).catch((err) => console.error(err));
//
//  return getStudentList();
//}
//async function deleteByFacultyId(faculty) {
//  await fetch(`${facultyBaseUrl}/${faculty}`, {
//    method: "DELETE",
//    headers: headers,
//  }).catch((err) => console.error(err));
//
//  return getFacultyList();
//}
//async function updateFacultyById(faculty) {
//  router = "updateFacultyById";
//  idForm.classList.remove("hide");
//  usernameForm.classList.remove("hide");
//  passwordForm.classList.add("hide");
//  roleForm.classList.remove("hide");
//  formContainer.classList.remove("hide");
//  routerParameter = faculty;
//  getFacultyByFacultyId(routerParameter)
//
//}
async function updateStudentById(studentId) {
  router = "updateStudentById";
  idForm.classList.remove("hide");
  usernameForm.classList.add("hide");
  passwordForm.classList.add("hide");
  roleForm.classList.add("hide");

  formContainer.classList.remove("hide");
  routerParameter = studentId;
  getStudentByStudentId(routerParameter);

}



async function addStudentRouter() {
  router = "addStudent";
  idForm.classList.add("hide");
  usernameForm.classList.add("hide");
  passwordForm.classList.add("hide");
  roleForm.classList.add("hide");
  formContainer.classList.remove("hide");
}

async function addFacultyRouter() {
  router = "addFaculty";
  idForm.classList.add("hide");
  usernameForm.classList.remove("hide");
  passwordForm.classList.remove("hide");
  roleForm.classList.remove("hide");
  formContainer.classList.remove("hide");
}
const handleSubmit = async (e) => {
  e.preventDefault();
  formContainer.classList.add("hide");
//      let genderSelected;
//                   for (const btn of genderBtns) {
//                       if (btn.checked) {
//                           genderSelected = btn.value;
//                           break;
//                       }
//                   }
//  if (router === "addFaculty") {
//    const gender = document.querySelector(`input[name=gender]:checked`);
//    const role = document.querySelector(`input[name=role]:checked`);
//    console.log("add faculty")
//    console.log(gender.value)
//    console.log(role.value)
//    let bodyObj = {
//      firstName: firstName.value,
//      lastName: lastName.value,
//      dob: dateOfBirth.value,
//      gender: gender.value,
//      phoneNumber: phone.value,
//      grade: grade.value,
//      address: address.value,
//      username: username.value,
//      password: password.value,
//      role: role.value,
//      email: email.value,
//    };
//
//        firstName.value = "";
//        lastName.value = "";
//        dateOfBirth.value = "";
//    //    gender.value = "";
//        phone.value = "";
//        grade.value = "";
//        address.value = "";
//        username.value = "";
//        password.value = "";
//    //    role.value = "";
//        email.value = "";
//
//    const response = await fetch(`${facultyBaseUrl}/register`, {
//      method: "POST",
//      body: JSON.stringify(bodyObj),
//      headers: headers,
//    }).catch((err) => console.error(err.message));
//
//    const responseArr = await response.json();
//    console.log("Add Faculty HandleSubmit" + responseArr);
//    if (response.status === 200) {
//      if (
//        responseArr[0] === "User already exists with given email." ||
//        responseArr[0] === "User already exists with given username."
//      ) {
//        alert(responseArr[0]);
//      } else {
//        return getFacultyList();
//      }
//    }
//
//  } else if (router === "addStudent") {
//
//    const gender = document.querySelector(`input[name="gender"]:checked`);
////    console.log(genderSelected);
////    console.log("Add Student gender :" + gender.value)
////    if(gender.value === null ){
////        gender.value="Male"
////    }
//    let bodyObj = {
//      firstName: firstName.value,
//      lastName: lastName.value,
//      dob: dateOfBirth.value,
////      gender: genderSelected,
//        gender:gender.value,
//      phoneNumber: phone.value,
//      grade: grade.value,
//      address: address.value,
//      email: email.value,
//    };
//    firstName.value = "";
//    lastName.value = "";
//    dateOfBirth.value = "";
////    genderBtns.forEach(btn =>btn.checked=false)
////    genderBtns.forEach.value = "";
////      gender.checked=false;
//    phone.value = "";
//    grade.value = "";
//    address.value = "";
//    email.value = "";
//
//    const response = await fetch(`${studentBaseUrl}/faculty/${facultyId}`, {
//      method: "POST",
//      body: JSON.stringify(bodyObj),
//      headers: headers,
//    }).catch((err) => console.error(err.message));
//
//    const responseArr = await response.json();
//    if (response.status === 200) {
//        if (
//                responseArr[0] === "Student already exists with given email."
//          ) {
//                alert(responseArr[0]);
//          } else {
//                return getStudentList();
//          }
//      }
//

//  } else if (router === "updateStudentById") {
    console.log("update Student")
    formContainer.classList.add("hide");
    const gender = document.querySelector(`input[name=gender]:checked`);

    console.log(gender.value);
    //id = routerParameter;
    console.log("updateStudentById : " + routerParameter);

    let bodyObj = {
      id: routerParameter,
      firstName: firstName.value,
      lastName: lastName.value,
      dob: dateOfBirth.value,
      gender: gender.value,
      phoneNumber: phone.value,
      grade: grade.value,
      address: address.value,
      email: email.value,
    };


    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
//    gender.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    email.value == "";

    const response = await fetch(`${studentBaseUrl}`, {
      method: "PUT",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));
    if (response.status === 200) {
        return getStudentList();

    }

//  } else if (router === "updateFacultyById") {
//
//    console.log("update faculty")
//    const gender = document.querySelector(`input[name=gender]:checked`);
//    const role = document.querySelector(`input[name=role]:checked`);
//   // id = routerParameter;
//    console.log("updateFacultyById : " + routerParameter);
//
//    let bodyObj = {
//      id: routerParameter,
//      firstName: firstName.value,
//      lastName: lastName.value,
//      dob: dateOfBirth.value,
//      gender: gender.value,
//      phoneNumber: phone.value,
//      grade: grade.value,
//      address: address.value,
//      username: username.value,
//      password: password.value,
//      role: role.value,
//      email: email.value,
//    };
//
//    firstName.value = "";
//    lastName.value = "";
//    dateOfBirth.value = "";
////    gender.value = "";
//    phone.value = "";
//    grade.value = "";
//    address.value = "";
//    username.value = "";
//    password.value = "";
////    role.value = "";
//    email.value == "";
//
//    const response = await fetch(`${facultyBaseUrl}`, {
//      method: "PUT",
//      body: JSON.stringify(bodyObj),
//      headers: headers,
//    }).catch((err) => console.error(err.message));
//
//    if (response.status === 200) {
//      return getFacultyList();
//    }
//
//
//  }

};

//addFacultyBtn.addEventListener("click", addFacultyRouter);
//addStudentBtn.addEventListener("click", addStudentRouter);

//facultyListBtn.addEventListener("click", getFacultyList);
//studentListBtn.addEventListener("click", getStudentList);

submitBtn.addEventListener("click", handleSubmit);
getStudentList();