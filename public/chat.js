//Make connection
let socket = io.connect();

$(document).ready(function(){
    $("#send").on('click', function(){
        let message = $("#message").val();
        let username = $("#username").val();
        socket.emit("chat", {
            message: message,
            username: username
        });
        $("message").val("");
    });

    $("#message").keypress(function(){
        let username = $("#username").val();
        socket.emit("typing", username)
    });

    //Listen for Socket events
    socket.on("typing", function(data){
        $("#feedback").html(`<p><em>${data} is typing...</em></p>`)
    });

    socket.on("chat", function(data){
        $("#feedback").html("");
        $("#output").append(`<p>
        <strong>${data.username}</strong>: ${data.message}
        </p>`);
    });
});