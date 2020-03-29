import React, { Component } from 'react';
import ItemDataService from './ItemdataService';
import {Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios'
class ItemComponent extends Component{
   
    constructor(props){
        super(props)

        this.state ={
            id: this.props.match.params.id,
            description: '',
            reservePrice: 0,
            dateAdded:''
        }
        
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

     componentDidMount(){
        
        
        ItemDataService.retrieveItem(1)//hard codes 1 as a test
        .then(response => this.setState({
            id: response.data.id,
            description: response.data.description,
            reservePrice: response.data.reservePrice,
            dateAdded: response.data.dateAdded
        }))
         console.log(this.state.id);
        
    }
    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        return errors

    }
    onSubmit(values) {
        
        let Item = {
            id: this.state.id,
            description: values.description,
            reservePrice: parseFloat(values.reservePrice),//Forcing to be a number
            dateAdded: values.dateAdded
            
            //targetDate: values.targetDate
        } 
       
        
       axios.put(`https://localhost:5001/api/v1/item/`+Item.id,Item);

       alert(`Bid placed on Item number: ${Item.id} for $${Item.reservePrice}`);
       
       
    } 
    render(){
        let {dateAdded,reservePrice, description, id } = this.state
        //const title = <h2>{this.state.id ? 'Edit Group' : 'Add Group'}</h2>;

        return(
            <div>
                <h3>Bidding Item</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, description , reservePrice,dateAdded}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Reserve Price</label>
                                        <Field className="form-control" type="text" name="reservePrice" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        ) 
    }
}
export default ItemComponent
