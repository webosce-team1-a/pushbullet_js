var token;
var devID;
var login_flag=false;


window.onloded

function set_token(){
	PushBullet.APIKey= token.value;
    let res = PushBullet.devices();
    devID = res.devices[0].iden;	
}
window.onload=set_token;

function login() {
    token = document.getElementById("token");
    PushBullet.APIKey= token.value;

    login_flag =true;

    let res = PushBullet.devices();
    devID = res.devices[0].iden;
    alert("login to PushBullet on WebOS");
    location.href="../frame.html";


}


function sendMe() {
    let msg = document.getElementById("msg");
    PushBullet.push("note", devID, null, {title: "MSG", body: msg.value});
}

function sendMeFile() {
    document.getElementById('files').addEventListener('change', function(e) {
        var file = this.files[0];
        PushBullet.pushFile(devID, null, file, "pushing files", function(err, res) {
            if(err) {
                throw err;
            } else {
            }
        });
    });
}



function sendFriends() {
    let msg_to = document.getElementById("msg");
    let email = document.getElementById("email");
    PushBullet.push("link", null, email.value, {title: "MSG", body: msg_to.value});
}

function get_user() {
    var res = PushBullet.user();
    document.getElementById("user").innerHTML = "user : "+ res.email ;
}

function get_push(i) {
    PushBullet.pushHistory(function(err, res) {
        if(err){
            throw err;
        }
        else {
            if( i< res.pushes.length)
                return res.pushes[i].body;
        }
    });
}

function del_history() {
    document.getElementById("history").innerHTML = "delete ";
    PushBullet.pushHistory(function(err, res) {
        if(err) {
            throw err;
        } else {
            let res =PushBullet.pushHistory();
            for(var i=0; i<res.pushes.length; i++) {
                if(res.pushes[i].active) {
                    var pushId = res.pushes[i].iden;
                    PushBullet.deletePush(pushId);
                }
                else
                    break;
            }
            document.getElementById("history").innerHTML = "delete history";
        }
    });
}
/*
function get_history() {
    PushBullet.pushHistory(function(err, res) {
        if(err){
            throw err;
        }
        else {
            let push=res.pushes[0].body;
            for (var i = 1; i < res.pushes.length; i++) {
                if(res.pushes[i].active)
                    push = push +'\n'+ res.pushes[i].body;

                else
                    break;
            }
            document.getElementById("history").innerHTML = push;
        }
    });
}
*/

//
function gonext(){
    location.href = "test.html";
}

function goback(){
    //window.history.back();
    location.href="../frame.html";
}
