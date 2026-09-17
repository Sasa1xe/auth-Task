import express from "express";
import bcrypt from "bcrypt";    
import { createDB } from "../db.js";
import { validateBody } from "../validation Middlewares/validateBody.js";
import { registerSchema } from "../schemas/auth/register.schema.js";

export const authRouter = express.Router();
const db = createDB();

//Register
authRouter.post("/register", validateBody(registerSchema), async (req, res) => {
  // 1- validate -> DONE
  // 2- Hash Password
  // Check if the email is Unique
  //    ---> 3- if email exist -> Send (422) "email is already in use"
  //    ---> 4- if email doesn't exist -> Add Author to the DB  
  // 5- send Response of completion
  
  // 1- DONE by validateBody middleware 
  
  // ### 2 ###
  const hashedPass = await bcrypt.hash(req.body.password,10);
  
  const authAuthors = await db.getAll("authAuthors");
  const existingAuthor = authAuthors.find((u) => u.email === req.body.email);
  
  
  // ------------Checking------------
  // ### 3 ###
  if (existingAuthor) {
    res.status(422).json({
      error: "Author with the same Email already exist!",
    });
  } else {
    // ### 4 ###
    await db.create("authAuthors", {
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPass,
      is_verified: false,
    });
  }
  // --------------------------------
  
  // ### 5 ###
  res.status(201).json({
    message: "you've been Successfully Registered",
  });
});

// Login

// 1- Validate requset's Body
// 2- get user by email
// 3- find that email in the DB
// 4- if not found ---> error (422)
// 5- if found ---> continue
// 6- compare Passwords (HASHED body Password vs existing HASHED Password in DB)
//

// Logout
