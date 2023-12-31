import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end', position:'absolute',right:'0'}}>
            <span className="badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>{source}</span>
          </div>
          <img src={imageUrl? imageUrl : "https://images.moneycontrol.com/static-mcnews/2022/12/Collage-Maker-11-Dec-2022-09.40-AM-770x435.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author:'unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem