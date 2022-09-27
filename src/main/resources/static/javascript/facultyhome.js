const facultyBaseUrl = "http://localhost:8080/api/v1/faculties";
const studentBaseUrl = "http://localhost:8080/api/v1/students";

const headers = {
  "Content-Type": "application/json",
};

//Cookie
console.log(document.cookie)
const cookieArr = document.cookie.split("=");
const facultyId = cookieArr[1];



function handleLogout() {
  let c = document.cookie.split(";");
  console.log(c)
  for (let i in c) {
    document.cookie =
      /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      console.log(document.cookie)

  }
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
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

//let loggedFaculty ;
//console.log(loggedFaculty)
//search form elements
const searchBtn = document.getElementById("search-button");
const firstNameSearch =  document.getElementById("firstname-search");

//get all students where Faculty id = logged faculty id
async function getStudentList() {
  console.log("faculty id :" + facultyId);

  await fetch(`${studentBaseUrl}/faculty/${facultyId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
//    .then((data) => console.log(data))
    .then((data) => createStudentTable(data))
    .catch((err) => console.error(err));
}



const createStudentTable = (data) => {

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

    let birthdate = formatDate(new Date(element.dob));
    const trString = ` <tr>
                <td>${element.id}</td>
                <td>${element.firstName}</td>
                <td>${element.lastName}</td>
                <td>${element.gender}</td>
                <td>${birthdate}</td>
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

//        console.log("updateStudentById : " + routerParameter);
//        console.log("update Student id : " + data.id);
//        console.log("update Student firstName : "+ data.firstName);
//        console.log("update Student lastName : "+ data.lastName);
//        console.log("update Student dob : "+ data.dob);
//        console.log("update Student phone : "+data.phoneNumber);
//        console.log("update Student grade : "+ data.grade);
//        console.log("update Student Address : "+  data.address);
//        console.log("update Student email : " + data.email);
//        console.log("update Student Gender : " + data.gender);
        console.log("update Student Faculty : " + data.facultyDto.firstName);

   let  datePopulate = formatDate(new Date(data.dob))
    genderBtns.forEach(genderBtn => {
        console.log(genderBtn);
        if(genderBtn.value === data.gender) {
//            console.log(genderBtn);

           genderBtn.checked=true;
//           console.log(genderBtn.value);

          }
         else{
           genderBtn.checked=false;
         }
     })
     const gender = document.querySelector(`input[name="gender"]:checked`);
//     console.log(gender);
//     console.log(gender.value);

    id.value = data.id;
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    dateOfBirth.value = datePopulate;

    phone.value = data.phoneNumber;
    address.value = data.address;
    email.value = data.email;
    grade.value = data.grade;

}




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
// document.getElementById("message").innerHTML=""

  idForm.classList.remove("hide");
  formContainer.classList.remove("hide");
  routerParameter = studentId;
  getStudentByStudentId(routerParameter);

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

const cancelForm =()=> {
    formContainer.classList.add("hide")
    getStudentList();
}

cancelBtn.addEventListener("click", cancelForm);
searchBtn.addEventListener("click", searchByFirstName);
submitBtn.addEventListener("click", handleSubmit);
//document.addEventListener("DOMContentLoaded", getStudentList);
getStudentList();