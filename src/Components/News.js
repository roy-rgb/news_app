import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {


  constructor(){

    super();
    console.log("constructor");
    this.state={
       articles: [],
       loading: false
    }
  }

  async componentDidMount(){
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=9a6348e72a804fc69f44170e972be45d";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles});
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

          

        </div>
        
 

      </div>
      
    )
  }
}

export default News