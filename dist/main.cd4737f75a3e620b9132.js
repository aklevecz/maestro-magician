(()=>{"use strict";var t=function(){function t(t,i,n,e){this._node=null,this._config={childList:!0,subtree:!0},this._classNamePartial=t,this._callback=i,this._node=this._findNode(),this._observer=new MutationObserver(this._callback.bind(this)),this._startObserving(),new MutationObserver(this._resetObserver.bind(this)).observe(document.body,e||this._config)}return t.prototype._resetObserver=function(){this._stopObserving(),this._setNode(),this._startObserving()},t.prototype._findNode=function(){var t=document.evaluate("//div[contains(@class, '"+this._classNamePartial+"')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);return 1===t.snapshotLength?t.snapshotItem(0):(console.error("Error: Could not find the given node or there is more than one"),null)},t.prototype._setNode=function(){this._node=this._findNode()},t.prototype._startObserving=function(){this._node&&this._observer.observe(this._node,this._config)},t.prototype._stopObserving=function(){this._observer.disconnect()},t}();function i(t){this.message=t}i.prototype=new Error,i.prototype.name="InvalidCharacterError";var n="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(t){var n=String(t).replace(/=+$/,"");if(n.length%4==1)throw new i("'atob' failed: The string to be decoded is not correctly encoded.");for(var e,o,r=0,s=0,a="";o=n.charAt(s++);~o&&(e=r%4?64*e+o:o,r++%4)?a+=String.fromCharCode(255&e>>(-2*r&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return a};function e(t){var i=t.replace(/-/g,"+").replace(/_/g,"/");switch(i.length%4){case 0:break;case 2:i+="==";break;case 3:i+="=";break;default:throw"Illegal base64url string!"}try{return function(t){return decodeURIComponent(n(t).replace(/(.)/g,(function(t,i){var n=i.charCodeAt(0).toString(16).toUpperCase();return n.length<2&&(n="0"+n),"%"+n})))}(i)}catch(t){return n(i)}}function o(t){this.message=t}o.prototype=new Error,o.prototype.name="InvalidTokenError";var r,s=function(t,i,n,e){t.innerText&&t.innerText.indexOf(i)>=0&&t.querySelectorAll(n).forEach((function(t){e(t)}))},a=function(){return(a=Object.assign||function(t){for(var i,n=1,e=arguments.length;n<e;n++)for(var o in i=arguments[n])Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);return t}).apply(this,arguments)};!function(t){t.BUTTON="button",t.INPUT="input"}(r||(r={}));var u={login:!1,signup:!1,loginButton:null,signupButton:null,confirmButton:null},h=function(){function t(t){this.attrs=null,this._authenticated=!1,this._uiState=u,this._window=t;var i=this.getTokenFromStorage();i&&(this.attrs=i,this._authenticated=!0,this._userIdentify()),new MutationObserver(this.checkForUser.bind(this)).observe(document.body,{childList:!0,subtree:!0}),this._boundOnConfirmButtonClick=this._onConfirmEmailButtonClick.bind(this),this._boundOnSignupButtonClick=this._onSignupButtonClick.bind(this)}return t.prototype.getTokenFromStorage=function(){var i=Object.keys(localStorage).find((function(i){return i.includes(t.TOKEN_PARTIAL)})),n=localStorage.getItem(i);return n?function(t,i){if("string"!=typeof t)throw new o("Invalid token specified");var n=!0===(i=i||{}).header?0:1;try{return JSON.parse(e(t.split(".")[n]))}catch(t){throw new o("Invalid token specified: "+t.message)}}(n):null},t.prototype.checkForUser=function(t){var i,n,e=this.getTokenFromStorage();e&&!this._authenticated?(this.attrs=e,this._authenticated=!0,this._userIdentify(),this._uiState.login&&(i=this.attrs.email,n=this.attrs.name,this._window.analytics.track("Account Logged In - Client",{email:i,username:n})),this._uiState=u):e||(this._authenticated=!1,this.attrs=null,this._lookForModal(t))},t.prototype._lookForModal=function(i){for(var n=0,e=i;n<e.length;n++){var o=e[n].target.parentElement;s(o,t.SIGNUP_BUTTON_INNERTEXT,r.BUTTON,this._findSignupButton.bind(this)),s(o,t.LOGIN_BUTTON_INNERTEXT,r.BUTTON,this._findLoginButton.bind(this)),s(o,t.CONFIRM_EMAIL_BUTTON_INNERTEXT,r.BUTTON,this._findConfirmEmailButton.bind(this))}},t.prototype._findLoginButton=function(i){i.innerText===t.LOGIN_BUTTON_INNERTEXT&&(this._uiState={login:!0,signup:!1,loginButton:i})},t.prototype._findSignupButton=function(i){i.innerText===t.SIGNUP_BUTTON_INNERTEXT&&(this._uiState={login:!1,signup:!0,signupButton:i},this._uiState.signupButton.addEventListener("click",this._boundOnSignupButtonClick))},t.prototype._onSignupButtonClick=function(){var i=document.getElementsByName("name")[0].value,n=document.getElementsByName("email")[0].value,e=function(t,i,n){var e=t.evaluate("//"+i+"[contains(@class, '"+n+"')]",t.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);return 1===e.snapshotLength?e.snapshotItem(0):(console.error("Error: Could not find the given node or there is more than one"),null)}(document,r.INPUT,t.CHECKBOX_CLASS_PARTIAL).checked;this._uiState.name=i,this._uiState.email=n,this._uiState.emailOptin=e,this._uiState.signupButton.removeEventListener("click",this._boundOnSignupButtonClick)},t.prototype._findConfirmEmailButton=function(i){i.innerText===t.CONFIRM_EMAIL_BUTTON_INNERTEXT&&(this._uiState.confirmButton&&this._uiState.confirmButton.removeEventListener("click",this._boundOnConfirmButtonClick),this._uiState=a(a({},this._uiState),{confirmButton:i}),this._uiState.confirmButton.addEventListener("click",this._boundOnConfirmButtonClick))},t.prototype._onConfirmEmailButtonClick=function(){var t,i,n;this._uiState.email&&this._uiState.name&&(t=this._uiState.email,i=this._uiState.name,n=this._uiState.emailOptin,this._window.analytics.track("Account Created - Client",{authProvider:"email",email:t,username:i,emailOptin:n}))},t.prototype._userIdentify=function(){var t,i,n,e,o,r;t=this.attrs._id,i=this.attrs.created,n=this.attrs.email,e=this.attrs.marketingOptin,o=this.attrs.modified,r=this.attrs.name,this._window.analytics.identify(t,{createdAt:new Date(i),email:n,emailOptin:e,modifiedAt:o,username:r}),this._applyWindowVarsForOverlays()},t.prototype._applyWindowVarsForOverlays=function(){this._window.userDisplayName=this.attrs.name,this._window.userAccountId=this.attrs._id,this._window.userDisplayNameSavedTime=Date.now(),this._window.userEmail=this.attrs.email,this._window.modifiedAt=this.attrs.modified,this._window.service=this.attrs.service,this._window.roles=this.attrs.roles,this._window.siteId=this.attrs.siteId,this._window.created=this.attrs.created,this._window.iat=this.attrs.iat,this._window.exp=this.attrs.exp,this._window.subscriptions=this.attrs.subscriptions,this._window.uid=this.attrs.uid},t.TOKEN_PARTIAL="accessToken",t.CHECKBOX_CLASS_PARTIAL="Checkbox__Input",t.SIGNUP_BUTTON_INNERTEXT="SIGN UP",t.LOGIN_BUTTON_INNERTEXT="LOG IN",t.CONFIRM_EMAIL_BUTTON_INNERTEXT="CONFIRM EMAIL",t}(),c="ADD TO CART",d=["QtyInputWrapper","StyledQuantity"],l=function(t){return t.style.display="none"},_=function(t){t.innerText===c&&l(t)},p=function(t){d.forEach((function(i){t.className.indexOf(i)>=0&&l(t)}))},f=function(t){for(var i=0,n=t;i<n.length;i++){var e=n[i].target.parentElement;e&&(s(e,c,"button",_),s(e,"Quantity","div",p))}};console.log("Magic will happen"),document.addEventListener("DOMContentLoaded",(function(){console.log("Making things disappear..."),new t("SidebarContainer",f,window),new h(window)}))})();