const registerForm = document.getElementById('register-form')
const registerUsername= document.getElementById('register-username')
const registerPassword = document.getElementById('register-password')
const registerFirstName = document.getElementById('register-firstname')
const registerLastName = document.getElementById('register-lastname')
const registerDateOfBirth = document.getElementById('register-dateOfBirth')
const registerGrade = document.getElementById('register-grade')
const registerPhone = document.getElementById('register-phone')
const registerAddress = document.getElementById('register-address')
const registerEmail = document.getElementById('register-email')


const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:8080/api/v1/faculties'

const handleRegister = async (evt) =>{
    console.log("Register HandleSubmit")
    console.log("Register .js  base URL :" + baseUrl)
    evt.preventDefault();

    const registerGender = document.querySelector(`input[name=gender]:checked`)
    const registerRole = document.querySelector(`input[name=role]:checked`)

    let bodyObj = {
        firstName : registerFirstName.value,
        lastName : registerLastName.value,
        dob : registerDateOfBirth.value,
        gender: registerGender.value,
        phoneNumber:registerPhone.value,
        grade: registerGrade.value,
        address: registerAddress.value,
        username: registerUsername.value,
        password: registerPassword.value,
        role:registerRole.value,
        email:registerEmail.value
    }
    const response = await fetch(`${baseUrl}/register`,{
        method :"POST",
        body:JSON.stringify(bodyObj),
        headers:headers
    })
    .catch(err => console.error(err.message))

    const responseArr = await response.json()
    console.log("Register HandleSubmit" + responseArr)
    if(response.status === 200){

      if(responseArr[0] ==="User already exists with given email."  || responseArr[0] ==="User already exists with given username."){
                                  alert(responseArr[0]);
              } else{

                              window.location.replace(responseArr[1])
              }
    }
}
registerForm.addEventListener('submit',handleRegister)