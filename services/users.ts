import { db } from "../Firebase.ts"; // Ensure the path is correct
import { addDoc, collection, updateDoc, getDocs } from "firebase/firestore";

// Define a type for the User
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Initialize an empty user
let currentUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// Users array
let users: User[] = [];

// Add user to Firestore
export const Add_user = async (user: Omit<User, 'id'>): Promise<void> => {
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
export const login = async (user: Pick<User, 'email' | 'password'>): Promise<void> => {
  try {
    // Retrieve documents from Firestore collection
    const querySnapshot = await getDocs(collection(db, "Users"));
    
    // Loop through documents and filter by userType
    querySnapshot.forEach((doc) => {
      const userData = doc.data() as Omit<User, 'id'>; // Cast doc.data() to User without id
      if (userData.email === user.email && userData.password === user.password) {
        currentUser = {
          id: doc.id,
          ...userData,
        };
        users.push(currentUser); // Add logged-in user to array
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        console.log("Invalid email or password");
      }
    });
  } catch (error) {
    console.error("Error reading document: ", error);
  }
};

// Logout function
export const logout = (): void => {
  currentUser = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  // Remove user data from local storage
  localStorage.removeItem("user");
};
