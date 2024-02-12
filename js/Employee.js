class Employee {
    constructor(user) {
        this.firstName = user.name.first;
        this.lastName = user.name.last;
        this.displayName = `${this.firstName} ${this.lastName}`;
        this.location = {
            streetNo: user.location.street.number,
            streetName: user.location.street.name,
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
            postalCode: user.location.postcode
        };
        this.email = user.email;
        this.dob = new Date(user.dob.date);
        this.cell = user.cell;
        this.picture = {
            thumbnail: user.picture.thumbnail,
            large: user.picture.large,
            med: user.picture.medium
        };
        this.nat = user.nat;
    }

    displayEmployeeCard() {
        const cardHtml = `
        <div id="${this.email}" class="card" title="${this.displayName}">
            <div class="card-img-container">
                <img class="card-img" src="${this.picture.large}" alt="${this.displayName}'s Profile Picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${this.displayName}</h3>
                <p class="card-text">${this.email}</p>
                <p class="card-text cap">${this.location.city}, ${this.location.state}</p>
            </div>
        </div>
        `;
        gallery.insertAdjacentHTML('beforeend', cardHtml);
    }

    displayEmployeeDetails() {
        const modalHtml = `
            <img class="modal-img" src="${this.picture.large}" alt="${this.displayName}'s Profile Picture">
            <h3 id="name" class="modal-name" cap>${this.displayName}</h3>
            <p class="modal-text">${this.email}<p>
            <p class="modal-text">${this.location.city}<p>
            <hr>
            <p class="modal-text">${this.cell}<p>
            <p class="modal-text">${this.location.streetNo} ${this.location.streetName}, ${this.location.city}, ${this.location.state} ${this.location.postalCode}<p>
            <p class="modal-text">Birthday: ${this.dob.getMonth()}/${this.dob.getDay()}<p>
        `;
        modalContent.insertAdjacentHTML('beforeend', modalHtml);
    }
}