import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor() {
    super();

    this.state = {
      articles : []
    }
  }

  searchNyTimes = (ev) => {
    ev.preventDefault();
    let query = (ev.target.children[0].children[1].value)
    let startDate = (ev.target.children[2].children[1].value)
    let endDate = (ev.target.children[3].children[1].value)

    //make a fetch call to app.get('/articles/:q/:begin_date/:end_date/', function (req, res) {
      
    fetch(`http://localhost:3001/articles/${query}/${startDate}/${endDate}`)
    .then(res => res.json())
    .then((res) => {
      const articles = res.response.docs;
      
      this.setState({articles});
    }); 
  }
  

  render (){

    return (
      <div className="jumbotron">
        <br /><br /><br /> <br /><br /><br />
        <h3>Search for articles of interest!</h3>
       </div>

      <div className="container">
        <form role="form" onSubmit={this.searchNyTimes}>
          <div className="form-group">
            <label for="topic">* Topic</label>
            <input type="topic" className="form-control" id="exampleInputEmail1">
          </div>

          <div className="form-group">
            <label for="start date">* Start Date</label>
            <input type="start date" className="form-control" id="exampleInputPassword1" placeholder="YYYYMMDD">
          </div >

          <div className="form-group">
            <label for="end date">End Date</label>
            <input type="end date" className="form-control" id="exampleInputPassword1" placeholder="YYYYMMDD">
          </div >

          <button type="submit" className="btn btn-default">Submit</button>
        </form> 

        <div className="row">
        <div className="col-sm-12">
          <br>
  
          <div className="panel panel-primary">
  
            <div className="panel-heading">
              <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
            </div>
  
            <div className="panel-body" id="well-section">
            {this.state.articles.map((art) =>
              <p>
                {art.headline.main}
                <button>save</button>
              </p>
                    
            )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <br>
  
          <div className="panel panel-primary">
  
            <div className="panel-heading">
              <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
            </div>
  
            <div className="panel-body" id="well-section">
              {this.state.articles.map((art) =>
                <p>
                  {art.headline.main}
                  <button>remove</button>
                </p>
                
              )}
            </div>
          </div>
        </div>
      </div>
</div>
      
    );
  }

export default App;