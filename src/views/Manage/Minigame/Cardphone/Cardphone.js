import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, FormFeedback, Input, Label, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import PaginationComponent from "react-reactstrap-pagination";
import CardphoneService from "./CardphoneService";
const Toolbars = React.lazy(() => import('../../../../components/ToolbarForMutilParam/Toolbars'));

class Cardphone extends Component {
   _cardphoneService = new CardphoneService();

    constructor(props) {
        super(props);
        this.state = {
            cardphones : [],
            vendorcodes: [],
            modal: false,
            vendorCode: "",
            id : "",
            serial : "",
            code: "",
            value: 0,
            status:0,
            checkedCardphones: [],
            createModalMode : Boolean,
            orderByVendorCodeOptionOpen: false,
            orderByStatusOptionOpen: false,
            optionVendorCode:"viettel",
            orderByStatusOptions:[
                {value: 0, text:"Thẻ chưa sẵn sàng" },
                {value: 1, text:"Thẻ đã sẵn sàng" },
                {value: 2, text:"Thẻ đã được sử dụng" },
                {value: 10, text:"Thẻ bị lỗi" }

            ],
            orderByStatusOptionValue:"Thẻ chưa sẵn sàng",
            orderByStatusOption: 0,
            selectPage : 1,
            
        }
        this.orderByVendorCodeOptionToggle = this.orderByVendorCodeOptionToggle.bind(this);
        this.orderByStatusOptionToggle = this.orderByStatusOptionToggle.bind(this);
        this.showCardphoneDetail = this.showCardphoneDetail.bind(this)
    }
    componentWillMount(){
        this.getCardphone(this.state.selectPage)
        this.getVendorCodes()
    }
    
    getCardphone(pageIndex){        
            this._cardphoneService.getCardphone(pageIndex)            
            .then((result) => {                
                console.log(result)
                if(result.Message === "Success"){
                    result.Data.forEach(element => {
                        element.checked = false
                    });
                    this.setState({
                        cardphones : result.Data,
                    })
                }
                
            })
            .catch((err)=>{
                console.log("error"+err)
            });
    }

    getVendorCodes(){
        this._cardphoneService.getVendorCodes()
        .then((result) => {
            console.log(result)
            if(result.Message === 'Success'){
                this.setState({
                    vendorcodes : result.Data,
                })
            }
        })
    }

    getCardphoneStatus(e){        
        const CardphoneSelect = this.state.cardphones       
        var _cardphone = []
        for(var i = 0; i< CardphoneSelect.length ; i++){           
            if(CardphoneSelect[i].Status === Number(e) ){               
                _cardphone.push(CardphoneSelect[i])
            }
        }        
        this.setState({
            cardphones :_cardphone
        })
      
    }

    getCardphoneVendorCode(id){
       const VendorCodeSelect = this.state.vendorcodes
       var vendorcodeSelected =[]
       for( var i = 0; i< VendorCodeSelect.length; i++){
           if(VendorCodeSelect[i].Id === id){
               vendorcodeSelected.push(VendorCodeSelect[i])
           }
       }
       this.setState({
           vendorcodes :vendorcodeSelected
       },
       console.log(this.state.vendorcodes))

    }

    checkOne(Id){
        const Cardphones = this.state.cardphones;
        const index = Cardphones.findIndex(element => element.Id === Id);
        for( var i = 0; i< Cardphones.length; i++){
            if (i!== index){
                Cardphones[i].checked = false
            }else {
                Cardphones[index].checked =!Cardphones[index].checked
            }
        }
        if (Cardphones[index].checked) {
            this.setState({
                checkedCardphones: [Id],
            });
        } else {
            this.setState({
                checkedCardphones: [],
            });
        }
        this.setState({
            cardphones: Cardphones
        });
    }

    openCreateModal(){
        this.setState({
            modal:!this.state.modal,
            createModalMode: true,            
            vendorCode: "",
            serial : "",
            code: "",
            value:0,
            status:""
        })
    }
    closeModal() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    onShowSearchBox(e) {
        if (e === false){
            this.getCardphone();
        }
    }
    searchCardphone(o,e){
        console.log(e.value)
        this.getCardphoneStatus(e)
        this.getCardphoneVendorCode(e.value)
        
    }
    onClearSearchBox() {
        this.getCardphone();
    }
    getVendorCode(event){
        this.setState ({
            vendorCode: event.target.value
        })
    }
    getSerial(event){
        this.setState ({
            serial: event.target.value
        })
        
    }
   
    getCode(event){
        this.setState({
            code: event.target.value
        })
    }
    getValue (event){        
        this.setState({
            value:event.target.value
        })
    }
    getStatus (event){
        console.log(event.target.value)
        this.setState({
            status:event.target.value
        })
    }
    
