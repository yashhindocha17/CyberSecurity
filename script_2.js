// const name = document.getElementById('name')
// const form = document.getElementById('form')


// form.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     try {
//         eval(name.value);
//     } catch (error) {
//         alert('Error executing script:', error);
//         console.error('Error executing script:', error);
//     }
// })


const nameInput = document.getElementById('name');
const form = document.getElementById('form');
// const output = document.getElementById('output');

// Object.freeze(nameInput.style);
// nameInput.setAttribute('readonly', true); 
const initialStyle = nameInput.getAttribute('style');

const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            console.log(`The ${mutation.attributeName} attribute was modified.`);
            alert(`The ${mutation.attributeName} attribute was modified.`);
                // this will reload the page 
                // window.location.reload(); 
            if (initialStyle) {
                nameInput.setAttribute('style', initialStyle);  // Restore initial style
            } else {
                nameInput.removeAttribute('style');  // Remove style attribute if it didn't exist
            }
        } else if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            alert('A child node has been added or removed.');
        } else if (mutation.type === 'characterData') {
            console.log('The text content of a node has been changed.');
            alert('The text content of a node has been changed.');
        }
    }
});

// Configuration of the observer:
const config = {
    attributes: true,        // Observe attribute changes
    childList: true,         // Observe additions/removals of child nodes
    subtree: true,           // Observe the subtree of the target node
    characterData: true,      // Observe changes to the text content of the target node or its descendants
    attributeFilter: ['style'], 
};

observer.observe(nameInput, config);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
        eval(nameInput.value);
        // const sanitizedInput = sanitizeInput(nameInput.value);
    
        // // Now proceed with your logic, but without eval
        // console.log(`Sanitized Input: ${sanitizedInput}`);
        
        // // Example logic: 
        // // You can process sanitizedInput here without running eval
        // alert(`Processed input: ${sanitizedInput}`);


        const userInput = nameInput.value;
        const safeInput = escapeHTML(userInput);
        // output.textContent = safeInput;
        alert('Entered Script:', safeInput);
        console.log('Entered Script:', safeInput);
    } catch (error) {
        alert('Error executing script:', error)
        console.error('Error executing script:', error);
    }
   
});

// function sanitizeInput(input) {
//     // Only allow alphanumeric characters and spaces, adjust the regex according to your needs
//     return input.replace(/[^a-zA-Z0-9 ]/g, '');
// }

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}