// Ensuring everything is loaded before running the script
window.addEventListener('load', function () {

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
    // listening to the darg and drop event
    uploadContainer.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    // Resetting image
    const resetImage = () => {
        document.querySelector('.instruction').style.display = 'block';
        document.getElementById('avatar').value = '';
        document.querySelector('img').src = '';
        document.querySelector('img').style.display = 'none';
        document.querySelector('.main-icon').style.display = 'block';
        document.querySelector('#remove-change-buttons').style.display = 'none';
    }
    let isDragging = false;
    // Dropping image
    uploadContainer.addEventListener('drop', function (e) {
        e.preventDefault();
        console.log(e.dataTransfer.files);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            console.log("File type:", file);
            if (file.type.split('/')[0] === 'image') {
                const imageArea = document.querySelector('img');
                const mainIcon = document.querySelector('.main-icon');
                const instruction = document.querySelector('.instruction');
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                uploadInput.files = dataTransfer.files;
                instruction.style.display = 'none';
                const removeChangeButtons = document.querySelector('#remove-change-buttons');
                removeChangeButtons.style.display = 'block';
                imageArea.style.display = 'block';
                mainIcon.style.display = 'none';
                imageArea.onload = function () {
                    URL.revokeObjectURL(imageArea.src);
                }
                imageArea.src = URL.createObjectURL(file);
                removeError(document.querySelector('#avatar'));
                isDragging = true;
            } else {
                resetImage();
                setError(document.querySelector('#avatar'), 'Please upload an image file.');
                isDragging = false;
            }
        }
    });

    // Removing image
    document.querySelector('#remove-button').onclick = (e) => resetImage();

    // Changing image
    const changeImage = document.querySelector('#change-button');
    changeImage.onclick = function (e) {
        uploadInput.click();
    }
    // Adding event listener to the form input
    const formInputs = document.querySelectorAll('input[type="text"]');
    formInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            checkForm();
        });
    });
    // A function for generating a random ticet id
    function generateRandomString(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    }
    // Checking if the form is valid
    const fullName = document.querySelector('#fullname');
    const emailAddress = document.querySelector('#email-address');
    const username = document.querySelector('#github-username');
    const imageInput = document.querySelector('#avatar');
    const checkForm = function () {
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
        } else if (!username.value.match(/@+\w+/gm)) {
            setError(username, 'Please enter a valid github username.');
        } else {
            removeError(username);
        }
        
        if (imageInput.files.length === 0) {
            setError(imageInput, 'Please upload your image.');
        } else if (imageInput?.files[0]?.size > 500000) {
            setError(imageInput, 'File too large. Please upload a photo under 500KB.');
        } else if (imageInput?.files[0]?.type.split('/')[0] != "image") {
            setError(imageInput, 'Please upload a valid image file.');
        } else {
            console.log(isDragging);
            removeError(imageInput);
        }
    }

    const myForm = document.querySelector('#form');
    const errorExist = () => {
        return document.querySelectorAll('.error-wrapper').length === 0 && window.getComputedStyle(document.querySelector('.error').parentElement.querySelector('p')).color === 'rgb(255, 255, 255)' ? false : true;
    }
    myForm.addEventListener('submit', function (e) {
        console.log(imageInput.value);
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
            ticketContainer.querySelector('.name11').textContent = firstName;
            ticketContainer.querySelector('.name12').textContent = lastName;
            ticketContainer.querySelector('.name13').textContent = middleName;
            ticketContainer.querySelector('#your-email').textContent = emailAddress.value;
            ticketContainer.querySelector('#username').textContent = username.value;
            ticketContainer.querySelector('#ticket-image').src = URL.createObjectURL(imageInput.files[0]);
            ticketContainer.querySelector('#ticket-id').textContent = "#" + generateRandomString().toUpperCase()
            ticketContainer.style.display = 'block';
            document.querySelector('.form-container').style.display = 'none';
        }
    });
})