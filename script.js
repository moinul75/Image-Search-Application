const accessKey = "0hiYNuxWvoLULeBjyjBhf7r2ELHxltjEFkqPJk86nrM" // this access key is the splash access key


//step - 2 get all the dom elements like search-input , input-btn, show ui id 
const searchInput = document.getElementById('search-input');
const searchBtn   = document.getElementById('search-btn');
const formElement = document.querySelector('form');
const searchResults = document.querySelector('.search-results');
const showMoreBtn = document.getElementById('show-more');



//for input data and page 
let inputData = "";
let page = 1 ; 


//search image function - this will fetch all the images based on our keywords 
async function SearchImage(){
    //get this input id for input element 
    inputData = searchInput.value 

    //set the url based on this input 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; 

    //get the response in json ( pasrse json)
    const response = await fetch(url);
    const data = await response.json(); 


    //get the results set on the  ui  of this results 
    const results = data.results
    
    //initially the page is empty 
    if (page == 1 ){
        searchResults.innerHTML = ""; 

    }

    results.map((result)=>{
        //create a div for results and then fetch this 
        const imgWrapper = document.createElement('div'); 
        imgWrapper.classList.add('search-result'); 

        const img = document.createElement('img')
        //add image src and alt 
        img.src = result.urls.small ; 
        img.alt = result.alt_description ; 

        //link tag and its value set 
        const linkText = document.createElement('a')
        linkText.href = result.urls.html ; 
        linkText.llinktarget = "_blank"; 
        linkText.textContent = result.alt_description ;
        
        
        //append all this make this ok 
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(linkText);
        searchResults.appendChild(imgWrapper);
    }); 

    //page updated 
    page++; 

    //if page has more then 1 
    if (page > 1){
        showMoreBtn.style.display = 'block'
    }
    


}


//now add event listenter to fire the form elements on the ui 
formElement.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1 ; 
    SearchImage(); 
    
})



// when page updated call this function again 
showMoreBtn.addEventListener('click',() =>{
    SearchImage();


});



