import * as React from "react";

import {
    ClassNameMetaBase,
    DefaultComponentBase,
} from "@react-mdc/base";

import {
    BASE_CLASS_NAME,
} from "./constants";

export const CLASS_NAME = `${BASE_CLASS_NAME}__body`;

export type MetaProps = {
    scrollable?: boolean,
    className?: string,
};

export type ChildProps = {
    className?: string,
};

export const propertyClassNames = {
    SCROLLABLE: `${CLASS_NAME}--scrollable`,
};

/**
 * Header title component
 */
export class Meta extends ClassNameMetaBase<ChildProps, MetaProps, {}> {
    protected renderBaseClassName() {
        return CLASS_NAME;
    }

    protected renderClassValues() {
        return [{
            [propertyClassNames.SCROLLABLE]: this.props.scrollable,
        }];
    }
}

export default class Body extends DefaultComponentBase<React.HTMLProps<HTMLElement>, MetaProps, {}> {
    public static Meta = Meta;

    protected getMetaComponent() {
        return Meta;
    }

    protected getMetaPropNames() {
        return [
            "className",
            "scrollable",
        ];
    }

    protected getChildComponent() {
        return "section";
    }
}
