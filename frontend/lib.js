export async function fetchProjects() {
    const projectContainer = document.getElementById('projects');

    try {
        const response = await fetch('http://localhost:3000', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }

        const parsedData = await response.json();
        console.log(parsedData);

        projectContainer.innerHTML = '';
        parsedData.forEach((project) => {
            projectContainer.innerHTML += `
                <article class="project">
                    <h2 >${project.name}</h2>
                    <p>${project.description}</p>
                    <p>${project.startDate} - ${project.endDate}</p>
                    <a href="#">Link</a>
                </article>`;
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        alert('Could not fetch projects. Please try again later.');
    }
}

export async function addProject(project) {
    try {
        const response = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error("Failed to add project");
        }

        const responseData = await response.json();
        console.log(responseData);

        fetchProjects();
    } catch (error) {
        console.error('Error adding project:', error);
        alert('Could not add project. Please try again.');
    }
}
