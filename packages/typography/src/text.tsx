import * as React from "react";

import classNames from "classnames";

import { default as BaseMeta } from "@react-mdc/base/lib/meta";

import { BASE_CLASS_NAME } from "./constants";
import { classNameForTextStyle } from "./helpers";
import { TextStyle } from "./types";

export const propertyClassNames = {
    ADJUST_MARGIN: `${BASE_CLASS_NAME}--adjust-margin`,
};

export type BaseMetaProps = {
    adjustMargin?: boolean,
};

export type MetaProps = BaseMetaProps & {
    textStyle: TextStyle,
};

export type ChildProps = {
    className?: string,
};

/**
 * Text meta component decorated by mdc-typography
 */
export class Meta extends BaseMeta<ChildProps, MetaProps, {}> {
    public static defaultProps = {
        adjustMargin: false,
    };

    protected renderProps() {
        let {
            textStyle,
            adjustMargin,
        } = this.props;
        const className = classNames(
            classNameForTextStyle(textStyle),
            {
                [propertyClassNames.ADJUST_MARGIN]: adjustMargin,
            },
        );
        return {
            className,
        };
    }
}

export type Props = React.HTMLProps<HTMLButtonElement>
    & ChildProps
    & MetaProps;

export default class Text extends React.Component<Props, {}> {
    public static Meta = Meta;

    public render() {
        const {
            textStyle,
            adjustMargin,
            ...props,
        } = this.props;
        return (
            <Meta
                textStyle={textStyle}
                adjustMargin={adjustMargin}>
                {React.createElement(defaultComponent(textStyle), props)}
            </Meta>
        );
    }
}

export function defaultComponent(style: TextStyle): string {
    switch (style) {
        case "display4":
            return "h1";
        case "display3":
            return "h2";
        case "display2":
            return "h3";
        case "display1":
            return "h4";
        case "headline":
            return "h5";
        case "title":
            return "h6";
        case "subheading2":
        case "subheading1":
            return "div";
        case "body2":
        case "body1":
        case "caption":
            return "p";
        default:
            throw new TypeError(`Invalid text style: ${style}`);
    }
}
