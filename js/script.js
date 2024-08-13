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
  setTimeout(() => {
    modeTrigger.classList.remove('start');
  },2500);
}

const signUpButton = document.getElementById('sign-up-btn');
const signUpBackButton = document.getElementById('tos-back');
const optionsButton = document.getElementById('options-btn');
const createButton = document.getElementById('create-account');
const heroWelcome = document.querySelector('.hero.welcome');
const heroTos = document.querySelector('.hero.terms-of-services');
const heroLoading = document.querySelector('.hero.loading');

const tosConfirm = document.getElementById('tos-confirm');

const container = document.querySelector('.container');

const popUp = document.querySelector('.pop-up');

popUp.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('.close');
  if(closeBtn) {
    popUp.classList.remove('show');
  }
})

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
      if(tos.classList.contains('show')) {
        heroWelcome.classList.add('hide');
        heroWelcome.classList.remove('show');
        heroTos.classList.add('show');
        heroTos.classList.remove('hide');
      }
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
    tosConfirm.classList.remove('disabled');
    tosValid = true;
  }else{
    tosConfirm.classList.add('disabled');
    tosValid = false;
  }
})

const loadingAnim = document.querySelector('.signed-up-loading');

const loadingText = document.querySelector('.loading-text');
const loadingTextItems = document.querySelectorAll('.loading-text *');

tosConfirm.addEventListener('click', (e) => {
  if(tosValid) {
    if(tos.className === 'tos show'){
      tos.classList.toggle('show');
      heroTos.classList.remove('show');
      heroTos.classList.add('hide-up');
      heroLoading.classList.add('show');
      tos.style.transform = 'translateX(0)';
      loadingAnim.classList.toggle('show');
      loadingText.classList.add('start');

      tosAgree.checked = false;
      tosAgreePrivacy.checked = false;

      loadingTextItems.forEach((item, index) => {
        item.style.animationDelay = `${index * .05}s`;
      })

      setTimeout(() => {
        loadingAnim.classList.toggle('show');
        container.classList.add('registered');
        signed.classList.toggle('show');
      }, 2500)
    }
  }
})

loadingTextItems[loadingTextItems.length - 1].addEventListener('animationend', restartAnimation);

function restartAnimation() {
  loadingText.classList.remove('start');

  void loadingText.offsetWidth;

  loadingText.classList.add('start');
}

const loginBtn = document.querySelector('.login-button-wrapper');
const loginPage = document.querySelector('.login')

const loginInput = loginPage.querySelectorAll('input');

const setLoginInput = () => {
  loginInput.forEach(item => {
    item.value = '';
    item.textContent = '';
  })
}

loginBtn.addEventListener('click', (e) => {
  setHeroWelcome();
  loginPage.classList.add('show');
  signed.classList.remove('show');

  const inputs = signUp.querySelectorAll('input');
  
  for (const item of inputs) {
    item.value = '';
    passCheck();
  }

  loginBtnParent = '';
})


let loginBtnParent = '';

container.addEventListener('click', (e) => {
  const optionsLoginButton = e.target.closest('.options .login-button');
  const signUpLoginButton = e.target.closest('.sign-up .login-button');

  if(optionsLoginButton) {
    container.classList.add('logged');
    loginPage.classList.add('show');
    signed.classList.remove('show');
    if(!container.classList.contains('registered')){
      options.classList.remove('show');
    }

    loginBtnParent = 'options';
  }
  else if(signUpLoginButton) {
    container.classList.add('logged');
    loginPage.classList.add('show');
    signed.classList.remove('show');
    if(!container.classList.contains('registered')){
      signUp.classList.remove('show');
    }

    loginBtnParent = 'signup';
  }

  console.log(loginBtnParent);

  if(loginPage.classList.contains('show')) {
    const signUpBtn = e.target.closest('.sign-up-account');
    if(signUpBtn) {
      container.classList.remove('registered');
      signed.classList.remove('show');
      loginPage.classList.remove('show');
      setLoginInput();
      setHeroWelcome();

      if(loginBtnParent === '') {
        signUp.classList.add('show');
      }else if(loginBtnParent === 'options') {
        container.classList.remove('logged');
        options.classList.add('show');
      }else if(loginBtnParent === 'signup') {
        container.classList.remove('logged');
        signUp.classList.add('show');
      }
    }
  }
})

const setHeroWelcome = () => {
  heroWelcome.classList.remove('hide');
  heroWelcome.classList.add('show');
  heroTos.classList.remove('show');
  heroTos.classList.add('hide');
  heroTos.classList.remove('hide-up');
  heroLoading.classList.remove('show');
  heroLoading.classList.add('hide');
}

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

const modeTrigger = document.querySelector('.mode-trigger');
const modeTransitions = document.querySelector('.mode-transitions');

let isModeTrigger = false;

modeTrigger.addEventListener('click', (e) => {
  if(isModeTrigger) return;

  const bulb = e.target.closest('.bulb-wrapper .bulb');

  if(bulb) {
    modeTrigger.classList.add('triggered');
    modeTransitions.classList.add('triggered');
    setTimeout(() => {
      modeTrigger.classList.remove('triggered');
    }, 1000)
    setTimeout(() => {
      modeTransitions.classList.remove('triggered');
    }, 3000)

    
    const root = document.documentElement;

    root.classList.toggle('dark');
    root.classList.toggle('light');

    isModeTrigger = true;
    setTimeout(() => {
      isModeTrigger = false;
    }, 3000);
  }
})

const header = document.querySelector('.header');
const headerImg = document.querySelector('.header-img');

const imagesList = ['cookingBook.png', 'cookingBook2.jpg'];
let index = 0;

headerImg.addEventListener('animationiteration', (e) => {
  if(index === 1) {
    index--;
    headerImg.style.animationDirection = 'normal';
  }else {
    index++;
    headerImg.style.animationDirection = 'reverse';
  }

  setTimeout(() => {
    headerImg.style.background = `url('../img/${imagesList[index]}') center center/cover no-repeat`;
  }, 500)

});

header.addEventListener('mouseleave', (e) => {
  console.log("paused");
  headerImg.classList.add('paused');
})

header.addEventListener('mouseenter', (e) => {
  headerImg.classList.remove('paused');
})

const login = document.getElementById('log-in-btn');
const profilePage = document.querySelector('.profile');

login.addEventListener('click', (e) => {
  e.preventDefault();

  let valid = true;

  const inputs = loginPage.querySelectorAll('input');
  for (const item of inputs) {
    if (!item.checkValidity()) {
      item.reportValidity();
      valid = false;
      break;
    }
  }

  if(valid) {
    loginPage.classList.add('logged');
    // signUp.classList.remove('show');
    profilePage.classList.add('show');
  }
})

profilePage.addEventListener('click', (e) => {
  const logOut = e.target.closest('.log-out');

  if(logOut) {
    profilePage.classList.remove('show');
    container.classList.remove('registered');
    container.classList.remove('logged');
    loginPage.classList.remove('logged');
    loginPage.classList.remove('show');
    signUp.classList.add('show');
    
    setLoginInput();
  }
})

document.addEventListener('DOMContentLoaded', setTheme);
document.addEventListener('DOMContentLoaded', section);