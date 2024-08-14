const container = document.querySelector('.container');
const popUp = document.querySelector('.pop-up');

// Mode Variables
const modeTrigger = document.querySelector('.mode-trigger');
const modeTransitions = document.querySelector('.mode-transitions');
let isModeTrigger = false;

// Sections Variables
const signUp = document.querySelector('.sign-up');
const options = document.querySelector('.options');
const tos = document.querySelector('.tos');
const signed = document.querySelector('.signed-up');
const loginPage = document.querySelector('.login')

const loginInput = loginPage.querySelectorAll('input');

// Hero Variables
const heroWelcome = document.querySelector('.hero.welcome');
const heroTos = document.querySelector('.hero.terms-of-services');
const heroLoading = document.querySelector('.hero.loading');

// Header Variables
const header = document.querySelector('.header');
const headerImg = document.querySelector('.header-img');
const imagesList = ['cookingBook.png', 'cookingBook2.jpg'];
let index = 0;

// ToS Variables
const tosAgree = document.getElementById('tos-agree');
const tosAgreePrivacy = document.getElementById('tos-agree-privacy');
let tosValid = false;

// Loading Variables
const loadingAnim = document.querySelector('.signed-up-loading');
const loadingText = document.querySelector('.loading-text');
const loadingTextItems = document.querySelectorAll('.loading-text *');

// Login Variables
let loginBtnParent = '';
const loginBtn = document.querySelector('.login-button-wrapper');
const profilePage = document.querySelector('.profile');

// Input[type="password"] Variables
const password = document.querySelector('.input.password');
const confirmPassword = document.querySelector('.input.confirm-password');
const passInput = password.querySelector('#password');
const confirmPassInput = confirmPassword.querySelector('#confirm-password');

// Init Site
const initSite = () => {
  const root = document.documentElement;
  const newTheme = root.className === 'light' ? 'dark' : 'light';
  root.className = newTheme;

  if(signUp.className === 'sign-up'){
    signUp.classList.toggle('show');
  }
  setTimeout(() => {
    modeTrigger.classList.remove('start');
  },2500);
}

// Header
const headerImgHandler = () => {
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
}

const handleMouseLeave = () => {
  headerImg.classList.add('paused');
};

const handleMouseEnter = () => {
  headerImg.classList.remove('paused');
};

// Sign Up Handler
const signUpHandler = (e) => {
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
      signUpTosHandler();
      welcomeTOSHeroHandler();
    }
  }
}

const signUpTosHandler = () => {
  signUp.classList.toggle('show');
  tos.classList.toggle('show');
}

// SignUp Options Toggle
const signUpOptionsHandler = () => {
  signUp.classList.toggle('show');
  options.classList.toggle('show');
}

// SignUpBack
const signUpBack = () => {
  if(tos.className === 'tos show'){
    signUpTosHandler();
    welcomeTOSHeroHandler();
  }
}

const welcomeTOSHeroHandler = () => {
  heroWelcome.classList.toggle('hide');
  heroWelcome.classList.toggle('show');
  heroTos.classList.toggle('show');
  heroTos.classList.toggle('hide');
}

const resetHero = () => {
  heroWelcome.classList.remove('hide');
  heroWelcome.classList.add('show');
  heroTos.classList.remove('show');
  heroTos.classList.add('hide');
  heroTos.classList.remove('hide-up');
  heroLoading.classList.remove('show');
  heroLoading.classList.add('hide');
}

// Confirm Button Disabler
const tosAgreement = () => {
  const tosConfirmBtn = document.getElementById('tos-confirm');

  if(tosAgreePrivacy.checked && tosAgree.checked) {
    tosConfirmBtn.classList.remove('disabled');
    tosValid = true;
  }else{
    tosConfirmBtn.classList.add('disabled');
    tosValid = false;
  }
}

// Confirm Button Handler
const tosConfirm = () => {
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
}

function restartAnimation() {
  loadingText.classList.remove('start');
  void loadingText.offsetWidth;
  loadingText.classList.add('start');
}

// Login Page Handler
const loginPageHandler = (target) => {

  if(target === 'options' || target === 'sign-up'){
    container.classList.add('logged');
    if (!container.classList.contains('registered')) {
      const element = document.querySelector(`.${target}`);
      if (element) {
        element.classList.remove('show');
      }
    }
  }else if(target === 'signed'){
    resetSignUpInput();
    tos.style.transform = '';
  }

  resetHero();
  loginPage.classList.add('show');
  signed.classList.remove('show');

  loginBtnParent = target;

}

// Sign Up Page Handler
const signupPageHandler = () => {
  container.classList.remove('registered');
  container.classList.remove('logged');
  loginPage.classList.remove('show');
  resetLoginInput();

  if(loginBtnParent === 'signed' || loginBtnParent === 'sign-up') {
    signUp.classList.add('show');
  }else if(loginBtnParent === 'options') {
    options.classList.add('show');
  }
}

// Inputs Reset
const resetSignUpInput = () => {
  const inputs = signUp.querySelectorAll('input');
  
  for (const item of inputs) {
    item.value = '';
    passCheck();
  }
}

const resetLoginInput = () => {
  loginInput.forEach(item => {
    item.value = '';
    item.textContent = '';
  })
}

// Login
const login = (e) => {
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
    profilePage.classList.add('show');
  }
}

