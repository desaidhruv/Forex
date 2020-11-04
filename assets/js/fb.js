const fbData = document.querySelector('#fb')
const form = document.querySelector('#add')
// create Element and render Docs
function renderDoc(doc) {
    let para = document.createElement('p');
    let name = document.createElement('span');
    let city = document.createElement('span');

    para.setAttribute('data-id', doc.id)
    name.textContent = doc.data().Name;
    city.textContent = doc.data().city;

    para.appendChild(name);
    para.appendChild(city);
    fbData.appendChild(para)
}

// Getting Data
// var content = db.collection('test').get().then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//         renderDoc(doc);
//     })
// });


//Saving Data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('test').add({
        Name:form.name.value,
        city:form.city.value
    })
    form.name.value = '';
    form.city.value = '';
});

// Real-time Listener
db.collection('test').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === 'added') {
            renderDoc(change.doc);
        }
    })
});

// Update Data
// db.collection('test').doc('usd-id').update({
//     USD: 76.4
// });