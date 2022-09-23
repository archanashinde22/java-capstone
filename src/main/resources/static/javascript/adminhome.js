const facultyBaseUrl = "http://localhost:8080/api/v1/faculties";
const studentBaseUrl = "http://localhost:8080/api/v1/students";

const headers = {
  "Content-Type": "application/json",
};

let routerParameter;
//Cookie
const cookieArr = document.cookie.split("=");
const facultyId = cookieArr[1];

function handleLogout() {
  let c = document.cookie.split(";");
  for (let i in c) {
    document.cookie =
      /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const dataContainer = document.getElementById("data-container");
console.log("faculty id " + facultyId);

const submitForm = document.getElementById("form");
const addStudentBtn = document.getElementById("add_student");
const addFacultyBtn = document.getElementById("add_faculty");
const studentListBtn = document.getElementById("student_list");
const facultyListBtn = document.getElementById("faculty_list");

const formContainer = document.getElementById("form-container");
const formTitle = document.getElementById("form-title");
const usernameForm = document.getElementById("username-reg");
const passwordForm = document.getElementById("password-reg");
const roleForm = document.getElementById("role-reg");
const idForm = document.getElementById("id-reg");
let router;

// form input elements

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
async function getFacultyList() {
  await fetch(`${facultyBaseUrl}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => createFacultyTable(data))
    .catch((err) => console.error(err));
}

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
                    <button   class="change-btn" onclick="updateStudentById(${element.id})">Edit</button> /
                    <button   class="change-btn" onclick="deleteByStudentId(${element.id})">Delete</button>
                  </td>


          </tr>
    `;
    dataTable.innerHTML += trString;
  });
};

const createFacultyTable = (data) => {
  dataContainer.classList.remove("hide");
  const tableTitle = document.getElementById("add-title");
  tableTitle.textContent = "Faculty List";
  tableHeader.innerHTML = `         <tr>
                                                                          <th scope="col">ID</th>
                                                                          <th scope="col">First Name</th>
                                                                          <th scope="col">Last Name</th>
                                                                          <th scope="col">Gender</th>
                                                                          <th scope="col">Birthdate</th>
                                                                          <th scope="col">Email</th>
                                                                          <th scope="col">Phone Number</th>
                                                                          <th scope="col">Grade</th>
                                                                          <th scope="col">Username</th>
                                                                          <th scope="col">Role</th>
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
                                                                           <td>${element.username}</td>
                                                                           <td>${element.role}</td>
                                                                           <td>${element.address}</td>
                                                                            <td>
                                                                                           <button   class="change-btn" onclick="updateFacultyById(${element.id})">Edit</button> /
                                                                                           <button   class="change-btn" onclick="deleteByFacultyId(${element.id})">Delete</button>
                                                                             </td>
                                                              </tr>
                                                               `;
    dataTable.innerHTML += trString;
  });
};
async function deleteByStudentId(studentId) {
  await fetch(`${studentBaseUrl}/${studentId}`, {
    method: "DELETE",
    headers: headers,
  }).catch((err) => console.error(err));

  return getStudentList();
}
async function deleteByFacultyId(faculty) {
  await fetch(`${facultyBaseUrl}/${faculty}`, {
    method: "DELETE",
    headers: headers,
  }).catch((err) => console.error(err));

  return getFacultyList();
}
async function updateFacultyById(faculty) {
  router = "updateFacultyById";
  idForm.classList.remove("hide");
  usernameForm.classList.remove("hide");
  passwordForm.classList.remove("hide");
  roleForm.classList.remove("hide");
  formContainer.classList.remove("hide");
  routerParameter = faculty;
}
async function updateStudentById(studentId) {
  router = "updateStudentById";
  idForm.classList.remove("hide");
  usernameForm.classList.add("hide");
  passwordForm.classList.add("hide");
  roleForm.classList.add("hide");

  formContainer.classList.remove("hide");
  routerParameter = studentId;
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

  if (router === "addFaculty") {
    const gender = document.querySelector(`input[name=gender]:checked`);
    const role = document.querySelector(`input[name=role]:checked`);
    let bodyObj = {
      firstName: firstName.value,
      lastName: lastName.value,
      dob: dateOfBirth.value,
      gender: gender.value,
      phoneNumber: phone.value,
      grade: grade.value,
      address: address.value,
      username: username.value,
      password: password.value,
      role: role.value,
      email: email.value,
    };

    const response = await fetch(`${facultyBaseUrl}/register`, {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));

    const responseArr = await response.json();
    console.log("Add Faculty HandleSubmit" + responseArr);
    if (response.status === 200) {
      if (
        responseArr[0] === "User already exists with given email." ||
        responseArr[0] === "User already exists with given username."
      ) {
        alert(responseArr[0]);
      } else {
        return getFacultyList();
      }
    }
    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
    gender.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    username.value = "";
    password.value = "";
    role.value = "";
    email.value == "";
  } else if (router === "addStudent") {
    const gender = document.querySelector(`input[name=gender]:checked`);

    let bodyObj = {
      firstName: firstName.value,
      lastName: lastName.value,
      dob: dateOfBirth.value,
      gender: gender.value,
      phoneNumber: phone.value,
      grade: grade.value,
      address: address.value,
      email: email.value,
    };

    const response = await fetch(`${studentBaseUrl}/faculty/${facultyId}"`, {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));
    if (response.status === 200) {
      return getStudentList();
    }

    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
    gender.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    email.value == "";
  } else if (router === "updateStudentById") {
    const gender = document.querySelector(`input[name=gender]:checked`);
    id = routerParameter;
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

    const response = await fetch(`${studentBaseUrl}`, {
      method: "PUT",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));
    if (response.status === 200) {
      return getStudentList();
    }

    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
    gender.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    email.value == "";
  } else if (router === "updateFacultyById") {
    const gender = document.querySelector(`input[name=gender]:checked`);
    const role = document.querySelector(`input[name=role]:checked`);
    id = routerParameter;
    console.log("updateFacultyById : " + routerParameter);

    let bodyObj = {
      id: routerParameter,
      firstName: firstName.value,
      lastName: lastName.value,
      dob: dateOfBirth.value,
      gender: gender.value,
      phoneNumber: phone.value,
      grade: grade.value,
      address: address.value,
      username: username.value,
      password: password.value,
      role: role.value,
      email: email.value,
    };

    const response = await fetch(`${facultyBaseUrl}`, {
      method: "PUT",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));

    if (response.status === 200) {
      return getStudentList();
    }

    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
    gender.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    username.value = "";
    password.value = "";
    role.value = "";
    email.value == "";
  }
   formContainer.classList.add("hide");
};

addFacultyBtn.addEventListener("click", addFacultyRouter);
addStudentBtn.addEventListener("click", addStudentRouter);

facultyListBtn.addEventListener("click", getFacultyList);
studentListBtn.addEventListener("click", getStudentList);

submitForm.addEventListener("click", handleSubmit);
