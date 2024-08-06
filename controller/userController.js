const crypto = require('crypto');
const users = [
    {
        "userId": "6c589c01-8634-4c20-818d-6a85ea93f389",
        "name": "Mountain",
        "type": "Dog",
        "breed": "RottweilerXChowchow",
        "age": 5,
        "cute": true
    },
    {
        "userId": "6c589c01-8634-4c20-818d-6a85ea93f38a",
        "name": "Luna",
        "type": "Cat",
        "breed": "Ragdoll",
        "age": 5,
        "cute": false
    },
    {
        "userId": "6c589c01-8634-4c20-818d-6a85ea93f384",
        "name": "Kopi",
        "type": "Dog",
        "breed": "Mini Pinscher",
        "age": 5,
        "cute": true
    },
    {
        "userId": "6c589c01-8634-4c20-818d-6a85ea93f386",
        "name": "bubear",
        "type": "WildDogs",
        "breed": "Kurimaw",
        "age": 23,
        "cute": true
    }

]

exports.getAllUsers = (req,res) =>{
    res.status(200).send(users);
}

exports.getUser = (req,res) => {
    const getUserById = users.find(user => user.userId == req.params.userId)
    console.log(req.params.id);
    if(!getUserById){
        return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(getUserById);
}

exports.createUser = (req,res) => {
    const {name, type, breed, age, cute} = req.body;
    if(!name){
        return res.status(300).json({message:'Name is required for this cutiepie'});
    }

    const userId = crypto.randomUUID();

    users.push({
        userId,
        name,
        type,
        breed,
        age,
        cute
    });
    res.status(201).json({message:'Successfully addded User', userId});
}

exports.updateUser = (req,res) => {
    const user = users.find(user => user.userId == req.params.userId)
    const {name, type, breed, age, cute} = req.body;
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    if(name){
        user.name = name;
    }
    if(type){
        user.name = type;
    }
    if(breed){
        user.name = breed;
    }
    if(age){
        user.name = age;
    }
    if('cute' in req.body){
        user.cute = cute;
    }
    res.status(201).json({message:'Successfully update User'});
}

exports.deleteUser = (req,res) => {
    const userIndex = users.findIndex(user => user.userId == req.params.userId)
    if(userIndex === -1){
        return res.status(404).json({message:"User not found"});
    }
    users.splice(userIndex, 1);
    res.status(200).json({message:"User has been deleted"});
}