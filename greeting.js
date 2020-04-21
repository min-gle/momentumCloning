const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function init() {
    loadName();
}
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = 'Hello <span id="name_space">' + `${text}` + '</span>,'
}

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}    

function inputName(){
    greeting.innerHTML = 'Hello ' + '<input id="input_name" type="text" value="' + document.querySelector('#name_space').innerText + '"></input>' + ' ,'
}


function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}    

// name change
greeting.addEventListener('dblclick', function(event) {
    inputName();
});

// change name submit on enter
greeting.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        let changed_name = document.querySelector("#input_name").value;
        paintGreeting(changed_name);
        saveName(changed_name);
    }
});

// change name submit on click outside div
document.addEventListener('click', function(event) {
    const NAME_REGION = document.querySelector("#input_name");
    if (NAME_REGION !== null) {
        let isContaining = NAME_REGION.contains(event.target);
        if (!isContaining) {
            let changed_name = document.querySelector("#input_name").value;
            paintGreeting(changed_name);
            saveName(changed_name);
        }
    }
});



init();