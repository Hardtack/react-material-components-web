import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Map,
    OrderedSet,
    Set,
} from "immutable";

import {
    ClassNameMetaBase,
    DefaultComponentBase,
} from "@react-mdc/base";

import { eventHandlerDecorator } from "@react-mdc/base/lib/util";

import { FoundationAdapter, NativeControlAdapter } from "./adapter";
import { BASE_CLASS_NAME } from "./constants";

export const CLASS_NAME = `${BASE_CLASS_NAME}__native-control`;

export type MetaProps = {
    onChange?: React.FormEventHandler<ChildProps>,
    className?: string,
};

export type ChildProps = {
    className?: string,
    checked?: boolean,
};

export type State = {
    foundationEventListeners: Map<string, Set<EventListener>>,
};

export type Context = {
    adapter: FoundationAdapter,
};

/**
 * Checkbox input component
 */
export class Meta extends ClassNameMetaBase<ChildProps, MetaProps, State> {
    public static contextTypes = {
        adapter: PropTypes.instanceOf(FoundationAdapter).isRequired,
    };

    public context: Context;

    public state = {
        foundationEventListeners: Map<string, Set<EventListener>>(),
    };

    public defaultOnChange: React.ChangeEventHandler<any> = () => { };

    public componentDidMount() {
        this.context.adapter.setNativeControlAdapter(new NativeControlAdapterImpl(this));
    }

    public componentWillUnmount() {
        this.context.adapter.setNativeControlAdapter(new NativeControlAdapter());
    }

    protected renderNativeDOMProps() {
        return {
            eventListeners: this.state.foundationEventListeners.toJS(),
        };
    }

    protected renderBaseClassName() {
        return CLASS_NAME;
    }

    protected renderProps(childProps: ChildProps) {
        const {
            onChange,
        } = this.props;

        return {
            ...super.renderProps(childProps),
            onChange: (eventHandlerDecorator(this.handleChange)(onChange || null) as React.ChangeEventHandler<any>),
            checked: this.context.adapter.isChecked() || undefined,
        };
    }

    private handleChange = (evt: React.ChangeEvent<any>) => {
        this.defaultOnChange(evt);
    }
}

class NativeControlAdapterImpl extends NativeControlAdapter {
    private element: Meta;

    constructor(element: Meta) {
        super();
        this.element = element;
    }

    public registerChangeHandler(handler: EventListener) {
        this.element.setState((state: State) => ({
            foundationEventListeners: state.foundationEventListeners.update(
                "change",
                OrderedSet<EventListener>(),
                (x) => x.add(handler),
            ),
        }));
    }
    public deregisterChangeHandler(handler: EventListener) {
        this.element.setState((state: State) => ({
            foundationEventListeners: state.foundationEventListeners.update(
                "change",
                OrderedSet<EventListener>(),
                (x) => x.delete(handler),
            ),
        }));
    }
    public getNativeControl(): Element | null {
        return ReactDOM.findDOMNode(this.element);
    }
    public setDefaultOnChangeHandler(handler: React.ChangeEventHandler<any>) {
        this.element.defaultOnChange = handler;
    }
}

// Input with type="checkbox" as default
function CheckboxInput(props: React.HTMLProps<HTMLInputElement>) {
    return (
        <input type="checkbox" {...props} />
    );
}

export type Props = React.HTMLProps<HTMLButtonElement> & MetaProps;

export default class NativeControl extends DefaultComponentBase<React.HTMLProps<HTMLInputElement>, MetaProps, {}> {
    public static Meta = Meta;

    protected getMetaComponent() {
        return Meta;
    }

    protected getMetaPropNames() {
        return [
            "className",
            "onChange",
        ];
    }

    protected getChildComponent(): React.SFC<React.HTMLProps<HTMLInputElement>> {
        return CheckboxInput;
    }
}
