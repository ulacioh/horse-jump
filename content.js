const getCurrentLocation = () => window.location;

const getVideoCurrentTime = () => {
  return document.querySelector('.ytp-time-current').textContent;
}

const currentTimeToSeconds = (currentTime) => {
  let strCurrentTimeArray = currentTime.split(':');

  let intCurrentTimeArray = strCurrentTimeArray.map((str) => {
    return parseInt(str);
  })

  switch (intCurrentTimeArray.length) {
    case 2:
      return intCurrentTimeArray.reduce((a, b) => (a * 60) + b);
    
    case 3:
      let seconds = 0;
      
      for (const index in intCurrentTimeArray) { 
        
        switch (index) {
          case '0':
            seconds += intCurrentTimeArray[index] * 3600;
            break;
        
          case '1':
            seconds += intCurrentTimeArray[index] * 60;
            break;

          case '2':
            seconds += intCurrentTimeArray[index];
            break;
        }
      
      }
      
      return seconds;
  }
}

const messageHandler = (message, sender, sendResponse) => {
  let response = {};

  response.title = document.title;
  response.location = getCurrentLocation();
  response.currentTimeText = getVideoCurrentTime();
  response.currentTimeSeconds = currentTimeToSeconds(response.currentTimeText);

  sendResponse(response);
}

chrome.runtime.onMessage.addListener(messageHandler);
