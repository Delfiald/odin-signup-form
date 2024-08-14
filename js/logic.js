const signUpInputs = signUp.querySelectorAll('input');
const logInInputs = loginPage.querySelectorAll('input');
const users = [];

const signUpLogic = () => {
  if(isEmailExist()) return false;
  return true;
}

const addingUser = () => {
  const newUser = {};

  signUpInputs.forEach((input) => {
    const key = input.name;

    if(key === 'phone'){
      input.value = codeValue + input.value;
    }else if(key === 'email') {
      input.value = input.value.toLowerCase();
    }

    newUser[key] = input.value;
  })

  users.push(newUser);
}

const isEmailExist = () => {
  const inputEmail = signUpInputs[2].value.toLowerCase();
  return users.find((user) => {
    return user.email && user.email === inputEmail;
  }) !== undefined;
}

const logInLogic = () => {
  const inputEmail = logInInputs[0].value.toLowerCase();
  const inputPassword = logInInputs[1].value;
  return users.findIndex((user) => {
    return user.email && user.email === inputEmail && user.password && user.password === inputPassword;
  });
}

const setProfilePage = (userIndex) => {
  const profileName = profilePage.querySelector('.profile-name');
  const profileEmail = profilePage.querySelector('.profile-email');
  const profilePhone = profilePage.querySelector('.profile-phone');

  profileName.textContent = users[userIndex].first_name + ' '+ users[userIndex].first_name;
  profileEmail.textContent = users[userIndex].email;
  profilePhone.textContent = users[userIndex].phone;
}