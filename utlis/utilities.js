export   function isValidURL(urlData) {
    try {
        new URL(urlData)
        return true;
    }
    catch (_) {
        return false;
    }
}

export function UnderDevelopmentFeature() {
    alert("This feature is currently under Development , HOLD TIGHT !");
  }