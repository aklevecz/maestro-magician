(()=>{"use strict";var t=function(){function t(t,e){this._node=null,this._config={childList:!0,subtree:!0},this._classNamePartial=t,this._callback=e,this._node=this._findNode(),this._observer=new MutationObserver(this._callback.bind(this)),this._startObserving(),new MutationObserver(this._resetObserver.bind(this)).observe(document.body,{childList:!0})}return t.prototype._resetObserver=function(){this._stopObserving(),this._setNode(),this._startObserving()},t.prototype._findNode=function(){var t=document.evaluate("//div[contains(@class, '"+this._classNamePartial+"')]",document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);return 1===t.snapshotLength?t.snapshotItem(0):(console.error("Error: Could not find the given node or there is more than one"),null)},t.prototype._setNode=function(){this._node=this._findNode()},t.prototype._startObserving=function(){this._node&&this._observer.observe(this._node,this._config)},t.prototype._stopObserving=function(){this._observer.disconnect()},t}(),e=function(t,e,n,i){t.innerText.indexOf(e)>=0&&t.querySelectorAll(n).forEach((function(t){i(t)}))},n="ADD TO CART",i=["QtyInputWrapper","StyledQuantity"],o=function(t){return t.style.display="none"},s=function(t){t.innerText===n&&o(t)},r=function(t){i.forEach((function(e){t.className.indexOf(e)>=0&&o(t)}))},a=function(t){for(var i=0,o=t;i<o.length;i++){var a=o[i].target.parentElement;a&&(e(a,n,"button",s),e(a,"Quantity","div",r))}};console.log("Magic will happen"),document.addEventListener("DOMContentLoaded",(function(){console.log("Making things disappear..."),new t("SidebarContainer",a)})),new t("SidebarContainer",a)})();