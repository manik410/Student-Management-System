import React, { Component } from 'react';
import swal from 'sweetalert';
import './StudentData.css';
class StudentData extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:localStorage.getItem("signup")?JSON.parse(localStorage.getItem("signup"))[0].username:'',
            name:'',
            admission:'',
            fees:'',
            dob:'',
            year:'',
            section:'',
            statusUpdateStudent:'',
            students:localStorage.getItem("studentsData")?JSON.parse(localStorage.getItem("studentsData")):[]
        }
    }
    deleteStudent(student)
    {
        let newData=this.state.students.filter(item=>item.name!==student.name)
        this.setState({students:newData});
        localStorage.setItem("studentsData",JSON.stringify(newData))
    }
    editData(item)
    {
        this.setState({
            name:item.name,
            admission:item.admission,
            fees:item.fees,
            statusUpdateStudent:item.name,
            dob:item.dob,
            year:item.year,
            section:item.section
        })
    }
    updateData()
    {
            if(this.state.name.length>0)
            {
                if(this.state.admission.length>0)
                {
                   if(this.state.fees.length>0)
                   {
                        let amount=Number(this.state.fees);
                        if(isNaN(amount))
                        {
                            swal({
                                text: "Please enter only digits in fees",
                                icon: "warning",
                                dangerMode: true,
                            })
                        }
                        else
                        {
                            let flag=0;
                            this.state.students.forEach(item=>
                                {
                                    if(item.name===this.state.name)
                                    {
                                        flag=1;
                                    }
                                });
                            if(flag===1)
                            {
                                swal({
                                    text:"Student Name Already Exists",
                                    icon:"warning",
                                    dangerMode:true
                                })
                            }
                            else
                            {
                                let ob={name:this.state.name,dob:this.state.dob,admission:this.state.admission,section:this.state.section,fees:this.state.fees,year:this.state.year}
                                console.log(ob);
                                let newData=this.state.students.filter(val=>val.name!==this.state.statusUpdateStudent)
                                newData.push(ob);
                                this.setState({students:newData,name:'',dob:'',admission:'',section:'',fees:'',year:''},()=>{
                                    localStorage.setItem("studentsData",JSON.stringify(newData))
                                })
                            }
                        }
                   }
                   else
                   {
                        swal({
                            text: "Please enter fees of the Student",
                            icon: "warning",
                            dangerMode: true,
                        })
                   }
                }
                else
                {
                    swal({
                        text: "Please enter Admission No. of the Student",
                        icon: "warning",
                        dangerMode: true,
                    })
                }
            }          
            else
            {
                swal({
                    text: "Please enter name of the Student",
                    icon: "warning",
                    dangerMode: true,
                })
            }
    }
    render() {
        return (
            <div className="main-div bg">
            <h3 style={{padding:"20px",color:"black",fontWeight:"bold"}} className="pull-left"><i>Welcome</i>&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.username}</b></h3>
            <div className="pull-right">
                <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-left" onClick={()=>this.props.history.push("/year")}>Add Student Data</button>
                <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-right" onClick={()=>{this.props.history.push("/")}}>Logout </button>
            </div>
            <div className="fadeInDown wrapper1">
               {this.state.students.length>0?<table className="table table-responsive">
                <thead>
                <tr>
                    <th style={{color:"black"}}>Name</th>
                    <th style={{color:"black"}}>Class</th>
                    <th style={{color:"black"}}>Academic Year</th>
                    <th style={{color:"black"}}>Date Of Birth</th>
                    <th style={{color:"black"}}>Admission No.</th>
                    <th style={{color:"black"}}>Fees</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.state.students.map((item,index)=>{
                    return (
                        <tr key={index}>
                            <td style={{color:"black !important"}} key={item.name}>{item.name}</td>
                            <td style={{color:"black !important"}} key={item.section}>{item.section}</td>
                            <td style={{color:"black !important"}} key={item.year}>{item.year}</td>
                            <td style={{color:"black !important"}} key={item.dob}>{item.dob}</td>
                            <td style={{color:"black !important"}} key={item.admission}>{item.admission}</td>
                            <td style={{color:"black !important"}} key={item.fees}>{item.fees}</td>
                            <td key={item.name+item.section}><button className="btn btn-danger" onClick={()=>this.deleteStudent(item)}>Delete</button></td>
                            <td key={item.name+item.section+item.dob}><button className="btn btn-danger" data-toggle="modal" data-target="#myModal1" onClick={()=>this.editData(item)}>Edit</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>:<h1 style={{color:"black",fontWeight:"bold"}} className="pull-right">Please Add Students Data</h1>}
        </div>
        <div className="modal fade" id="myModal1" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Edit Student Details</h4>
                </div>
                <div className="modal-body">
                    <center>
                        <input type="text" className="fadeIn first form-control" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} placeholder="Enter Name"/>
                        <input type="text" className="fadeIn second form-control" value={this.state.admission} onChange={(e)=>this.setState({admission:e.target.value})} placeholder="Enter Admission No."/>
                        <input type="text" className="fadeIn third form-control" value={this.state.fees} onChange={(e)=>this.setState({fees:e.target.value})} placeholder="Enter Fees"/>
                    </center>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>this.updateData()}>Edit Details</button>
                </div>
            </div>
        </div>
    </div>
        </div>
        
        );
    }
}

export default StudentData;


