document.addEventListener('DOMContentLoaded', function () {
    const resumeForm = document.getElementById('resume-form');
    const workExperienceSection = document.getElementById('work-experience-section');
    const projectsSection = document.getElementById('projects-section');
    const addWorkExperienceBtn = document.getElementById('add-work-experience');
    const addProjectBtn = document.getElementById('add-project');

    // Function to add work experience fields
    addWorkExperienceBtn.addEventListener('click', function () {
        const workExperienceDiv = document.createElement('div');
        workExperienceDiv.classList.add('work-experience');
        workExperienceDiv.innerHTML = `
            <label for="job-title">Job Title:</label>
            <input type="text" name="job-title">
            <label for="company">Company:</label>
            <input type="text" name="company">
            <label for="work-dates">Dates:</label>
            <input type="text" name="work-dates">
            <label for="responsibilities">Responsibilities:</label>
            <textarea name="responsibilities"></textarea>
        `;
        workExperienceSection.appendChild(workExperienceDiv);
    });

    // Function to add more project fields
    addProjectBtn.addEventListener('click', function () {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');
        projectDiv.innerHTML = `
            <label for="project-title">Project Title:</label>
            <input type="text" name="project-title">
            <label for="project-description">Description:</label>
            <textarea name="project-description"></textarea>
            <label for="project-link">Github Link:</label>
            <input type="url" name="project-link">
        `;
        projectsSection.appendChild(projectDiv);
    });

    resumeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form values
        const formData = new FormData(resumeForm);
        const values = {};
        formData.forEach((value, key) => {
            if (!values[key]) {
                values[key] = [];
            }
            values[key].push(value);
        });

        const resumeHTML = `
            <h1 class= "name">${values['name']}</h1>
            <p class= "contact"><a href="mailto:${values['email']}">Email</a> || ${values['phone']} || <a href="${values['linkedin']}" target="_blank">LinkedIn</a> || <a href="${values['github']}" target="_blank">Github</a> || <a href="${values['portfolio']}" target="_blank">Portfolio</a></p>
            <h3>Education</h3>
            <p><strong>${values['university']}</strong> (${values['duration']})</p>
            <p>${values['location']}</p>
            <p><strong>${values['degree']}</strong></p>
            <p><strong>GPA:</strong> ${values['gpa']}</p>
            <p><strong>Relevant Courses:</strong> ${values['courses']}</p>
            ${generateWorkExperienceHTML(values)}
            ${generateProjectsHTML(values)}
            <h3>Skills</h3>
            <p>${values['skills']}</p>
        `;

        // Display the generated resume
        document.getElementById('generated-resume').innerHTML = resumeHTML;

        // Generate PDF
        generatePDF(resumeHTML);
    });

    // Function to generate work experience HTML
    function generateWorkExperienceHTML(values) {
        let workExperienceHTML = '<h3>Work Experience</h3>';
        for (let i = 0; i < values['job-title'].length; i++) {
            workExperienceHTML += `
                <p><strong>${values['job-title'][i]}</strong> at ${values['company'][i]} (${values['work-dates'][i]})</p>
                <p>${values['responsibilities'][i]}</p>
            `;
        }
        return workExperienceHTML;
    }

    // Function to generate projects HTML
    function generateProjectsHTML(values) {
        let projectsHTML = '<h3>Projects</h3>';
        for (let i = 0; i < values['project-title'].length; i++) {
            projectsHTML += `
                <p><strong>${values['project-title'][i]}</strong> <a href="${values['project-link'][i]}" target="_blank" class="project-link">Github</a></p>
                <p>${values['project-description'][i]}</p>
            `;
        }
        return projectsHTML;
    }

    // Function to generate PDF
    function generatePDF(resumeHTML) {
        const pdfWindow = window.open('', '', 'width=800,height=900');
        pdfWindow.document.write(`
            <html>
                <head>
                    <style>
                        body {
                            font-family: 'Poppins', sans-serif;
                            margin: 20px;
                            font-size: 11px;
                            padding: 0px 10px ;
                        }
                        .name , .contact{
                            display: flex;
                            justify-content: center;
                        }
                        h2, h3 {
                            color: #333;
                        }                       
                        h3 {
                         color: #333;
                         padding: 5px;
                         margin: 0 -15px 10px;
                         font-size: 18px;
}
                        p {
                            margin: 10px 0;
                        }
                    </style>
                </head>
                <body>
                    ${resumeHTML}
                </body>
            </html>
        `);
        pdfWindow.document.close();
        pdfWindow.print();
    }
});
