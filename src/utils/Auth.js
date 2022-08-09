export function autorize(email, password) {
  fetch('https://auth.nomoreparties.co/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: 'asdfasdfasdf',
      email: 'asdfjklksjdfhfjhf@asdf.as',
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}
