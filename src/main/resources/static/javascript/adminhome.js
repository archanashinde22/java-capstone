const facultyBaseUrl = "http://localhost:8080/api/v1/faculties";
const studentBaseUrl = "http://localhost:8080/api/v1/students";

const headers = {
  "Content-Type": "application/json",
};

console.log(document.cookie)

//Cookie
const cookieArr = document.cookie.split("=");
const facultyId = cookieArr[1];

let routerParameter;

//console.log(document.cookie)

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
const cancelBtn = document.getElementById("cancel-button")
const submitForm = document.getElementById("form");
const addStudentBtn = document.getElementById("add_student");
const addFacultyBtn = document.getElementById("add_faculty");
const studentListBtn = document.getElementById("student_list");
const facultyListBtn = document.getElementById("faculty_list");


let router;

// form input elements

const formContainer = document.getElementById("form-container");
const formTitle = document.getElementById("form-title");
const usernameForm = document.getElementById("username-reg");
const passwordForm = document.getElementById("password-reg");
const roleForm = document.getElementById("role-reg");
const idForm = document.getElementById("id-reg");
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
const genderBtns = document.querySelectorAll(`input[name="gender"]`);
const roleBtns = document.querySelectorAll(`input[name="role"]`);

//search form elements
//
const searchBtn = document.getElementById("search-button");
const firstNameSearch =  document.getElementById("firstname-search");

// assign faculty to student form Element
const assignFacultyContainer = document.getElementById("assign-faculty-container");
const assignFacultySelect = document.getElementById("assigned-faculty");
const assignFacultyBtn = document.getElementById("Student-faculty-assign-button");
const studentIdP = document.getElementById("studentId")



const populateEditForm = (data) => {

    let dateDB = data.dob.substring(0,10)


    genderBtns.forEach(genderBtn => {
        console.log(genderBtn);
        if(genderBtn.value === data.gender) {
            console.log(genderBtn);

           genderBtn.checked=true;
           console.log(genderBtn.value);

          }
         else{
           genderBtn.checked=false;
         }
     })
     const gender = document.querySelector(`input[name="gender"]:checked`);
     console.log(gender);
     console.log(gender.value);

    id.value = data.id;
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    dateOfBirth.value = dateDB;
    console.log(dateOfBirth.value)
    phone.value = data.phoneNumber;
    address.value = data.address;
    email.value = data.email;
    grade.value = data.grade;
    gender.value = data.gender;
if(router === "updateFacultyById"){
                console.log("username : " +data.username)
                console.log("role  : " + data.role)

              username.value = data.username;

            roleBtns.forEach(roleBtn => {
            if(+(roleBtn.value) === +data.role) {
            console.log(" ROle button inside checked : " + roleBtn)
               roleBtn.checked=true;
             }
             else{
               roleBtn.checked=false;
             }
            })
            const role = document.querySelector(`input[name="role"]:checked`);
                 console.log()
                     console.log(`role button checked ${role}`)
             role.value = data.role;


         }
document.getElementById("message").innerHTML=""
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

const searchByFirstName = async () =>{

    const firstName = firstNameSearch.value;

    const tableTitle = document.getElementById("add-title");

    if(tableTitle.innerText === "Student List" && firstName != null){

        console.log(`${studentBaseUrl}/firstname/${firstName}`)
        await fetch(`${studentBaseUrl}/firstname/${firstName}`, {
        method: "GET",
        headers: headers,
        })
        .then((response) => response.json())
        .then((data) => createStudentTable(data))
        .catch((err) => console.error(err));
        } else if(tableTitle.innerText === "Faculty List" && firstName != null){
//         console.log(`${facultyBaseUrl}/firstname/${firstName}`)

           await fetch(`${facultyBaseUrl}/firstname/${firstName}`, {
                 method: "GET",
                 headers: headers,
                 })
                 .then((response) => response.json())
                 .then((data) => createFacultyTable(data))
                 .catch((err) => console.error(err));
}

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
//    console.log(data)
//data.sort();
  dataContainer.classList.remove("hide");
  const tableTitle = document.getElementById("add-title");
  tableTitle.textContent = "Student List";

//  <th scope="col">Faculty Name</th>
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
//<td>${birthdate}</td>
//    let birthdate = formatDate(new Date(element.dob));

    const trString = ` <tr>
                <td>${element.id}</td>
                <td>${element.firstName}</td>
                <td>${element.lastName}</td>
                <td>${element.gender}</td>
                <td>${new Date(element.dob).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                <td>${element.email}</td>
                <td>${element.phoneNumber}</td>
                <td>${element.grade}</td>
                <td>${element.address}</td>
                 <td>
                  <button   class="change-btn btn btn-secondary" onclick="assignFaculty(${element.id},'${element.grade}')">Assign Faculty</button>
                    <button   class="change-btn btn btn-secondary" onclick="updateStudentById(${element.id})">Edit</button>
                    <button   class="change-btn btn btn-secondary" onclick="deleteByStudentId(${element.id})">Delete</button>

                  </td>

          </tr>
    `;
    dataTable.innerHTML += trString;
  });
};

