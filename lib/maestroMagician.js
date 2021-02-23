export class MaestroMagician {
  _config = {
    childList: true,
    subtree: true
  };

  constructor(classNamePartial, callback) {
    this._classNamePartial = classNamePartial;
    this._callback = callback;

    this._setNode();

    this._initObserver();

    this._startObserving();

    const dObserver = new MutationObserver(this._resetObserver.bind(this));
    dObserver.observe(document.body, {
      childList: true
    });
  }

  _resetObserver() {
    this._stopObserving();

    this._setNode();

    this._startObserving();
  }

  _findNode() {
    const snapshot = document.evaluate(`//div[contains(@class, '${this._classNamePartial}')]`, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (snapshot.snapshotLength === 1) {
      return snapshot.snapshotItem(0);
    } else {
      return null;
    }
  }

  _setNode() {
    this._node = this._findNode();

    if (!this._node) {
      console.error("Error: Could not find the given node or there is more than one");
    }
  }

  _initObserver() {
    this._observer = new MutationObserver(this._callback.bind(this));
  }

  _startObserving() {
    this._observer.observe(this._node, this._config);
  }

  _stopObserving() {
    this._observer.disconnect();
  }

}