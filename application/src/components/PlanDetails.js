import React, { Component } from 'react'

class PlanDetails extends Component {
    state = {
        name: ''
    }

    getLocationName(id) {
        if (id !== undefined && this.props.locations.length !== 0) {
            return this.props.locations.filter(location => location.id === id)[0].name;
        }
        return false;
    }

    render() {
        const { title, deleteElement, selectedPlan } = this.props
        var items = [];
        if (selectedPlan.location_steps !== undefined) {
            selectedPlan.location_steps.forEach(element => {
                element.type = "location_step";
                items.push(element);
            });
            selectedPlan.steps.forEach(element => {
                element.type = "step";
                items.push(element);
            });
        }

        return (
            <div>
                <h3 className="mb-3">{title}</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nume</th>
                            <th>Data</th>
                            <th>Nota</th>
                            <th>Observatii</th>
                            <th>Sterge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((element) => (
                            <tr key={element.id}>
                                <td>{element.type === 'location_step' ? this.getLocationName(element.locationId) : element.name}</td>
                                <td>{element.date}</td>
                                <td>{element.rating}</td>
                                <td>{element.observations}</td>
                                <td>

                                    <div>
                                        <button className="btn btn-xs btn-danger"
                                            onClick={() => deleteElement(element)}>Sterge</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PlanDetails
