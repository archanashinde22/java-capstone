const loginForm = document.getElementById('login-form')
const loginUsername= document.getElementById('login-username')
const loginPassword = document.getElementById('login-password')
const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:8080/api/v1/faculties'

const handleLogin = async (evt) =>{
    console.log("login HandleSubmit")
    console.log("login .js  base URL :" + baseUrl)
    evt.preventDefault();

  let bodyObj = {
        username: loginUsername.value,
        password: loginPassword.value
    }
    const response = await fetch(`${baseUrl}/login`,{
        method :"POST",
        body:JSON.stringify(bodyObj),
        headers:headers
    })
    .catch(err => console.error(err.message))

    const responseArr = await response.json()
        console.log("Login HandleSubmit after response" + responseArr)
        console.log(responseArr[1])
        if(response.status === 200){
          if(responseArr[0] ==="Username or password incorrect"){
                  document.getElementById('login-message').innerHTML='<b>Username or password incorrect. Please try again.</b>'
          } else{
                          document.cookie = `userId=${responseArr[2]}`
                          window.location.replace(responseArr[1])
          }
        }
}

loginForm.addEventListener('submit',handleLogin)