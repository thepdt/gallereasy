import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import VersionService from './VersionService';
const Toolbars = React.lazy(() => import('./../../../components/Toolbars'));

class Versions extends Component {
    _versionService = new VersionService();

    constructor(props) {
        super(props);

        this.state = {
            versions: [],
            checkedVersions: [],
            checkedAll: false,
            modal: false,
            createModalMode: false,
            id: "",
            versionName: "",
            versionBuild: "",
            status: "",
            frag: "",
            forceUpdate: "",
            description: "",
            createdAt: "",
        };
        this.showVersionDetail = this.showVersionDetail.bind(this);

    }

    componentWillMount() {
        this.getVersions()
    }

    //get all Versions
    getVersions() {
        this._versionService.getVersions()
            .then((result) => {
                if (result.Message === "Success") {
                    result.Data.forEach(element => {
                        element.checked = false
                    });
                    this.setState({
                        versions: result.Data
                    })
                }
            }).catch((err) => {
                console.log("error: " + err);
            });
    }

    //Close modal 
    closeModal() {
        this.setState({
            modal: false,
        });
    }

    //Add a new category
    openCreateModal() {
        this.setState({
            modal: true,
            createModalMode: true,
            versionName: "",
            versionBuild: "",
            status: "",
            frag: "",
            forceUpdate: "",
            description: "",
            createdAt: "",
        });
    }

