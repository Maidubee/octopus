import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBEYZZTk2KX1QOx4E-nJULLzGj5scan9vk",
  authDomain: "octopus-2b256.firebaseapp.com",
  databaseURL: "https://octopus-2b256.firebaseio.com",
  projectId: "octopus-2b256",
  storageBucket: "",
  messagingSenderId: "758521877480",
  appId: "1:758521877480:web:4b65283a671e187a478a5d"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  login = async (email, password) => {
    const user = await this.auth.signInWithEmailAndPassword(email, password);
    if (!this.auth.currentUser.emailVerified) {
      alert("Not verified");
      this.auth.currentUser.sendEmailVerification();
    } else {
      const token = await this.auth.currentUser.getIdToken(true);
      return { user, token };
    }
  };

  sendPasswordResetEmail = async email => {
    await this.auth.sendPasswordResetEmail(email);
  };

  logout() {
    return this.auth.signOut();
  }

  register = async (name, email, password) => {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.auth.currentUser.sendEmailVerification();
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  };

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
