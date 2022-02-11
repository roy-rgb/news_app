import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {


  constructor(){

    super();
    console.log("constructor");
    this.state={
       articles: [],
       loading: false,
       page:1
    }
  }

  async componentDidMount(){
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=9a6348e72a804fc69f44170e972be45d&page=1pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults});
  }

  handlePrevClick = async ()=>{
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9a6348e72a804fc69f44170e972be45d&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles
    
        })
  }

  handleNextClick = async ()=>{
    console.log("Next");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20))
    {

    }
    else{

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=9a6348e72a804fc69f44170e972be45d&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        

        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles

        })
     }
  }

  render() {
    console.log("render");
    return (
      
      <div className="container my-3" >
        <h2>Prothom Shokal - top headings</h2>

        <div className="row">

          {this.state.articles.map((element)=>{

         return <div className="col-md-4" key={element.url}>
              <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage} newsUrl={element.url}/>
          </div>

          })}

          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>

        </div>
        
 

      </div>
      
    )
  }
}

export default News