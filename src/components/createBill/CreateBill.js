import React from 'react'
import './CreateBill.css'
import Modal from 'react-bootstrap4-modal'
import * as fromBillsApi from '../../api/bills'


class CreateBill extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            bills: [],
            rows:[],
           
            nightsQte:0,
            repasQte:0,
            kilomQte:0,
            dateFraisHf:'',
            libelleFraisHf:'',
            montenantFraishf:'',
            date:''

        }

    }

    addRows() {
        this.setState({
            rows: [...this.state.rows, {date: '', libelle: '', montant: '', justificatif: '' }]
        })
    }
    removeRows(i){
        let row = this.state.rows
        row.splice(i,1)
        this.setState({
            rows:row
        })
    }
    handleChange=(e) =>{
        e.preventDefault()
        let name =e.target.name
        this.setState({
            [name]:e.target.value
        
        })
    }
    handleRowsChange(e, i){
        e.preventDefault()
        let {name, value}=e.target
        let rows = [...this.state.rows]
        rows[i]={
            ...rows[i],
            [name]: value
        } 
        this.setState({
            rows: rows
        },()=> console.log(this.state.rows))
    }
async componentDidMount(){
    let months =['Janvier','Fevrier','Mars','Avril','Mai', 'Juin', 'Juiller', 'Aout', 'Septembre', 'Octobre', 'Novembre','Décembre']
    let numMonth = new Date().getMonth()
    let year = new Date().getFullYear()
    let monthText
    months.map((month, i) =>{
        if(i==numMonth) monthText = month
    })
    this.setState({
        date:`${monthText} ${year}`
    })
}





   async postFiche(){
        let km= await fromBillsApi.postLigneFraisForfait({idutilisateur:'a131', mois: '202103', idFraisForfait:'KM', quantite: this.state.kilomQte})
        let meals= await fromBillsApi.postLigneFraisForfait({idutilisateur:'a131', mois: '202103', idFraisForfait:'REP', quantite: this.state.repasQte})
        let nights= await fromBillsApi.postLigneFraisForfait({idutilisateur:'a131', mois: '202103', idFraisForfait:'NUI', quantite: this.state.nightsQte})
        this.state.rows.map(async (r, i) =>{ 
           let lignefraisHorsForfait= await fromBillsApi.postLigneFraisHorsForfait({idutilisateur:'a131', mois:'202103', date:r.date, libelle: r.libelle, montant: r.montant, })
            
        })
        console.log(this.state)
    }
   
    render() {
        return (
          
                    <div className="modal-80w font-size center modal-dialog-scrollable pt100">
                        
                            <h4 className="modal-title text-center">Fiche de frais du mois de {this.state.date} </h4>
                           
                        
                        <div className="modal-body">
                        <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Type</th>
                                            <th scope="col">Qte</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Nuitées</th>
                                            <td><input className="form-control form-control-sm" name ="nightsQte" value={this.state.nightsQte} onChange={(e)=>this.handleChange(e)} type="text" placeholder="Qte" /></td>
                                            <td>80€</td>
                                            <td>{this.state.nightsQte * 80 +"€"}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Repas</th>
                                            <td><input className="form-control form-control-sm" name ="repasQte" value={this.state.repasQte} onChange={(e)=>this.handleChange(e)} type="text" placeholder="Qte" /></td>
                                            <td>29€</td>
                                            <td>{this.state.repasQte * 29 +"€"}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Kilométrage</th>
                                            <td><input className="form-control form-control-sm" name ="kilomQte" value={this.state.kilomQte} onChange={(e)=>this.handleChange(e)} type="text" placeholder="Qte" /></td>
                                            <td>0,8€</td>
                                            <td>{this.state.kilomQte * 0.8 +"€"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="fraishorsforfait">
                                        <h3>Frais hors forfait</h3>
                                        <button className="btn btn-info" onClick={()=> this.addRows()}>Ajouter frais hors forfait</button>
                                    </div>
                                
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Libelle</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Justificatifs</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                      this.state.rows.map((r, i) =>{
                                          return (
                                            <tr key={i}>
                                            <td><input type="date" name ="date" value={this.state.rows[i].date} onChange={(e)=>this.handleRowsChange(e, i)} /></td>
                                            <td><input type="text" name="libelle" value={this.state.rows[i].libelle} onChange={(e)=>this.handleRowsChange(e, i)}/></td>
                                            <td><input type="number" name="montant" value={this.state.rows[i].montant} onChange={(e)=>this.handleRowsChange(e, i)}/></td>
                                            <td> <input type="file" name="files"  value={this.state.rows[i].files} onChange={(e)=>this.handleRowsChange(e, i)}/></td>
                                            <td>
                                                <button type="button" className="btn btn-danger btn-sm mr-2" data-action="delete" onClick={() => this.removeRows(i)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>


                                            </td>
                                        </tr>
                                          )
                                      })
                                        }
                                    
                                    </tbody>
                                </table>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => this.postFiche()}>
                                Enregistrer
                            </button>
                           
                        </div>
                    </div>
           
        )}
        }
        

export default CreateBill;