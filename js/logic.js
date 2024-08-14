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
    }

    newUser[key] = input.value;
  })

  users.push(newUser);

  console.log(users);
}

const isEmailExist = () => {
  return users.find((user) => {
    return user.email && user.email === signUpInputs[2].value;
  }) !== undefined;
}

const logInLogic = () => {
  return users.findIndex((user) => {
    return user.email && user.email === logInInputs[0].value && user.password && user.password === logInInputs[1].value;
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