const Actor = require('../models/actor.model')

exports.findAll = (req, res) =>{
    Actor.find().then(actors => {
        res.send(actors)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}


exports.create = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "name cannot be empty"
    });
  }
  if (!req.body.image) {
    return res.status(400).send({
      message: "image cannot be empty"
    });
  }
  const actor = new Actor({
    name: req.body.name,
    image:  req.body.image
  });

  actor.save()
    .then(data=>res.send(data))
    .catch(error => {
        res.status(500).send({
            message:"someting went wrong while inserting data"
        })
    });
};

exports.findById = (req, res) => {
    const actorId = req.params.id;
  
    Actor.findById(actorId)
      .then(actor => {
        if (!actor) {
          res.status(404).json({ message: 'Actor not found' });
        } else {
          res.json(actor);
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Something went wrong', error: err });
      });
  };

exports.findOne = (req, res) => {
    const name = req.body.name;

    Actor.findOne({ name: name })
    .then(actor => {
        if(!actor){
            res.status(400).send(
                {
                    'message' : 'Actor not available', 
                    'error' : err
                }
            )
        }
        res.send(actor)
    }
    ).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.update = (req,res) =>{
    if (!req.body.name){
        return res.status(400).send({
            message:"name can not be empty"
        })
    }
    if (!req.body.image){
        return res.status(400).send({
            message:"image can not be empty"
        })
    }
    const id =req.params.id;

    Actor.findByIdAndUpdate(id, {
        name: req.body.name,
        image: req.body.image
    },{new:true}).then(actor =>{
        res.send(actor)
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}

exports.delete = (req,res) =>{
    const id =req.params.id;
    Actor.findByIdAndRemove(id).then(actor =>{
        res.send({
            'message':'Removed!!'
        })
    }).catch(err => {
        res.status(500).send({
            'message' : 'Something went wrong!!', 'error' : err
        })
    })
}