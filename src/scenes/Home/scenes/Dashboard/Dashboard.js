import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap';
class Dashboard extends React.Component {
    render() {
        return (
        	<div>
	            <div className="message-content d-v-center">
	                <h1 className="empty-text">
	                    Welcome to Twitter Composer
	                </h1>	                
	            </div>
	            <div className="message-content-text d-v-center">
	                <ListGroup as="ul">
					  <ListGroup.Item as="li" active>Features</ListGroup.Item>
					  <ListGroup.Item as="li">Create and manage your messages.</ListGroup.Item>
					  <ListGroup.Item as="li">Schedule messages to post on Twitter.</ListGroup.Item>
					</ListGroup>                
	            </div>
	        </div>
        )
    }
}
 
export default Dashboard;