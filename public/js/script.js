function addNew() {
    document.getElementById('add-new-modal').style.display = 'flex'
};

document.getElementById('add-new-close').addEventListener('click', function () {
    document.getElementById('add-new-modal').style.display = 'none';
});

document.getElementById('add-new-close2').addEventListener('click', function () {
    document.getElementById('add-new-modal').style.display = 'none';
});

console.log("hellow!");

// const prevUser = document.getElementById('#prev-user');
// const registerBox = document.querySelector('#register-container');
// const loginBox = document.querySelector('#login-container');

// prevUser.addEventListener('click', function () {
//     registerBox.classList.add("d-none");
//     loginBox.classList.remove('d-none');
// });
