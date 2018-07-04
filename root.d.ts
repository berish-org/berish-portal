import * as React from 'react';
interface IRootProps {
    portalName: string;
}
interface IRootState {
}
export default class Root extends React.Component<IRootProps, IRootState> {
    private unlistener;
    constructor(props: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: IRootProps): void;
    update: (elements: JSX.Element[]) => void;
    render(): JSX.Element;
}
export {};
