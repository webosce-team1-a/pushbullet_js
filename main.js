var token;
var devID;

function goback(){
        //window.history.back();
        location.href="index.html";
}

function login() {
        //token = document.getElementById("token");
        //PushBullet.APIKey= token.value;
        PushBullet.APIKey= "o.IWTQpSmMDgY4nakyuAc1ErJ7euO4QUih";

        	let res = PushBullet.devices();
        	devID = res.devices[0].iden;
	alert("login to PushBullet on WebOS");
    }

function send() {
        let msg = document.getElementById("msg");
        PushBullet.push("note", devID, null, {title: "MAG", body: msg.value});
    }

    function send_to() {
        let msg_to = document.getElementById("msg_to");
        let email = document.getElementById("email");
        document.getElementById("email").innerHTML = "send msg to : "+ email.value;

        PushBullet.push("link", null, email.value, {title: "MAG", body: msg_to.value});
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
                    var pushId = res.pushes[i].iden;
                    PushBullet.deletePush(pushId);
                }
                document.getElementById("history").innerHTML = "delete history";
            }
        });
    }

     function get_history() {
        PushBullet.pushHistory(function(err, res) {
            if(err){
                throw err;
            }
            else {
                let push=res.pushes[0].body;
                for (var i = 1; i < res.pushes.length; i++) {
                    push = push +" "+res.pushes[i].body;
                }
                document.getElementById("history").innerHTML = push;

            }
        });
     }

     function gonext(){
        location.href = "test.html";
     }
