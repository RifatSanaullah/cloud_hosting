import React, { useEffect, useState } from "react";
//import { textStyle, colorStyle, buttonStyle } from 'styled-system';
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import StyledProductCategory from "./ProductCategoryStyle";
import TweetsItem from '../TweetsItem';
//import Button from '../buttons/Button';

type Props = {
  tweetTitle?: string;
  tweetList?: Array<String>;
};

const TweetBox: React.FC<Props> = ({tweetList,tweetTitle}) => {
  const [type, setType] = useState("tweets");
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);
  const [noOfElement, setnoOfElement] = useState(10);
  const loadMore = () =>{
    //console.log('Element '+ noOfElement);
    setnoOfElement(noOfElement + 4);
    //noOfElement+=4;
    setList(tweetList.slice(0, noOfElement));
    //const slice = tweetList.slice(0, noOfElement);
    console.log('Element '+ noOfElement);}
  //const slice = tweetList.slice(0, noOfElement);
  //console.log("Sliced");
  //console.log(slice);
  


  const handleCategoryClick = (tweet) => {
    if (selected.match(tweet)) {
      setSelected("");
    } else setSelected(tweet);
  };
  console.log(handleCategoryClick);

  useEffect(() => {
    if (type === "tweets") {
      setList(tweetList.slice(0, noOfElement));
      console.log('dfghjk'+tweetList.slice(0, noOfElement).length);
      //const slice = tweetList.slice(0, noOfElement);
    }
  }, [type]);

  return (
    <Container mt={40} mb="20px">
      <FlexBox flexWrap='wrap' justifyContent='center' style={{paddingRight: '5px'}}>
          <Box minHeight={278} mb={20} shadow={6} borderRadius={10} padding="1.25rem" bg="white">
            <FlexBox mt="-0.5rem" mb="0.5rem">
              <Typography
                fontWeight="600"
                fontSize="20px"
                padding="0.5rem 1rem"
                style={{ cursor: "pointer" }}
                //color={type === "tweets" ? "gray.900" : "gray.600"}
                onClick={() => setType("tweets")}
              >
                {tweetTitle}
              </Typography>
            </FlexBox>

            {list.map((tweet, ind) => {
              if(typeof(tweet) == 'string'){
                // tweet.replace(":", ":");
                // tweet.replace('(', "");
                // tweet.replace(')', "");
                // tweet.replace('(' , "");
                // tweet.replace('((', "(");
                // tweet.replace('/', "(");
                // console.log(selected);
                // console.log(tweet);
                 return <TweetsItem 
                  // bg={selected.match(tweet) ? "#D9D9D9" : "#F3F6F9"} 
                  // shadow={selected.match(tweet) ? 4 : null}
                  py={2} px={3} mb={2} borderRadius={5} style ={{
                    background: '#f7f7f7',
                  }} >
                    <div>
                    <span>Tweet {ind+1}</span>
                    <section>
                    <img style={{width: "40px", position:"absolute", margin: "4px 0px 0 0"}} src='demo_image(1).png'/>
                    <div style={{margin: "0 0 0 50px"}} id='user_inf'>
                      <p style={{margin: "2px 0px"}}><b>Digital Influencer</b></p>
                      <p style={{margin: "2px 0px"}}><b>@d_influencer</b></p>
                    </div>
                    </section>
                    </div>
                    <StyledProductCategory
                      key={tweet}
                      mb="0.75rem"
                      bg="white"
                      mt={2}
                      borderRadius={1}
                      onClick={() => {}}
                    >
                      {tweet}
                    </StyledProductCategory>
                  </TweetsItem>
              }
            })}


            {/* <Button mt="3rem" size="small" fullwidth bg={"#F3F6F9"} >
              <Typography fontWeight="normal">
                Load More ...
              </Typography>
             </Button> */}

            {/* <StyledProductCategory
              
              bg={selected.match(`all-${type}`) ? "white" : "gray.100"}
              shadow={selected.match(`all-${type}`) ? 4 : null}
              onClick={() => handleCategoryClick(`all-${type}`)}
            >
              <span className="product-category-title show-all">
                Load More ...
              </span>
            </StyledProductCategory> */}
          </Box>
      </FlexBox>
    </Container>
  );
};


export default TweetBox;