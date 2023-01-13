const ScrollScreen = (id) =>{
    let section = document.querySelector(`#${id}`);
    section !=undefined ? section.scrollIntoView( { behavior: 'smooth', block: 'start' } ) : null
}

const ScrollMessages = (id, isSearch) =>{
    let section = document.querySelector(`#message-${id}`);
    isSearch ? section.classList.add("marked") : null
    section !=undefined ? section.scrollIntoView( { behavior: 'smooth', block: 'start' } ) : null
    setInterval(()=>{
        section.classList.remove("marked"); 
    },1000)
}


export {ScrollScreen, ScrollMessages}