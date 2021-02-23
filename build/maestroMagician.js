var MaestroMagician = /** @class */ (function () {
    function MaestroMagician(classNamePartial, callback) {
        this._config = { childList: true, subtree: true };
        this._classNamePartial = classNamePartial;
        this._callback = callback;
        this._setNode();
        this._initObserver();
        this._startObserving();
        var dObserver = new MutationObserver(this._resetObserver.bind(this));
        dObserver.observe(document.body, { childList: true });
    }
    MaestroMagician.prototype._resetObserver = function () {
        this._stopObserving();
        this._setNode();
        this._startObserving();
    };
    MaestroMagician.prototype._findNode = function () {
        var snapshot = document.evaluate("//div[contains(@class, '" + this._classNamePartial + "')]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (snapshot.snapshotLength === 1) {
            return snapshot.snapshotItem(0);
        }
        else {
            return null;
        }
    };
    MaestroMagician.prototype._setNode = function () {
        this._node = this._findNode();
        if (!this._node) {
            console.error("Error: Could not find the given node or there is more than one");
        }
    };
    MaestroMagician.prototype._initObserver = function () {
        this._observer = new MutationObserver(this._callback.bind(this));
    };
    MaestroMagician.prototype._startObserving = function () {
        this._observer.observe(this._node, this._config);
    };
    MaestroMagician.prototype._stopObserving = function () {
        this._observer.disconnect();
    };
    return MaestroMagician;
}());
export { MaestroMagician };
