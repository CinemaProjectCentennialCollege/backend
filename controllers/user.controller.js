const { generateAccessToken } = require('../config/authenticator');
const User = require('../models/user.model')
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const userName = req.body.userName
  const password = req.body.password

  if (!firstName) {
    return res.status(400).send({
      message: "First name cannot be empty"
    });
  }
  if (!lastName) {
    return res.status(400).send({
      message: "Last name name cannot be empty"
    });
  }
  if (!email) {
    return res.status(400).send({
      message: "Email cannot be empty"
    });
  }
  if (!userName) {
    return res.status(400).send({
      message: "User name cannot be empty"
    });
  }
  
  if (!password) {
    return res.status(400).send({
      message: "Password cannot be empty"
    });
  }

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    userName: userName,
    password:  bcrypt.hashSync(password, 10)
  });

  await user.save()
    .then(() => {
      const authToken = generateAccessToken(email)
      return res.send({
        message: "Registration successful",
        user: user,
        token: authToken
      });
    })
    .catch(error => {
        let errorMessage = "An error occurred";
        if (error.code === 11000) {
          const field = Object.keys(error.keyValue)[0];
          if (field === "email") {
            errorMessage = "Email already exists. Please choose a different email.";
          } else if (field === "userName") {
            errorMessage = "Username already exists. Please choose a different username.";
          }
        }
        return res.status(400).json({
          message: errorMessage,
          error: error,
        });
      });
};


exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    const user = await User.findOne({ email: email });   
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);    
    if (passwordMatch) {
      const authToken = generateAccessToken(email)
      // return ({ message: "Login Successful" });
      res.send({
        message: "Login Successful",
        user: user,
        token: authToken
      });
    }
    else {
      return res.status(400).json({
        message: "Your Password is Incorrect",
      }
      )
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Something went wrong',
      error: err,
    });
  }
};


exports.findOne = async (req, res) => {
  const username = req.body.username;
  try {
    const user = await User.findOne({ userName: username });
    console.log('User:', user);
    if (!user) {
      return ({ message: "User not found" });
    } else {
      return user
    }    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Something went wrong',
      error: err,
    });
  }
};
  

exports.findAll = (req, res) =>{
  User.find().then(users => {
      res.send(users)
  }
  ).catch(err => {
      res.status(500).send({
          'message' : 'Something went wrong!!', 'error' : err
      })
  })
}
  
  

exports.update = (req,res) =>{
    if (!req.body.email){
        return res.status(400).send({
            message:"email can not be empty"
        })
    }
    if (!req.body.userName){
        return res.status(400).send({
            message:"user name can not be empty"
        })
    }
    if (!req.body.password){
        return res.status(400).send({
            message:"password can not be empty"
        })
    }
    const id =req.params.id;

    User.findByIdAndUpdate(id, {
        email : req.body.email,
        userName: req.body.userName,
        password: req.body.password
    },{new:true}).then(user =>{
        res.send(user)
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.delete = (req,res) =>{
    const id =req.params.id;
    User.findByIdAndRemove(id).then(user =>{
        res.send({
            'message':'Removed!!'
        })
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}