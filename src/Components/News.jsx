import React from 'react'
import { useEffect,useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData)
    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
  document.title = `NewsMonk - ${capitalizeFirstLetter(props.category)}`
    updateNews();
    // eslint-disabled-next-line
  },[])


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    setarticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }
  
    return (
    <>
      <h1 className='text-center' style={{margin: '90px 0 23px'}}>NewsMonk - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
        <div className="container">
          <div className="row">
            {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title ? element.title : ""} description={element.description? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
    )
}
News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category: 'general'
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
}

export default News

// export class News extends Component {
//   static defaultProps = {
//     country : 'in',
//     pageSize : 8,
//     category: 'general'
//   }
//   static propTypes = {
//     country : PropTypes.string,
//     pageSize : PropTypes.number,
//     category : PropTypes.string,
//   }

//   capitalizeFirstLetter = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }

//   constructor(props){
//     super(props)
//     this.state = {
//       articless : [],
//       loading : true,
//       page: 1,
//       totalResults: 0
//     }
//     document.title = `NewsMonkey - ${this.capitalizeFirstLetter(props.category)}`
//   }

//   async updateNews(){
//     props.setProgress(10);
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
//     this.setState({ loading:true });
//     let data = await fetch(url);
//     props.setProgress(30);
//     let parsedData = await data.json();
//     console.log(parsedData)
//     this.setState({
//       articless: parsedData.articless, 
//       totalResults: parsedData.totalResults,
//       loading: false
//     });
//     props.setProgress(100);
//   }

//   async componentDidMount(){
//     updateNews();
//   }

//   // handlePreviousClick = async () => {
//   //   this.setState({page: this.state.page - 1});
//   //   updateNews();
//   // }

//   // handleNextClick = async () => {
//   //   this.setState({page: this.state.page + 1});
//   //   updateNews();
//   // }

//   fetchMoreData = async () => {
//     this.setState({page:this.state.page + 1})
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData)
//     this.setState({
//       articless: this.state.articless.concat(parsedData.articless),
//       totalResults: parsedData.totalResults
//     });
//   };
  

//   render() {
//     return (
//     <>
//       <h1 className='text-center' style={{margin: '23px'}}>NewsMonk - Top {this.capitalizeFirstLetter(props.category)} Headlines</h1>
//       {this.state.loading && <Spinner />}
//       <InfiniteScroll
//           dataLength={this.state.articless.length}
//           next={this.fetchMoreData}
//           hasMore={this.state.articless.length !== this.state.totalResults}
//           loader={<Spinner />}
//         >
//         <div className="container">
//           <div className="row">
//             {this.state.articless.map((element)=>{
//               return <div className="col-md-4" key={element.url}>
//                       <NewsItem title={element.title ? element.title : ""} description={element.description? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                     </div>
//             })}
//           </div>
//         </div>
//       </InfiniteScroll>
//     </>
//     )
//   }
// }

// export default News