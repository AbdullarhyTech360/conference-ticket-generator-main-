const myForm = document.querySelector('#form');
const errorExist = () => {
    console.log(document.querySelector('.error').style.display);
    return document.querySelector('.error').style.display === '' ? true : false;
}
myForm.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(this);
    console.log(errorExist());
});

// listener to drag and drop
const uploadContainer = document.querySelector('.upload-container');
uploadContainer.addEventListener('dragover', function(e){
    e.preventDefault();
    console.log('dragging');
});