const createFacultyTable = (data) => {
//    console.log(data)

// data.sort();
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
//   let dateOfBirth = formatDate(new Date(element.dob));
    const trString = ` <tr>
                                                                           <td>${element.id}</td>
                                                                           <td>${element.firstName}</td>
                                                                           <td>${element.lastName}</td>
                                                                           <td>${element.gender}</td>
                                                                           <td>${new Date(element.dob).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                                                           <td>${element.email}</td>
                                                                           <td>${element.phoneNumber}</td>
                                                                           <td>${element.grade}</td>
                                                                           <td>${element.username}</td>
                                                                           <td>${element.role}</td>
                                                                           <td>${element.address}</td>
                                                                            <td>
                                                                                           <button   class="change-btn btn btn-secondary"  onclick="updateFacultyById(${element.id})">Edit</button> /
                                                                                           <button   class="change-btn btn btn-secondary"  onclick="deleteByFacultyId(${element.id})">Delete</button>
                                                                             </td>
                                                              </tr>
                                                               `;
    dataTable.innerHTML += trString;
  });
};

const assignFaculty = async (studentId,studentGrade) =>{

    console.log("assignFaculty : " + studentId + " :::: " +studentGrade )

    assignFacultyContainer.classList.remove("hide");


    getFacultyByGrade(studentId, studentGrade);
}

