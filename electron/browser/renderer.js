// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer;

function connectTest() {
  setInterval(function(){
    $.ajax({
        type: "GET",
        cache: false,
        url: "https://localhost",
        data: "",
        success: function() {
          ipc.send('redirect');
        },
        error: function() {
          console.log('connect failed, retry...')
        }
    });
  }, 1000)
};

connectTest();