import React, { Component } from 'react'
import swal from 'sweetalert';
import './Section.css'
class Section extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            username:localStorage.getItem("signup")?JSON.parse(localStorage.getItem("signup"))[0].username:'',
            sectionData:localStorage.getItem("section")?JSON.parse(localStorage.getItem("section")):[],
            section:'',
            selectedSection:localStorage.getItem("selectedSection")?JSON.parse(localStorage.getItem("selectedSection")):''
        }
    }
    moveBack()
    {
        localStorage.removeItem("selectedSection");
        localStorage.removeItem("selectedYear");
        this.props.history.push("/year");
    }
    addData()
    {
        if(this.state.section.length>0)
        {
            let flag=0;
            this.state.sectionData.forEach(item=>
                {
                    if(item.toLowerCase()===this.state.section.toLowerCase())
                    {
                        flag=1;
                    }
                });
            if(flag===1)
            {
                this.setState({section:''});
                swal({
                    text: "Class Already Exists",
                    icon: "warning",
                    dangerMode: true,
                  })
            }
            else
            {
                let data=this.state.sectionData
                data.push(this.state.section);
                data.sort();
                this.setState({sectionData:data,section:''},()=>{
                    localStorage.setItem("section",JSON.stringify(data));
                })
            }
              
        }
        else
        {
            swal({
                text: "Please enter Class",
                icon: "warning",
                dangerMode: true,
              })
        }
    }
    deleteSection(item)
    {
        let newData=this.state.sectionData.filter(val=>val!==item).sort();
        this.setState({sectionData:newData},()=>{
            localStorage.setItem("section",JSON.stringify(newData));
        })
    }
    selectSection(e)
    {
        this.setState({ [e.target.name]: e.target.value })
    }
    addSection(e)
    {
        if(this.state.selectedSection.length<=0)
        {
            swal({
                text: "Please select Class",
                icon: "warning",
                dangerMode: true,
              })
        }
        else
        {
            localStorage.setItem("selectedSection",JSON.stringify(this.state.selectedSection));
            this.props.history.push("/fees");
        }
    }
    render() {
        return (
            <div className="main-div back">
                    <h3 style={{padding:"20px",color:"black",fontWeight:"bold"}} className="pull-left"><i>Welcome</i>&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.username}</b></h3>
                    <div className="pull-right">
                        <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-left" data-toggle="modal" data-target="#myModal">Add Class</button>
                        <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-left" onClick={()=>this.moveBack()}>Back</button>
                        <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-right" onClick={()=>{this.props.history.push("/")}}>Logout </button>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <div style={{width:"50%",float:"right",padding:"10px",height:"500px",overflowY:"auto"}}>
                {this.state.sectionData.length>0?<table className="table table-responsive">
                        <thead style={{position:"sticky",top:"0",zIndex:"1",backgroundColor:"black"}}>
                        <tr>
                            <th>Class of the Students</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.sectionData.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td key={item}><span style={{padding:"2px"}}><input checked={this.state.selectedSection===item?true:false}onChange={(e)=>this.selectSection(e)} type="radio" name="selectedSection" value={item}/></span><span>{item}</span></td>
                                        <td><button className="btn btn-danger" onClick={()=>this.deleteSection(item)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2" className="text-center"><button className="btn btn-danger" onClick={()=>this.addSection()}>Proceed</button></td>
                            </tr>
                        </tfoot>
                    </table>:<h1 style={{color:"black",fontWeight:"bold"}}>Please Add Class</h1>}
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Enter Class of the Student</h4>
                        </div>
                        <div className="modal-body">
                            <center>
                                <input type="text" value={this.state.section} onChange={(e)=>this.setState({section:e.target.value})} placeholder="Enter Class"/>
                            </center>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.addData()}>Add Class</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        )
    }
}

export default Section