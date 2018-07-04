var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import portal from './portal';
function getPortal(scope) {
    return portal.scope(scope || 'default');
}
var Root = (function (_super) {
    __extends(Root, _super);
    function Root(props) {
        var _this = _super.call(this, props) || this;
        _this.unlistener = null;
        _this.update = function (elements) {
            _this.forceUpdate();
        };
        _this.state = {};
        return _this;
    }
    Root.prototype.componentWillMount = function () {
        this.unlistener = getPortal(this.props.portalName).listen(this.update);
    };
    Root.prototype.componentWillUnmount = function () {
        if (this.unlistener)
            this.unlistener();
    };
    Root.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.portalName != this.props.portalName) {
            if (this.unlistener)
                this.unlistener();
            this.unlistener = getPortal(this.props.portalName).listen(this.update);
        }
    };
    Root.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            this.props.children,
            getPortal(this.props.portalName).elements));
    };
    return Root;
}(React.Component));
export default Root;
//# sourceMappingURL=root.js.map