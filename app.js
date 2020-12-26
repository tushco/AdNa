const UserScripts = require("./js_scripts/UserScripts")
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const admin="";  //admin name for database connection
const password="";  //password of the given admin for databse connection
const database="";    //name of database to connect to
const connection = mongoose.connect('mongodb+srv://'+admin+':'+password+'@mes-1.0avol.mongodb.net/'+database+'?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const userSchema = new mongoose.Schema({   //main schema
  Profile: {
    name: String,
    email: String,
    password: String,
  },
  Friends: [{
    type: mongoose.ObjectId
  }],
  Chats: [{
    type: mongoose.ObjectId
  }],
  Status: String,
})

const chatSchema = new mongoose.Schema({
  members:[{
    type: mongoose.ObjectId
  }],
  messages:[{
    type: mongoose.ObjectId
  }],
  last_message:{
    read_by:[{
      type: mongoose.ObjectId
    }]
  }
})

const messageSchema = new mongoose.Schema({
  from: mongoose.ObjectId,
  text: String,
  Date: Date,
})


const User = mongoose.model("User", userSchema);    //creating model according to schema
const Chat = mongoose.model("Chat", chatSchema);
const Message = mongoose.model("Message", messageSchema);


//UserScripts.createUser("Adrien", "myemail@gmail.com","safe_password" , User);
// UserScripts.findUserName("5fe6460cf6c147df58f54666", User);
// UserScripts.findUserEmail("5fe6460cf6c147df58f54666", User);
// UserScripts.findUserPassword("5fe6460cf6c147df58f54666", User);
// UserScripts.findUserId("sampl@gmail.com", User);
// UserScripts.updateUserFriends("5fe6460cf6c147df58f54666","5fe64207519828840031e059",User);
// UserScripts.updateUserChats("5fe64207519828840031e059","5fe3565a372ee2bbabe0d973",User,Chat)
// UserScripts.deleteMember("5fe64207519828840031e059","5fe3565a372ee2bbabe0d973",Chat,User);
// UserScripts.deleteFriend("5fe6460cf6c147df58f54666","5fe64207519828840031e059",User);
// UserScripts.deleteChat("5fe79af5b20137934339bf03",Chat,User);
// UserScripts.deleteUser("5fe79c141665ae6e99f098e4",User,Chat);