const getFacultyByGrade = async(studentId,studentGrade) => {
console.log("getFacultyByGrade : " + studentId + " :::: " +studentGrade )
    await fetch(`${facultyBaseUrl}/grade/${studentGrade}`, {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => populateSelectOptions(data ,studentId))
            .catch(err => console.error(err))

}
const populateSelectOptions = (data ,studentId) => {


assignFacultySelect.innerHTML = "";
console.log(studentId)
console.log("populateSelectOptions : " + studentId  )

studentIdP.innerText = studentId;
console.log(studentIdP.innerText)
//const assignFacultyContainer = document.getElementById("assign-faculty-container");
//const assignFacultySelect = document.getElementById("assigned-faculty");
//const assignFacultyBtn = document.getElementById("student-faculty-assign-button");
data.forEach( faculty => {
const opt = document.createElement('option');
opt.value = faculty.id;
opt.innerHTML = `${faculty.id} : ${faculty.firstName}  ${faculty.lastName}`;
assignFacultySelect.appendChild(opt);
})
}

const assignFacultyToStudent = async (e) => {
e.preventDefault();
assignFacultyContainer.classList.add("hide");
let studentIdParam = studentIdP.innerText;
const facultySelectedId = assignFacultySelect.options[assignFacultySelect.selectedIndex].value;


  const response = await fetch(`${studentBaseUrl}/${studentIdParam}/${facultySelectedId}`, {
      method: "PUT",
//      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));
    if (response.status === 200) {
        return getStudentList();

    }
}
async function getStudentByStudentId(studentId){
console.log("getStudentByStudentId" +studentId)
      await fetch(`${studentBaseUrl}/${studentId}`, {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => populateEditForm(data))
            .catch(err => console.error(err))

}

async function getFacultyByFacultyId(faculty){
console.log("getFacultyByFacultyId")
      await fetch(`${facultyBaseUrl}/${faculty}`, {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => populateEditForm(data))
            .catch(err => console.error(err))

}
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
 document.getElementById("message").innerHTML=""
  router = "updateFacultyById";
  idForm.classList.remove("hide");
  usernameForm.classList.remove("hide");
  passwordForm.classList.add("hide");
  roleForm.classList.remove("hide");
  formContainer.classList.remove("hide");
  routerParameter = faculty;
  getFacultyByFacultyId(routerParameter)

}
async function updateStudentById(studentId) {
 document.getElementById("message").innerHTML=""
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
 document.getElementById("message").innerHTML=""
  router = "addStudent";
  idForm.classList.add("hide");
  usernameForm.classList.add("hide");
  passwordForm.classList.add("hide");
  roleForm.classList.add("hide");
  formContainer.classList.remove("hide");
}

async function addFacultyRouter() {
 document.getElementById("message").innerHTML=""
  router = "addFaculty";
  idForm.classList.add("hide");
  usernameForm.classList.remove("hide");
  passwordForm.classList.remove("hide");
  roleForm.classList.remove("hide");
  formContainer.classList.remove("hide");
}

//const checkInputValues = () => {
//
//   let nullInput = false;
//   const gender = document.querySelector(`input[name="gender"]:checked`);
//   const role = document.querySelector(`input[name="role"]:checked`);
//    if( firstName.value === null || lastName.value === null || dateOfBirth.value === null
//      || gender.value === null || phone.value === null || grade.value === null || address.value === null
//      || email.value === null )
//      {
//            nullInput = true;
//
//
//        }
//        if(router.includes("Faculty")){
//
//             if( username.value === null ||  role.value === null){
//                  nullInput = true;
//         }
//
//      }
//      return nullInput;
//}

//const assignNullValuesToInput = () => {
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
//}
const handleSubmit = async (e) => {
  e.preventDefault();
// if(checkInputValues){
//    document.getElementById("message").innerHTML ="Input values cannot be empty"
//
// }  else{


   formContainer.classList.add("hide");
// document.getElementById("message").innerHTML=""

  if (router === "addFaculty") {
      const gender = document.querySelector(`input[name="gender"]:checked`);
      const role = document.querySelector(`input[name="role"]:checked`);
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

//        assignNullValuesToInput();
        firstName.value = "";
        lastName.value = "";
        dateOfBirth.value = "";
    //    gender.value = "";
        phone.value = "";
        grade.value = "";
        address.value = "";
        username.value = "";
        password.value = "";
    //    role.value = "";
        email.value = "";

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

  } else if (router === "addStudent") {

    const gender = document.querySelector(`input[name="gender"]:checked`);

    let bodyObj = {
      firstName: firstName.value,
      lastName: lastName.value,
      dob: dateOfBirth.value,
//      gender: genderSelected,
        gender:gender.value,
      phoneNumber: phone.value,
      grade: grade.value,
      address: address.value,
      email: email.value,
    };

    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    email.value = "";
//       assignNullValuesToInput();

    const response = await fetch(`${studentBaseUrl}/faculty/${facultyId}`, {
      method: "POST",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));

    const responseArr = await response.json();
    if (response.status === 200) {
        if (
                responseArr[0] === "Student already exists with given email."
          ) {
                alert(responseArr[0]);
          } else {
                return getStudentList();
          }
      }


  } else if (router === "updateStudentById") {
    console.log("update Student")
    formContainer.classList.add("hide");
    const gender = document.querySelector(`input[name="gender"]:checked`);

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
//    assignNullValuesToInput();

    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
//   gender.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    email.value = "";

    const response = await fetch(`${studentBaseUrl}`, {
      method: "PUT",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));
    if (response.status === 200) {
        return getStudentList();

    }

  } else if (router === "updateFacultyById") {

    console.log("update faculty")
    const gender = document.querySelector(`input[name="gender"]:checked`);
    const role = document.querySelector(`input[name="role"]:checked`);
   // id = routerParameter;
   console.log(routerParameter)
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

    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
//    gender.value = "";
    phone.value = "";
    grade.value = "";
    address.value = "";
    username.value = "";
    password.value = "";
//    role.value = "";
    email.value = "";

//       assignNullValuesToInput();

    const response = await fetch(`${facultyBaseUrl}`, {
      method: "PUT",
      body: JSON.stringify(bodyObj),
      headers: headers,
    }).catch((err) => console.error(err.message));

    if (response.status === 200) {
      return getFacultyList();
    }


  }
//}
};

const cancelForm =()=> {

    formContainer.classList.add("hide")
}
cancelBtn.addEventListener("click", cancelForm);
searchBtn.addEventListener("click", searchByFirstName);
addFacultyBtn.addEventListener("click", addFacultyRouter);
addStudentBtn.addEventListener("click", addStudentRouter);

facultyListBtn.addEventListener("click", getFacultyList);
studentListBtn.addEventListener("click", getStudentList);
assignFacultyBtn.addEventListener("click", assignFacultyToStudent);
submitBtn.addEventListener("click", handleSubmit);
