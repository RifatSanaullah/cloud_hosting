import styled from "styled-components";
import { getTheme } from "../../utils/utils";
import Box from "../Box";

type StyledProductCategoryProps = {
  onClick: any;
  borderRadius?: number;
};

const StyledProductCategory = styled(Box)<StyledProductCategoryProps>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  cursor: pointer;
  min-width: 240px;
  border-radius: ${props => props?.borderRadius ? props?.borderRadius+'px' : '5px' };
  cursor: unset;

  &:hover {
    box-shadow: ${getTheme("shadows.4")};
  }

  .product-category-title {
    font-size: 17px;
    font-weight: 600;
    text-transform: capitalize;
    margin-left: 1.5rem;
  }

  .show-all {
    font-size: 16px;
    width: 100%;
    text-align: center;
  }
`;

export default StyledProductCategory;
