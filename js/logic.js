const signUpInputs = signUp.querySelectorAll('input');
const logInInputs = loginPage.querySelectorAll('input');
const users = [];

const signUpLogic = () => {
  if(isEmailExist()) return false;
  return true;
}

const addingUser = async () => {
  const newUser = {};

  for (const input of signUpInputs) {
    const key = input.name;

    if (key === 'phone') {
      input.value = codeValue + input.value;
    } else if (key === 'email') {
      input.value = input.value.toLowerCase();
    } else if (key === 'password') {
      const encoder = new TextEncoder();
      const data = encoder.encode(input.value);


      const hash = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hash));
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
      
      input.value = hashHex;
    }

    newUser[key] = input.value;
  }

  users.push(newUser);
}


const isEmailExist = () => {
  const inputEmail = signUpInputs[2].value.toLowerCase();
  return users.find((user) => {
    return user.email && user.email === inputEmail;
  }) !== undefined;
}

const logInLogic = async () => {
  const inputEmail = logInInputs[0].value.toLowerCase();
  const inputPassword = logInInputs[1].value;
  
  const encoder = new TextEncoder();
  const data = encoder.encode(inputPassword);
  
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  const userIndex = users.findIndex((user) => {
    return user.email && user.email === inputEmail && user.password && user.password === hashHex;
  });

  return userIndex;
}

const setProfilePage = (userIndex) => {
  const profileName = profilePage.querySelector('.profile-name');
  const profileEmail = profilePage.querySelector('.profile-email');
  const profilePhone = profilePage.querySelector('.profile-phone');

  profileName.textContent = users[userIndex].first_name + ' '+ users[userIndex].last_name;
  profileEmail.textContent = users[userIndex].email;
  profilePhone.textContent = users[userIndex].phone;
}