    createVersion() {
        const data = {
            VersionName: this.state.versionName,
            VersionBuild: Number(this.state.versionBuild),
            Status: Number(this.state.status),
            Frag: Number(this.state.frag),
            ForceUpdate: Number(this.state.forceUpdate),
            Description: this.state.description,
        }

        this._versionService.createVersion(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getVersions()
                }
            }).catch((err) => {
                console.log("err: " + err);
            });

        this.setState({
            modal: false,
        });

    }

    // Show detail Version
    showVersionDetail(id) {
        const versionSelected = this.state.versions.find(element => element.Id === id)
        this.setState({
            modal: true,
            createModalMode: false,
            id: versionSelected.Id,
            versionName: versionSelected.VersionName,
            versionBuild: versionSelected.VersionBuild,
            status: versionSelected.Status,
            frag: versionSelected.Frag,
            forceUpdate: versionSelected.ForceUpdate,
            description: versionSelected.Description,
            createdAt: versionSelected.CreatedAt
        });
    }

    updateVersion() {
        const data = {
            Id: this.state.id,
            VersionName: this.state.versionName,
            VersionBuild: Number(this.state.versionBuild),
            Status: Number(this.state.status),
            Frag: Number(this.state.frag),
            ForceUpdate: Number(this.state.forceUpdate),
            Description: this.state.description,
        }

        this._versionService.updateVersion(data)
            .then((result) => {
                if (result.Message === "Success") {
                    this.getVersions()
                }
            }).catch((err) => {
                console.log("error: " + err);
            });

        this.setState({
            modal: false,
        });
    }

    checkAll() {
        this.setState({
            checkedAll: !this.state.checkedAll,
        }, () => {
            const Versions = this.state.versions;

            if (this.state.checkedAll) {
                const _temp = [];
                Versions.forEach(element => {
                    element.checked = this.state.checkedAll;
                    _temp.push(element.Id)
                });
                this.setState({
                    checkedVersions: _temp
                });
            } else {
                Versions.forEach(element => {
                    element.checked = this.state.checkedAll;
                });
                this.setState({
                    checkedVersion: []
                });
            }
            this.setState({
                versions: Versions
            })
        });
    }

    checkMulti(Id) {
        const Versions = this.state.versions;
        const checkedVersion = Versions.find(element => element.Id === Id);
        checkedVersion.checked = !checkedVersion.checked;
        if (checkedVersion.checked) {
            this.setState({
                checkedVersions: this.state.checkedVersions.concat([Id]),
                checkedAll: Versions.find(element => element.checked === false) === undefined
            });
        } else {
            const _temp = this.state.checkedVersions
            _temp.splice(this.state.checkedVersions.indexOf(Id), 1)
            this.setState({
                checkedVersions: _temp,
                checkedAll: false,
            });
        }
        this.setState({
            versions: Versions
        });
    }

    checkOne(Id) {
        const Versions = this.state.versions;
        const index = Versions.findIndex(element => element.Id === Id);
        for (var i = 0; i < Versions.length; i++) {
            if (i !== index) {
                Versions[i].checked = false
            } else {
                Versions[index].checked = !Versions[index].checked
            }
        }
        if (Versions[index].checked) {
            this.setState({
                checkedVersions: [Id],
            });
        } else {
            this.setState({
                checkedVersions: [],
            });
        }
        this.setState({
            versions: Versions
        });
    }

    deleteVersion() {
        if (this.state.checkedVersions.length !== 0) {
            this._versionService.deleteVersion(this.state.checkedVersions[0])
                .then((result) => {
                    if (result.Message === "Success") {
                        this.getVersions()
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    searchVersion(e) {
        console.log(e);
    }

    onShowSearchBox(e) {
        console.log(e)
    }

    onClearSearchBox() {
        console.log("clear");
    }

    getId(event) {
        this.setState({
            id: event.target.value
        })
    }

    getVersionName(event) {
        this.setState({
            versionName: event.target.value
        })
    }

    getVersionBuild(event) {
        this.setState({
            versionBuild: event.target.value
        })
    }

    getStatus(event) {
        this.setState({
            status: event.target.value
        })
    }

    getFrag(event) {
        this.setState({
            frag: event.target.value
        })
    }

    getForceUpdate(event) {
        this.setState({
            forceUpdate: event.target.value
        })
    }

    getDescription(event) {
        this.setState({
            description: event.target.value
        })
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
                    searchOptions={[{ value: 1, text: "Theo tên chuyên mục" }]}
                    searchPlaceholder1={'Tìm kiếm theo tên version'} />
                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className="fa fa-align-justify"></i> Phiên bản
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
                                                <th scope="col" width="15%" className="">Tên</th>
                                                <th scope="col" width="10%" className="centered">Version build</th>
                                                <th scope="col" width="10%" className="centered">Trạng thái</th>
                                                <th scope="col" width="10%" className="centered">Frag</th>
                                                <th scope="col" width="10%" className="centered">Force update</th>
                                                <th scope="col" width="21%" className="">Mô tả</th>
                                                <th scope="col" width="21%" className="">Ngày tạo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.versions.map((version, index) =>
                                                (< tr key={version.Id.toString()} >
                                                    <td className="centered">
                                                        <label className="checkboxLabel">
                                                            <Input className="form-check-input" type="checkbox" id={version.Id} name={version.Id} value={version.checked} checked={version.checked} onChange={() => this.checkOne(version.Id)} />
                                                            <span className="label-text"></span>
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <span className="title" onClick={() => this.showVersionDetail(version.Id)}>{version.VersionName}</span>
                                                    </td>
                                                    <td className="centered">{version.VersionBuild}</td>
                                                    <td className="centered">{version.Status}</td>
                                                    <td className="centered">{version.Frag}</td>
                                                    <td className="centered">{version.ForceUpdate}</td>
                                                    <td>{version.Description}</td>
                                                    <td>{version.CreatedAt}</td>
                                                </tr>)
                                            )}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.closeModal.bind(this)} className={'modal-lg ' + this.props.className} autoFocus={false}>
                        <ModalHeader toggle={this.closeModal.bind(this)}>Phiên bản</ModalHeader>
                        <ModalBody className="modal-body">
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="name-input" className="title-required">Tên phiên bản:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="name-input" name="name-input" autoFocus value={this.state.versionName} onChange={(e) => this.getVersionName(e)} invalid={this.state.versionName === ""} />
                                    <FormFeedback valid={false}>Tên phiên bản không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="versionbuild-input" className="title-required">Version build:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="versionbuild-input" name="versionbuild-input" value={this.state.versionBuild} onChange={(e) => this.getVersionBuild(e)} invalid={(Number(this.state.versionBuild) < 0) || (this.state.versionBuild === "")} />
                                    <FormFeedback valid={false}>Version build mục không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="status-input" className="title-required">Trạng thái:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="status-input" name="status-input" value={this.state.status} onChange={(e) => this.getStatus(e)} invalid={(Number(this.state.status) < 0) || (this.state.status === "")} />
                                    <FormFeedback valid={false}>Trạng thái không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="frag-input" className="title-required">Frag:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="frag-input" name="frag-input" value={this.state.frag} onChange={(e) => this.getFrag(e)} invalid={(Number(this.state.frag) < 0) || (this.state.frag === "")} />
                                    <FormFeedback valid={false}>Frag không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="forceupdate-input" className="title-required">Force update:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="number" id="forceupdate-input" name="forceupdate-input" value={this.state.forceUpdate} onChange={(e) => this.getForceUpdate(e)} invalid={(Number(this.state.forceUpdate) < 0) || (this.state.forceUpdate === "")} />
                                    <FormFeedback valid={false}>Force update không được bỏ trống</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md="4" xs="12">
                                    <Label htmlFor="description-input">Miêu tả:</Label>
                                </Col>
                                <Col md="8" xs="12">
                                    <Input type="text" id="description-input" name="description-input" value={this.state.description} onChange={(e) => this.getDescription(e)} />
                                </Col>
                            </FormGroup>
                            {!this.state.createModalMode ?
                                (<FormGroup row>
                                    <Col md="4" xs="12">
                                        <Label htmlFor="createdat-input">Ngày khởi tạo:</Label>
                                    </Col>
                                    <Col md="8" xs="12">
                                        <Input type="text" id="createdat-input" name="createdat-input" value={this.state.createdAt} readOnly />
                                    </Col>
                                </FormGroup>)
                                : null
                            }
                        </ModalBody>
                        <ModalFooter>
                            {this.state.createModalMode ?
                                <Button color="primary" onClick={this.createVersion.bind(this)} disabled={(this.state.versionName === "") || (this.state.versionBuild === "") || (this.state.frag === "") || (Number(this.state.frag) < 0) || (this.state.status === "") || (Number(this.state.status) < 0) || (this.state.forceUpdate === "") || (Number(this.state.forceUpdate) < 0) || (this.state.description === "")}>Thêm mới</Button>
                                :
                                <Button color="primary" onClick={this.updateVersion.bind(this)} disabled={(this.state.versionName === "") || (this.state.versionBuild === "") || (this.state.frag === "") || (Number(this.state.frag) < 0) || (this.state.status === "") || (Number(this.state.status) < 0) || (this.state.forceUpdate === "") || (Number(this.state.forceUpdate) < 0) || (this.state.description === "")}>Cập nhật</Button>
                            }
                            <Button color="secondary" onClick={this.closeModal.bind(this)}>Hủy</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Versions;