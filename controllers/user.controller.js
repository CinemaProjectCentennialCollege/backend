const User = require('../models/user.model')
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Email cannot be empty"
    });
  }
  if (!req.body.userName) {
    return res.status(400).send({
      message: "User name cannot be empty"
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "Password cannot be empty"
    });
  }

  const user = new User({
    email: req.body.email,
    userName: req.body.userName,
    password:  bcrypt.hashSync(req.body.password, 10)
  });

  user.save()
    .then(() => {
      res.send(`
        <script>
          alert('Sign-up successful! You can now log in.');
          window.location.href = '/login';
        </script>
      `);
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
        res.send(`
          <script>
            alert('Sign-up failed. ${errorMessage}');
            window.location.href = '/signup';
          </script>
        `);
      });
};


exports.findOne = (req, res) => {
  
    const username = req.body.username;
    const password = req.body.password;
  
    User.findOne({ userName: username })
      .then(user => {
        if (!user) {
          res.send(`
            <script>
              alert('The user does not exist. Try again.');
              window.location.href = '/login';
            </script>
          `);
        } else {
          // Compare the password with the encrypted password stored in the database
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              res.status(500).json({
                message: 'Something went wrong',
                error: err,
              });
            } else if (result) {
              // Passwords match
              req.session.user = { username: username};
              res.redirect('/business');
            } else {
              // Passwords don't match
              res.send(`
                <script>
                  alert('Wrong password, try again.');
                  window.location.href = '/login';
                </script>
              `);
            }
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err,
        });
      });
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