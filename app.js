const mongoose = require('mongoose');
const admin="";  //admin name for database connection
const password="";  //password of the given admin for databse connection
const database="";    //name of database to connect to
const id = "";   //id of the person you want to find name, email and password of
const name= "";     //name of the person you want to find id of
const email = "";  // email of the person you want to find id of

const connection = mongoose.connect('mongodb+srv://'+admin+':'+password+'@mes-1.0avol.mongodb.net/'+database+'?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const userSchema = new mongoose.Schema({   //main schema
  Profile: {
    name: String,
    email: String,
    password: String,
  },
  Friends: [{
    type: String
  }],
  Chats: [{
    type: String
  }],
  Status: String,
})


const User = mongoose.model("User", userSchema);    //creating model according to schema

// const user = new User({
//   Profile:{
//     name: "Annie",
//     email: "map",
//     password: "al",
//   },
//   Friends: ["Maria","Ala"],
//   Chats: ["Chat1", "Chat2"],
//   Status: true,
// });

// user.save();



function findUserName(id){
  User.findById(id, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member.Profile.name);
    }
  })
};




function findUserEmail(id){
  User.findById(id, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member.Profile.email);
    }
  })
};

function findUserPassword(id){
  User.findById(id, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member.Profile.password);
    }
  })
};


function findUserId(name,email){
  User.findOne({"Profile.email": email, "Profile.name": name}, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member._id);
    }
  })
};

findUserName(id);
findUserEmail(id);
findUserPassword(id);
findUserId(name,email);
