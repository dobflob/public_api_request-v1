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

/* Variables to hold Elements that will have Event Listeners*/
const modalContainer = createHtmlElement('div', [
    {name: 'class', val: 'modal-container hide'}]);
const modal = createHtmlElement('div', [
    {name: 'class', val: 'modal'}]);
const modalContent = createHtmlElement('div', [
    {name: 'class', val: 'modal-info-container'}]);
const modalClose = createHtmlElement('button', [
    {name: 'id', val: 'modal-close-btn'}, {name: 'class', val: 'modal-close-btn'}]);
const modalBtnContainer = createHtmlElement('div', [
    {name: 'class', val: 'modal-btn-container'}]);
const searchInput = createHtmlElement('input', [
    {name: 'type', val: 'search'}, 
    {name: 'id', val: 'search-input'}, 
    {name: 'class', val: 'search-input'}, 
    {name: 'placeholder', val: 'Search...'}]);
const searchBtn = createHtmlElement('input', [
    {name: 'type', val: 'submit'}, 
    {name: 'id', val: 'search-submit'}, 
    {name: 'class', val: 'search-submit'}, 
    {name: 'title', val: 'Search'}, 
    {name: 'value', val: '\u{1f50d}'}]);
const settingsBtn = createHtmlElement('button', [
    {name: 'type', val: 'button'}, 
    {name: 'id', val: 'settings'}, 
    {name: 'class', val: 'btn'}]);
settingsBtn.textContent = '\u{1F354}';

document.body.insertAdjacentElement('beforeend', modalContainer);
buildModalSkeleton();
buildActionArea();

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

function buildActionArea() {
    const searchContainer = document.querySelector('.search-container');
    const form = createHtmlElement('form', [{name: 'action', val:'#'}, {name: 'method', val: 'get'}]);

    form.appendChild(searchInput);
    form.appendChild(searchBtn);
    form.appendChild(settingsBtn);
    searchContainer.appendChild(form);
} 

function buildModalSkeleton() {
    modalContainer.appendChild(modal);
    modal.appendChild(modalClose);
    modal.appendChild(modalContent);
    
    modalClose.textContent = 'X';
} //doesn't have nav attached so can reuse for settings html

function addModalBtns(btnType) {
    modalContainer.appendChild(modalBtnContainer);
    modalBtnContainer.innerHTML = '';
    let modalBtns;
    if (btnType === 'nav') {
        modalBtns = `
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `;
    } else if (btnType === 'settings') {
        modalBtns = `
        <button type="button" id="modal-cancel" class="modal-cancel btn">Cancel</button>
        <button type="submit" id="modal-save" class="modal-save btn">Save</button>
    `;
    }
    
    modalBtnContainer.insertAdjacentHTML('beforeend', modalBtns);
}

function cacheEmployees(data) {
    employees = data;
    return employees;
}

function displayEmployeeCards(employees) {
    employees.forEach(employee => employee.displayEmployeeCard());
    return employees;
}

function clearModalContent() {
    modalContent.innerHTML = '';
}

function displaySettings() {
    const settingsHtml = `
        <form>
            <div class="form-field">
                <label for="results-count">No. Employess to Fetch:</label>
                <input type="text" id="results-count" class="results-count" minlength="2" maxlength="3"/>
            </div>
            <fieldset>
                <legend>Select the fields to exclude:</legend>
                <div>
                    <input type="checkbox" id="gender" name="gender" value="gender"/>
                    <label for="gender">Gender</label>
                </div>
                <div>
                    <input type="checkbox" id="login" name="login" value="login"/>
                    <label for="login">Login</label>
                </div>
                <div>
                    <input type="checkbox" id="registered" name="registered" value="registered"/>
                    <label for="registered">Registered</label>
                </div>
                <div>
                    <input type="checkbox" id="phone" name="phone" value="phone"/>
                    <label for="phone">Phone</label>
                </div>
                <div>
                    <input type="checkbox" id="id" name="id" value="id"/>
                    <label for="id">Id</label>
                </div>
            </fieldset>
        </form>
    `;
    
    modalContent.insertAdjacentHTML('beforeend', settingsHtml);
    let settingFields = modalContent.querySelectorAll('input');
    settingFields.forEach(input => {
        if (input.type === 'checkbox') {
            if (excludeFields.includes(input.name)) {
                input.checked = true;
            }
        } else if (input.type === 'text') {
            input.value = userNo;
        }
    });
    
    //remove checked from the html template and instead look at the excludeFields variable to see what fields should be checked when the modal opens
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
        addModalBtns('nav');
    }
});

modalClose.addEventListener('click', e => {
    modalContainer.classList.add('hide');
    modalContent.innerHTML = '';
});

modalContainer.addEventListener('click', e => {
    if (e.target.className === 'modal-container') {
        modalContainer.classList.add('hide');
        modalContent.innerHTML = '';
    }
});

modalBtnContainer.addEventListener('click', e => {
    const lastEmpIndex = employees.length - 1;

    if (e.target.type === 'submit') {
        excludeFields = [];
        employees = [];
        gallery.innerHTML = '';
        const inputs = modalContent.querySelectorAll('input');

        inputs.forEach(field => {
            if (field.type === 'checkbox' && field.checked) {
                excludeFields.push(field.value);
                
            } else if (field.type === 'text' && field.value) {
                userNo = field.value;
            }
            
        });
        testing = false;
        modalContainer.classList.add('hide');
        modalContent.innerHTML = '';
        fetchUsers();
        

    } else if (e.target.tagName === 'BUTTON') {
        clearModalContent();

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

settingsBtn.addEventListener('click', e => {
    displaySettings();
    addModalBtns('settings');
    modalContainer.classList.remove('hide');
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

//to do - style the settings fields; add functionality to the search input and button; all the comments; custom styling; update readme