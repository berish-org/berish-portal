import * as React from 'react';
declare type listenerType = (value: JSX.Element[]) => any;
export interface IStaticComponentProps<T = any> {
    resolve?: (obj?: T) => void;
    reject?: (reason?: any) => void;
    getContainer?: (instance: React.ReactInstance) => HTMLElement;
}
declare class Portal {
    elements: JSX.Element[];
    listeners: listenerType[];
    scope(scope: string): Portal;
    create<Resolve, Props, IncomeProps extends Props = Props>(ClassComponent: React.ComponentClass<IStaticComponentProps<Resolve> | Props>): (props?: IncomeProps & {
        children?: React.ReactNode;
    }) => Promise<Resolve>;
    add: (element: JSX.Element) => () => void;
    listen: (listener: listenerType) => () => void;
    update: () => void;
}
declare const _default: Portal;
export default _default;
