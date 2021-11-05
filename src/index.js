
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"; 
const breedUrl = 'https://dog.ceo/api/breeds/list/all'; 
const imgContainer = document.getElementById('dog-image-container')
const breedList = document.getElementById('dog-breeds');
const dropdown = document.getElementById('breed-dropdown');

let letter = dropdown.value; 
 
// Add pics of good doggos to the DOM 
function addImg(){
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(data => {
            data.message.forEach(x => {
                let newImg = document.createElement('img');
                newImg.setAttribute('src', x);
                newImg.setAttribute('width', '200px');
                imgContainer.appendChild(newImg); 
            });
        })
};

//Add breeds to the <ul>
function listBreeds(){
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            let dogArr = [];
            //make add breed obj keys to array to use filter method
            for (const x in data.message){
                dogArr.push(x);
                }
            //the filter
            let filteredDogs = dogArr.filter(x => x.charAt(0) == dropdown.value);    
           
            //clear out the old filtered list
            breedList.innerHTML = ""; 

            //Add dog list to the DOM
            for (x of filteredDogs) {
                let dogItem = document.createElement('li');
                dogItem.textContent = x; 
                breedList.appendChild(dogItem);
                dogItem.addEventListener('click', () => { 
                  dogItem.setAttribute('style', 'color: pink')
                })
            };   
        });
};

// re-populate the list when the letter changes 
function filterBreeds(){
    letter = dropdown.value; 
    listBreeds(); 
}
 
document.addEventListener('DOMContentLoaded', addImg);
document.addEventListener('DOMContentLoaded', listBreeds)
dropdown.addEventListener('change', filterBreeds)
    


