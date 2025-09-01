export function isValidURL(urlData) {
  try {
    new URL(urlData);
    return true;
  } catch (_) {
    return false;
  }
}
export function UnderDevelopmentFeature() {
  alert("This feature is currently under Development , HOLD TIGHT !");
}

let timer;
export function SaveToLocalStorage(key, value) {
  if (timer) clearTimeout(timer); // to clear previous timeId not current one

  timer = setTimeout(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, 1500);
}
export function RetriveFromLocalStorage(key) { 

return  JSON.parse(localStorage.getItem(key))
}
