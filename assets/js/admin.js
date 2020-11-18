// Tab Starts
let tabsWithContent = (function () {
    let tabs = document.querySelectorAll('.tabs li');
    let tabsContent = document.querySelectorAll('.tab-content');

    let deactvateAllTabs = function () {
        tabs.forEach(function (tab) {
            tab.classList.remove('is-active');
        });
    };

    let hideTabsContent = function () {
        tabsContent.forEach(function (tabContent) {
            tabContent.classList.remove('is-active');
        });
    };

    let activateTabsContent = function (tab) {
        tabsContent[getIndex(tab)].classList.add('is-active');
    };

    let getIndex = function (el) {
        return [...el.parentElement.children].indexOf(el);
    };

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            deactvateAllTabs();
            hideTabsContent();
            tab.classList.add('is-active');
            activateTabsContent(tab);
        });
    })

    tabs[0].click();
})();
// Tab End
//Table Data Starts
let tbody = document.querySelector('.tbody');
let i = 1;
function renderTable(doc) {
    let tr = document.createElement('tr');
    let currency = document.createElement('td');
    let srno = document.createElement('td');
    let buyCurrency = document.createElement('td');
    let buyForex = document.createElement('td');
    let sellCurrency = document.createElement('td');
    let sellForex = document.createElement('td');
    srno.textContent = i++;
    currency.textContent = doc.id;
    buyCurrency.textContent = doc.data().currency;
    buyForex.textContent = doc.data().forexCurrency;
    sellCurrency.textContent = doc.data().sellCurrency;
    sellForex.textContent = doc.data().sellForex;
    tr.appendChild(srno);
    tr.appendChild(currency);
    tr.appendChild(buyCurrency);
    tr.appendChild(buyForex);
    tr.appendChild(sellCurrency);
    tr.appendChild(sellForex);
    tbody.appendChild(tr);
}
db.collection('test').get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        // console.log(doc.data());
        renderTable(doc);
    })
})
//Table Data Ends

// Converter Starts
function change() {
    let radio = $('input[name="test"]:checked').val();
    console.log(radio)
    if (radio === 'Cash') {
        let country = $('#country').val();
        let inputAmount = $('#inputAmount').val();
        let convertedAmount = parseFloat(inputAmount);
        var docRef = db.collection("test").doc(country).update({ currency: convertedAmount });

    }
    else if (radio === 'Forex') {
        let country = $('#country').val();
        let inputAmount = $('#inputAmount').val();
        let convertedAmount = parseFloat(inputAmount);
        var docRef = db.collection("test").doc(country).update({ forexCurrency: convertedAmount });
    }
}
// Converter Ends

// Sell Starts
function sellChange() {
    let radio = $('input[name="test"]:checked').val();
    console.log(radio)
    if (radio === 'Cash') {
        let sellCountry = $('#sellCountry').val();
        let sellAmount = $('#sellAmount').val();
        let convertedAmount = parseFloat(sellAmount);
        var docRef = db.collection("test").doc(sellCountry).update({ sellCurrency: convertedAmount });

    }
    else if (radio === 'Forex') {
        let sellCountry = $('#sellCountry').val();
        let sellAmount = $('#sellAmount').val();
        let convertedAmount = parseFloat(sellAmount);
        var docRef = db.collection("test").doc(sellCountry).update({ sellForex: convertedAmount });

    }
}
// Sell Ends