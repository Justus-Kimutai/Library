const libraryTable = document.querySelector(".library_table")
const addBookBtn =  document.querySelector(".addBookbtn")
const addBookForm = document.querySelector(".addBookForm")
const bookTitleInput = document.querySelector("#bookTitle-input")
const bookAuthorInput = document.querySelector("#bookAuthor-input")
const bookPagesInput = document.querySelector("#bookPages-input")
const submitBookBtn =  document.querySelector('.SubmitBookbtn')

const myLibrary = []

function Book(title,author,pages){
    this.title = title
    this.author = author
    this.pages = pages
}

//This adds the function to the Book. This means every book created will have this function
Book.prototype.createCell = function(){
   const cell =  document.createElement('td')
   cell.className = 'readStatus'

   const btn = document.createElement('button')
   btn.className = 'btn-read'
   btn.textContent = 'Not read'
   btn.addEventListener('click',()=>{
    btn.classList.toggle('readStatus-read')
    if(btn.innerHTML == 'Not read'){
        btn.innerHTML = 'Read'
    }else if(btn.innerHTML == 'Read'){
        btn.innerHTML = 'Not read'
    }
   })
   cell.appendChild(btn)
   return cell
}

//This function does the same Job but its for deleting
Book.prototype.deleteCell = function(){
    const cell = document.createElement('td')
    cell.className = 'deleteBook'
    const btn = document.createElement('button')

    btn.textContent = 'Delete'
    btn.className = 'btn-delete'
    btn.addEventListener('click',()=>{
        const rowIndex = cell.parentElement.dataset.index
        myLibrary.splice(rowIndex,1)
        populateScreen()
    })
    cell.appendChild(btn)
    return cell
}

function addBookToLibrary(bookTitle,bookAuthor,pages){
    const userBook = new Book(bookTitle,bookAuthor,pages)
    myLibrary.push(userBook)
}



function populateScreen(){
    const tableBody = libraryTable.querySelector('tbody')
    tableBody.textContent = " "

    for (i=0;i<myLibrary.length;i++) {

        const newBookRow = document.createElement('tr')
        newBookRow.setAttribute("Data-index",i)
        const bookTitleCell = document.createElement('td')
        bookTitleCell.textContent = myLibrary[i].title
        const bookAuthorCell = document.createElement('td')
        bookAuthorCell.textContent = myLibrary[i].author
        const bookPageCell = document.createElement('td')
        bookPageCell.textContent = myLibrary[i].pages
        const bookStatusCell = myLibrary[i].createCell()
        const bookDeleteCell = myLibrary[i].deleteCell()
        

        newBookRow.appendChild(bookTitleCell)
        newBookRow.appendChild(bookAuthorCell)
        newBookRow.appendChild(bookPageCell)
        newBookRow.appendChild(bookStatusCell)
        newBookRow.appendChild(bookDeleteCell)

        tableBody.appendChild(newBookRow)

    }
}




addBookBtn.addEventListener('click',()=>{
        addBookForm.style.display = "block"
})

submitBookBtn.addEventListener('click',()=>{
    if(bookAuthorInput.value === " " || bookTitleInput.value === " " || bookPagesInput.value === " "){
        alert("Cannot be empty")
    }else{
        addBookToLibrary(bookTitleInput.value,bookAuthorInput.value,bookPagesInput.value)
        populateScreen()
        bookAuthorInput.value = " "
        bookPagesInput.value = " "
        bookTitleInput.value = " "
        addBookForm.style.display = "none"
    }
})


