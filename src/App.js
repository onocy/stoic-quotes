import React from 'react';
import logo from './logo.svg';
import './App.css';


class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.newQuote = this.newQuote.bind(this);  
    this.state = {
      currentQuote: ' ',
      currentAuthor: ' ',
      quotes: [], 
      authors: [],
      tweetUrl: 'https://twitter.com/intent/tweet?text='
    }
  }
  
  componentDidMount() {
    fetch('https://randomstoicquotesapi.herokuapp.com/api/v1/quotes').then((res) => res.json())
      .then((d) => {
            this.setState({quotes: d.data, authors: d.included});
            this.newQuote();
            this.setState({tweetUrl: this.state.tweetUrl + encodeURIComponent('"'+ this.state.currentQuote + '" - ' + this.state.currentAuthor)});
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }
 
  newQuote(){
    const random_num = Math.floor(Math.random() * this.state.quotes.length);
    const current_quote = this.state.quotes[random_num];
    const current_id = current_quote.relationships.author.data.id;
    const author = this.state.authors.filter(x => x.id === current_id)[0];
    this.setState({
      currentQuote: current_quote.attributes.text,
      currentAuthor: author.attributes.name
    });
  }

  render() {
    return (
      <div id = "quote-box">
        <div id = "presentation">
          <div id = "text">
            <h1>{this.state.currentQuote}</h1>
          </div>
          <div id = "author">
            <h3>{this.state.currentAuthor}</h3>
          </div>
        </div>
        <a id = "new-quote" onClick = {this.newQuote}>New</a>
        <a id = "tweet-quote" href = {this.state.tweetUrl} target = "_blank">Tweet</a>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <QuoteBox/>
      </div>
    );
  }
}

export default App;
