// HOME
const titleHome = document.getElementById('title');
const usersContainer = document.getElementById('users-container');
const userModel = usersContainer.children[0];
let currentPage = 1;

// USER DETAIL

const bigPicture = document.getElementById('popup-user-picture');
const fullName = document.getElementById('full-name');
const emailAdress = document.getElementById('email-adress');
const userName = document.getElementById('user-name');
const closePopUp = document.getElementById('user-popup-close');
const popUp = document.getElementById('user-popup');
const buttonLoadMore = document.getElementById('button-load-more');


const randomUsersHome = () => { 
    fetch 
    (`https://randomuser.me/api/?page=${currentPage}&results=50&seed=abc`)
    .then(response => response.json() )
    .then (data => {
        console.log(data);
        if (currentPage === 1) {
            usersContainer.innerHTML = '';
        }
        for(let i = 0; i < 50; i++) { 
            const newUser = userModel.cloneNode(true);
            newUser.children[0].children[0].src = data.results[i].picture.thumbnail;
            newUser.children[1].children[0].innerText = `${data.results[i].name.first} ${data.results[i].name.last}`;
            newUser.children[1].children[1].innerText = `${data.results[i].location.city},  ${data.results[i].nat}`;
            newUser.onclick = () => {
                userDetail(data.results[i]);
                popUp.style.display = 'flex';
            }
            buttonLoadMore.onclick = () => {
                currentPage++;
                randomUsersHome();
            }
            usersContainer.appendChild(newUser);           
        }
    });   
}

const userDetail = user => {
    bigPicture.src = user.picture.large;
    fullName.innerText = `${user.name.first} ${user.name.last}`;
    emailAdress.innerText = user.email;
    userName.innerText = user.login.username;

}

closePopUp.onclick = () => {
    popUp.style.display = 'none';   
}

titleHome.onclick = () => {
    usersContainer.innerHTML = '';
    currentPage = 1; 
    randomUsersHome();
}

randomUsersHome();
