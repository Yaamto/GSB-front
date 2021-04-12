import React from 'react'
import './BillsList.css';
import * as fromBillsApi from '../../api/bills'
import Modal from 'react-bootstrap4-modal'
import moment from 'moment'




class BillsList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            idFraisForfait:['KM', 'NUI', 'REP'],
            idmois:'',
            bills: [],
            rows:[],
            visible: false,
            nightsQte:0,
            repasQte:0,
            kilomQte:0,
            dateFraisHf:0,
            libelleFraisHf:0,
            montenantFraishf:0
            

        }

    }

  
    
    async componentDidMount(){
        let id = localStorage.getItem('id')
        console.log(id)
        let bills = await fromBillsApi.getBills(id)
        this.setState({bills: bills.result}, () => console.log(this.state))
        
        
    }
    ShowModal() {
        this.setState({
            visible: !this.state.visible
        })
        
       

    }

    async getLignes(mois){

        
             let id = localStorage.getItem('id')
             let ligneff = await fromBillsApi.getLigneFraisForfait(id, mois)
             let lignefhf = await fromBillsApi.getLigneFraisHorsForfait(id, mois)
             lignefhf.result.map((ligne, i) =>{
                 
                 ligne.date = moment(ligne.date).format('YYYY-MM-DD')
                 console.log(ligne.date)
             })
             this.setState({
                 kilomQte: ligneff.result[0].quantite,
                 nightsQte: ligneff.result[1].quantite,
                 repasQte: ligneff.result[2].quantite,
                 mois: mois,
                 rows:lignefhf.result,
                 
             })
 
             
            }
         
        
    

 async update(){
         let id = localStorage.getItem('id')
        
          await fromBillsApi.getLigneFraisHorsForfait(id, this.state.mois, this.state.idFraisForfait[0], this.state.kilomQte )
        this.setState({
            visible:!this.state.visible
        })

     }
    addRows = () => {
        
       this.setState({
           rows:[...this.state.rows,{date:'',libelle:'',montant:'',justificatif:''}]
       })
    }
    removeRows=(i)=>{
        let newRows = this.state.rows
        newRows.splice(i,1)
        this.setState({
            rows: newRows
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



    render() {
        return (

            <main class="flex-shrink-0">
                <div class="container">
                    <h1 class="mt-5">Bonjour M. Visiteur</h1>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Mois</th>
                                <th scope="col">Justificatifs</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Date de modification</th>
                                <th scope="col">Etat</th>
                                <th scope="col">Modificiation</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                this.state.bills.map((bill, i) =>{
                                    bill.dateModif = moment(bill.dateModif).format('DD/MM/YYYY')
                                    return(
                                        <tr>
                                <th scope="row">1</th>
                                <td>{bill.mois}</td>
                                <td>{bill.nbJustificatifs}</td>
                                <td>{bill.montantValide}</td>
                                <td>{bill.dateModif}</td>
                                <td>{bill.idEtat}</td>
                                <td>
                                <button type="button" class="btn btn-info btn-sm" onClick={() => {this.ShowModal(); this.getLignes(bill.mois)}}> <img src="edit.png" alt=""/></button>
                                
                                    </td>
                            </tr>
                        
                                    )
                                })
                            }
                          
                           
                        </tbody>
                    </table>
                    <Modal visible={this.state.visible} dialogClassName="modal-80w font-size center modal-dialog-scrollable">
                        <div className="modal-header">
                            <h4 className="modal-title">Modification Fiche Frais ANNEE / MOIS </h4>
                           
                        </div>
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
                                            <td><input type="date" name ={"date"} value={this.state.rows[i].date} onChange={(e)=>this.handleRowsChange(e, i)} /></td>
                                            <td><input type="text" name={"libelle"} value={this.state.rows[i].libelle} onChange={(e)=>this.handleRowsChange(e, i)}/></td>
                                            <td><input type="number" name={"montant"} value={this.state.rows[i].montant} onChange={(e)=>this.handleRowsChange(e, i)}/></td>
                                            <td> <input type="file" name={"justificatif"}  value={this.state.rows[i].justificatif} onChange={(e)=>this.handleRowsChange(e, i)}/></td>
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
                            <button type="button" className="btn btn-success" onClick={() => this.update()} >
                                Enregistrer
                            </button>
                            <button type="button" className="btn btn-light" onClick={() => this.ShowModal()}>
                                Annuler
                            </button>
                        </div>
                    </Modal>
                </div>
                
            </main>

        )

    }


}

export default BillsList;
