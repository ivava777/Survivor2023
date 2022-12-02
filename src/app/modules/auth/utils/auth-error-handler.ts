export function convertMessage(error: any, action = 'Login'): string {
  const code = error['code'];
  switch (code) {
    case 'auth/user-disabled': {
      return 'Sorry your user is disabled.';
    }
    case 'auth/user-not-found': {
      return 'Sorry user not found.';
    }
    case 'auth/wrong-password': {
      return 'The password is invalid';
    }
    case 'auth/email-already-in-use': {
      return 'There is already a user with that email registered';
    }
    default: {
      return `${action} error try again later.`;
    }
  }
}
