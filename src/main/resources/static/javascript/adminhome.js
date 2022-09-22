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
const headers = {
  "Content-Type": "application/json",
};
const dataContainer = document.getElementById('data-container')
console.log("faculty id " + facultyId);


const facultyBaseUrl = "http://localhost:8080/api/v1/faculties";
const studentBaseUrl = "http://localhost:8080/api/v1/students";

const studentListBtn = document.getElementById("student_list");
const facultyListBtn = document.getElementById("faculty_list");

const dataTable = document.getElementById("table-body");
const tableHeader = document.getElementById("table-header");

async function getStudentList() {
  console.log("faculty id " + facultyId);

  await fetch(`${studentBaseUrl}/faculty/${facultyId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {

      dataContainer.classList.remove("hide")
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
    })
    .catch((err) => console.error(err));
}
async function getFacultyList() {
  await fetch(`${facultyBaseUrl}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {

      dataContainer.classList.remove("hide")
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
      })
    })
    .catch((err) => console.error(err));
}



facultyListBtn.addEventListener("click", getFacultyList);
studentListBtn.addEventListener("click", getStudentList);
