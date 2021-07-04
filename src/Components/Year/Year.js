import React, { Component } from 'react'
import swal from 'sweetalert';
import './Year.css'
class Year extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            username:localStorage.getItem("signup")?JSON.parse(localStorage.getItem("signup"))[0].username:'',
            yearData:localStorage.getItem("year")?JSON.parse(localStorage.getItem("year")):[],
            year:'',
            selectedYear:localStorage.getItem("selectedYear")?JSON.parse(localStorage.getItem("selectedYear")):''
        }
    }
    addData()
    {
        if(this.state.year.length>0)
        {
            if(this.state.year.match("^[12][0-9]{3}$"))
            {
                let flag=0;
                this.state.yearData.forEach(item=>
                    {
                        if(item.toLowerCase()===this.state.year.toLowerCase())
                        {
                            flag=1;
                        }
                    });
                if(flag===1)
                {
                    this.setState({year:''});
                    swal({
                        text: "Year Already Exists",
                        icon: "warning",
                        dangerMode: true,
                      })
                }
                else
                {
                    let data=this.state.yearData
                    data.push(this.state.year);
                    data.sort();
                    this.setState({yearData:data,year:''},()=>{
                        localStorage.setItem("year",JSON.stringify(data));
                    })
                }
            }
            else
            {
                swal({
                    text: "Please enter valid year",
                    icon: "warning",
                    dangerMode: true,
                  })   
            }
              
        }
        else
        {
            swal({
                text: "Please enter year",
                icon: "warning",
                dangerMode: true,
              })
        }
    }
    moveBack()
    {
        localStorage.removeItem("selectedYear");
         this.props.history.push("/data");
    }
    deleteYear(item)
    {
        let newData=this.state.yearData.filter(val=>val!==item).sort()
        this.setState({yearData:newData},()=>{
            localStorage.setItem("year",JSON.stringify(newData));
        })
    }
    selectYear(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }
    addYear(e)
    {
        if(this.state.selectedYear.length<=0)
        {
            swal({
                text: "Please select Academic Year",
                icon: "warning",
                dangerMode: true,
              })
        }
        else
        {
            localStorage.setItem("selectedYear",JSON.stringify(this.state.selectedYear));
            this.props.history.push("/class");
        }
    }
    render() {
        return (
            <div className="main-div back">
                    <h3 style={{padding:"20px",color:"black",fontWeight:"bold"}} className="pull-left"><i>Welcome</i>&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.username}</b></h3>
                    <div className="pull-right">
                        <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-left" data-toggle="modal" data-target="#myModal">Add Academic Year</button>
                        <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-left" onClick={()=>this.moveBack()}>Back</button>
                        <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-right" onClick={()=>{this.props.history.push("/")}}>Logout </button>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <div style={{width:"50%",float:"right",padding:"10px",height:"500px",overflowY:"auto"}}>
                {this.state.yearData.length>0?<table className="table table-responsive">
                        <thead style={{position:"sticky",top:"0",zIndex:"1",backgroundColor:"black"}}>
                        <tr>
                            <th>Academic Year</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.yearData.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td key={item}><span style={{padding:"2px"}}><input checked={this.state.selectedYear===item?true:false}onChange={(e)=>this.selectYear(e)} type="radio" name="selectedYear" value={item}/></span><span>{item}</span></td>
                                        <td><button className="btn btn-danger" onClick={()=>this.deleteYear(item)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2" className="text-center"><button className="btn btn-danger" onClick={()=>this.addYear()}>Proceed</button></td>
                            </tr>
                        </tfoot>
                    </table>:<h1 style={{color:"black",fontWeight:"bold"}}>Please Add Academic Year</h1>}
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Enter Academic Year</h4>
                        </div>
                        <div className="modal-body">
                            <center>
                                <input type="text" value={this.state.year} onChange={(e)=>this.setState({year:e.target.value})} placeholder="Enter Year"/>
                            </center>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.addData()}>Add Year</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        )
    }
}

export default Year