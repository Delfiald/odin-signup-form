const setTheme = () => {
  const root = document.documentElement;
  const newTheme = root.className === 'light' ? 'dark' : 'light';
  root.className = newTheme;
}

const signUp = document.querySelector('.sign-up');
const options = document.querySelector('.options');
const tos = document.querySelector('.tos');
const signed = document.querySelector('.signed-up');

const section = () => {
  if(signUp.className === 'sign-up'){
    signUp.classList.toggle('show');
  }
}

const signUpButton = document.getElementById('sign-up-btn');
const signUpBackButton = document.getElementById('tos-back');
const optionsButton = document.getElementById('options-btn');
const createButton = document.getElementById('create-account');
const heroWelcome = document.querySelector('.hero.welcome');
const heroTos = document.querySelector('.hero.terms-of-services');

const tosConfirm = document.getElementById('tos-confirm');

const container = document.querySelector('.container');

signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  if(signUp.className === 'sign-up show'){
    signUp.classList.toggle('show');
    tos.classList.toggle('show');

    // Hero
    heroWelcome.classList.add('hide');
    heroWelcome.classList.remove('show');
    heroTos.classList.add('show');
    heroTos.classList.remove('hide');
  }else{
    console.log(tos.className);
  }
})

signUpBackButton.addEventListener('click', (e) => {
  if(tos.className === 'tos show'){
    signUp.classList.toggle('show');
    tos.classList.toggle('show');
    heroWelcome.classList.remove('hide');
    heroWelcome.classList.add('show');
    heroTos.classList.remove('show');
    heroTos.classList.add('hide');
  }
})

optionsButton.addEventListener('click', (e) => {
  if(signUp.className === 'sign-up show'){
    signUp.classList.toggle('show');
    options.classList.toggle('show');
  }
})

createButton.addEventListener('click', (e) => {
  if(options.className === 'options show'){
    options.classList.toggle('show');
    signUp.classList.toggle('show');
  }
})

tosConfirm.addEventListener('click', (e) => {
  if(tos.className === 'tos show'){
    container.classList.add('registered');
    tos.classList.toggle('show');
    signed.classList.toggle('show');
  }
})

document.addEventListener('DOMContentLoaded', setTheme);
document.addEventListener('DOMContentLoaded', section);