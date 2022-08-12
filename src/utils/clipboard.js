// 剪切张贴帮助类

const Clipboard = ((window, document, navigator) => {
  let textArea;
  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }
  function createTextArea(text) {
    textArea = document.createElement('textArea');
    textArea.value = text;
    textArea.readOnly = true;
    document.body.appendChild(textArea);
  }
  function selectText() {
    let range;
    let selection;
    const number = 999999;
    if (isOS()) {
      range = document.createRange();
      range.selectNodeContents(textArea);
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textArea.setSelectionRange(0, number);
    } else {
      textArea.select();
    }
  }
  function copyToClipboard() {
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  const copy = text => {
    createTextArea(text);
    selectText();
    copyToClipboard();
  };
  return {
    copy,
  };
})(window, document, navigator);

export default Clipboard;
