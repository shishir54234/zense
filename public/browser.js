const form= document.getElementById("reg-form")
// const submit=document.getElementById('submit')
// submit.addEventListener('click',()=>{
//     console.log("KR LAWDA SIGN")
// })
const submit=document.getElementById('submit')

function myFunction() {
  document.getElementById("submit").innerHTML = "Hello World";
}

const register =async(event)=>{
    event.preventDefault();
    const username=document.getElementById("ToBeSelected").value
    const password=document.getElementById("Password").value
    let options={
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }
    console.log("going in")
    const result=await fetch('/api/v1/register',options).then((res)=>{
        console.log(res.json());

    });



}
submit.addEventListener("click", register);