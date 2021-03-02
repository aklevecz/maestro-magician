(()=>{"use strict";var t=function(){function t(t,n,e,i){this._node=null,this._config={childList:!0,subtree:!0},this._classNamePartial=t,this._callback=n,this._node=this._findNode(),this._observer=new MutationObserver(this._callback.bind(this)),this._startObserving(),new MutationObserver(this._resetObserver.bind(this)).observe(document.body,i||this._config)}return t.prototype._resetObserver=function(){this._stopObserving(),this._setNode(),this._startObserving()},t.prototype._findNode=function(){var t=document.evaluate("//div[contains(@class, '"+this._classNamePartial+"')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);return 1===t.snapshotLength?t.snapshotItem(0):(console.error("Error: Could not find the given node or there is more than one"),null)},t.prototype._setNode=function(){this._node=this._findNode()},t.prototype._startObserving=function(){this._node&&this._observer.observe(this._node,this._config)},t.prototype._stopObserving=function(){this._observer.disconnect()},t}();function n(t){this.message=t}n.prototype=new Error,n.prototype.name="InvalidCharacterError";var e="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(t){var e=String(t).replace(/=+$/,"");if(e.length%4==1)throw new n("'atob' failed: The string to be decoded is not correctly encoded.");for(var i,o,r=0,s=0,a="";o=e.charAt(s++);~o&&(i=r%4?64*i+o:o,r++%4)?a+=String.fromCharCode(255&i>>(-2*r&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return a};function i(t){var n=t.replace(/-/g,"+").replace(/_/g,"/");switch(n.length%4){case 0:break;case 2:n+="==";break;case 3:n+="=";break;default:throw"Illegal base64url string!"}try{return function(t){return decodeURIComponent(e(t).replace(/(.)/g,(function(t,n){var e=n.charCodeAt(0).toString(16).toUpperCase();return e.length<2&&(e="0"+e),"%"+e})))}(n)}catch(t){return e(n)}}function o(t){this.message=t}o.prototype=new Error,o.prototype.name="InvalidTokenError";var r=function(t,n,e,i){t.innerText&&t.innerText.indexOf(n)>=0&&t.querySelectorAll(e).forEach((function(t){i(t)}))},s=function(){return(s=Object.assign||function(t){for(var n,e=1,i=arguments.length;e<i;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t}).apply(this,arguments)},a=function(){function t(t){this.attrs=null,this._authenticated=!1,this._uiState={login:!1,signup:!1,loginButton:null,signupButton:null,confirmButton:null},this._window=t;var n=this.getTokenFromStorage();n&&(this.attrs=n,this._authenticated=!0,this._userIdentify()),new MutationObserver(this.checkForUser.bind(this)).observe(document.body,{childList:!0,subtree:!0}),this._boundConfirmButtonClick=this._onConfirmEmailButtonClick.bind(this)}return t.prototype.getTokenFromStorage=function(){var t=Object.keys(localStorage).find((function(t){return t.includes("accessToken")})),n=localStorage.getItem(t);return n?(console.log("user signed in"),function(t,n){if("string"!=typeof t)throw new o("Invalid token specified");var e=!0===(n=n||{}).header?0:1;try{return JSON.parse(i(t.split(".")[e]))}catch(t){throw new o("Invalid token specified: "+t.message)}}(n)):(console.log("user is not signed in"),null)},t.prototype.checkForUser=function(t){var n=this.getTokenFromStorage();n&&!this._authenticated?(this.attrs=n,this._authenticated=!0,this._userIdentify(),this._uiState.login&&window.analytics.track("Account Logged In - Client",{email:this.attrs.email,username:this.attrs.name})):n||(this._authenticated=!1,this.attrs=null,this._lookForModal(t))},t.prototype._lookForModal=function(t){for(var n=0,e=t;n<e.length;n++){var i=e[n].target.parentElement;r(i,"SIGN UP","button",this._findSignupButton.bind(this)),r(i,"LOG IN","button",this._findLoginButton.bind(this)),r(i,"CONFIRM EMAIL","button",this._findConfirmEmailButton.bind(this))}},t.prototype._findLoginButton=function(t){"LOG IN"===t.innerText&&(this._uiState={login:!0,signup:!1,loginButton:t},this._uiState.loginButton.addEventListener("click",this._onLoginButtonClick.bind(this)))},t.prototype._onLoginButtonClick=function(){this.getTokenFromStorage()},t.prototype._findSignupButton=function(t){"SIGN UP"===t.innerText&&(this._uiState={login:!1,signup:!0,signupButton:t},this._uiState.signupButton.addEventListener("click",this._onSignupButtonClick.bind(this)))},t.prototype._onSignupButtonClick=function(){var t=document.getElementsByName("name")[0].value,n=document.getElementsByName("email")[0].value,e=function(t,n,e){var i=t.evaluate("//input[contains(@class, 'Checkbox__Input')]",t.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);return 1===i.snapshotLength?i.snapshotItem(0):(console.error("Error: Could not find the given node or there is more than one"),null)}(document).checked;this._uiState.name=t,this._uiState.email=n,this._uiState.emailOptin=e,this._uiState.signupButton.removeEventListener("click",this._onSignupButtonClick.bind(this))},t.prototype._findConfirmEmailButton=function(t){"CONFIRM EMAIL"===t.innerText&&(this._uiState.confirmButton&&this._uiState.confirmButton.removeEventListener("click",this._boundConfirmButtonClick),this._uiState=s(s({},this._uiState),{confirmButton:t}),this._uiState.confirmButton.addEventListener("click",this._boundConfirmButtonClick))},t.prototype._onConfirmEmailButtonClick=function(){this._uiState.email&&this._uiState.name&&window.analytics.track("Account Created - Client",{authProvider:"email",email:this._uiState.email,username:this._uiState.name,emailOptin:this._uiState.emailOptin})},t.prototype._userIdentify=function(){this._window.analytics.identify(this.attrs._id,{createdAt:new Date(this.attrs.created),email:this.attrs.email,emailOptin:this.attrs.marketingOptin,modifiedAt:this.attrs.modified,username:this.attrs.name}),window.userDisplayName=this.attrs.name,window.userAccountId=this.attrs._id,window.userDisplayNameSavedTime=Date.now(),window.userEmail=this.attrs.email,window.modifiedAt=this.attrs.modified,window.service=this.attrs.service,window.roles=this.attrs.roles,window.siteId=this.attrs.siteId,window.created=this.attrs.created,window.iat=this.attrs.iat,window.exp=this.attrs.exp,window.subscriptions=this.attrs.subscriptions,window.uid=this.attrs.uid},t}(),u="ADD TO CART",c=["QtyInputWrapper","StyledQuantity"],d=function(t){return t.style.display="none"},l=function(t){t.innerText===u&&d(t)},h=function(t){c.forEach((function(n){t.className.indexOf(n)>=0&&d(t)}))},p=function(t){for(var n=0,e=t;n<e.length;n++){var i=e[n].target.parentElement;i&&(r(i,u,"button",l),r(i,"Quantity","div",h))}};console.log("Magic will happen"),document.addEventListener("DOMContentLoaded",(function(){console.log("Making things disappear..."),new t("SidebarContainer",p,window),new a(window)}))})();