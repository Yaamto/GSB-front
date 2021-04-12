import './Login.css'
import React, {Component} from 'react'
import logogsb from '../../assets/LogoGsb.png'
import * as fromUserApi from '../../api/users'
import {withRouter } from "react-router-dom";
import {postUser} from '../../api/users'


import Modal from 'react-bootstrap4-modal'
import * as fromBillsApi from '../../api/bills'

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        login:'',
        mdp:'',
        visible:false
      }




    }

    handleChange(e){
     e.preventDefault()
      let name = e.target.name
      this.setState({
          [name]: e.target.value
      })
     
  }

  ShowModal(){
    this.setState({
        visible : !this.state.visible
    })
    
}
 async login(){
    try{
    let {decoded, token}= await postUser({login:this.state.login, mdp:this.state.mdp})

    if(decoded){
        console.log(decoded)
        localStorage.setItem('id', decoded.id)
        localStorage.setItem('token', token)
        this.props.history.push('/accueil')
    }  
    
    }
    catch{
        this.setState({
            visible:!this.state.visible})
        
    }
  }


    render(){
    return (
      
      <div className="container-fluid">
          <div className="row no-gutter">
             
              <div className="col-md-6 d-none d-md-flex bg-image"><img className="logogsb" src={logogsb}></img></div>
              
              <div className="col-md-6 bg-light">
                  <div className="login d-flex align-items-center py-5">
                     
                      <div className="container">
                          <div className="row">
                              <div className="col-lg-10 col-xl-7 mx-auto">
                                  <h3 className="display-4">Connexion</h3>
                                  <p className="text-muted mb-4">Votre espace utilisateur</p>
                                 
                                      <div className="form-group mb-3">
                                          <input id="inputEmail" type="email" name="login" placeholder="Email address" required="" value={this.state.login} onChange={(e) => this.handleChange(e)} autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4" />
                                      </div>
                                      <div className="form-group mb-3">
                                          <input id="inputPassword" type="password" placeholder="Password" name="mdp" value={this.state.mdp} onChange={(e) => this.handleChange(e)} required="" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                      </div>
                                      <div className="custom-control custom-checkbox mb-3">
                                          <input id="customCheck1" type="checkbox" className="custom-control-input" />
                                          <label for="customCheck1" className="custom-control-label">Remember password</label>
                                      </div>
                                      <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={() => this.login()}>Sign in</button>
                                     
                                  
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <Modal visible={this.state.visible} dialogClassName="modal-80w font-size modal-dialog-scrollable alertModal" onClickBackdrop={() => this.ShowModal()}>
          <div className="modal-body alert">
            Login ou mot de passe incorrect ! 
            
          </div>
          </Modal>
      </div>
   
        )
}
}
export default withRouter(Login);