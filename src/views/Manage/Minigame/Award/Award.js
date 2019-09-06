import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import AwardService from './AwardService'
const Toolbars = React.lazy(() => import('./../../../../components/Toolbars'));

class Award extends Component {
   _awardService = new AwardService();

    constructor(props) {
        super(props);
        this.state={
            awards:[],
            id: '',
            name:'',
            value:'',
            description:'',
            checkedAwards: [],
            modal:false,
            createModalMode: Boolean

        }

    }
    componentWillMount() {
        this.getAward()
    }
    getAward(){
        this._awardService.getAward()
            .then((result)=>{      
                console.log(result)                
                if( result.Message === "Success"){
                    this.setState({
                        awards: result.Data,
                    })
                }             
                       
            }).catch((err) => {
                console.log("error: " + err);
            });            
    }
    createAward(){
        const data = {
            Name : this.state.name,
            Value : Number(this.state.value),
            Description : this.state.description
        }
        this._awardService.createAward(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getAward()
                }
            }).catch((err) => {
                console.log("err: " + err);
            });

        this.setState({
            modal: false,
        });

    } 
    checkOne(Id){
        const Awards = this.state.awards;
        const index = Awards.findIndex(element => element.Id === Id);
        for( var i = 0; i< Awards.length; i++){
            if (i!== index){
                Awards[i].checked = false
            }else {
                Awards[index].checked =!Awards[index].checked
            }
        }
        if (Awards[index].checked) {
            this.setState({
                checkedAwards: [Id],
            });
        } else {
            this.setState({
                checkedAwards: [],
            });
        }
        this.setState({
            awards: Awards
        });
    }

    openCreateModal(){
        this.setState({
            modal:!this.state.modal,
            createModalMode: true,
            name:'',
            value:'',
            description:'',
        })
    }

    closeModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    deleteAward(){
        if(this.state.checkedAwards.length !== 0){
            this._awardService.deleteAward(this.state.checkedAwards[0])
                .then((result)=>{
                   if(result.Message === "Success"){
                       this.getAward()
                   }
                })
                .catch((err)=>{
                    console.log("error"+err)
                });
        }
    }

    onShowSearchBox(e) {
        if (e === false){
            this.getNewaward();
        }
    }
    searchAward(e){
        console.log(e)
    }
    onClearSearchBox() {
        this.getNewaward();
    }
    getNameaward(event){
        this.setState ({
            name: event.target.value
        })
    }
    getValueaward(event){
        this.setState ({
            value: event.target.value
        })
    }
   
    getDescriptionaward(event){
        this.setState({
            description: event.target.value
        })
    }

    updateAward(){
        const data = {
            Id: this.state.id,
            Name : this.state.name,
            Value : Number(this.state.value),
            Description : this.state.description
        }
        console.log(data)
        this._awardService.updateAward(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getAward()
                }
            }).catch((err) => {
                console.log("error: " + err);
            });

        this.setState({
            modal: false,
        });
    }
    
    showAwardDetail(id){
        const awardSelected = this.state.awards.find(element =>element.Id === id)
        this.setState({
            modal: !this.state.modal,
            createModalMode: false,
            id: awardSelected.Id,
            name : awardSelected.Name,
            value :awardSelected.Value,
            description: awardSelected.Description
        },()=>{ console.log(awardSelected)})
    }
    render(){
        return(
            <div className="container-fullwidth">
                <Toolbars className="toolbar"
                    onDelete={e => this.deleteAward(e)}
                    onOpenCreateModal={e => this.openCreateModal(e)}
                    onShowSearchBox={e => this.onShowSearchBox(e)}
                    onSearch={(opt, text) => this.searchAward(text)}
                    onClearSearchBox={e => this.onClearSearchBox()}
                    valueOptions={this.state.awards}
                    searchOptions={[{ value: 1, text: "Theo tên giải thưởng" }]}
                    searchPlaceholder1={'Tìm kiếm theo tên giải thưởng'} />
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className='fa fa-gift'></i>Giải Thưởng
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" width="3%" className="centered">
                                                    <label className="checkboxLabel">#</label>         
                                                </th>
                                                <th scope="col" width="3%" className="centered"> STT</th>
                                                <th scope="col" width="44%" className="centered">Tên giải thưởng</th>
                                                <th scope="col" width="15%" className="centered">Giá Trị</th>
                                                <th scope="col" width="35%" className="centered">Mô tả</th>
                                            </tr>
                                        </thead>
                                        <tbody>                                            
                                            {this.state.awards.map((award, index) =>
                                                (<tr key={index}>
                                                    <td className="centered">
                                                        <label className="checkbocLable">
                                                        <Input className="form-check-input" type="checkbox" id={award.Id} name={award.Id} value={award.checked} checked={award.checked} onChange={() => this.checkOne(award.Id)} />
                                                        <span className="label-text"></span>
                                                        </label>
                                                    </td>
                                                    <td >{index +1}</td>
                                                    <td className ="title" onClick ={()=>this.showAwardDetail(award.Id)}>{award.Name}</td>
                                                    <td>{award.Value}</td>
                                                    <td>{award.Description}</td>
                                                </tr>)
                                            )}
                                        
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                        <ModalHeader toggle={this.closeModal.bind(this)}> Phần Thưởng</ModalHeader>
                        <ModalBody className=" modal-body">
                            <FormGroup row>
                                 <Col md="4" xs="12">
                                    <Label htmlFor="name-input" className="title-required">Tên giải thưởng thưởng:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="name-input" name="name-input" autoFocus value={this.state.name} onChange={(e) => this.getNameaward(e)} invalid={this.state.name === ""} />
                                    <FormFeedback valid={false}>Tên phần thưởng không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="value-input" className="title-required">Giá trị :</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="value-input" name="value-input" value={this.state.value} onChange={(e) => this.getValueaward(e)} invalid={(this.state.value === "")} />
                                    <FormFeedback valid={false}>Giá trị giải thưởng không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="description-input">Mô tả:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="description-input" name="description-input" value={this.state.description} onChange={(e) => this.getDescriptionaward(e)} invalid={(this.state.description === "")} />
                                    <FormFeedback valid={false}>Mô tả giải thưởng không được bỏ trống</FormFeedback>                                   
                                </Col>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            {this.state.createModalMode ?
                                <Button color="primary" onClick={this.createAward.bind(this)} disabled={(this.state.name === "") || (Number(this.state.value === ""))||(this.state.description==="")}>Thêm mới</Button>
                                :
                                <Button color="primary" onClick={this.updateAward.bind(this)} disabled={(this.state.name === "") || (Number(this.state.value === ""))||(this.state.description==="")}>Cập nhật</Button>
                            }
                            <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Award;