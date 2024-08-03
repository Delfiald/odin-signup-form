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
    heroOptions.classList.add('hide');
  }
}

const signUpButton = document.getElementById('sign-up-btn');
const signUpBackButton = document.getElementById('tos-back');
const heroWelcome = document.querySelector('.hero.welcome');
const heroOptions = document.querySelector('.hero.sign-up-header');
const heroTos = document.querySelector('.hero.terms-of-services');

signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  if(signUp.className === 'sign-up show' && tos.className === 'tos'){
    signUp.classList.toggle('show');
    signUp.classList.toggle('hide');
    tos.classList.toggle('show');
    heroWelcome.classList.add('hide');
    heroWelcome.classList.remove('show');
    heroOptions.classList.add('hide');
    heroTos.classList.add('show');
    heroTos.classList.remove('hide');
  }else{
    console.log(tos.className);
  }
})

signUpBackButton.addEventListener('click', (e) => {
  if(signUp.className === 'sign-up hide' && tos.className === 'tos show'){
    signUp.classList.toggle('show');
    signUp.classList.toggle('hide');
    tos.classList.toggle('show');
    heroWelcome.classList.remove('hide');
    heroWelcome.classList.add('show');
    heroTos.classList.remove('show');
    heroTos.classList.add('hide');
  }
})

document.addEventListener('DOMContentLoaded', setTheme);
document.addEventListener('DOMContentLoaded', section);