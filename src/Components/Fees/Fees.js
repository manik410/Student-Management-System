import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
class Fees extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            username:localStorage.getItem("signup")?JSON.parse(localStorage.getItem("signup"))[0].username:'',
            date:new Date(),
            admission:'',
            name:'',
            fees:0,
            studentsData:localStorage.getItem("studentsData")?JSON.parse(localStorage.getItem("studentsData")):[]
        }
    }
    pad2(n) {
        return (n < 10 ? '0' : '') + n;
      }
    moveBack()
    {
        localStorage.removeItem("selectedYear");
        localStorage.removeItem("selectedSection");
        this.props.history.push("/class")
    }
    addStudent()
    {
        if(this.state.name.length>0)
        {
          if(this.state.date)
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
                        this.state.studentsData.forEach(item=>
                            {
                                if(item.name.toLowerCase()===this.state.name.toLowerCase())
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
                            var month = this.pad2(this.state.date.getMonth()+1);
                            var day = this.pad2(this.state.date.getDate());
                            var year= this.state.date.getFullYear();
                            var formattedDate =  day+"-"+month+"-"+year;
                            let newStudent={name:this.state.name,dob:formattedDate,admission:this.state.admission,fees:this.state.fees,year:JSON.parse(localStorage.getItem("selectedYear")),section:JSON.parse(localStorage.getItem("selectedSection"))};
                            localStorage.setItem("studentsData",JSON.stringify([...this.state.studentsData,newStudent]))
                            localStorage.removeItem("selectedYear");
                            localStorage.removeItem("selectedSection");
                            this.setState({name:'',dob:new Date(),admission:'',fees:0})
                            this.props.history.push("/data");
                        }

                    }
                }
                else
                {
                    swal({
                        text: "Please add fees",
                        icon: "warning",
                        dangerMode: true,
                      })
                }
            }
            else
            {
                swal({
                    text: "Please enter Admission No.",
                    icon: "warning",
                    dangerMode: true,
                  })
            }
          }
          else
          {
            swal({
                text: "Please select Date of Birth",
                icon: "warning",
                dangerMode: true,
              })
          }
        }
        else
        {
            swal({
                text: "Please enter name of student",
                icon: "warning",
                dangerMode: true,
              })
        }
    }
    render() {
        return (
            <div className="main-div back">
                <h3 style={{padding:"20px",color:"black",fontWeight:"bold"}} className="pull-left"><i>Welcome</i>&nbsp;&nbsp;&nbsp;&nbsp;<b>{this.state.username}</b></h3>
                <div className="pull-right">
                    <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-left" onClick={()=>this.moveBack()}>Back</button>
                    <button style={{color:"black",fontWeight:"bold"}} className="btn btn-danger pull-right" onClick={()=>{this.props.history.push("/")}}>Logout </button>
                </div><br/><br/><br/><br/>
                <div style={{width:"50%",float:"right",padding:"10px"}}>
                    <table className="table table-responsive">
                            <tbody>
                                <tr>
                                    <td><input style={{width:"100%",textAlign:"initial"}} type="text" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} placeholder="Enter name of Student"/></td>
                                </tr>
                                <tr>
                                    <td><span style={{fontSize:"16px",padding:"15px 40px",color:"grey"}}>Enter Date of Birth &nbsp;&nbsp; </span><DatePicker placeholder="Enter Date of Birth" width="500px" selected={this.state.date} onChange={(date) => this.setState({date:date})} /></td>
                                </tr>
                                <tr>
                                <td><input style={{width:"100%",textAlign:"initial"}} type="text" value={this.state.admission} onChange={(e)=>this.setState({admission:e.target.value})}   placeholder="Enter Admission No."/></td>
                                </tr>
                                <tr>
                                    <td><input style={{width:"100%",textAlign:"initial"}} type="text" value={this.state.fees} onChange={(e)=>this.setState({fees:e.target.value})} placeholder="Enter Tution Fees."/></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2" className="text-center"><button className="btn btn-danger" onClick={()=>this.addStudent()}>Proceed</button></td>
                                </tr>
                            </tfoot>
                    </table>
                </div>
            </div>
        )
    }
}
export default Fees;
