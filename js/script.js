const setTheme = () => {
  const root = document.documentElement;
  const newTheme = root.className === 'light' ? 'dark' : 'light';
  root.className = newTheme;
}

const signUp = document.querySelector('.sign-up');
const tos = document.querySelector('.tos');

const section = () => {
  if(signUp.className === 'sign-up'){
    signUp.classList.toggle('show');
  }
}

const signUpButton = document.getElementById('sign-up-btn');
const signUpBackButton = document.getElementById('tos-back');

signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  if(signUp.className === 'sign-up show' && tos.className === 'tos'){
    signUp.classList.toggle('show');
    signUp.classList.toggle('hide');
    tos.classList.toggle('show');
  }
})

signUpBackButton.addEventListener('click', (e) => {
  if(signUp.className === 'sign-up hide' && tos.className === 'tos show'){
    signUp.classList.toggle('show');
    signUp.classList.toggle('hide');
    tos.classList.toggle('show');
  }
})

document.addEventListener('DOMContentLoaded', setTheme);
document.addEventListener('DOMContentLoaded', section);