const socket = io();

socket.on("connect", () => {
    console.log("Connected to the server")
})

socket.on("UPDATE_MESSAGES", allMessages => {
    document.getElementById("chat").innerHTML = "";
    allMessages.map(msg => appendMessage(msg))
    // console.log(`message: ${allMessages}`)
})


socket.on("NEW_MESSAGE", msg => {
    appendMessage(msg)
})


const appendMessage = msg => {

    let {email,date,message} = msg;

    date = new Date(date).toLocaleString();

    document.getElementById("chat").innerHTML += `
        <div>
        <b>[${date}] ${email}:</b> ${message} 
        </div>
    `

    
}

const sendMessage = () => {
    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    socket.emit("POST_MESSAGE", {
        email,
        message: message.value
    })

    message.value="";
}


// Form Validation

const email = document.getElementById("email")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const age = document.getElementById("age")
const alias = document.getElementById("alias")
const avatar = document.getElementById("avatar")
const message = document.getElementById("message")
const chatButton = document.getElementById("chatButton")

const enableSubmitButton = () => {
    if (email.value == "" || firstName.value == "" || lastName.value == "" || age.value== "" || alias.value == "" || avatar.value=="" || message.value =="" ) {
        chatButton.setAttribute("disabled", "")
    } else {
        chatButton.removeAttribute("disabled")
    }
}

email.addEventListener("change", enableSubmitButton)
firstName.addEventListener("change", enableSubmitButton)
lastName.addEventListener("change", enableSubmitButton)
age.addEventListener("change", enableSubmitButton)
alias.addEventListener("change", enableSubmitButton)
avatar.addEventListener("change", enableSubmitButton)
message.addEventListener("change", enableSubmitButton)