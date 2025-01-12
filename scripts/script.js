// Ensuring everything is loaded before running the script
window.addEventListener('load', function () {
    // Uploading image and displaying it
    const uploadContainer = document.querySelector('.upload-container');
    const uploadInput = document.querySelector('#avatar');
    uploadInput.addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const imageArea = document.querySelector('img');
            const mainIcon = document.querySelector('.main-icon');
            const instruction = document.querySelector('.instruction');
            instruction.style.display = 'none';
            const removeChangeButtons = document.querySelector('#remove-change-buttons');
            removeChangeButtons.style.display = 'block';
            imageArea.style.display = 'block';
            mainIcon.style.display = 'none';
            imageArea.onload = function () {
                URL.revokeObjectURL(imageArea.src);
            }
            imageArea.src = URL.createObjectURL(this.files[0]);
        }

    });

    // Removing image
    const removeImage = document.querySelector('#remove-button');
    removeImage.addEventListener('click', function (e) {
        const imageArea = document.querySelector('#user-image');
        const mainIcon = document.querySelector('.main-icon');
        const instruction = document.querySelector('.instruction');
        instruction.style.display = 'block';
        imageArea.src = '';
        imageArea.style.display = 'none';
        mainIcon.style.display = 'block';
        document.querySelector('#remove-change-buttons').style.display = 'none';
    })

    // Changing image
    const changeImage = document.querySelector('#change-button');
    changeImage.onclick = function (e) {
        uploadInput.click();
    }

    // A function for setting error
    const setError = (element, message) => {
        // console.log(element.parentElement);
        if (element.id === 'avatar') {
            const parentElement = element.parentElement.parentElement.parentElement;
            const mainError = parentElement.querySelector('p');
            parentElement.querySelector('.error').classList.remove('error-1');
            parentElement.querySelector('.error').style.display = 'flex';
            mainError.textContent = message;
        } else {
            const parentElement = element.parentElement.parentElement;
            const mainError = parentElement.querySelector('p');
            const inputWrapper = parentElement.querySelector('.input-wrapper');
            inputWrapper.parentElement.classList.add('error-wrapper');
            // console.log(parentElement);
            element.parentElement.parentElement.querySelector('.error').style.display = 'flex';
            mainError.textContent = message;
        }
    }

    // A function for removing error
    const removeError = (element) => {
        if (element.id === 'avatar') {
            const parentElement = element.parentElement.parentElement.parentElement;
            parentElement.querySelector('.error').classList.add('error-1');
            parentElement.querySelector('p').textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
        } else {
            const parentElement = element.parentElement.parentElement;
            parentElement.querySelector('.error').style.display = 'none';
            parentElement.querySelector('.input-wrapper').parentElement.classList.remove('error-wrapper');
        }
    }

    // Checking if the form is valid
    const fullName = document.querySelector('#fullname');
    const emailAddress = document.querySelector('#email-address');
    const username = document.querySelector('#github-username');
    const imageInput = document.querySelector('#avatar');
    const checkForm = function () {
        console.log(imageInput.files[0].type.split('/')[0] === "image")
        // checking if the fields are empty or not valid input in the form
        if (fullName.value === '') {
            setError(fullName, 'Please enter your full name.');
        } else {
            removeError(fullName);
        }
        if (emailAddress.value === '') {
            setError(emailAddress, 'Please enter your email address.');
        } else if (!emailAddress.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setError(emailAddress, 'Please enter a valid email address.');
        } else {
            removeError(emailAddress);
        }
        if (username.value === '') {
            setError(username, 'Please enter your github username.');
        } else {
            removeError(username);
        }
        if (imageInput.value === '') {
            setError(imageInput, 'Please upload your image.');
        } else if (imageInput.files[0].size > 500000) {
            setError(imageInput, 'File too large. Please upload a photo under 500KB.');
        } else {
            removeError(imageInput);
        }
    }

    const myForm = document.querySelector('#form');
    const errorExist = () => {
        return document.querySelectorAll('.error-wrapper').length === 0 && window.getComputedStyle(document.querySelector('.error').parentElement.querySelector('p')).color === 'rgb(255, 255, 255)' ? false : true;
    }
    myForm.addEventListener('submit', function (e) {
        e.preventDefault();
        checkForm();
        if (!errorExist()) {
            const ticketContainer = document.querySelector('.ticket-container');
            const name = fullName.value;
            const firstName = name.split(' ')[0];
            const lastName = name.split(' ')[1] === undefined ? '' : name.split(' ')[1];
            const middleName = name.split(' ')[2] === undefined ? '' : " " + name.split(' ')[2];
            
            // updating the ticket details
            ticketContainer.querySelector('.name1').textContent = firstName;
            ticketContainer.querySelector('.name2').textContent = lastName;
            ticketContainer.querySelector('.name3').textContent = middleName;
            ticketContainer.querySelector('#your-email').textContent = emailAddress.value;
            ticketContainer.querySelector('#username').textContent = username.value;
            ticketContainer.querySelector('#ticket-image').src = URL.createObjectURL(imageInput.files[0]);
            ticketContainer.style.display = 'block';
            document.querySelector('.form-container').style.display = 'none';
        }
    });
})