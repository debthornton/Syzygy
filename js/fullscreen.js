var elem = document.documentElement;
var fullscreenButton = document.getElementById('fullscreen-button');
var fullscreenIcon = document.getElementById('fullscreen-icon');
var loadingPage = document.getElementById('loading-page');
var heading = document.getElementById('heading');

function loadingPageRemover() {
    setTimeout(function() {
        heading.style.zIndex = '100'; 
    }, 4000);
}

window.addEventListener('load', function() {
    loadingPageRemover();
})

/* View in fullscreen */
function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    elem.classList.add('fullscreen');
    if(fullscreenIcon.className = 'fa fa-expand') {
      fullscreenIcon.className = 'fa fa-compress';
    }
  }
  
/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  elem.classList.remove('fullscreen');
  if(fullscreenIcon.className = 'fa fa-compress') {
    fullscreenIcon.className = 'fa fa-expand';
  }
}

fullscreenButton.addEventListener('click', function() {
    if(elem.classList.contains('fullscreen')) {
        closeFullscreen()
    } else {
        openFullscreen();
    }    
})