import React from 'react';
import './style.css';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { Modal, Form, Button } from "react-bootstrap";
import fake_user from "../../../../assets/imgs/avatar-circle-tale.svg";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import ReactTooltip from 'react-tooltip';
class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteModalActive: false,
            createModalActive: false,
            editModalActive: false,
            message: '',
            value: null,
            current: new Date(),
            messages: {},
            record: [
            ],
            currentRecord: [],
            id:''
        }
    }
    componentDidMount() {
        if (localStorage.getItem('messages')) {
            const records = JSON.parse(localStorage.getItem('messages'));
            this.setState({ record: records });
        }

    }
    handleClose() {
        this.setState({
            createModalActive: false
        })
    }
    handleChange = (event) => {
        this.setState({
            value: event,
        });
    }
    handleSubmit = () => {
       if (this.state.message === "") {//Notify if user is saving an empty message           
           NotificationManager.warning('Please add message', '', 2000);
           return;
       } else if (this.state.value === null) {//Notify if user has not selected a valid date for posting the message           
           NotificationManager.warning('Please add date', '', 2000);
           return;
       } else {
            const data = {
                date: this.state.value,
                message: this.state.message
            };
            this.state.record.push(data);
            localStorage.setItem('messages', JSON.stringify(this.state.record))
           this.setState({ createModalActive: false, value: null, message: '' });
           //Notify if user's message has been created
           NotificationManager.success('Your message is created successfully.', '', 2000);
        }
    }
    handleUpdateSubmit = () => {
         if (this.state.message === "") {
             //Notify if user is trying to save an empty message
             NotificationManager.warning('Please add message', '', 2000);
             return;
         } else if (this.state.value === null) {
             //Notify if user is trying to save without a posting date
             NotificationManager.warning('Please add date', '', 2000);
             return;
         } else { 
            var records = this.state.record
            records.map((item, index) => {
                if (index == this.state.id) {
                    records[index].date = this.state.value;
                    records[index].message = this.state.message;
                }
            });
            this.setState({ record: records });
            localStorage.setItem('messages', JSON.stringify(this.state.record));
             this.setState({ editModalActive: false, value: null, message: '' });
             NotificationManager.success('Your message is updated successfully.', '', 2000);
        }

    }
    onChangeEdit = (i) => {
        this.setState({id:i})
        var remainRecord = this.state.record.map((item, index) => {
            if (index == i) {
                return item;
            }
        });
        var filterData = remainRecord.filter(item => {
            if (item !== undefined) {
                return item
            }
        });
        this.setState({ currentRecord: filterData, value:filterData[0].date, message:filterData[0].message });
        this.setState({
            editModalActive: true
        })
    }
    onChangeDelete = (i) => {
        
        this.setState({
            deleteModalActive: true,
            id:i
        })
    }
    handleDeleteModalClose = () => {
        this.setState({
            deleteModalActive: false,
        })
    }
    handleEditClose = () => {
        this.setState({
            editModalActive: false
        })
    }
    handleDeleteModalConfirm = () => {
      var remainRecord = this.state.record.map((item, index) => {
            if (index !== this.state.id) {
                return item;
            }
        });
        var filterData = remainRecord.filter(item => {
            if (item !== undefined) {
                return item
            }
        });
        this.setState({ record: filterData, deleteModalActive:false });
        localStorage.setItem('messages', JSON.stringify(filterData));
        //Notify if user selected message has been deleted
        NotificationManager.success('Your message is deleted successfully.', '', 2000);
    }
    onChangeText = (e) => { 
        if (e.target.value.length > 280) {
            //Notify if user entered message has more than 280 characters
            NotificationManager.warning('Message length should be 280 characters', '', 2000);
            return;
        } else {
            this.setState({ message: e.target.value });
        }
    }
    render() {
        const { record } = this.state;
        const messageCount = ((this.state.record.length === 1) ? `1: Message` : `${this.state.record.length}: Saved Messages`);
        //sort message list in ascending order of date and time
        record.sort((a, b) => {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return c-d;
        });
        return (
            <>
                <nav className="top-navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid" style={{ alignItems: 'center', display: 'flex' }}>
                        <h6 style={{ margin: '0px 0px 0px 20px' }}>Your Message List ({messageCount})</h6>
                        <div className={"action-area"}>
                            <div className="col-auto active ">
                                <div className={"dropdown-toggle d-flex align-items-center"} >
                                    <IoIosArrowDown className="arrow-size"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {record.length > 0 ?
                    (<div className="message-content">
                        {record.map((item, i) => (
                            <div className="message-item" key={i}>
                                <div className="">
                                    <div className="row">
                                        <div className="col-md-10 col-9">
                                            <div className="message-title">
                                                {item.message}
                                            </div>
                                            <div className="message-date">
                                                Post message on {moment(item.date).format("DD/MM/YYYY-hh:mm:ss a")}
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-3 d-v-center">
                                            <FaRegEdit data-tip data-for='edit' style={{ fontSize: 22, cursor: "pointer" }} onClick={() => this.onChangeEdit(i)} />
                                            <ReactTooltip id='edit' effect='solid'>
                                                <span>Edit message</span>
                                            </ReactTooltip>
                                            <AiOutlineDelete data-tip data-for='delete' style={{ fontSize: 25, cursor: "pointer" }} onClick={() => this.onChangeDelete(i)} />
                                            <ReactTooltip id='delete' effect='solid'>
                                                <span>Delete message</span>
                                            </ReactTooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    
                </div>) : (<div className="message-content d-v-center">
                    <h4 className="dashboard-text">
                            Your do not have any messages yet. Please add a new message...
                    </h4>
                </div>)}
                <div className="add-message d-v-center" onClick={() => this.setState({createModalActive:true})}>
                    <HiOutlinePlus style={{ fontSize: 26, color: "white" }} data-tip data-for='sadFace'/>
                    <ReactTooltip id='sadFace' effect='solid'>
                        <span>New message</span>
                    </ReactTooltip>
                </div>

                {/* create modal */}
                <Modal
                    show={this.state.createModalActive}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    // style={MODAL_STYLES}
                    onHide={() => { this.handleClose() }}>
                    <Modal.Header>
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-2 col-2">
                                <img src={fake_user} alt="" className={"avatar"} />
                            </div>
                            <div className="col-md-10 col-10">
                                <Form.Control as="textarea" placeholder="Message..." rows="3" onChange={(e) => { this.onChangeText(e)}} value={this.state.message ? this.state.message : ''} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <DateTimePicker
                            onChange={this.handleChange}
                            value={this.state.value}
                            minDate={this.state.current}
                        />
                        <Button variant="light" className={"normal-button"} onClick={() => { this.handleClose() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" className={"confirm-button"} onClick={() => { this.handleSubmit() }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* edit modal */}
                <Modal
                    show={this.state.editModalActive}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => { this.handleEditClose() }}>
                    <Modal.Header>
                        <Modal.Title>Edit Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-2 col-2">
                                <img src={fake_user} alt="" className={"avatar"} />
                            </div>
                            <div className="col-md-10 col-10">
                                <Form.Control as="textarea" placeholder="Message..." rows="3" onChange={(e) => { this.onChangeText(e) }} value={this.state.message ? this.state.message : ''} />
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <DateTimePicker
                            onChange={this.handleChange}
                            value={this.state.value}
                            minDate={this.state.current}
                        />
                        <Button variant="light" className={"normal-button"} onClick={() => { this.handleEditClose() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" className={"confirm-button"} onClick={() => { this.handleUpdateSubmit() }}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* delete modal */}
                <Modal show={this.state.deleteModalActive}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={() => { this.handleDeleteModalClose() }}>
                    <Modal.Header>
                        <Modal.Title>Delete Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="alert-body">
                        <div className="modal-contanier ">
                            Are you sure to delete this message permanently?
                       </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" className={"normal-button"} onClick={() => { this.handleDeleteModalClose() }}>
                            Cancel
                        </Button>
                        <Button variant="primary" className={"confirm-button"} onClick={() => { this.handleDeleteModalConfirm() }}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
           </>
        );
    }
}
export default Message;