    createCardphone(){
        const data = {
            VendorCode : this.state.vendorCode,
            Serial: this.state.serial,
            Code : this.state.code,
            Value : Number(this.state.value),
            Status :Number(this.state.status),
        }
        this._cardphoneService.createCardphone(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getCardphone(this.state.selectPage)
                }
            }).catch((err) => {
                console.log("err: " + err);
            });

        this.setState({
            modal: false,
        });
    }

    showCardphoneDetail(id){
        const cardphoneSelected = this.state.cardphones.find(element => element.Id ===id)
        this.setState({
            modal : !this.state.modal,
            createModalMode : false,
            id : cardphoneSelected.Id,
            vendorCode: cardphoneSelected.VendorCode,
            serial : cardphoneSelected.Serial,
            code: cardphoneSelected.Code,
            value: cardphoneSelected.Value,
            status: cardphoneSelected.Status,

        });
    }

    updateCardphone(){
        const data = {
            Id : this.state.id,             
            VendorCode : this.state.vendorCode,
            Serial: this.state.serial,
            Code : this.state.code,
            Value : Number(this.state.value),
            Status :this.state.status,
        }
        console.log(data)
        this._cardphoneService.updateCardphone(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getCardphone(this.state.selectPage)
                }
            }).catch((err) => {
                console.log("error: " + err);
            });

        this.setState({
            modal:! this.state.modal,
        });
    }


    deleteCardphone(){
        console.log(this.state.checkedCardphones)
        if(this.state.checkedCardphones.length !== 0){
            this._cardphoneService.deleteCardphone(this.state.checkedCardphones[0])
                .then((result)=>{
                   if(result.Message === "Success"){
                    this.getCardphone(this.state.selectPage)
                   }
                })
                .catch((err)=>{
                    console.log("error"+err)
                });
        }
    }

    orderByVendorCodeOptionToggle(){
        this.setState({
            orderByVendorCodeOptionOpen: ! this.state.orderByVendorCodeOptionOpen
        })
    }
    orderByStatusOptionToggle(){
        this.setState({
            orderByStatusOptionOpen: !this.state.orderByStatusOptionOpen
        })
    }
    changeVendorCode(event){
        this.setState({
            orderByVendorCodeOptionOpen : ! this.state.orderByVendorCodeOptionOpen,
            optionVendorCode : event.target.innerText,
            vendorCode : event.target.innerText

        })    
        console.log(event.target.innerText)    
    }

    changeStatus(value,text){
        console.log(value)
        console.log(text)

        this.setState({
            orderByStatusOptionOpen: !this.state.orderByStatusOptionOpen,
            orderByStatusOptionValue: text,
            orderByStatusOption: value,
            status: value,
        })

    }

    selectedPage(selectPage){
        this.getCardphone(selectPage)
        this.setState({
            selectPage: selectPage
        })
    }

    render(){
        return(
            <div className="container-fullwidth">
                <Toolbars className="toolbar"
                    onDelete={e => this.deleteCardphone(e)}
                    onOpenCreateModal={e => this.openCreateModal(e)}
                    onShowSearchBox={e => this.onShowSearchBox(e)}
                    onSearch={(opt, text) => this.searchCardphone(opt,text)}
                    onClearSearchBox={e => this.onClearSearchBox()}
                    valueOptions={this.state.vendorcodes}
                    searchOptions={[{value :1, text: "Theo mã nhà mạng "},{ value: 2, text: "Theo trạng thái thẻ nạp"}]} 
                    searchPlaceholder1 = {'Tìm kiếm theo mã nhà mạng'}
                    searchPlaceholder2 = {'Tìm kiếm theo trạng thái thẻ'} />
                    
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className='fa fa-credit-card'></i>Thẻ nạp điện thoại
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" width="3%" className="centered">
                                                    <label className="checkboxLabel">#</label>         
                                                </th>
                                                <th scope="col" width="3%" className="centered">Stt</th>
                                                <th scope="col" width="24%"className="centered">Mã nhà mạng</th>
                                                <th scope="col" width="20%"className="centered">Sê ri của thẻ</th>
                                                <th scope="col" width="20%"  className="centered">Mã thẻ</th>
                                                <th scope="col" width="15%" className="centered">Giá trị thẻ</th>
                                                <th scope="col" width="15%" className="centered">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.cardphones.map((cardphone, index) =>
                                                (<tr key={index}>
                                                    <td className="centered">
                                                        <label className="checkbocLable">
                                                        <Input className="form-check-input" type="checkbox" id={cardphone.Id} name={cardphone.Id} value={cardphone.checked} checked={cardphone.checked} onChange={() => this.checkOne(cardphone.Id)} />
                                                        <span className="label-text"></span>
                                                        </label>
                                                    </td>
                                                    <td >{index +1}</td>
                                                    <td> <span className = "title" onClick = {() => this.showCardphoneDetail(cardphone.Id)}>{cardphone.VendorCode}</span>
                                                    </td>
                                                    <td>{cardphone.Serial}</td>
                                                    <td>{cardphone.Code}</td>
                                                    <td>{cardphone.Value}</td>
                                                    <td>{cardphone.Status}</td>
                                                </tr>)
                                            )}
                                        </tbody>
                                    </Table>
                                    <Row>
                                        <Col md="12" className="pagination">
                                            <PaginationComponent totalItems={10000} pageSize={10} onSelect={this.selectedPage.bind(this)} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                        <ModalHeader toggle={this.closeModal.bind(this)}> Thẻ nạp điện thoại </ModalHeader>
                        <ModalBody className=" modal-body">
                            <FormGroup row>
                                 <Col md="4" xs="12">
                                    <Label htmlFor="name-input" className="title-required">Mã nhà mạng:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    {/* <Input type="select" id="name-input" name="name-input" autoFocus value={this.state.vendorCode} onChange={(e) => this.getVendorCode(e)} invalid={this.state.vendorCode === ""}>
                                            <option key ='-1' value =''>Lựa chọn mã nhà mạng</option>
                                            {this.state.vendorcodes.map(vendorcode=>(
                                                <option key={vendorcode.Id} value={vendorcode.VendorCode}>{vendorcode.VendorCode}</option>
                                            ))}
                                    </Input>
                                    <FormFeedback valid={false}>Mã nhà mạng không được bỏ trống</FormFeedback> */}
                                    <Dropdown isOpen={this.state.orderByVendorCodeOptionOpen} toggle={this.orderByVendorCodeOptionToggle}>
                                        <DropdownToggle caret>{this.state.optionVendorCode}</DropdownToggle>     
                                        <DropdownMenu>
                                            {this.state.vendorcodes.map(vendorcode =>
                                                <DropdownItem  key={vendorcode.Name} onClick={(e) => this.changeVendorCode(e)}>{vendorcode.VendorCode}</DropdownItem>
                                            )}
                                        </DropdownMenu>               
                                    </Dropdown>                                    
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="seri-input" className="title-required">Sê-ri của thẻ :</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="seri-input" name="seri-input" value={this.state.serial} onChange={(e) => this.getSerial(e)} invalid={(this.state.serial === "")} />
                                    <FormFeedback valid={false}>Sê-ri của thẻ không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="code-input">Mã thẻ:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="code-input" name="code-input" value={this.state.code} onChange={(e) => this.getCode(e)} invalid={(this.state.code === "")} />
                                    <FormFeedback valid={false}>Mã thẻ không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="value-input">Giá trị:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="value-input" name="value-input" value={this.state.value} onChange={(e) => this.getValue(e)} invalid={(this.state.value === "")} />
                                    <FormFeedback valid={false}>Gía trị thẻ không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="status-input">Status:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    {/* <Input type="select" id="status-input" name="status-input" value={this.state.status} onChange={(e) => this.getStatus(e)} invalid={(this.state.status === "")}>
                                            <option key= '-1' value =''>Lưạ chọn trạng thái của thẻ</option>
                                            {this.state.orderByStatusOptions.map(option=>
                                                (<option key={option.value} value={option.value}>{option.text}</option>))}
                                    </Input>
                                    <FormFeedback valid={false}>Status của thẻ không được bỏ trống</FormFeedback> */}
                                    <Dropdown isOpen={this.state.orderByStatusOptionOpen} toggle={this.orderByStatusOptionToggle}>
                                        <DropdownToggle caret>{this.state.orderByStatusOptionValue}</DropdownToggle>     
                                        <DropdownMenu>
                                            {this.state.orderByStatusOptions.map(option=>
                                                <DropdownItem id={option.value} key={option.value} onClick={() => this.changeStatus(option.value, option.text)}>{option.text}</DropdownItem>
                                            )}
                                        </DropdownMenu>               
                                    </Dropdown>     
                                </Col>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            {this.state.createModalMode ?
                                <Button color="primary" onClick={this.createCardphone.bind(this)} disabled={(this.state.vendorCode === "") || (this.state.serial === "")||(this.state.code==="")||(Number(this.state.value===""))||(Number(this.state.status===""))}>Thêm mới</Button>
                                :
                                <Button color="primary" onClick={this.updateCardphone.bind(this)} disabled={(this.state.vendorCode === "") || (this.state.serial === "")||(this.state.code==="")||(Number(this.state.value===""))||(Number(this.state.status===""))}>Cập nhật</Button>
                            }
                            <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Cardphone;