// Logout
const profilePageHandler = (e) => {
  const logOut = e.target.closest('.log-out');

  if(logOut) {
    profilePage.classList.remove('show');
    profilePage.style.transitionDelay = '0s';
    resetLoginInput();

    setTimeout(() => {
      container.classList.remove('registered');
      container.classList.remove('logged');
      loginPage.classList.remove('logged');
      loginPage.classList.remove('show');
      signUp.classList.add('show');
    }, 1000);
  }
}

// Mode Button Handler
const modeHandler = (e) => {
  if(isModeTrigger) return;

  const bulb = e.target.closest('.bulb-wrapper .bulb');

  if(bulb) {
    isModeTrigger = true;
    modeTrigger.classList.add('pulled');
    modeTransitions.classList.add('triggered');
    setTimeout(() => {
      modeTrigger.classList.remove('pulled');
    }, 1000)

    setTimeout(() => {
      isModeTrigger = false;
      modeTransitions.classList.remove('triggered');
    }, 3000)

    const root = document.documentElement;

    root.classList.toggle('dark');
    root.classList.toggle('light');
  }
}

// Pop Up
const popUpHandler = (e) => {
  const closeBtn = e.target.closest('.close');
  if(closeBtn) {
    popUp.classList.remove('show');
  }
}

// Input Customizations
// Phone Code Dropdown
const setCode = (e) => {
  if (e.target.classList.contains('code')) {
    const codeValue = e.target.getAttribute('data-value');
    const codeActive = document.querySelector('.code-active');
    codeActive.textContent = codeValue;
  }
}

// Password Check and Password Strength
const passwordStrength = (passInput) => {
  const passValue = passInput.value;
  const strengthBg = password.querySelector('.strength-background');
  const strengthText = password.querySelector('.strength');
  const invalidText = password.querySelector('.invalid');

  const containsUppercase = /[A-Z]/.test(passValue);
  const containsLowercase = /[a-z]/.test(passValue);
  const containsDigit = /\d/.test(passValue);
  const containsSymbol = /[\W_]/.test(passValue);

  let strClass = '';

  if (passValue.length >= 8) {
    if (containsDigit && (containsLowercase || containsUppercase || containsSymbol)) {
      passInput.setCustomValidity('');
      strClass = 'weak';
      strengthText.textContent = 'Weak';
      if ((containsLowercase && containsUppercase) || (containsSymbol && containsLowercase) || (containsUppercase && containsSymbol)) {
        strClass = 'moderate';
        strengthText.textContent = 'Moderate';
        if (containsLowercase && containsUppercase && containsSymbol) {
          strClass = 'strong';
          strengthText.textContent = 'Strong';
          if (passValue.length >= 15) {
            strClass = 'chad';
            strengthText.textContent = 'Chad';
          }
        }
      }
    } else {
      passInput.setCustomValidity('Password must contain a combination of letters and numbers');
      invalidText.textContent = 'Password must include letters and numbers.';
    }
  } else {
    passInput.setCustomValidity('Password at least have 8 characters');
    invalidText.textContent = 'Password at least have 8 characters';
  }

  strengthBg.classList.remove('weak', 'moderate', 'strong', 'chad');
  if (strClass) {
    strengthBg.classList.add(strClass);
  }
}

const passMatch = (passInput, confirmPassInput) => {
  const passValue = passInput.value;
  const confirmPassValue = confirmPassInput.value;
  if(passValue === confirmPassValue) {
    confirmPassInput.setCustomValidity('');
  }else {
    confirmPassInput.setCustomValidity('Passwords do not match');
    confirmPassInput.setAttribute('title', 'Password Not Match');
  }
}

const passCheck = () => {
  passwordStrength(passInput, confirmPassInput);
}

// Container Handler
const handleAction = (target) => {
  if (target.id === 'sign-up-btn') {
    signUpHandler(e);
  } else if (target.closest('#options-btn') || target.closest('#create-account')) {
    signUpOptionsHandler();
  } else if (target.id === 'tos-back') {
    signUpBack();
  } else if (target.closest('#tos-confirm')) {
    tosConfirm();
  } else if (target.closest('.options .login-button')) {
    loginPageHandler('options');
  } else if (target.closest('.sign-up .login-button')) {
    loginPageHandler('sign-up');
  } else if (target.closest('.login-button-wrapper')) {
    loginPageHandler('signed');
  } else if (target.closest('.sign-up-account')) {
    signupPageHandler();
  } else if (target.closest('#log-in-btn')) {
    login(e);
  } else if (target.closest('.profile')) {
    profilePageHandler(e);
  } else if (target.closest('.select-codes')) {
    setCode(e);
  }
};

// Event Listener
// Mode
modeTrigger.addEventListener('click', modeHandler);
// Pop Up
popUp.addEventListener('click', popUpHandler);

// Header
headerImg.addEventListener('animationiteration', headerImgHandler);
header.addEventListener('mouseleave', handleMouseLeave);
header.addEventListener('mouseenter', handleMouseEnter);

// Password
passInput.addEventListener('input', (e) => {
  passwordStrength(passInput);
  passMatch(passInput, confirmPassInput)
})

// Loading Animation Restart
loadingTextItems[loadingTextItems.length - 1].addEventListener('animationend', restartAnimation);

confirmPassInput.addEventListener('input', () => passMatch(passInput, confirmPassInput));

// Container
container.addEventListener('click', (e) => {
  const target = e.target;

  if (target) {
    handleAction(target);
  }

  // Options Section
  tosAgreement();
});

document.addEventListener('DOMContentLoaded', initSite);