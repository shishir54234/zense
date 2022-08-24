const form = document.getElementById("reg-form")
// const submit=document.getElementById('submit')
// submit.addEventListener('click',()=>{
//     console.log("KR LAWDA SIGN")
// })
const submit = document.getElementById('submit')

function myFunction() {
    document.getElementById("submit").innerHTML = "Hello World";
}

const Login = async (event) => {
    event.preventDefault();
    const username = document.getElementById("ToBeSelected").value
    const password = document.getElementById("Password").value
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        }).then((res)=>{
            if (res.status === 200) {
                // everythign went fine
                console.log('Got the token: ', result.data)
				localStorage.setItem('token', result.data)
                alert('Success')
            } else {
               alert(result.error)
           }
        })
    }
    console.log("going in")
    const result = await fetch('/api/v1/login', options).then((res) => {
        console.log(res.json());

    });



}
submit.addEventListener("click", Login);

const submithehe = document.getElementById('register')
const registerUser = async (event) => {
    event.preventDefault()
    const username = document.getElementById('Inputs1').value
    const password = document.getElementById('Inputs2').value


    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }
    console.log(12345)
    let result = await fetch('/api/register', options).then((res) => {
        console.log(12345)
        console.log(res)
        if (res.status === 200) {
            // everythign went fine
            alert('Success')
        } else {
           alert(result.error)
       }
    });
    // console.log(result.status)
   
}


submithehe.addEventListener("click", registerUser)