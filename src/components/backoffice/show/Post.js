import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
class BackOfficeShowPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
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
        fetch("http://51.255.175.118:2000/post", {
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

            console.log(this.state.searchItem)
          
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

            <div class="columns">
            <div class="column is-one-quarter"></div>
            <div class="column is-half"  style={{textAlign: "center",margin: "auto"}}>
            <input class="input" type="text" placeholder="Search" value={this.state.searchItem} onChange={this.handleChangeSearch} />
        <p>The actual page is : {this.state.actualPage} / {this.state.maxPage}</p>
            <table style={{width: "100%"}} class="table">
  <thead>
    <tr style={{textAlign:"center"}}>
      
        <th >Id</th>
        <th >Title</th>
        <th >Description</th>
        <th >Action</th>

    </tr>
  </thead>

  <tbody>
  
    {((this.state.data !== null )&& (this.state.data !== ""))?
            this.state.data.slice(0+(this.state.actualPage*this.state.elementsByPage),5+(this.state.actualPage*this.state.elementsByPage)).map((val,index) =>
            <tr>
            <th style={{height:100,width:30}}>{val.post_id}</th>
            <td style={{height:100,width:150}} >{val.title}</td>
            <td style={{height:100,width:250}, { 'whiteSpace': 'unset' } } >{val.description.length>10 ? val.description.substring(0,10)+"...": val.description}</td>
            <td style={{height:100,width:200}} ><p><button class="button is-info" onClick={event =>  window.location.href='/#/backoffice/posts/'+val.post_id+"/comments"}>V</button><button class="button is-info">M</button><button class="button is-danger">D</button></p></td>
            </tr>
            )
            :
            <h1>Aucune publication trouvée</h1>
          }

    
  </tbody>
</table>
<p><button class="button is-link" onClick={this.pushPrevButton}>Prev</button><button class="button is-link" onClick={this.pushNextButton}>Next</button><br/>
<button class="button is-danger" onClick={event =>  window.location.href='/#/backoffice'}>Back</button></p>
            </div>
            <div class="column is-one-quarted"></div>
            </div>
           
    );
  }
}
 
export default BackOfficeShowPosts;