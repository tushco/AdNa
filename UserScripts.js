//********************FIND FUNCTIONS

function findUserName(id, user_model){
  user_model.findById(id, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member.Profile.name);
    }
  })
};




function findUserEmail(id, user_model){
  user_model.findById(id, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member.Profile.email);
    }
  })
};

function findUserPassword(id,user_model){
  user_model.findById(id, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member.Profile.password);
    }
  })
};


function findUserId(email, user_model){
  user_model.findOne({"Profile.email": email}, 'Profile',function(err, member){
    if(err){
      console.log(err);
    }else{
      console.log(member._id);
    }
  })
};


// //********************END OF FIND FUNCTIONS
//

// **********************ADD FUNCTIONS

function emailAvailable(email, model){
    var available;
    return model.findOne({"Profile.email": email}, 'Profile').then(function(hit){
        if (hit == null){
            available = true;
            return available;
        } else {
            available = false;
            return available;
        }
    }).catch(function(error){
        console.log(error);
    })
}

function pWordAvailable(password, model){
    var available;
    return model.findOne({"Profile.password": password}, 'Profile').then(function(hit){
        if (hit == null){
            available = true;
            return available;
        } else {
            available = false;
            return available;
        }
    }).catch(function(error){
        console.log(error);
    })
}

async function createUser(name, email, password, model){
    let promises = [];
    promises.push(emailAvailable(email, model).then(function (result) {
        return result
    }))
    promises.push(pWordAvailable(password, model).then(function (result) {
        return result
    }))


    Promise.all(promises).then(result => {
        if (result[0] === true && result[1] === true) {
            console.log("can create user!");
            const user = new model({
                Profile: {
                    name: name,
                    email: email,
                    password: password,
                },
                Friends: [""],
                Chats: [""],
                Status: "Online"
            });
            user.save();
            console.log("User created!")
        }
        else{
            console.log("Email or password unavailable.")
        }

    });
}


// **********************END OF ADD FUNCTIONS
// //********************UPDATE FUNCTIONS

//adds a person to user's friends
function updateUserFriends(user_id, friend_id, user_model){
  user_model.updateOne({_id:user_id},{$addToSet:{Friends:friend_id}},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Friend added!");
    }
  })
};

// adds a chat to user's chats + adds a person to given chat's members
function updateUserChats(user_id, chat_id, user_model, chat_model){
  user_model.updateOne({_id:user_id},{$addToSet:{Chats:chat_id}},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Chat added!");
    }
  })
  chat_model.updateOne({_id:chat_id},{$addToSet:{members:user_id}},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("The member added to chat!");
    }
  })
};





// //********************END OF UPDATE FUNCTIONS
//
// //********************DELETE FUNCTIONS

// delete the user from Users, delete the user from any chats that he is a member of and deletes them from list of friends of other users
function deleteUser(user_id, user_model, chat_model){
  user_model.findByIdAndDelete(user_id,function(err){
    if(err){
      console.log(err);
    }else{
      user_model.updateMany({Friends:user_id},{$pull:{Friends:user_id}}, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("User deleted from all friends' lists");
        }
      });
      chat_model.updateMany({members:user_id},{$pull:{members:user_id}}, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("User deleted from all the chats");
        }
      })
      console.log("The user was successfully deleted.");
    }
  })
};

// deletes the chat from Chats + deletes chat from member's chats
function deleteChat(chat_id, model_chat, user_model){
  model_chat.findByIdAndDelete(chat_id,function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Chat successfully deleted");
      user_model.updateMany({Chats:chat_id},{$pull:{Chats:chat_id}}, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Chat deleted from all members' lists!");
        }
      })
    }
  })
}


// delete friend from user's friends
function deleteFriend(user_id,friend_id, user_model){
  user_model.findByIdAndUpdate(user_id,{$pull:{Friends:friend_id}},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Friend deleted!");
    }
  })
}

// delete member from chat and delete chat from chats of the user
function deleteMember(user_id,chat_id, chat_model, user_model){
  chat_model.findByIdAndUpdate(chat_id,{$pull:{members:user_id}},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Member deleted from the chat!");
      user_model.findByIdAndUpdate(user_id,{$pull:{Chats:chat_id}}, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Chat deleted from user's chats");
        }
      })
    }
  })
}

//************************END OF DELETE FUNCTIONS

module.exports={
  findUserName,
  findUserPassword,
  findUserEmail,
  findUserId,
  createUser,
  updateUserFriends,
  updateUserChats,
  deleteMember,
  deleteFriend,
  deleteChat,
  deleteUser,
};
