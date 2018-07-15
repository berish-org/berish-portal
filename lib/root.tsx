import * as React from 'react';
import portal from './portal';

interface IRootProps {
  portalName?: string;
}

interface IRootState {
  elements: JSX.Element[];
}

export default class Root extends React.PureComponent<IRootProps, IRootState> {
  private unlistener: () => any = null;
  constructor(props) {
    super(props);
    this.state = {
      elements: []
    };
  }

  componentWillMount() {
    this.unlistener = portal.scope(this.props.portalName).listen(this.update);
  }
  componentWillUnmount() {
    if (this.unlistener) this.unlistener();
  }

  componentWillReceiveProps(nextProps: IRootProps) {
    if (nextProps.portalName != this.props.portalName) {
      if (this.unlistener) this.unlistener();
      this.unlistener = portal.scope(this.props.portalName).listen(this.update);
    }
  }

  update = (elements: JSX.Element[]) => {
    this.setState({ elements: elements.slice(0, elements.length) });
  };

  render() {
    let elements = portal.scope(this.props.portalName).elements;
    return (
      <React.Fragment>
        {this.props.children}
        {elements.map((m, i) => <React.Fragment key={i}>{m}</React.Fragment>)}
      </React.Fragment>
    );
  }
}
