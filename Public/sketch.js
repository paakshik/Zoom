const socket = io('/');
const peers = {};
const videoGrid = document.getElementById('videogrid')

const myVideo = document.createElement('video')
myVideo.muted = true;
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})

let myVideoStream;
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
   myVideoStream = stream; 
const myPeer = new Peer(undefined,{host:"/",port:"443"})
    myPeer.on('open',id=>{
        socket.emit('join-room', Room_ID,id)
    })


  addVideoStream(myVideo, stream)
        
    myPeer.on('call' , call => {
const video =  document.createElement('video');
        call.on('stream',userVideoStream => {
        addVideoStream(video,userVideoStream)
        
        })
    call.answer(stream)
    
})
socket.on('user-connected', userId => {
connectToNewUser(userId,stream);

})


})


function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
      console.log(true)
    addVideoStream(video, userVideoStream)
  })
    
  call.on('close', () => {
    video.remove()
  })
    peers[userId] = call;x  
}

socket.on('user-disconnected', userId => {
if (peers[userId]) peers[userId].close()
})

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
       var input = document.getElementById('fname').value
     socket.emit('message',input)
    document.getElementById('fname').value= ""      
    }

});
socket.on('message_new', message => {
var mess = document.createElement("div");
mess.innerHTML = message
mess.setAttribute('id','Mess');
document.getElementById('message_box').appendChild(mess)
    
})

function muteUnmute(){
    
var enabled = myVideoStream.getAudioTracks()[0].enabled;
if (enabled === false){
    
    myVideoStream.getAudioTracks()[0].enabled = true;
    setUnmute()
}
    else{
        myVideoStream.getAudioTracks()[0].enabled= false;
        setMute();
    }

    };
function videoChange(){
    
var enabled =  myVideoStream.getVideoTracks()[0].enabled;
if (enabled === false){
    
     myVideoStream.getVideoTracks()[0].enabled = true;
    onVideo()
}
    else{
       myVideoStream.getVideoTracks()[0].enabled= false;
        offVideo();
    }

    };
    
function setUnmute(){
    var html = '<i class="fas fa-microphone"></i>';
    
    document.querySelector('.mute').innerHTML = html;
}
function setMute(){
    var html = '<i class="fas fa-microphone-slash"></i>';
      document.querySelector('.mute').innerHTML = html;
    
}
function onVideo(){
    var html = '<i class="fas fa-video"></i>';
    
    document.querySelector('.video').innerHTML = html;
}
function offVideo(){
    var html = '<i class="fas fa-video-slash"></i>';
      document.querySelector('.video').innerHTML = html;
    
}