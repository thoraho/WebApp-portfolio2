import { fetchProjects, addProject } from "./lib.js";
import './style.css'

fetchProjects();

const projectForm = document.querySelector('form');

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const startDate = document.getElementById('startdate').value;
    const endDate = document.getElementById('enddate').value;


    if (!name || !description || !startDate || !endDate) {
        alert("All fields are required!");
        return;
    }


    addProject({ name, description, startDate, endDate });
});
