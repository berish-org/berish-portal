import * as ringle from 'berish-ringle';
import * as React from 'react';
import { LINQ } from 'berish-linq';

type listenerType = (value: JSX.Element[]) => any;

export interface IStaticComponentProps<T = any> {
  resolve?: (obj?: T) => void;
  reject?: (reason?: any) => void;
  getContainer?: (instance: React.ReactInstance) => HTMLElement;
}

class Portal {
  elements: JSX.Element[] = [];
  listeners: listenerType[] = [];

  scope(scope: string) {
    return ringle.getSingleton(Portal, scope);
  }

  create<Resolve, Props, IncomeProps extends Props = Props>(ClassComponent: React.ComponentClass<IStaticComponentProps<Resolve> | Props>) {
    let createElement = (props?: IncomeProps & { children?: React.ReactNode }) => {
      return new Promise<Resolve>((resolvePromise, rejectPromise) => {
        let resolve = (obj: Resolve) => {
          destroy();
          resolvePromise(obj == null ? null : obj);
        };
        let reject = (reason: any) => {
          destroy();
          rejectPromise(reason);
        };
        let element = <ClassComponent resolve={resolve} reject={reject} {...(props || {}) as any} />;
        let destroy = this.add(element);
      });
    };
    return createElement;
  }

  add = (element: JSX.Element) => {
    this.elements.push(element);
    return () => {
      this.elements = LINQ.fromArray(this.elements)
        .except([element])
        .toArray();
    };
  };

  listen = (listener: listenerType) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = LINQ.fromArray(this.listeners)
        .except([listener])
        .toArray();
    };
  };

  update = () => {
    for (let listener of this.listeners) {
      try {
        setTimeout(() => listener(this.elements), 0);
      } catch (err) {
        console.log(err);
      }
    }
  };
}

export default ringle.getSingleton(Portal);
