//  this file include all the request sended to the api
import axios from "axios";
// The base URL of the application
const BASE_URL = "http://localhost:3000" // * TO DEBUG.


// Build an URL depending of the path given, with, as base, the const URL above
const URL = (pPath) => BASE_URL + pPath

// HEADER for common request, that aren't involving an user
const BODY_JSON_HEADER = { "content-type": "application/json" }
var token = localStorage.getItem("jwtToken");


// Perform a PUT request
const put = (pUrl, pBody, pHeaders) => fetch(pUrl, { method: 'PUT', body: JSON.stringify(pBody), headers: pHeaders })
// Perform a POST request
const post = (pUrl, pBody, pHeaders) => fetch(pUrl, { method: 'POST', body: JSON.stringify(pBody), headers: pHeaders })
// Perform a DELETE request
const remove = (pUrl, pBody, pHeaders) => fetch(pUrl, { method: 'DELETE', headers: pHeaders })
// Perform a GET request
const get = (pUrl) => fetch(pUrl, { headers: BODY_JSON_HEADER })

export const login = (pEmail, pPassword) => post(URL("/login/"), { "email": pEmail, "password": pPassword }, { ...BODY_JSON_HEADER })
/**
 * Update an existing material on the api
 * @param {string} pName The id of the material to update
 * @param {string} pEmail The new name
 * @param {number} pPassword the number of the room 
 */
export const register = (pName, pEmail, pPassword) => post(URL("/register/"), { "name": pName, "email": pEmail, "password": pPassword }, { ...BODY_JSON_HEADER })

const apiUrl = "http://localhost:3000/api/tasks";

export function getTasks() {return axios.get(apiUrl);}

export const addTask = (Ptask, PUser) => post(apiUrl, { "task": Ptask, "user": PUser }, { ...BODY_JSON_HEADER })

export const updateTask = (Pid, PCompleted) => put(apiUrl + "/" + Pid, { "completed": PCompleted }, { ...BODY_JSON_HEADER })

export const updateDescriptionTask = (Pid, PDescription) => put(apiUrl + "/" + Pid, { "description": PDescription }, { ...BODY_JSON_HEADER })

export function getTask(id, task) { return axios.get(apiUrl + "/" + id, task);}

export function deleteTask(id) { return axios.delete(apiUrl + "/" + id); }
