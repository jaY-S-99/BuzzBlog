import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTitle } from "../../redux/actions/titleActions";
import { createGossip } from '../../redux/actions/gossipActions';
import TextFieldGroup from '../common/TextFieldGroupComponent';
import SelectFieldGroup from '../common/SelectFieldGroupComponent';
import TextArea from '../common/TextAreaComponent';


class CreateGossipComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            details: '',
            spiceLevel: 'S',
            errors: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.setTitle('Add a Gossip');
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();

        const newGossip = {
            title: this.state.title,
            details: this.state.details,
            spiceLevel: this.state.spiceLevel
        }

        this.props.createGossip(newGossip,this.props.history);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container mt-5 text-cream">
                <h1 className="display-4 text-center">Create Gossip</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4 mt-5">
                        <form className="form-container" onSubmit={this.onSubmit} noValidate>
                            <TextFieldGroup
                                name="title"
                                type="text"
                                error={errors.title}
                                onChange={this.onChange}
                                placeholder="Title"
                                value={this.state.title}
                            />
                            <TextArea
                                name="details"
                                error={errors.details}
                                onChange={this.onChange}
                                placeholder="Details of the Gossip!"
                                value={this.state.details}
                            />
                            <SelectFieldGroup
                                name="spiceLevel"
                                value={this.state.spiceLevel}
                                onChange={this.onChange}
                                error={errors.spiceLevel}
                                info="Spice level of the gossip."
                                options={[{ label: 'Too Spicy', value: 'TS' }, { label: 'Spicy', value: 'S' }, { label: 'Cold Spicy', value: 'CS' }]}/>
                            <button type="submit" className="form-button p-1 btn btn-lg btn-block">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

CreateGossipComponent.propTypes = {
    setTitle: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    createGossip: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps,{setTitle,createGossip})(withRouter(CreateGossipComponent));

