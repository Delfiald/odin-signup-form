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
  const inputs = signUp.querySelectorAll('input');
  let valid = true;
  
  for (const item of inputs) {
    if (!item.checkValidity()) {
        item.reportValidity();
        valid = false;
        break;
    }
  }

  if(valid) {
    if(signUp.className === 'sign-up show'){
      signUp.classList.toggle('show');
      tos.classList.toggle('show');
  
      // Hero
      heroWelcome.classList.add('hide');
      heroWelcome.classList.remove('show');
      heroTos.classList.add('show');
      heroTos.classList.remove('hide');
    }
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

const tosAgree = document.getElementById('tos-agree');
const tosAgreePrivacy = document.getElementById('tos-agree-privacy');

const tosValidation = document.querySelector('.tos-validation');

let tosValid = false;

tosValidation.addEventListener('click', (e) => {
  console.log(tosAgreePrivacy.checked);
  if(tosAgreePrivacy.checked && tosAgree.checked) {
    tosConfirm.classList.toggle('disabled');
    tosValid = true;
  }else{
    tosValid = false;
  }
})

tosConfirm.addEventListener('click', (e) => {
  if(tosValid) {
    if(tos.className === 'tos show'){
      container.classList.add('registered');
      tos.classList.toggle('show');
      signed.classList.toggle('show');
    }
  }
})

const getCode = document.querySelector('.select-codes');

getCode.addEventListener('click', (e) => {
  if (e.target.classList.contains('code')) {
    const codeValue = e.target.getAttribute('data-value');
    const codeActive = getCode.querySelector('.code-active');
    codeActive.textContent = codeValue;
  }
})

const password = document.querySelector('.input.password');
const confirmPassword = document.querySelector('.input.confirm-password');

const passInput = password.querySelector('#password');
const confirmPassInput = confirmPassword.querySelector('#confirm-password');

const passCheck = () => {
  passwordStrength(passInput, confirmPassInput);
}

passInput.addEventListener('input', (e) => {
  passwordStrength(passInput);
})

const passwordStrength = (passInput) => {
  const passValue = passInput.value;
  const strengthBg = password.querySelector('.strength-background');
  const strengthText = password.querySelector('.strength');

  const containsUppercase = /[A-Z]/.test(passValue);
  const containsLowercase = /[a-z]/.test(passValue);
  const containsDigit = /\d/.test(passValue);
  const containsSymbol = /[\W_]/.test(passValue);


  console.log(passValue.length >= 8);
  if(passValue.length >= 8){
    if(containsDigit && (containsLowercase || containsUppercase || containsSymbol)){
      passInput.setCustomValidity('');
      strengthBg.style.background = 'yellow';
      strengthBg.style.flexBasis = '25%';
      strengthText.textContent = 'Weak';
      strengthText.style.opacity = '1';
      strengthText.style.color = '#333';
      if((containsLowercase && containsUppercase) || (containsSymbol && containsLowercase) || (containsUppercase && containsSymbol)) {
        strengthBg.style.background = 'green';
        strengthBg.style.flexBasis = '50%';
        strengthText.textContent = 'Moderate';
        if(containsLowercase && containsUppercase && containsSymbol) {
          strengthBg.style.background = 'red';
          strengthBg.style.flexBasis = '75%';
          strengthText.textContent = 'Strong';
          if(passValue.length >= 15) {
            strengthBg.style.background = 'darkred';
            strengthBg.style.flexBasis = '100%';
            strengthText.textContent = 'Chad';
          }
        }
      }
    }else{
      passInput.setCustomValidity('Password must contain a combination of letters and numbers');
      password.querySelector('.invalid').textContent = 'Password must include letters and numbers.';
      strengthBg.style.flexBasis = '0';
      strengthBg.style.background = 'inherit';
      strengthText.style.opacity = '0';
      strengthText.style.color = '#333';
    }
  } else {
    passInput.setCustomValidity('Password at Least Have 8 Characters');
    password.querySelector('.invalid').textContent = 'Password at Least Have 8 Characters';
    strengthBg.style.background = 'inherit';
    strengthText.style.opacity = '0';
  }
}

confirmPassInput.addEventListener('input', (e) => {
  passMatch(passInput, confirmPassInput);
})

const passMatch = (passInput, confirmPassInput) => {
  const passValue = passInput.value;
  const confirmPassValue = confirmPassInput.value;
  if(passValue === confirmPassValue) {
    confirmPassInput.setCustomValidity('');
    console.log("sama");
  }else {
    confirmPassInput.setCustomValidity('Passwords do not match');
    confirmPassInput.setAttribute('title', 'Password Not Match');
    console.log('tidak');
  }
}

document.addEventListener('DOMContentLoaded', setTheme);
document.addEventListener('DOMContentLoaded', section);