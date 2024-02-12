/* Finishing the Project - The final stage is perhaps the most imporant
    - Code Comments: it's best practice for development code to be well commented. Replace provided comments with your own to briefly describe your code
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
    {name: 'type', val: 'text'}, 
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
    {name: 'class', val: 'btn'},
    {name: 'title', val: 'Settings'}]);
settingsBtn.textContent = '\u{1F354}';

document.body.insertAdjacentElement('beforeend', modalContainer);
buildModalSkeleton();
buildSearchArea();

// Fetch Functions
async function fetchUsers() {
    fetch(createQueryString())
        .then(res => res.json())
        .then(data => data.results.map(user => new Employee(user)))
        .then(data => cacheEmployees(data))
        .then(employees => displayGallery(employees))
        .catch(error => console.log(new Error(error)));
} 

// Helper Functions
function createHtmlElement(elTag, elAttrs) {
    let elVar = document.createElement(elTag);
    elAttrs.forEach(attr => elVar.setAttribute(attr.name, attr.val));
    return elVar;
}

function buildSearchArea() {
    const searchContainer = document.querySelector('.search-container');
    const form = createHtmlElement('form', [
        {name: 'action', val:'#'}, 
        {name: 'method', val: 'get'}]);

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

function toggleModal(val) {
    if (val ==='show') {
        modalContainer.classList.remove('hide');
    } else if (val === 'hide') {
        modalContainer.classList.add('hide');
    }
}

function clearModalContent() {
    modalContent.innerHTML = '';
}

function cacheEmployees(data) {
    employees = data;
    return employees;
}

function displayGallery(employees) {
    employees.forEach(employee => employee.displayEmployeeCard());
    return employees;
}

function displaySettings() {
    const settingsHtml = `
        <form>
        <h3>Fetch Settings</h3>
            <div class="form-field">
                <label for="results-count" class="modal-name">No. Employess to Fetch:</label>
                <input type="text" id="results-count" class="results-count" minlength="2" maxlength="3"/>
            </div>
            <fieldset>
                <legend class="modal-name">Select the fields to exclude:</legend>
                <div>
                    <input type="checkbox" id="gender" name="gender" value="gender"/>
                    <label for="gender" class="modal-text">Gender</label>
                </div>
                <div>
                    <input type="checkbox" id="login" name="login" value="login"/>
                    <label for="login" class="modal-text">Login</label>
                </div>
                <div>
                    <input type="checkbox" id="registered" name="registered" value="registered"/>
                    <label for="registered" class="modal-text">Registered</label>
                </div>
                <div>
                    <input type="checkbox" id="phone" name="phone" value="phone"/>
                    <label for="phone" class="modal-text">Phone</label>
                </div>
                <div>
                    <input type="checkbox" id="id" name="id" value="id"/>
                    <label for="id" class="modal-text">Id</label>
                </div>
            </fieldset>
            <div>
                <p class="modal-text">Note: Saving will re-fetch the specified number of users. Press cancel to return to the employee gallery without fetching new data.</p>
            </div>
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
}

function filterGallery(searchString) {
    let filteredEmployees = employees.filter(employee => employee.displayName.toLowerCase().includes(searchString));
    gallery.innerHTML = '';
    displayGallery(filteredEmployees);
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
        toggleModal('show');
        addModalBtns('nav');
    }
});

modalClose.addEventListener('click', e => {
    toggleModal('hide');
    clearModalContent();
});

modalContainer.addEventListener('click', e => {
    if (e.target.className === 'modal-container') {
        toggleModal('hide');
        clearModalContent();
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
        toggleModal('hide');
        clearModalContent();
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

        } else if (e.target.id === 'modal-cancel') {
            toggleModal('hide');
        }
    }
});

settingsBtn.addEventListener('click', e => {
    displaySettings();
    addModalBtns('settings');
    toggleModal('show');
});

searchBtn.addEventListener('click', e => {
    let searchString = searchInput.value;

    if (searchString) {
        filterGallery(searchString);
    }
});

searchInput.addEventListener('keyup', e => {
    const searchString = e.target.value;
    filterGallery(searchString);
});

/// below code is to toggle between using test data vs using api call to populate employees. If false, the code uses the random API to pull data.
let testing = false;

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