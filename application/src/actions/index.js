import axios from 'axios'

const SERVER = 'https://proiect-final-alexandramdr.c9users.io:8081'

export const GET_USER = 'GET_USER'
export const POST_USER = 'POST_USER'
export const GET_LOCATIONS = 'GET_LOCATIONS'
export const GET_PLANS = 'GET_PLANS'
export const POST_PLAN = 'POST_PLAN'
export const PUT_PLAN = 'PUT_PLAN'
export const POST_STEP = 'POST_STEP'
export const POST_LOCATION_STEP = 'POST_LOCATION_STEP'
export const DELETE_LOCATION_STEP = 'DELETE_LOCATION_STEP'
export const DELETE_STEP = 'DELETE_STEP'

export function getUser(username, pass) {
    return {
        type: 'GET_USER',
        payload: axios(`${SERVER}/user?username=${username}&password=${pass}`)
    }
}

export function addUser(userDetails) {
    return {
        type: 'POST_USER',
        payload: axios.post(`${SERVER}/user/`, userDetails)
    }
}

export function getLocations() {
    return {
        type: 'GET_LOCATIONS',
        payload: axios(`${SERVER}/locations`)
    }
}

export function getPlans(userId) {
    return {
        type: 'GET_PLANS',
        payload: axios(`${SERVER}/plans/${userId}`)
    }
}

export function addPlan(planDetails) {
    return {
        type: 'POST_PLAN',
        payload: axios.post(`${SERVER}/plans/`, planDetails)
    }
}

export function modifyPlan(planDetails, planId) {
    return {
        type: 'PUT_PLAN',
        payload: axios.put(`${SERVER}/plans/${planId}`, planDetails)
    }
}

export function addStep(step, planId) {
    return {
        type: 'POST_STEP',
        payload: axios.post(`${SERVER}/plans/${planId}/steps`, step)
    }
}

export function addLocationStep(locationStep, planId) {
    return {
        type: 'POST_LOCATION_STEP',
        payload: axios.post(`${SERVER}/plans/${planId}/location_steps`, locationStep)
    }
}

export function deleteStep(stepId) {
	return {
		type: 'DELETE_STEP',
		payload: axios.delete(`${SERVER}/steps/${stepId}`)
	}
}

export function deleteLocationStep(locationStepId) {
	return {
		type: 'DELETE_LOCATION_STEP',
		payload: axios.delete(`${SERVER}/location_steps/${locationStepId}`)
	}
}