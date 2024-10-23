import { db } from "../Firebase"; // Ensure the path is correct
import { addDoc, collection, updateDoc, getDocs } from "firebase/firestore";
var User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
let users = [];
// Add user to Firestore
export const Add_user = async (user) => {
  try {
    // Add a new document with the user's data
    const docRef = await addDoc(collection(db, "Users"), {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password, // Consider hashing the password before saving
    });

    // Update the document with its own ID
    await updateDoc(docRef, { id: docRef.id });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Login function
export const login = async (user) => {
  try {
    // Retrieve documents from Firestore collection
    const querySnapshot = await getDocs(collection(db, "Users"));
    // Loop through documents and filter by userType
    querySnapshot.forEach((doc) => {
      if (
        doc.data().email === user.email &&
        doc.data().password === user.password
      ) {
        User = {
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          password: doc.data().password,
        };
        users.push(User); // Add admin users to array
      } else {
        console.log("Invalid email or password");
      }
    });

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Logout function
export const logout = () => {
  User = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // Remove user data from local storage
  localStorage.removeItem("user");
};
