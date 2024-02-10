/* Finishing the Project - The final stage is perhaps the most imporant
    - Code Comments: it's best practice for development code to be well commented. Replace provided comments with your own to briefly describe your code
    - Code Readability: Readability is second only to functionality - Double check your code to ensure the spacing and indentation are consistent
    - Cross-browser Consistency: To pass, your project only needs to work in Chrome, but it's common for devs to test their projects in multiple browsers to know how they'll perform in the wild
    - QA Testing: This is the keystone step in the development process:
        - Open and run your app
        - Open the Chrome DevTools console
        - Pretend to be a user and test all aspects of functionality and every possible state of the app, while monitoring the console for bugs and resolving any that arise
*/

/* Extra Credit - to get an "exceeds" rating
    - Add search functionality:
        - Filter the directory by name: you'll need to adjust your API request to retrieve a user nationality that will only return data in the English alphabet
        - Note: your search filter should filter results that are already on the page, so don't request new info from the API
    - Make it your own: add some custom styling to personalize it and make it stand out
        - Add or change at least one of the following CSS styles:
            - color
            - background-color
            - font
            - box or text shadows
        - Document your style changes in your readme.md file and project submission notes (don't alter the layout or position of the important elements ont he page)
*/
/* Variables */
let employees;
let currentEmpIndex;
let modalContainer = createHtmlElement('div', [{name: 'class', val: 'modal-container hide'}]);
let modal = createHtmlElement('div', [{name: 'class', val: 'modal'}]);
let modalContent = createHtmlElement('div', [{name: 'class', val: 'modal-info-container'}]);
let modalClose = createHtmlElement('button', [{name: 'id', val: 'modal-close-btn'}, {name: 'class', val: 'modal-close-btn'}]);
let modalNav = createHtmlElement('div', [{name: 'class', val: 'modal-btn-container'}]);
document.body.insertAdjacentElement('beforeend', modalContainer);
const searchContainer = document.querySelector('.search-container'); 

buildModalSkeleton();

// Fetch Functions
async function fetchUsers() {
    fetch(createQueryString())
        .then(res => res.json())
        .then(data => data.results.map(user => new Employee(user)))
        .then(data => cacheEmployees(data))
        .then(employees => displayEmployeeCards(employees))
        .catch(error => console.log(new Error(error)));
} 

// Helper Functions
function createHtmlElement(elTag, elAttrs) {
    let elVar = document.createElement(elTag);
    elAttrs.forEach(attr => elVar.setAttribute(attr.name, attr.val));
    return elVar;
}

function buildSearchArea() {
                            
} 

function buildModalSkeleton() {
    modalContainer.appendChild(modal);
    modalContainer.appendChild(modalNav);

    modal.appendChild(modalClose);
    modal.appendChild(modalContent);
    
    modalClose.textContent = 'X';

    let navBtns = `
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `;

    modalNav.insertAdjacentHTML('beforeend', navBtns);
}

function cacheEmployees(data) {
    employees = data;
    return employees;
}

function displayEmployeeCards(employees) {
    employees.forEach(employee => employee.displayEmployeeCard());
    return employees;
}

function clearEmployeeDetails() {
    modalContent.innerHTML = '';
}

// Event Listeners
gallery.addEventListener('click', e => {
    const target = e.target;

    if (target.className !== 'gallery') {
        let cardId;

        if (target.tagName !== 'DIV') {
            cardId = target.parentNode.parentNode.id;
        } else if (target.className === 'card-img-container' || target.className === 'card-info-container') {
            cardId = target.parentNode.id;
        } else if (target.className === 'card') {
            cardId = target.id;
        }
        
        let selectedEmp = employees.find(emp => emp.email === cardId);
        selectedEmp.displayEmployeeDetails();
        currentEmpIndex = employees.indexOf(selectedEmp);
        modalContainer.classList.remove('hide');
    }
});

modalClose.addEventListener('click', e => {
    modalContainer.classList.add('hide');
    modalContent.innerHTML = '';
});

modalContainer.addEventListener('click', e => {
    modalContainer.classList.add('hide');
    modalContent.innerHTML = '';
});

modalNav.addEventListener('click', e => {
    const lastEmpIndex = employees.length - 1;

    if (e.target.tagName === 'BUTTON') {
        clearEmployeeDetails();

        if (e.target.id === 'modal-prev') {
            if (currentEmpIndex !== 0) {
                currentEmpIndex --;
                employees[currentEmpIndex].displayEmployeeDetails();
            } else {
                currentEmpIndex = lastEmpIndex;
                employees[currentEmpIndex].displayEmployeeDetails();
            }
            
        } else if (e.target.id === 'modal-next') {
            
            if (currentEmpIndex !== lastEmpIndex) {
                currentEmpIndex ++;
                employees[currentEmpIndex].displayEmployeeDetails();
            } else {
                currentEmpIndex = 0;
                employees[currentEmpIndex].displayEmployeeDetails();
            }
        }
    }
});


/// below function is just to switch between using test data vs using api call to populate employees
let testing = true;

if (testing) {
    employees = testEmployees;
    displayTestEmployees();
    console.log(`Using Test Data?: ${testing}`);
} else {
    fetchUsers();
}

function displayTestEmployees() {
    employees = employees.map(employee => new Employee(employee));
    employees.forEach(employee => employee.displayEmployeeCard());
};