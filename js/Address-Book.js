var isUpdate = false;
let addressbookDataObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    checkForUpdate();
});

const fullname = document.querySelector('#fullname');
const fullnameerror = document.querySelector('.fullname-error');
fullname.addEventListener('input', function () {
    let pattern = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
    if (pattern.test(fullname.value)) fullnameerror.textContent = '';
    else if (fullname.value == '') fullnameerror.textContent = '';
    else fullnameerror.textContent = 'Invalid Full Name';
});

const phone = document.querySelector('#phone');
const phoneerror = document.querySelector('.phone-error');
phone.addEventListener('input', function () {
    let Pattern = RegExp('^[0-9]{10}$');
    if (Pattern.test(phone.value)) phoneerror.textContent = '';
    else phoneerror.textContent = 'Invalid Mobile No.';
});

class AddressBook {
    constructor(...param) {
        this.fullname = param[0];
        this.address = param[1];
        this.city = param[2];
        this.state = param[3];
        this.zip = param[4];
        this.phone = param[5];
    }
    get fullname() {
        return this._fullname;
    }
    set fullname(fullname) {
        this._fullname = fullname;
    }

    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get state() {
        return this.state;
    }
    set state(state) {
        this._state = state;
    }

    get zip() {
        return this._zip;
    }
    set zip(zip) {
        this._zip = zip;
    }

    get phone() {
        return this._phone;
    }
    set phone(phone) {
        this._phone = phone;
    }

    toString() {
        return "Name = " + this._fullname + ", Address = " + this._address +
            ", City = " + this._city + ", State = " + this._state +
            ", Zip = " + this._zip + ", Phone No = " + this._phone;
    }
}

function save() {

    event.preventDefault();
    event.stopImmediatePropagation();

    let fullname = getInputValueById('#fullname');
    let address = document.querySelector('#address').value;
    let city = document.querySelector('#city').value;
    let state = document.querySelector('#state').value;
    let zip = document.querySelector('#zip').value;
    let phone = document.querySelector('#phone').value;

    let addressBookData = new AddressBook(fullname, address, city, state, zip, phone);
    alert(addressBookData.toString());

    createAndUpdateStorage(addressBookData);
    //window.location.href="../pages/Person_Details.html";
    window.location.replace('../pages/Person_Details.html');
}

const getSelectedValues = (propertyValues) => {
    let allItems = document.querySelectorAll(propertyValues);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

function createAndUpdateStorage(addressBookData) {
    try{
    let addressBookDataList = JSON.parse(localStorage.getItem("AddressBookDataList"));
    if (addressBookDataList != undefined) {
        if(isUpdate == true){
            const index = addressBookDataList.map(addData => addData._phone)
            .indexOf(addressBookData._phone);
            alert(addressBookData._fullname+ ", Contact is Updated.");
            addressBookDataList.splice(index,1,addressBookData);
        }
        else{
            addressBookDataList.push(addressBookData);
        }
    } else {
        addressBookDataList = [addressBookData];
    }
    //alert(addressBookDataList.toString());
    localStorage.setItem("AddressBookDataList", JSON.stringify(addressBookDataList));
    window.location.replace('../pages/Person_Details.html');
    }
    catch(e) {
        alert(e);
    }

}

function setValue(id, value) {
    document.querySelector(id).textContent = value;
}

function resetForm() {
    setValue('#fullname', '');
    setValue('#address', '');
    setValue('#city', 'None');
    setValue('#state', 'None');
    setValue('#zip', '');
    setValue('#phone', '');
    setValue('.fullname-error', '');
    setValue('.phone-error', '');
}

function checkForUpdate() {
    const addressbookDataJSON = localStorage.getItem('editAddr');
    alert(addressbookDataJSON);
    isUpdate = addressbookDataJSON ? true : false;
    alert(isUpdate);
    if (!isUpdate) return;
    addressbookDataObj = JSON.parse(addressbookDataJSON);
    setForm();
}

function setForm() {
    document.querySelector('#fullname').value = addressbookDataObj._fullname;
    document.querySelector('#address').value = addressbookDataObj._address;
    document.querySelector('#city').value = addressbookDataObj._city;
    document.querySelector('#state').value = addressbookDataObj._state;
    document.querySelector('#zip').value = addressbookDataObj._zip;
    document.querySelector('#phone').value = addressbookDataObj._phone;
}