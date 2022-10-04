const facultyBaseUrl = "http://localhost:8080/api/v1/faculties";
const studentBaseUrl = "http://localhost:8080/api/v1/students";

const headers = {
  "Content-Type": "application/json",
};

//Cookie
console.log(document.cookie)
const cookieArr = document.cookie.split("=");
const facultyId = cookieArr[1];



async function  handleLogout() {
  let c = document.cookie.split(";");
  console.log(c)
  for (let i in c) {
    document.cookie =
      /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      console.log(document.cookie)

  }
}

const dataContainer = document.getElementById("data-container");
const tableTitle = document.getElementById("add-title");
console.log("faculty id " + facultyId);

// form input elements

const formContainer = document.getElementById("form-container");
const formTitle = document.getElementById("form-title");
const idForm = document.getElementById("id-reg");
const id = document.getElementById("id");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const dateOfBirth = document.getElementById("dateOfBirth");
const grade = document.getElementById("grade");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const email = document.getElementById("email");
const submitBtn = document.getElementById("submit-button")
const cancelBtn = document.getElementById("cancel-button")
const dataTable = document.getElementById("table-body");
const tableHeader = document.getElementById("table-header");
const genderBtns = document.querySelectorAll(`input[name="gender"]`);
let routerParameter;

const searchBtn = document.getElementById("search-button");
const firstNameSearch =  document.getElementById("firstname-search");


// password change form buttons
const passwordChangeContainer = document.getElementById("password-container");
const changePasswordForm = document.getElementById("change-password-form");
const newPasswordInput = document.getElementById("newPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const changePasswordBtn = document.getElementById("change-password-button");
const passwordMessage = document.getElementById("change-password-message");

function changePassword() {
  console.log("in change password");
  passwordChangeContainer.classList.remove("hide");
}

function hidePasswordContainer() {
passwordChangeContainer.classList.add("hide");
}
//get all students where Faculty id = logged faculty id
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
// DISPLAY STUDENT DATA IN TABLE FORMAT
const createStudentTable = (data) => {
data.sort((a,b)=> (+a.id) - (+b.id));
tableTitle.innerHTML = `Students List`;
  dataContainer.classList.remove("hide");
  tableHeader.innerHTML = `  <tr>
                                         <th scope="col">ID</th>
                                         <th scope="col">First Name</th>
                                         <th scope="col">Last Name</th>
                                         <th scope="col">Gender</th>
                                         <th scope="col">Birthdate</th>
                                         <th scope="col">Email</th>
                                         <th scope="col">Phone Number</th>
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
                <td>${new Date(element.dob).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                <td>${element.email}</td>
                <td>${element.phoneNumber}</td>
                <td>${element.address}</td>
                 <td>
                    <button   class="change-btn btn btn-secondary" onclick="updateStudentById(${element.id})">Edit</button>
                 </td>
          </tr> `;
    dataTable.innerHTML += trString;
  });
};

const populateEditForm = (data) => {
        console.log(data)
          let dateDB = data.dob.substring(0,10)
    genderBtns.forEach(genderBtn => {
        console.log(genderBtn);
        if(genderBtn.value === data.gender) {
           genderBtn.checked=true;
          }
         else{
           genderBtn.checked=false;
         }
     })
    const gender = document.querySelector(`input[name="gender"]:checked`);

    id.value = data.id;
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    dateOfBirth.value = dateDB;
    phone.value = data.phoneNumber;
    address.value = data.address;
    email.value = data.email;
    grade.value = data.grade;

}
//SEARCH STUDENT BY FIRSTNAME
const searchByFirstName = async () =>{

    const firstName = firstNameSearch.value;
    if( firstName != null){

        console.log(`${studentBaseUrl}/firstname/${firstName}`)
        await fetch(`${studentBaseUrl}/firstname/${firstName}`, {
        method: "GET",
        headers: headers,
        })
        .then((response) => response.json())
        .then((data) => createStudentTable(data))
        .catch((err) => console.error(err));
        }
}

async function getStudentByStudentId(studentId){
console.log("getStudentByStudentId : " +studentId)
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
            .then(data => data)
            .catch(err => console.error(err))
}
async function updateStudentById(studentId) {
  idForm.classList.remove("hide");
  formContainer.classList.remove("hide");
  routerParameter = studentId;
  getStudentByStudentId(routerParameter);

}
const handleChangePassword = async (e) => {
  e.preventDefault();
  if(newPasswordInput.value != confirmPasswordInput.value){
   passwordMessage.innerHTML= "Both password are not same !!"
  } else {
    passwordChangeContainer.classList.add("hide")
    let changedPassword = newPasswordInput.value;
    console.log("handle Change passwprd : "+ changedPassword)
    const response = await fetch(`${facultyBaseUrl}/${facultyId}/${changedPassword}`, {
         method: "PUT",
         headers: headers,
       }).catch((err) => console.error(err.message));
       if (response.status === 200) {
             alert("Password changed successfully!")
    }
        newPasswordInput.value=""

        confirmPasswordInput.value=""
  }


}


const handleSubmit = async (e) => {
  e.preventDefault();
   formContainer.classList.add("hide");
   console.log("update Student")
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

    firstName.value = "";
    lastName.value = "";
    dateOfBirth.value = "";
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
         getStudentList();
    }
};

const cancelForm = (e)=> {
     e.preventDefault();
    formContainer.classList.add("hide")
    getStudentList();
}

cancelBtn.addEventListener("click", cancelForm);
searchBtn.addEventListener("click", searchByFirstName);
submitBtn.addEventListener("click", handleSubmit);
//document.addEventListener("DOMContentLoaded", getStudentList);
getStudentList();

changePasswordBtn.addEventListener("click", handleChangePassword);