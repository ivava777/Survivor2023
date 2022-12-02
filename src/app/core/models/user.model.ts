export class User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;

  constructor(data: any) {
    this.uid = data.uid;
    this.email = data.email;
    this.displayName = data.displayName;
    this.photoURL = data.photoURL;
    this.emailVerified = data.emailVerified;
  }
}
