const errorImage = document.getElementById('error');
const qrCanvas = document.getElementById('qrcanvas');

const renderQRCode = (element, size, value) => {
  qrCanvas.classList.replace('hide', 'show');
  const qr = new QRious({element, size, value});
}

const showErrorMessage = () => {
  errorImage.classList.replace('hide', 'show');
}

const responseHandler = (response) => {
  renderQRCode(qrCanvas, 256, response.location.href);
}

const queryHandler = (tabs) => {
  if (tabs !== undefined && tabs.length >= 1) {
    chrome.tabs.sendMessage(tabs[0].id, {code: 0}, responseHandler);
  } else {
    showErrorMessage();
  }
}

const queryOptions = {
  active: true,
  currentWindow: true,
  url: "https://www.youtube.com/watch?v=*"
}

chrome.tabs.query(queryOptions, queryHandler);
