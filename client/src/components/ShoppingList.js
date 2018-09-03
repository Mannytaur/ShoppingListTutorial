import React, { Component } from 'react';
import { Container, Table, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';


class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render(){
        
        const { items } = this.props.item;
        return(
            <Container>
                <Table>
                    <TransitionGroup className="shopping-list">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Name</th>
                                <th>Item Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(({_id, name, price}) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <tr>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this,_id)}
                                        >
                                            &times;
                                        </Button>
                                        <th>{name}</th>
                                        <th>${price}</th>
                                    </tr>
                                </CSSTransition>
                            ))}
                        </tbody>
                    </TransitionGroup>
                </Table>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(
    mapStateToProps, 
    {getItems, deleteItem}
) (ShoppingList);