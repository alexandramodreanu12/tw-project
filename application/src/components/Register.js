import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            firstname: '',
            lastname: '',
            sex: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit() {
        var body = {
            username: this.state.username,
            password: this.state.password,
            sex: this.state.sex,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }

        this.props.isAddingFalse();
        this.props.addNewUser(body);
    }

    render() {
        return (
            <div className="container">
                <h3>Realizare cont de utilizator</h3>
                <form>
                    <label>Prenume</label>
                    <input value={this.state.firstname} className="form-control" type="text" name="firstname" onChange={this.handleChange} />
                    <label>Nume</label>
                    <input value={this.state.lastname} className="form-control" type="text" name="lastname" onChange={this.handleChange} />
                    <label>Sex</label>
                    <input value={this.state.sex} className="form-control" type="text" name="sex" onChange={this.handleChange} />
                    <label>Email</label>
                    <input value={this.state.email} className="form-control" type="email" name="email" onChange={this.handleChange} />
                    <label>Username</label>
                    <input value={this.state.username} className="form-control" type="text" name="username" onChange={this.handleChange} />
                    <label>Parola</label>
                    <input value={this.state.password} className="form-control" type="password" name="password" onChange={this.handleChange} />
                    <button type="button" className="btn btn-sm btn-primary mt-3" onClick={this.handleSubmit}>Trimite</button>
                    <button type="button" className="btn btn-sm btn-danger pull-right mt-3" onClick={this.props.isAddingFalse}>Inapoi</button>
                </form>
            </div>
        )
    }
}

export default Register;
