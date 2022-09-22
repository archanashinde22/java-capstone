//const registerForm = document.getElementById('register-form')
//const registerUsername= document.getElementById('register-username')
//const registerPassword = document.getElementById('register-password')
//const registerFirstName = document.getElementById('register-firstname')
//const registerLastName = document.getElementById('register-lastname')
//const registerDateOfBirth = document.getElementById('register-dateOfBirth')
//const registerGrade = document.getElementById('register-grade')
//const registerPhone = document.getElementById('register-phone')
//
//
//const registerAddress = document.getElementById('register-address')
//const registerEmail = document.getElementById('register-email')
//
//const loginCardContainer = document.getElementById('login-card');
//const registerCardContainer = document.getElementById('register-card');
//
//const loginBtn = document.querySelector("#login");
//const registerBtn = document.querySelector("#register");
//
//
//const headers = {
//    'Content-Type':'application/json'
//}
//
//const baseUrl = 'http://localhost:8080/api/v1/faculties'
//
//const handleRegister = async (evt) =>{
//    console.log("Register HandleSubmit")
//    console.log("Register .js  base URL : " + baseUrl)
//    evt.preventDefault();
//    loginCardContainer.classList.add("hide")
//
//    const registerGender = document.querySelector(`input[name=gender]:checked`)
//    const registerRole = document.querySelector(`input[name=role]:checked`)
//
//    const registerMessage = document.getElementById("register-message");
//    if (registerFirstName.value === ""|| registerLastName.value === "" ||
//        registerDateOfBirth.value === "" || registerGender.value ===""||
//        registerPhone.value ==="" || registerUsername.value === "" ||
//        registerPassword.value === "" || registerEmail.value ==="" ||
//        registerGrade.value==="" || registerAddress.value === "" ||registerRole === "" ) {
//            alert("Registration fields cannot be Empty ! ");
////        registerMessage.textContent("Registration fields cannot be Empty ! ");
//      } else {
//    let bodyObj = {
//        firstName : registerFirstName.value,
//        lastName : registerLastName.value,
//        dob : registerDateOfBirth.value,
//        gender: registerGender.value,
//        phoneNumber:registerPhone.value,
//        grade: registerGrade.value,
//        address: registerAddress.value,
//        username: registerUsername.value,
//        password: registerPassword.value,
//        role:registerRole.value,
//        email:registerEmail.value
//    }
//    registerCardContainer.classList.add("hide")
//    const response = await fetch(`${baseUrl}/register`,{
//        method :"POST",
//        body:JSON.stringify(bodyObj),
//        headers:headers
//    })
//    .catch(err => console.error(err.message))
//
//    const responseArr = await response.json()
//    console.log("Register HandleSubmit" + responseArr)
//    if(response.status === 200){
////        window.location.replace(responseArr[0]);
////        registerMessage.textContent=responseArr[0];
//        alert(responseArr[0])
//    }
//
//    }
//}
//
//const loginForm = document.getElementById('login-form')
//const loginUsername= document.getElementById('login-username')
//const loginPassword = document.getElementById('login-password')
//
//const handleLogin = async (evt) =>{
//registerCardContainer.classList.add("hide")
//    console.log("login HandleSubmit")
//    console.log("login .js  base URL :" + baseUrl)
//    evt.preventDefault();
// const loginMessage = document.getElementById("login-message");
//  let bodyObj = {
//        username: loginUsername.value,
//        password: loginPassword.value
//    }
//    loginCardContainer.classList.add("hide")
//    const response = await fetch(`${baseUrl}/login`,{
//        method :"POST",
//        body:JSON.stringify(bodyObj),
//        headers:headers
//    })
//    .catch(err => console.error(err.message))
//
//    const responseArr = await response.json()
//        console.log("Login HandleSubmit after response" + responseArr)
//        console.log(responseArr[1])
//        if(response.status === 200){
////           loginMessage.textContent=responseArr[0];
//            if(responseArr[0] ==="Username or password incorrect"){
//                    alert(responseArr[0]);
//             } else{
//                document.cookie = `userId=${responseArr[2]}`
//                window.location.replace(responseArr[1])
//             }
//        }
//}
//loginBtn.addEventListener("click",()=> loginCardContainer.classList.remove("hide"));
//registerBtn.addEventListener("click",()=> registerCardContainer.classList.remove("hide"));
//loginForm.addEventListener('submit',handleLogin);
//registerForm.addEventListener('submit',handleRegister);
