import styled from "styled-components";
import {
  border,
  BorderProps,
  color,
  ColorProps,
  compose,
  flex,
  flexbox,
  FlexboxProps,
  FlexProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

type BoxProps = {
  shadow?: number;
  cursor?: string;
  transition?: string;
};

const TweetsItem = styled.div<
  BoxProps &
  LayoutProps &
  ColorProps &
  PositionProps &
  SpaceProps &
  FlexProps &
  BorderProps &
  FlexboxProps &
  TypographyProps
>(
  ({ cursor, transition}) => ({
    cursor,
    transition,
  }),
  compose(layout, space, color, position, flexbox, flex, border, typography)
);

TweetsItem.defaultProps = {
  shadow: 0,
  cursor: "unset",
};

export default TweetsItem;
