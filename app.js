const UserScripts = require("./js_scripts/UserScripts")
const mongoose = require("mongoose")
const admin="Website";  //admin name for database connection
const password="q4gCRfkyzB4m85GR";  //password of the given admin for database connection
const database="main";    //name of database to connect to
const id = "5fe64207519828840031e059";   //id of user Jasmine, sample@gmail.com, 678910

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


//UserScripts.createUser("Adrien", "myemail@gmail.com","safe_password" , User);
UserScripts.findUserName(id, User);
UserScripts.findUserEmail(id, User);
UserScripts.findUserPassword(id, User);
UserScripts.findUserId("myemail@gmail.com", User);  //Doesn't work in quick succession with createUser
UserScripts.deleteUser("5fe7566f98fbb80ad443f079", User);