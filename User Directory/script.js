let searchbox = document.querySelector('#searchbox');
let usercontainer = document.querySelector('.usercontainer');

let users = [
      {
        profileURL:'https://static.vecteezy.com/system/resources/thumbnails/053/630/749/small/a-beautiful-young-business-woman-in-a-suit-and-tie-photo.jpeg',
        name:'Alice Jhonson',
        email:'alice@example.com'
    },
     {
        profileURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s',
        name:'Bob Smith',
        email:'bobsmitchofficial@example.com'
    },
     {
        profileURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNiAaKk2O5kUsjqJP01k24EW93PnSHjuJLTA&s',
        name:'Charlie Lee',
        email:'charlie@example.com'
    },
     {
        profileURL:'https://media.istockphoto.com/id/1987655119/photo/smiling-young-businesswoman-standing-in-the-corridor-of-an-office.jpg?s=612x612&w=0&k=20&c=5N_IVGYsXoyj-H9vEiZUCLqbmmineaemQsKt2NTXGms=',
        name:'Diana Prince',
        email:'diana@example.com'
    }
]


function renderuser(arry){
    usercontainer.innerHTML='';
arry.map(function(obj){
let {profileURL,name,email} = obj;

let elem = document.createElement('div');
elem.className= 'useritem';
elem.innerHTML= `
   <img src=${profileURL} alt="error">
                <div class="text">
                    <h5>${name}</h5>
                    <p>${email}</p>
                </div>
`;
usercontainer.append(elem);
})
}

renderuser(users);

const handlesearch = ()=>{
    let searchvalue  = searchbox.value;
let filtereduser = users.filter(obj=>{
    return obj.name.toLowerCase().includes(searchvalue.toLowerCase()) || obj.email.toLowerCase().includes(searchvalue.toLowerCase())
})

renderuser(filtereduser);

}

searchbox.addEventListener('input', handlesearch);