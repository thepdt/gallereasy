import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import NetworkService from './NetworkService';
const Toolbars = React.lazy(() => import('./../../../../components/Toolbars'));

class Network extends Component {
   _networkService = new NetworkService();

    constructor(props) {
        super(props);
        this.state = {
            networks: [],
            name: "",
            vendorCode: "",
            checkedNetwork: []
        }
    }
    componentWillMount(){
        this.getNetwork()
    }

    getNetwork(){
        this._networkService.getNetwork()
            .then((result)=>{
                if( result.Message ==="Success"){
                    this.setState({
                        networks : result.Data
                    })
                }
            })
            .catch((err)=>{
                console.log("error"+err)
            });
    }

    checkOne(Id){
        const Networks = this.state.networks;
        const index = Networks.findIndex(element => element.Id === Id);
        for( var i = 0; i< Network.length; i++){
            if (i!== index){
                Networks[i].checked = false
            }else {
                Networks[index].checked =!Networks[index].checked
            }
        }
        if (Networks[index].checked) {
            this.setState({
                checkedNetwork: [Id],
            });
        } else {
            this.setState({
                checkedNetwork: [],
            });
        }
        this.setState({
            networks: Networks
        });
    }

    openCreateModal(){
        this.setState({
            modal:!this.state.modal,
            createModalMode: true,
            name: "",            
            vendorCode: "",

        })
    }
    closeModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    deleteNetwork(){
        if(this.checkedNetwork.length !== 0){
            this._networkService.deleteNetwork(this.state.checkedNetwork[0])
                .then((result)=>{
                   if(result.Message === "Success"){
                       this.getNetwork()
                   }
                })
                .catch((err)=>{
                    console.log("error"+err)
                });
        }
    }
    onShowSearchBox(e) {
        if (e === false){
            this.getNetwork();
        }
    }
    searchNetwork(e){
        console.log(e)
    }
    onClearSearchBox() {
        this.getNetwork();
    }

    getName(event){
        this.setState ({
            name: event.target.value
        })
    }

    getVendorCode(event){
        this.setState ({
            vendorCode: event.target.value
        })
    }    
    createNetwork(){
        const data = {
            VendorCode : this.state.vendorCode,
            Name: this.state.name,            
        }
        this._networkService.createNetwork(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getNetwork()
                }
            }).catch((err) => {
                console.log("err: " + err);
            });

        this.setState({
            modal: false,
        });
    }
    updateNerwork(){
        const data = {
            VendorCode : this.state.vendorCode,
            Name: this.state.name,
            
        }

        this._networkService.updateNerwork(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getNetwork()
                }
            }).catch((err) => {
                console.log("error: " + err);
            });

        this.setState({
            modal: false,
        });
    }
   
    render(){
        return(
            <div className="container-fullwidth">
                <Toolbars className="toolbar"
                    onDelete={e => this.deleteNetwork(e)}
                    onOpenCreateModal={e => this.openCreateModal(e)}
                    onShowSearchBox={e => this.onShowSearchBox(e)}
                    onSearch={(opt, text) => this.searchNetwork(text)}
                    onClearSearchBox={e => this.onClearSearchBox()}
                    valueOptions={this.state.networks}
                    searchOptions={[{ value: 1, text: "Theo mã nhà mạng" }]}
                    searchPlaceholder1={'Tìm kiếm theo mã nhà mạng'} />
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className='fa fa-volume-control-phone'></i>Nhà mạng
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" width="3%" className="centered">
                                                    <label className="checkboxLabel">#</label>  
                                                </th>
                                                <th scope="col" width="3%"className="centered">STT</th>
                                                <th scope="col" width="44%"className="centered">Tên nhà mạng</th>
                                                <th scope="col" width="25%"className="centered">Mã nhà mạng</th>
                                                <th scope="col" width="25%" className="centered">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <tb className = 'centered'></tb>
                                                <tb></tb>
                                                <tb></tb>
                                                <tb></tb>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                        <ModalHeader toggle={this.closeModal.bind(this)}>Nhà mạng </ModalHeader>
                        <ModalBody className=" modal-body">
                            <FormGroup row>
                                 <Col md="4" xs="12">
                                    <Label htmlFor="name-input" className="title-required">Tên nhà mạng:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="name-input" name="name-input" autoFocus value={this.state.name} onChange={(e) => this.getName(e)} invalid={this.state.name === ""} />
                                    <FormFeedback valid={false}>Tên nhà mạng không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="vendorcode-input" className="title-required">Mã nhà mạng :</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="vendorcode-input" name="vendorcode-input" value={this.state.vendorCode} onChange={(e) => this.getVendorCode(e)} invalid={(this.state.vendorCode === "")} />
                                    <FormFeedback valid={false}>Mã nhà mạng không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>                            
                        </ModalBody>
                        <ModalFooter>
                            {this.state.createModalMode ?
                                <Button color="primary" onClick={this.createNetwork.bind(this)} disabled={(this.state.name === "") || (Number(this.state.vendorCode === ""))}>Thêm mới</Button>
                                :
                                <Button color="primary" onClick={this.updateNerwork.bind(this)}  disabled={(this.state.name === "") || (Number(this.state.vendorCode === ""))}>Cập nhật</Button>
                            }
                            <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Network;