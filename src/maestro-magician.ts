export class MaestroMagician {
    private _classNamePartial: string;
    private _node: Node | null = null;
    private _observer: MutationObserver;
    private _config = { childList: true, subtree: true };
    private _callback: Function;

    constructor(classNamePartial: string, callback: Function) {
        this._classNamePartial = classNamePartial;
        this._callback = callback;
        this._node = this._findNode();
        this._observer = new MutationObserver(this._callback.bind(this));
        this._startObserving();

        const dObserver = new MutationObserver(this._resetObserver.bind(this));
        dObserver.observe(document.body, { childList: true });
    }

    _resetObserver() {
        this._stopObserving();
        this._setNode();
        this._startObserving();
    }

    _findNode(): Node | null {
        const snapshot = document.evaluate(
            `//div[contains(@class, '${this._classNamePartial}')]`,
            document.body,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        if (snapshot.snapshotLength === 1) {
            return snapshot.snapshotItem(0);
        } else {
            console.error(
                "Error: Could not find the given node or there is more than one"
            );
            return null;
        }
    }

    _setNode() {
        this._node = this._findNode();
    }

    _startObserving() {
        if (!this._node) {
            return;
        }

        this._observer.observe(this._node, this._config);
    }

    _stopObserving() {
        this._observer.disconnect();
    }
}
