import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.login(this.state.username, this.state.password);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="container col-sm-4">
                <br />
                <h3>Aplicatie de planificare calatorii!</h3>
                <form>
                    <label>Username</label>
                    <input value={this.state.username} type="text" name="username" onChange={this.handleChange} className="form-control" required />
                    <label>Parola</label>
                    <input value={this.state.password} className="form-control mb-3" type="password" name="password" onChange={this.handleChange} required />
                    <button type="button" className="btn btn-sm btn-success" onClick={this.props.isAddingTrue}>Cont nou</button>
                    <button type="button" className="btn btn-sm btn-primary pull-right" onClick={this.handleSubmit}>Trimite</button>
                </form>
            </div>
        )
    }
}

export default Login;
