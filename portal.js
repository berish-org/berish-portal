var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as ringle from 'berish-ringle';
import * as React from 'react';
import { LINQ } from 'berish-linq';
var Portal = (function () {
    function Portal() {
        var _this = this;
        this.elements = [];
        this.listeners = [];
        this.add = function (element) {
            _this.elements.push(element);
            return function () {
                _this.elements = LINQ.fromArray(_this.elements)
                    .except([element])
                    .toArray();
            };
        };
        this.listen = function (listener) {
            _this.listeners.push(listener);
            return function () {
                _this.listeners = LINQ.fromArray(_this.listeners)
                    .except([listener])
                    .toArray();
            };
        };
        this.update = function () {
            var _loop_1 = function (listener) {
                try {
                    setTimeout(function () { return listener(_this.elements); }, 0);
                }
                catch (err) {
                    console.log(err);
                }
            };
            for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                _loop_1(listener);
            }
        };
    }
    Portal.prototype.scope = function (scope) {
        return ringle.getSingleton(Portal, scope);
    };
    Portal.prototype.create = function (ClassComponent) {
        var _this = this;
        var createElement = function (props) {
            return new Promise(function (resolvePromise, rejectPromise) {
                var resolve = function (obj) {
                    destroy();
                    resolvePromise(obj == null ? null : obj);
                };
                var reject = function (reason) {
                    destroy();
                    rejectPromise(reason);
                };
                var element = React.createElement(ClassComponent, __assign({ resolve: resolve, reject: reject }, (props || {})));
                var destroy = _this.add(element);
            });
        };
        return createElement;
    };
    return Portal;
}());
export default ringle.getSingleton(Portal);
//# sourceMappingURL=portal.js.map