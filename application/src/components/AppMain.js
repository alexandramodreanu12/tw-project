import React, { Component } from 'react';
import PlanDetails from './PlanDetails'
import PlanForm from './PlanForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getLocations, getPlans, addPlan, modifyPlan, addStep, addLocationStep, deleteStep, deleteLocationStep } from '../actions'

const mapStateToProps = function (state) {
    return {
        plans: state.plan.plans,
        locations: state.location.locations
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        actions: bindActionCreators({
            getLocations,
            getPlans,
            addPlan,
            modifyPlan,
            addStep,
            addLocationStep,
            deleteStep,
            deleteLocationStep
        }, dispatch)
    }
}

class AppMain extends Component {
    constructor(props, context) {
        super(props, context);

        this.deleteElement = this.deleteElement.bind(this);
        this.addPlan = this.addPlan.bind(this);
        this.getPlanByName = this.getPlanByName.bind(this);
        this.isAddingFalse = this.isAddingFalse.bind(this);
        this.isAddingTrue = this.isAddingTrue.bind(this);
        this.isModificaFalse = this.isModificaFalse.bind(this);
        this.isModificaTrue = this.isModificaTrue.bind(this);
        this.getPlan = this.getPlan.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        isAddingMode: false,
        selectedPlan: {},
        isModificaMode: false
    }

    isAddingFalse() {
        this.setState({ isAddingMode: false });
    }

    isAddingTrue() {
        this.setState({ isAddingMode: true });
    }

    isModificaFalse() {
        this.setState({ isModificaMode: false });
    }

    isModificaTrue() {
        this.setState({ isModificaMode: true });
    }

    handleChange(e) {
        const value = this.state.selectedPlan;
        if (e.target.name === 'name') {
            value.name = e.target.value;
        } else {
            value.observations = e.target.value;
        }
        this.setState({
            selectedPlan: value
        })
    }

    handleSubmit() {
        const me = this;
        this.props.actions.modifyPlan(this.state.selectedPlan, this.state.selectedPlan.id).then(() => {
            me.props.actions.getPlans(me.props.user.id).then(() => {
                me.setState({ selectedPlan: me.props.plans[0] || {} });
            });
        });
        this.isModificaFalse();
    }

    componentDidMount() {
        const me = this;
        this.props.actions.getPlans(this.props.user.id).then(() => {
            me.setState({ selectedPlan: this.props.plans[0] || {} });
        });
        this.props.actions.getLocations();
    }

    getPlan(id) {
        return this.props.plans.filter(plan => plan.id === id)[0];
    }

    deleteElement(element) {
        const me = this;
        if (element.type === 'step') {
            this.props.actions.deleteStep(element.id).then(() => {
                me.props.actions.getPlans(me.props.user.id).then(() => {
                    me.setState(prevState => ({
                        selectedPlan: me.getPlan(prevState.selectedPlan.id)
                    }))
                });
            });
        } else {
            this.props.actions.deleteLocationStep(element.id).then(() => {
                me.props.actions.getPlans(me.props.user.id).then(() => {
                    me.setState(prevState => ({
                        selectedPlan: me.getPlan(prevState.selectedPlan.id)
                    }))
                });
            });;
        }
    }

    addPlan(plan, newLocation, newStep) {
        const me = this;
        this.props.actions.addPlan(plan).then(() => {
            me.props.actions.getPlans(this.props.user.id).then(() => {
                const planId = me.props.plans[me.props.plans.length - 1].id;
                newLocation.forEach(element => {
                    element.planId = planId;
                    me.props.actions.addLocationStep(element, planId);
                });
                newStep.forEach(element => {
                    element.planId = planId;
                    me.props.actions.addStep(element, planId);
                });
            });
            setTimeout(function () {
                me.props.actions.getPlans(me.props.user.id)
            }, 1000);
            me.isAddingFalse();
        });
    }
    getPlanByName(planName) {
        return this.props.plans.filter(plan => plan.name === planName)[0];
    }

    changePlan(event) {
        event.preventDefault();
        var me = this;
        this.setState({ selectedPlan: me.getPlanByName(event.target.value) });
    }

    render() {
        let { plans, user } = this.props;

        return (
            <div className="container">
                {
                    this.state.isAddingMode ?
                        <div>
                            <PlanForm locations={this.props.locations} isAddingFalse={this.isAddingFalse} className="mt-3" user={user} addPlan={this.addPlan} ></PlanForm>
                        </div> :
                        <div>
                            <h2 className="mb-2">Bine ai venit, {user.firstname}!</h2>
                            <form className="mb-3 form-inline">
                                <button type="button" className="btn btn-sm btn-primary" onClick={this.isAddingTrue}>Creaza plan</button>
                                <select ref={el => this.category = el} onChange={(event) => this.changePlan(event)} className="form-control col-sm-2 ml-3 mr-3" id="selectedPlan">
                                    {plans ?
                                        plans.map((plan) =>
                                            <option key={plan.id}>{plan.name}</option>
                                        ) : null}
                                </select>
                                <button type="button" className="btn btn-sm btn-success" onClick={this.isModificaTrue}>Modifica plan</button>
                            </form>
                            {this.state.selectedPlan ?
                                <div>
                                    <PlanDetails locations={this.props.locations} selectedPlan={this.state.selectedPlan} deleteElement={this.deleteElement} plans={plans}></PlanDetails>
                                </div> : null
                            }
                            {
                                this.state.isModificaMode ?
                                    <div>
                                        <form>
                                            <div className="border border-primary mt-3 p-3">
                                                <h3>Plan</h3>
                                                <label htmlFor="name">Nume</label>
                                                <input value={this.state.selectedPlan.name} className="form-control" type="text" name="name" onChange={this.handleChange} />
                                                <label htmlFor="observations">Observatii</label>
                                                <input value={this.state.selectedPlan.observations} className="form-control" type="text" name="observations" onChange={this.handleChange} />
                                            </div>
                                            <button type="button" className="mt-3 btn btn-xs btn-primary mb-3 mr-2" onClick={this.handleSubmit}>Modifica</button>
                                            <button type="button" className="btn btn-xs btn-danger" onClick={this.isModificaFalse}>Anuleaza</button>
                                        </form>
                                    </div> : null
                            }
                        </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
