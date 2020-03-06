import React, { Component } from "react";
class BackOfficeShowComments extends Component {

    constructor(props) {
        super(props)

        this.state = {
            post_id : this.props.match.params.id,
            searchItem: "",
            dataFixed : null,
            data: null,
            elementsByPage: 5,
            actualPage : 0,
            maxPage: 0
        }
        this.pushNextButton=this.pushNextButton.bind(this)
        this.pushPrevButton=this.pushPrevButton.bind(this)
        this.handleChangeSearch = this.handleChangeSearch.bind(this)


      }

    componentDidMount() {
        this.getData()
    }

    getData(){
        fetch("http://51.255.175.118:2000/post/"+this.state.post_id+"/comments", {
      method: "GET"
    })
      .then(res => res.json())
      .then((data) => {
  

        this.setState({
          data: data,
          dataFixed: data,
          maxPage: Math.floor(data.length/this.state.elementsByPage)
        },)

      })

    }

    pushNextButton(){
        if(this.state.actualPage < this.state.maxPage){
        this.setState({
            actualPage : this.state.actualPage+1
           
        })
    }

    }
    handleChangeSearch(event){
        this.setState({searchItem: event.target.value},()=>{

         
          
            var temp = this.state.dataFixed.filter((n)=>{
                var exist = false
                for(const property in n){
                  
                    if(n[property].toString().toLowerCase().includes(this.state.searchItem.toLowerCase())){
                        exist = true
                    }
                }
                return exist
                
            })
            this.setState({data:temp,
                actualPage : 0,
                maxPage: Math.floor(temp.length/this.state.elementsByPage)})
        

                 
          })


    }

    pushPrevButton(){
        if(this.state.actualPage >0){
            this.setState({
                actualPage : this.state.actualPage-1
              
            })
        }

    }



    render() {
        return (

            <div className="columns">
            <div className="column is-one-quarter"></div>
            <div className="column is-half"  style={{textAlign: "center",margin: "auto"}}>
            <input className="input" type="text" placeholder="Search" value={this.state.searchItem} onChange={this.handleChangeSearch} />
        <p>The actual page is : {this.state.actualPage} / {this.state.maxPage}</p>
            <table style={{width: "100%"}} className="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th >Description</th>
        <th >Author</th>
        <th >Action</th>

    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr key={val.comment_id}>
            <th style={{height:100,width:30}}>{val.comment_id}</th>
            <td style={{height:100,width:250} } >{val.description.length>10 ? val.description.substring(0,10)+"...": val.description}</td>
            <th style={{height:100,width:30}}>{val.username}</th>
            <td style={{height:100,width:200}} ><p><button className="button is-info">V</button><button className="button is-info">M</button><button className="button is-danger">D</button></p></td>
            </tr>
            )
            :
            null
          }

    
  </tbody>
</table>
<p><button className="button is-link" onClick={this.pushPrevButton}>Prev</button><button className="button is-link" onClick={this.pushNextButton}>Next</button><br/>
<button className="button is-danger" onClick={event =>  window.location.href='/#/backoffice/posts'}>Back</button></p>
            </div>
            <div className="column is-one-quarted"></div>
            </div>
           
    );
  }
}
 
export default BackOfficeShowComments;