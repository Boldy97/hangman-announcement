const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const resultingText = 'wij krijgen een baby';
let displayedText = resultingText.replaceAll(/[a-z]/gi, '_');
let mistakeCounter = 0;

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function init() {
  $('#letters').text(displayedText);
  $('#text > span').text('raad de zin: klik de juiste letters aan!');
  $('#progress-bar > div > div').css('width', '100%');
  setTimeout(start, 5000);
  const buttons = $('#buttons');
  for(let i=0;i<alphabet.length;i++) {
    const button = $(`<button>${alphabet[i]}</button>`);
    button.click(click.bind(null, button, alphabet[i]));
    buttons.append(button);
  }
}

function start() {
  $('#text').hide();
  $('#progress-bar').hide();
  $('#buttons').show();
}

function click(button, letter) {
  let found = false;
  for(let i=0;i<resultingText.length;i++) {
    if(resultingText[i] === letter) {
      found = true;
      displayedText = displayedText.replaceAt(i, letter);
    }
  }
  if(!found) {
    mistakeCounter++;
  }
  $('#letters').text(displayedText);
  button.prop('disabled', true);
  if(displayedText === resultingText) {
    finished();
  }
}

function finished() {
  $('#buttons').hide();
  $('#footer').show();
  $('.confetti').show();
}


$(document).ready(init);
