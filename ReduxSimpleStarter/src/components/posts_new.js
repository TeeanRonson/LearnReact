import React, {Component} from 'react';
//Field t is automatically wired to the reduxForm

//By importing reduxForm helps to integrate our application to
//the redux side & formReducer inside our reducers' index.js
//
import {Field , reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import { createPost } from '../actions/index';
import { connect } from 'react-redux';

class PostNew extends Component {
    
    //This will be the JSX that we will display on the client 
    //But we need to wire this to the Field t
    //Thats why we need to include a 'field' argument
    //this argument acts as an event handler to ensure that 
    //our Field t knows items have been changed inside here
    renderField(field) {
        const {meta} = field;
        const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`

        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    placeholder={field.placeholder}
                    className="form-control"
                    //..field.input is an object, containing a bunch of event handlers 
                    type="text" //text type input
                    {...field.input}  
                />
                <div className="text-help">
                 {meta.touched ? meta.error : ''}
                </div>
            </div>

        )
    }

    onSubmit(values) {
        console.log(values);
        this.props.createPost(values);


    }

    render() {

        //When a user submits a post 
        //handleSubmit will first check if the submission is valid
        //if it is, it will then call the method onSubmit 
        //to handle the data
        const { handleSubmit } = this.props;


        return (
            //For each new input field we should have a new Field tag
              //Field ts know how to interact with reduxForm
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field 
            label="Title for post"
            placeholder="Your title"
            name='title'
            component={this.renderField}
            />
            <Field 
            label="Categories"
            placeholder="Category"
            name='categories'
            component={this.renderField}
            />
            <Field 
            label="Content"
            placeholder="Enter your content"
            name='content'
            component={this.renderField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
          
        );
    }
}

/**
 * Validate what the user give in as input
 * Because we wired it into Redux form, this will be called evertime a user 
 * submits a form 
 */
function validate(values) {

    //Validate the input inside values 
    const errors = {};

    //if error contains anything --> redux form assumes form is invalid
    //if error is empty --> valid

    if (!values.title) {
        errors.title = "Enter a title!"
    }

    if (!values.categories) {
        errors.categories = "Enter a category!"
    }

    if (!values.content) {
        errors.content = "Type in your content"
    }

    return errors;

}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'})(PostNew);
 //Now that we have connected the action 'createPost' to this class
    //We can now make a call to this action in onSubmit

