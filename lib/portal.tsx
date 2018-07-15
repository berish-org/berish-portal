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

  scope(scope?: string) {
    return ringle.getSingleton(Portal, scope);
  }

  create<Resolve, Props, IncomeProps extends Props = Props>(
    ClassComponent: React.ComponentClass<IStaticComponentProps<Resolve> | Props>
  ) {
    let createElement = (props?: IncomeProps & { children?: React.ReactNode }) => {
      return new Promise<Resolve>((resolvePromise, rejectPromise) => {
        let destroy: () => void = null;
        let resolve = (obj: Resolve) => {
          resolvePromise(obj == null ? null : obj);
          destroy();
        };
        let reject = (reason: any) => {
          rejectPromise(reason);
          destroy();
        };
        let element = <ClassComponent key={+new Date()} resolve={resolve} reject={reject} {...(props || {}) as any} />;
        destroy = this.add(element);
      });
    };
    return createElement;
  }

  add = (element: JSX.Element) => {
    this.elements.push(element);
    this.update();
    return () => {
      this.elements = LINQ.fromArray(this.elements)
        .except([element])
        .toArray();
      this.update();
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
    const _update = () => {
      for (let listener of this.listeners) {
        try {
          setTimeout(() => listener(this.elements), 0);
        } catch (err) {
          console.log(err);
        }
      }
    };
    setTimeout(() => _update(), 0);
  };
}

export default ringle.getSingleton(Portal);
