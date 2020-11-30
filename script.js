// Handle errors.
let handleError = function(err){
        console.log("Error: ", err);
};

// Query the container to which the remote stream belong.
let remoteContainer = document.getElementById("remote-container");


	let client = AgoraRTC.createClient({
			mode: "rtc",
			codec: "vp8",
		});

		client.init("b0d21d479a2d4f95a61d2acbca3c0679");


// Join a channel
client.join("006b0d21d479a2d4f95a61d2acbca3c0679IAD2Y8lQG52Et5DxUjotrJ2AqWHgpgeAhBlRhjXmCLgDmwx+f9gAAAAAEAA1BQ7X1F3GXwEAAQDRXcZf", "test", null, (uid)=>{
  // Create a local stream
}, handleError);


let localStream = AgoraRTC.createStream({
    audio: true,
    video: false,
});
// Initialize the local stream
localStream.init(()=>{
    // Play the local stream
    localStream.play("me");
    // Publish the local stream
    client.publish(localStream, handleError);
}, handleError);


client.on("stream-added", function(evt){
    client.subscribe(evt.stream, handleError);
});
// Play the remote stream when it is subsribed
client.on("stream-subscribed", function(evt){
    let stream = evt.stream;
    let streamId = String(stream.getId());
    addVideoStream(streamId);
    stream.play(streamId);
});

// Add video streams to the container.
function addVideoStream(elementId){
        // Creates a new div for every stream
        let streamDiv = document.createElement("div");
        // Assigns the elementId to the div.
        streamDiv.id = elementId;
        // Takes care of the lateral inversion
        streamDiv.style.transform = "rotateY(180deg)";
        // Adds the div to the container.
        remoteContainer.appendChild(streamDiv);
};

// Remove the video stream from the container.
function removeVideoStream(elementId) {
        let remoteDiv = document.getElementById(elementId);
        if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
};