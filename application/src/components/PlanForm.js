import React, { Component } from 'react';

class PlanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            observations: '',
            stepDate: '',
            stepName: '',
            stepObservations: '',
            locationStepDate: '',
            locationStepObservations: '',
            locationStepId: '',
            newSteps: [],
            newLocations: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLocationStepSubmit = this.handleLocationStepSubmit.bind(this);
        this.handleStepSubmit = this.handleStepSubmit.bind(this);
    }

    getLocation(name) {
        return this.props.locations.filter(location => location.name === name)[0].id || this.props.locations[0].id;
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleStepSubmit() {
        const result = {
            name: this.state.stepName,
            observations: this.state.stepObservations,
            date: this.state.stepDate
        }
        console.log(result);
        this.setState(prevState => ({
            newSteps: [...prevState.newSteps, result]
        }))
    }

    handleLocationStepSubmit() {
        const result = {
            locationId: this.state.locationStepId !== '' ? this.state.locationStepId : this.props.locations[0].name,
            observations: this.state.locationStepObservations,
            date: this.state.locationStepDate,
            rating: null
        }

        this.setState(prevState => ({
            newLocations: [...prevState.newLocations, result]
        }))
    }

    getLocationId(name) {
        return this.props.locations.filter(location => location.name === name)[0].id;
    }

    handleSubmit() {
        const result = {
            name: this.state.name,
            observations: this.state.observations,
            rating: null,
            userId: this.props.user.id
        }, me = this;

        this.state.newLocations.forEach((location) => {
            location.locationId = me.getLocationId(location.locationId);
        })
        this.props.addPlan(result, this.state.newLocations, this.state.newSteps);
    }

    render() {
        const { locations } = this.props;
        return (
            <div>
                <form>
                    <div className="border border-primary mt-3 p-3">
                        <h3>Plan</h3>
                        <label htmlFor="name">Nume</label>
                        <input value={this.state.name} className="form-control" type="text" name="name" onChange={this.handleChange} />
                        <label htmlFor="observations">Observatii</label>
                        <input value={this.state.observations} className="form-control" type="text" name="observations" onChange={this.handleChange} />
                    </div>
                    <div className="border border-primary mt-3 p-3">
                        <h3>Pas</h3>
                        <label htmlFor="stepName">Nume</label>
                        <input value={this.state.stepName} className="form-control" type="text" name="stepName" onChange={this.handleChange} />
                        <label htmlFor="stepObservations">Observatii</label>
                        <input value={this.state.stepObservations} className="form-control" type="text" name="stepObservations" onChange={this.handleChange} />
                        <label htmlFor="stepDate">Data</label>
                        <input value={this.state.stepDate} className="form-control" type="text" name="stepDate" onChange={this.handleChange} />
                        <button type="button" className="mt-3 btn btn-xs btn-primary mb-3 mr-2" onClick={this.handleStepSubmit}>Adauga</button>
                        <br />
                        {this.state.newSteps !== [] ?
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nume</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.newSteps.map((step, i) => (
                                        <tr key={`${i}${step.name}`}>
                                            <td>{step.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : null
                        }
                    </div>
                    <div className="border border-primary mt-3 p-3">
                        <h3>Locatie</h3>
                        <label htmlFor="locationId">Locatie</label>
                        <select ref={el => this.category = el} onChange={this.handleChange} className="form-control col-sm-2 mr-3" name="locationStepId" id="locationStepId">
                            {locations ?
                                locations.map((location, i) =>
                                    <option key={`${i}${location.name}`}>{location.name}</option>
                                ) : null}
                        </select>
                        <label htmlFor="locationStepObservations">Observatii</label>
                        <input value={this.state.locationStepObservations} className="form-control" type="text" name="locationStepObservations" onChange={this.handleChange} />
                        <label htmlFor="locationStepDate">Data</label>
                        <input value={this.state.locationStepDate} className="form-control" type="text" name="locationStepDate" onChange={this.handleChange} />
                        <button type="button" className="mt-3 btn btn-xs btn-primary mb-3 mr-2" onClick={this.handleLocationStepSubmit}>Adauga</button>
                        <br />
                        {this.state.newLocations !== [] ?
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nume</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.newLocations.map((location, i) => (
                                        <tr key={i}>
                                            <td>{location.locationId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : null
                        }
                    </div>
                    <br />
                    <button type="button" className="mt-3 btn btn-xs btn-primary mb-3 mr-2" onClick={this.handleSubmit}>Trimite</button>
                    <button type="button" className="btn btn-xs btn-danger" onClick={this.props.isAddingFalse}>Inapoi</button>
                </form>
            </div>
        )
    }
}

export default PlanForm;
