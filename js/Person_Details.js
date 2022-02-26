let addressBookDataList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookDataList = getAddressBookDataFromStorage();
    document.querySelector(".emp-count").textContent = addressBookDataList.length;
    //alert(addressBookDataList.length);
    console.log(addressBookDataList.length);
    localStorage.removeItem('editAddr');
    createInnerHtml();
    alert(isUpdate);
    
});

function getAddressBookDataFromStorage() {
    return localStorage.getItem('AddressBookDataList') ?
    JSON.parse(localStorage.getItem('AddressBookDataList')) :[];
}

function remove(node) {
    let addressBookData = addressBookDataList.find(addData => addData._phone == node.name);
    if(!addressBookData) return;
    const index = addressBookDataList.map(addData => addData._phone)
                .indexOf(addressBookData._phone);
                alert(addressBookData._fullname+ ", Contact is Deleting.");
                addressBookDataList.splice(index,1);
    localStorage.setItem("AddressBookDataList", JSON.stringify(addressBookDataList));
    document.querySelector(".emp-count").textContent = addressBookDataList.length;
    createInnerHtml();
}

function update(node) {
    let addressBookData = addressBookDataList.find(addData => addData._phone == node.name);
    if(!addressBookData) return;
    localStorage.setItem('editAddr',JSON.stringify(addressBookData))
    window.location.replace("../pages/Address-Book.html");
}

function createInnerHtml(){
    let headerHtml = "<th>Name</th><th>Address</th><th>City</th>" +
        "<th>State</th><th>Zip</th><th>Phone</th><th>Actions</th>";
    if(addressBookDataList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const addressBookData of addressBookDataList) {
        //alert(addressBookData._fullname);
        innerHtml = `${innerHtml}
        </tr>
        <td>${addressBookData._fullname}</td>
        <td>${addressBookData._address}</td>
        <td>${addressBookData._city}</td>
        <td>${addressBookData._state}</td>
        <td>${addressBookData._zip}</td>
        <td>${addressBookData._phone}</td>
        <td>
                 <img name="${addressBookData._phone}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                 <img name="${addressBookData._phone}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
        </tr>
    `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}


