function findUserName(id, model){
    model.findById(id, 'Profile',function(err, member){
        if(err){
            console.log(err);
        }else{
            console.log(member.Profile.name);
        }
    })
}
function findUserEmail(id, model){
    model.findById(id, 'Profile',function(err, member){
        if(err){
            console.log(err);
        }else{
            console.log(member.Profile.email);
        }
    })
}

function findUserPassword(id, model){
    model.findById(id, 'Profile',function(err, member){
        if(err){
            console.log(err);
        }else{
            console.log(member.Profile.password);
        }
    })
}


async function findUserId(email, model){
    model.findOne({"Profile.email": email}, 'Profile').then(
        function(member){
            console.log(member._id);
            return member._id;
        }, function(reason){
            console.log(reason);
            return reason;
        });

}

function deleteUser(id_delete, model){
    model.findByIdAndDelete(id_delete,function(err){
        if(err){
            console.log(err);
        }else{
            console.log("The user was successfully deleted.");
        }
    })
}

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

module.exports = {
    createUser,
    findUserName,
    findUserEmail,
    findUserId,
    findUserPassword,
    deleteUser

}