const draggable_list=document.getElementById('draggable-list')
const check= document.getElementById('check')

const months=[
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const listItems=[]

let dragStartIndex;



createlist()

function createlist(){
    [...months]
    .map(a=>({value:a,sort:Math.random()}))
    .sort((a,b)=>a.sort-b.sort)
    .map(a=>a.value)
    .forEach((month,index)=>{
        console.log(month)
        const listItem= document.createElement('li')
       
        listItem.setAttribute('data-index',index)

        listItem.innerHTML=`
        <span class='number'>${index+1}</span>
        <div class='draggable' draggable='true'>
           <p class='person-name'>${month}</p>
           <i class="fas fa-grip-lines"></i>
        </div> 
        `

        listItems.push(listItem)

        draggable_list.appendChild(listItem)
    })

    addEventListener()
}

function dragStart(){
   dragStartIndex=this.closest('li').getAttribute('data-index')
  
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(){
    
    this.classList.add('over')
}

function dragLeave(){
    
    this.classList.remove('over')
}

function dragDrop(){
    const dragEndIndex= this.getAttribute('data-index')
    
    swapItems(dragStartIndex,dragEndIndex)

    this.classList.remove('over')
}

function swapItems(fromIndex,toIndex){
    const item1=listItems[fromIndex].querySelector('.draggable')
    const item2=listItems[toIndex].querySelector('.draggable')

    console.log(item1)
    console.log(item2)

    listItems[fromIndex].appendChild(item2)
    listItems[toIndex].appendChild(item1)
}

function addEventListener(){
    const draggables=document.querySelectorAll('.draggable')
    const dragListItems= document.querySelectorAll('.draggable-list li')

   

    draggables.forEach(draggable=>{
        draggable.addEventListener('dragstart',dragStart)
    })

    dragListItems.forEach(item=>{
        item.addEventListener('dragover',dragOver)
        item.addEventListener('drop',dragDrop)
        item.addEventListener('dragenter',dragEnter)
        item.addEventListener('dragleave',dragLeave)
    })
}

function checkorder(){
    listItems.forEach((item,index)=>{
        const monthname=item.querySelector('.draggable').innerText.trim()

        if (monthname!=months[index]){
            item.classList.add('wrong')
        }
        else{
            item.classList.remove('wrong')
            item.classList.add('right')
        }
    })
}

check.addEventListener('click',checkorder)