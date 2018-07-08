import * as React from 'react';
import portal from './portal';

function getPortal(scope: string) {
  return portal.scope(scope || 'default');
}

interface IRootProps {
  portalName: string;
}

interface IRootState {}

export default class Root extends React.Component<IRootProps, IRootState> {
  private unlistener: () => any = null;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.unlistener = getPortal(this.props.portalName).listen(this.update);
  }
  componentWillUnmount() {
    if (this.unlistener) this.unlistener();
  }

  componentWillReceiveProps(nextProps: IRootProps) {
    if (nextProps.portalName != this.props.portalName) {
      if (this.unlistener) this.unlistener();
      this.unlistener = getPortal(this.props.portalName).listen(this.update);
    }
  }

  update = (elements: JSX.Element[]) => {
    this.forceUpdate();
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        {getPortal(this.props.portalName).elements}
      </React.Fragment>
    );
  }
}
