import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Input, CustomInput } from 'reactstrap';
import ConfigAppService from './ConfigAppService';
const Toolbars = React.lazy(() => import('./../../../../components/Toolbars'));

class ConfigApp extends Component {
    _configAppService = new ConfigAppService();

    constructor(props) {
        super(props);

        this.state = {
            configApp: {},
            id: "",
            maintained: ""
        };
    }

    componentWillMount() {
        this.getConfigApp()
    }

    //get all Versions
    getConfigApp() {
        this._configAppService.getConfigApp()
            .then((result) => {                
                if (result.Message === "Success") {
                    result.Data.checked = false

                    this.setState({
                        configApp: result.Data
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    updateConfigApp() {
        const data = {
            Id: this.state.id,
            Maintained: this.state.maintained
        }

        this._configAppService.updateConfigApp(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getConfigApp()
                }
            }).catch((err) => {
                console.log("error: " + err);
            });

        this.setState({
            modal: false,
        });
    }

    checkOne(Id) {

    }

    deleteVersion() {

    }

    getId(event) {
        this.setState({
            id: event.target.value
        })
    }

    getMaintained(event) {
        this.setState({
            maintained: event.target.value
        })
    }

    maintain(id) {
        let maintain = 1
        if(this.state.configApp.Maintained === 1){
            maintain = 0
        }
        const data = {
            Id: id,
            Maintained: maintain
        }
        console.log(data);
        this._configAppService.updateConfigApp(data)
        .then((result) => {
            if (result.Message === "Success") {
                this.getConfigApp()
            }
        }).catch((err) => {
            console.log("error: " + err);
        });
    }


    render() {
        return (
            <div className="container-fullwidth">
                <Toolbars className="toolbar"
                    onDelete={e => this.deleteVersion(e)}
                    onOpenCreateModal={e => this.openCreateModal(e)}
                    onShowSearchBox={e => this.onShowSearchBox(e)}
                    onSearch={(opt, text) => this.searchVersion(text)}
                    onClearSearchBox={e => this.onClearSearchBox()}
                    valueOptions={this.state.versions}
                    searchOptions={[{ value: 1, text: "Theo id config" }]}
                    searchPlaceholder1={'Tìm kiếm theo id'} />
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Bảo trì ứng dụng
                                </CardHeader>
                                <CardBody>
                                    <Table responsive hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" width="3%" className="centered">
                                                    <label className="checkboxLabel">#
                                                        {/* <Input className="form-check-input" type="checkbox" checked={this.state.checkedAll} onChange={() => this.checkAll()} /> */}
                                                        <span className="label-text"></span>
                                                    </label>
                                                </th>
                                                <th scope="col" width="37%" className="centered">Id</th>
                                                <th scope="col" width="40%" className="centered">Bảo trì</th>
                                                <th scope="col" width="20%" className="centered">Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            < tr >
                                                <td className="centered">
                                                    <label className="checkboxLabel">
                                                        <Input className="form-check-input" type="checkbox" id={this.state.configApp.Id} name={this.state.configApp.Id} value={this.state.configApp.checked} checked={this.state.configApp.checked} onChange={() => this.checkOne(this.state.configApp.Id)} />
                                                        <span className="label-text"></span>
                                                    </label>
                                                </td>
                                                <td className="centered">{this.state.configApp.Id}</td>
                                                <td className="centered">{this.state.configApp.Maintained}</td>
                                                <td className="centered">
                                                    <CustomInput type="switch" id="{this.state.configApp.Id}" name="customSwitch" checked={this.state.configApp.Maintained === 1} value={this.state.configApp.Maintained === 1} onChange={() => this.maintain(this.state.configApp.Id)}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default ConfigApp;