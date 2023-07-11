const Contact = require('../models/contact.model')

exports.findAll = (req, res) =>{
    Contact.find().then(contacts => {
        res.send(contacts)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}


exports.create = (req, res) => {
  if (!req.body.email) {
    return res.status(400).send({
      message: "Email cannot be empty"
    });
  }
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name cannot be empty"
    });
  }
  if (!req.body.phone) {
    return res.status(400).send({
      message: "Phone cannot be empty"
    });
  }

  const contact = new Contact({
    email: req.body.email,
    name: req.body.name,
    phone:  req.body.phone
  });

  contact.save()
    .then(data=>res.send(data))
    .catch(error => {
        let errorMessage = "An error occurred";
        if (error.code === 11000) {
          const field = Object.keys(error.keyValue)[0];
          if (field === "email") {
            errorMessage = "Email already exists. Please choose a different email.";
          } 
        }
        res.status(500).send({
            message:"someting went wrong while inserting data"
        })
    });
};

exports.findById = (req, res) => {
    const contactId = req.params.id;
  
    Contact.findById(contactId)
      .then(contact => {
        if (!contact) {
          res.status(404).json({ message: 'Contact not found' });
        } else {
          res.json(contact);
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Something went wrong', error: err });
      });
  };

exports.findOne = (req, res) => {
    const email = req.body.email;

    Contact.findOne({ email: email })
    .then(contact => {
        if(!contact){
            res.status(400).send(
                {
                    'message' : 'Contact not available', 
                    'error' : err
                }
            )
        }
        res.send(contact)
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
    if (!req.body.name){
        return res.status(400).send({
            message:"name can not be empty"
        })
    }
    if (!req.body.phone){
        return res.status(400).send({
            message:"phone can not be empty"
        })
    }
    const id =req.params.id;

    Contact.findByIdAndUpdate(id, {
        email : req.body.email,
        name: req.body.name,
        phone: req.body.phone
    },{new:true}).then(contact =>{
        res.send(contact)
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.delete = (req,res) =>{
    const id =req.params.id;
    Contact.findByIdAndRemove(id).then(contact =>{
        res.send({
            'message':'Removed!!'
        })
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}