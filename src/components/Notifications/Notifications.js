import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Notifications extends Component {
    constructor(props) {
        super(props);
        // this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        // this.state = {

        // };
    }

    componentDidMount() {
        this.props.onAddNoti(this)
    }
    
    componentWillUnmount() {
        this.props.onAddNoti(undefined)
    }

    addNotification(type, message) {
        this.notificationDOMRef.current.addNotification({
            message: message,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            <div>
                <ReactNotification ref={this.notificationDOMRef} />
            </div>
        )
    }
}

export default Notifications;
