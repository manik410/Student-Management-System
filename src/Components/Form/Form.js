import React, { Component } from 'react';
import swal from 'sweetalert';
import './Form.css';
class Form extends Component {

    constructor(props)
    {
        super(props);
        this.state={
            formStatus:true,
            username:'',
            password:'',
            email:''
        }
    }
    login(e)
    {
        e.preventDefault();
        if(this.state.username.length>0)
        {
            if(this.state.password.length>0)
            {
                let data=[]
                let flag=0;
                let loginStatus=false;
                if(localStorage.getItem("signup"))
                {
                    data=JSON.parse(localStorage.getItem("signup"))
                    data.map(item=>{
                        if(item.username===this.state.username)
                        {
                            flag=1;
                            if(item.password===this.state.password)
                            {
                                loginStatus=true;
                            }
                        }
                    })
                    if(flag===0)
                    {
                        swal({
                            text: "Username DoesNot Exists Please first Signup",
                            icon: "warning",
                            dangerMode: true,
                            }).then(()=>{
                                this.setState({username:'',email:'',password:''})
                            })
                    }
                    else
                    {
                        if(loginStatus)
                        {
                            this.setState({username:'',email:'',password:'',formStatus:true})
                            this.props.history.push({
                                pathname: "/data",
                            })
                        }
                        else
                        {
                            swal({
                                text: "Please enter correct password",
                                icon: "warning",
                                dangerMode: true,
                            }).then(()=>{
                                this.setState({username:'',email:'',password:'',formStatus:true})
                            })
                        }
                    }
                }
                else
                {
                    swal({
                        text: "User name doesnot exists.Please Signup first",
                        icon: "warning",
                        dangerMode: true,
                      }).then(()=>{
                        this.setState({username:'',email:'',password:''})
                    })
                }
            }
            else
            {
                swal({
                    text: "Please enter password",
                    icon: "warning",
                    dangerMode: true,
                  })
            }
        }
        else
        {
            swal({
                text: "Please enter username",
                icon: "warning",
                dangerMode: true,
              })
        }
    }
    signup(e)
    {
        e.preventDefault();
        if(this.state.username.length>0)
        {
           if(this.state.email.length>0)
           {
               let regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
               if(this.state.email.match(regex))
               {
                    if(this.state.password.length>0)
                    {
                        let userData={'username':this.state.username,'email':this.state.email,'password':this.state.password,department:this.state.department,contact:this.state.contact}
                        let data=[]
                        let flag=0;
                        if(localStorage.getItem("signup"))
                        {
                            data=JSON.parse(localStorage.getItem("signup"))
                            data.map(item=>{
                                if(item.username.toLowerCase()===this.state.username)
                                {
                                    flag=1;
                                }
                            })
                            if(flag===1)
                            {
                                swal({
                                    text: "Username Already Exists",
                                    icon: "warning",
                                    dangerMode: true,
                                    }).then(()=>{
                                        this.setState({username:'',email:'',password:'',department:'',contact:''})
                                    })
                            }
                            else
                            {
                                data.push(userData)
                                localStorage.setItem("signup",JSON.stringify(data))
                                this.setState({username:'',email:'',password:'',department:'',contact:'',formStatus:true})
                            }
                        }
                        else
                        {
                            data.push(userData)
                            localStorage.setItem("signup",JSON.stringify(data))
                            this.setState({username:'',email:'',password:'',formStatus:true})
                        }
                    }
                    else
                    {
                        swal({
                            text: "Please enter password",
                            icon: "warning",
                            dangerMode: true,
                            })
                    }
                }          
                else
                {
                    swal({
                        text: "Please enter email in valid format",
                        icon: "warning",
                        dangerMode: true,
                        })
                }
           } 
           else
           {
            swal({
                text: "Please enter email",
                icon: "warning",
                dangerMode: true,
              })
           }
        }
        else
        {
            swal({
                text: "Please enter username",
                icon: "warning",
                dangerMode: true,
              })
        }
    }
    render() {
        return (
            <div className="main-div"><br/><br/>
            <center><h1 style={{padding:"0",margin:"0"}}>Welcome To Student Management System</h1></center>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                    <button className={this.state.formStatus?'btn btn-primary':'btn'} onClick={()=>this.setState({formStatus:!this.state.formStatus})}>Sign In</button>
                    <button className={!this.state.formStatus?'btn btn-primary':'btn'} onClick={()=>this.setState({formStatus:!this.state.formStatus})}>Sign Up</button>
                    <form>
                        {
                        this.state.formStatus?
                        <div>
                            <input type="text" className="fadeIn second" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} placeholder="Username"/>
                            <input type="password" className="fadeIn third" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} placeholder="Password"/>
                            <button  className="btn btn-primary fadeIn fourth" onClick={(e)=>this.login(e)}>Log In</button>
                        </div>:<div>
                            <input type="text" className="fadeIn second" value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} placeholder="Username"/>
                            <input type="text"  className="fadeIn third" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} placeholder="Email"/>
                            <input type="password" className="fadeIn fourth" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} placeholder="Password"/>
                            <button className="fadeIn fourth btn btn-primary" onClick={(e)=>this.signup(e)}>Sign Up</button>
                        </div>
                        }
                    </form>               
                </div>
            </div>
            </div>
        )
    }
}

export default Form
