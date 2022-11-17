import Button from "@component/buttons/Button";
import Card from "@component/Card";
//import { Span } from "@component/Typography";
import { debounce } from "lodash";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Box from "../Box";
//import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
//import Menu from "../Menu";
//import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";
//import { CLIENT_RENEG_WINDOW } from "tls";

export interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [category, setCategory] = useState("All Categories");
  const [resultList, setResultList] = useState([]);
  const handleCategoryChange = (cat) => () => {
    setCategory(cat);
  };
  console.log(handleCategoryChange);
  
  const search = debounce((e) => {
    const value = e.target?.value;
    if (!value) setResultList([]);
    else setResultList([]);
  }, 200);
  const hanldeSearch = useCallback((event) => {
    event.persist();
    localStorage.setItem('dataKey', event.target?.value);

    search(event);
  }, []);
  console.log(hanldeSearch);
  const handleDocumentClick = () => {
    setResultList([]);
  };
  console.log(handleDocumentClick);

  useEffect(() => {
    // localStorage.setItem('dataKey', "");

    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>
        <TextField
          id = "search_tweet"
          className="search-field"
          placeholder="Search and hit enter..."
          fullwidth
          onChange={hanldeSearch}
        />

            <Button
              style={{
                borderRadius: '50px',
                color: "white",
                alignItems: "center"
              }}
              border={0}
              borderTopRightRadius={20}
              borderBottomRightRadius={20}
              bg={'#D23F57'} 
              className="dropdown-handler"
              onClick={() => window.location.reload()}>
              Search
            </Button>
        {/* <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box> */}
      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

const categories = [
  "All Categories",
  "Car",
  "Clothes",
  "Electronics",
  "Laptop",
  "Desktop",
  "Camera",
  "Toys",
];

const dummySearchResult = [
  "Macbook Air 13",
  "Ksus K555LA",
  "Acer Aspire X453",
  "iPad Mini 3",
];

export default SearchBox;
