// @ts-ignore
import Grid from "@component/grid/Grid";
import React from 'react';
import fs from 'fs';
import {useState, useEffect} from 'react';
import TweetBox from "@component/home-1/TweetBox";
import AppLayout from "../components/layout/AppLayout";
import Container from '../components/Container';
import useWindowSize from "@hook/useWindowSize";
import { TagCloud } from 'react-tagcloud'
import { each, values } from "lodash";
import { text } from "stream/consumers";
import SearchBox from "@component/search-box/SearchBox";
import Button from '../components/buttons/Button';
// import Typography from "../components/Typography";
//import { loadGetInitialProps } from "next/dist/shared/lib/utils";
const IndexPage = () => {

const [tweetListx, setTweetListx] = useState([]);
const [mixtweetListx, setMixTweetListx] = useState([]);
const [gentweetListx, setGenTweetListx] = useState([]);
const [genmixtweetListx, setgenmixtweetListx] = useState([]);
const [tweetsearchx, settweetSearchx] = useState("");
const stopwords = ['in', " up", "he’s", 'he', 'she', 'they', 'them', 'may', 'might','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','down','i','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','can','will','just','don','should','now','2019','2020', '2021', '2022', '7000', 'she']
const Twitter = require('twitter-lite');
const [noOfmix, setnoOfmix] = useState(0);

const loadGen = () =>{
  setnoOfmix(1);
}
const reset_state = () =>{
  setnoOfmix(0);
  setGenTweetListx([]);
  setgenmixtweetListx([]);
}
async function get_tweet() {
    console.log(tweetsearchx)
    const user = new Twitter({
        consumer_key: "9O66Br238hKMsxtyREDouhXqD",
        consumer_secret: "jEMNUscYPDpLzXjzf8ffGwFIMWLwXP88cZSGOMpmjduKKMw31h",
    });
    console.log(user);
try {
        let response = await user.getBearerToken();
        const app = new Twitter({
            bearer_token: response.access_token,
        });
// Search for recent tweets
        console.log(tweetsearchx);
        response = await app.get(`/search/tweets`, {
            q: tweetsearchx,
            lang: "en",  
            count: 10,
        });
        
        var word_vocab = [];
        var tweet_listed = [];
        for (var tweet of response.statuses) {
            tweet_listed.push(tweet.text);
        }
        for (var i = 0; i<= tweet_listed.length; i++){
          if(tweet_listed[i] != null){
            var new_tweet_list = tweet_listed[i].split(" ");
            word_vocab.push.apply(word_vocab, new_tweet_list);
          }
        }
        var mostfreqword = []
        const arr = word_vocab;
        const num = 50;
        const mostFrequent = (arr = [], num = 1) => {
          const map = {};
          let keys = [];
          for (let i = 0; i < arr.length; i++) {
              if (map[arr[i]]) {
                map[arr[i]]++;
              } else {
                map[arr[i]] = 1;
              }
          }
          for (let i in map) {
              keys.push(i);
          }
          keys = keys.sort((a, b) => {

              if (map[a] === map[b]) {
                if (a > b) {
                    return 1;
                } else {
                    return -1;
                }
              }
              else {
                return map[b] - map[a];
              }
          })
          .slice(0, num);
          return keys;
        };
        console.log(arr);
        for (var arr_item of mostFrequent(arr, num)){
          mostfreqword.push(arr_item);
        }
        console.log("Freq "+ mostfreqword);
        mostfreqword.forEach((element, idx) => {
          mostfreqword[idx] = element.replace(/\s?#|@|[$]|:|the|our|"|really|'?'|Dr.|-|[0-9]|[%]|[.]|[(]|[)]|[,]|[+]|[...]|[/]|[;]|[:]|https\S+/g, '');
         });
         console.log("Removed:"+ mostfreqword);
          //words = str.split(' ')
          for(var i=0;i<mostfreqword.length;i++) {
             //word_clean = words[i].split(".").join("")
             //console.log('Before: '+ mostfreqword[i]);
             mostfreqword[i].replace(/[#-@$.,\/!%\^&\*;:{}=\_`~()]/g,"");
             mostfreqword[i].replace(/[NASDAQ]/g, 'NASDAQ');
             mostfreqword[i].replace("#market", "market");
             mostfreqword[i].replace("#daytrading", "daytrading");
             mostfreqword[i].replace("#forex", "forex");
             mostfreqword[i].replace("#stocks", "stocks");
             mostfreqword[i].replace("#stockmarket", "stockmarket");
             for(var j=0; j<mostfreqword[i].length;j++)
             {
              console.log("chars: "+ mostfreqword[i][j]);
             }
             //console.log('After: '+ mostfreqword[i]);
             if(stopwords.includes(mostfreqword[i])) {
              console.log('Matched: '+ mostfreqword[i]);
              mostfreqword.splice(i, i);
              //mostfreqword[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
             }
          }
        const data = [
          { value: mostfreqword[0],count: 50},
          { value: mostfreqword[1],count: 49},
          { value: mostfreqword[2],count: 48},
          { value: mostfreqword[3],count: 47},
          { value: mostfreqword[4],count: 46},
          { value: mostfreqword[5],count: 45},
          { value: mostfreqword[6],count: 44},
          { value: mostfreqword[7],count: 43},
          { value: mostfreqword[8],count: 42},
          { value: mostfreqword[9],count: 41},
          { value: mostfreqword[10],count: 40},
          { value: mostfreqword[11],count: 39},
          { value: mostfreqword[12],count: 38},
          { value: mostfreqword[13],count: 37},
          { value: mostfreqword[14],count: 36},
          { value: mostfreqword[15],count: 35},
          { value: mostfreqword[16],count: 34},
          { value: mostfreqword[17],count: 33},
          { value: mostfreqword[18],count: 32},
          { value: mostfreqword[19],count: 31},
          { value: mostfreqword[20],count: 30},
          { value: mostfreqword[21],count: 29},
          { value: mostfreqword[22],count: 28},
          { value: mostfreqword[23],count: 27},
          { value: mostfreqword[24],count: 26},
          { value: mostfreqword[25],count: 25},
          { value: mostfreqword[26],count: 24},
          { value: mostfreqword[27],count: 23},
          { value: mostfreqword[28],count: 22},
          { value: mostfreqword[29],count: 21},
          { value: mostfreqword[30],count: 20},
          { value: mostfreqword[31],count: 20},
          { value: mostfreqword[32],count: 20},
          { value: mostfreqword[33],count: 20},
          { value: mostfreqword[34],count: 20},
          { value: mostfreqword[35],count: 20},
          { value: mostfreqword[36],count: 20},
          { value: mostfreqword[37],count: 20},
          { value: mostfreqword[38],count: 20},
          { value: mostfreqword[39],count: 20},
          { value: mostfreqword[40],count: 20},
        ]
        setMixTweetListx(data)
        setTweetListx(tweet_listed);
        return tweet_listed;
    } catch(e) {
        console.log("There was wit the API");
        console.dir(e);
    }
};
function gen_tweet(pass_string){
  reset_state();
  const response = fetch(`http://localhost:8000/predict/${pass_string}`, {
    method: 'POST'
  })
  // const response = fetch(`http://34.72.136.54:8081/predict/${pass_string}`, {
  //   method: 'POST'
  // })
  response.then(x=>{ x.text().then(text=>{
    var new_key_text = text.split("\n");
    setGenTweetListx(new_key_text);
    // get_tweet().then((val)=>{
    var val = tweetListx.slice(0 ,8);
    console.log("Printing from val "+ val[9]);
    new_key_text = new_key_text.slice(0,2);
    val.push.apply(val, new_key_text);
    let shuffleitem = val.sort(function () {
      return Math.random() - 0.5;
    })
    console.log(shuffleitem);
    setgenmixtweetListx(shuffleitem);
  })
})
}

useEffect(() => {
    get_tweet().then(()=>{
      settweetSearchx(localStorage.getItem('dataKey')); 
    });
}, [tweetsearchx])

return (
  <main>
    <Container mb="20px" mt="20px">
    <TagCloud
        minSize={12}
        maxSize={35}
        tags={mixtweetListx}
        onClick={tag => {gen_tweet(tag.value);
        alert(`${tag.value} is selected, wait 16 sec to get the tweets`)
        }}
      />
      <Grid container >
        <Grid item gridGap={10} sm={12} lg={4} spacing={10} md={6}>
          {/* <TweetBox tweetList={tweetListx} tweetTitle="Live Tweets"/> */}
         {tweetListx.length != 0 ? <TweetBox tweetList={tweetListx} tweetTitle="Live Tweets"/>  : ""}
        </Grid>
        <Grid item gridGap={10} sm={12} lg={4} spacing={3} md={6}>
        {(genmixtweetListx.length != 0  && noOfmix ==0)?
        <Button mt="3rem" size="small" style={{alignItems: 'center', marginTop: '80%', color: "white" }} fullwidth bg={"#D23F57"} onClick={() => loadGen()}>
            Reveal Generated Tweets
        </Button>: ""}
        {(gentweetListx.length != 0  && noOfmix ==1 )?<TweetBox tweetList={gentweetListx} tweetTitle="Generated Tweets"/>: ""}
        </Grid>
        <Grid item gridGap={10} sm={12} lg={4} spacing={3} md={6}>
        {/* {(genmixtweetListx.length != 0  && noOfgen ==0)?
        <Button mt="3rem" size="small" style={{alignItems: 'center'}} fullwidth bg={"#D23F57"} onClick={() => loadtweetgen()}>
            Reveal Mixed Tweets
        </Button>: ""} */}
        {(genmixtweetListx.length != 0 && noOfmix ==1)?<TweetBox tweetList= {genmixtweetListx} tweetTitle="Mixed Tweets"/>: ""}
        </Grid>
      </Grid>
    </Container>
  </main>
);
};
IndexPage.layout = AppLayout

export default IndexPage;
