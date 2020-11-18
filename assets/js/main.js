// NAVBAR STARTS
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});
// NAVBAR ENDS

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



// Converter Starts
$('.buyButton').click((e) => {
    e.preventDefault();
    let radio = $('input[name="buy"]:checked').val();
    console.log(radio)
    if (radio === 'Cash') {
        let buy = $('#buy').val();
        let product = $('#product').val();
        let number = $('#phoneNumber').val();
        let purpose = $('#purpose').val();
        let country = $('#country').val();
        let inputAmount = $('#inputAmount').val();

        let url = 'https://folksmedia.herokuapp.com/sendEmail'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "Type": buy,
                    "Product": product,
                    "Contact": number,
                    "Purpose": purpose,
                    "Amount": inputAmount,
                    "Currency": country,
                }
            )
        })
            .then(res => {
                if (res.status == 201) {
                    //Tera success action joh dalna ho
                    console.log("Success")
                }
                else {
                    //Error action	
                }
            })
            .catch(err => {
                //Error action
            });

        var docRef = db.collection("test").doc(country);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let country = $('#country').val();
                console.log(country);
                let multiplier = doc.data().currency;
                console.log(inputAmount * multiplier);

                let result = inputAmount * multiplier;
                let gst = (result * 0.18).toFixed(2);
                let serviceCharge = (result * 0.10 * 0.18).toFixed(2);
                let payableAmount = (result + parseFloat(gst) + parseFloat(serviceCharge)).toFixed(2);
                $('.hello').html(`<p class="">These documents are required <span style="color: red;">*</span></p>`);
                var urlimg = 'https://i.ibb.co/R0yWZrQ/Group-9-1.png';
                var image = new Image();
                image.src = urlimg;
                document.querySelector('.hello').appendChild(image);

                let coupon = $('#coupon');
                coupon.html(`
                <p class="label">
                    Have a coupon code?
                    </p>
                    <div class="field is-grouped ">
                    <p class="control ">
                        <input class="input" type="text" placeholder="Code" id="coupon1">
                    </p>
                    <p class="control btn">
                        <button class="button is-info" id="clicked">
                            APPLY
                        </button>
                    </p>
                    </div>
                    <hr>
    
                    <p class="is-pulled-right">${result}</p>
                    <p>Sub Total</p>
                    <p class="is-pulled-right">${gst}</p>
                    <p>GST</p>
                    <p class="is-pulled-right">${serviceCharge}</p>
                    <p>Service Charge</p>
                    <hr>
                    <p class="is-pulled-right couponValue">₹ ${payableAmount}</p>
                    <p>Amount Payable</p><br>
                    <button class="button is-pulled-right is-light is-primary" id="checkBtn"><strong>Proceed to
                        checkout</strong></button>
                    <div id="notification"></div>`);
                $('#clicked').click(function () {
                    let code = $('#coupon1').val();
                    console.log(code);

                    if (code == 'NEW') {
                        NewPayableAmount = payableAmount - 200;
                        console.log(NewPayableAmount);
                        $('.couponValue').html(`<p class="is-pulled-right couponValue">₹ ${NewPayableAmount}</p>`)
                    }
                    if (code == 'NEW1') {
                        NewPayableAmount = payableAmount - 400;
                        console.log(NewPayableAmount);
                        $('.couponValue').html(`<p class="is-pulled-right couponValue">₹ ${NewPayableAmount}</p>`)
                    }
                })
                $('#checkBtn').click(function () {
                    $('#phoneNumber').val('');
                    $("#purpose")[0].selectedIndex = 0;
                    $('#inputAmount').val('');
                    $("#country")[0].selectedIndex = 0;
                    $('#notification').html(`<div class="notification is-primary is-light">
                    <button class="delete" onclick="this.parentElement.style.display='none'"></button>
                    <strong>Thank you for visiting our website.We will get back to you shortly.</strong>
                    </div>`);
                })


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    else if (radio === 'Forex') {
        let buy = $('#buy').val();
        let product = $('#product').val();
        let number = $('#phoneNumber').val();
        let purpose = $('#purpose').val();
        let country = $('#country').val();
        let inputAmount = $('#inputAmount').val();

        let url = 'https://folksmedia.herokuapp.com/sendEmail'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "Type": buy,
                    "Product": product,
                    "Contact": number,
                    "Purpose": purpose,
                    "Amount": inputAmount,
                    "Currency": country,
                }
            )
        })
            .then(res => {
                if (res.status == 201) {
                    //Tera success action joh dalna ho
                    console.log("Success")
                }
                else {
                    //Error action	
                }
            })
            .catch(err => {
                //Error action
                console.log("Error sending email:", err);
            });

        var docRef = db.collection("test").doc(country);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let country = $('#country').val();
                console.log(country);
                let multiplier = doc.data().forexCurrency;
                console.log(inputAmount * multiplier);

                let result = inputAmount * multiplier;
                let gst = (result * 0.18).toFixed(2);
                let serviceCharge = (result * 0.10 * 0.18).toFixed(2);
                let payableAmount = (result + parseFloat(gst) + parseFloat(serviceCharge)).toFixed(2);
                let coupon = $('#coupon');
                coupon.html(`<p class="label">
                    Have a coupon code?
                    </p>
                    <div class="field is-grouped ">
                    <p class="control ">
                        <input class="input" type="text" placeholder="Code" id="coupon1">
                    </p>
                    <p class="control btn">
                        <button class="button is-info" id="clicked">
                            APPLY
                        </button>
                    </p>
                    </div>
                    <hr>
    
                    <p class="is-pulled-right">${result}</p>
                    <p>Sub Total</p>
                    <p class="is-pulled-right">${gst}</p>
                    <p>GST</p>
                    <p class="is-pulled-right">${serviceCharge}</p>
                    <p>Service Charge</p>
                    <hr>
                    <p class="is-pulled-right couponValue">₹ ${payableAmount}</p>
                    <p>Amount Payable</p><br>
                    <button class="button is-pulled-right is-light is-primary" id="checkBtn"><strong>Proceed to
                        checkout</strong></button>
                        <div id="notification"></div>`);
                $('#clicked').click(function () {
                    let code = $('#coupon1').val();
                    console.log(code);

                    if (code == 'NEW') {
                        NewPayableAmount = payableAmount - 200;
                        console.log(NewPayableAmount);
                        $('.couponValue').html(`<p class="is-pulled-right couponValue">₹ ${NewPayableAmount}</p>`)
                    }
                    if (code == 'NEW1') {
                        NewPayableAmount = payableAmount - 400;
                        console.log(NewPayableAmount);
                        $('.couponValue').html(`<p class="is-pulled-right couponValue">₹ ${NewPayableAmount}</p>`)
                    }
                })
                $('#checkBtn').click(function () {
                    $('#phoneNumber').val('');
                    $("#purpose")[0].selectedIndex = 0;
                    $('#inputAmount').val('');
                    $("#country")[0].selectedIndex = 0;
                    $('#notification').html(`<div class="notification is-primary is-light">
                    <button class="delete" onclick="this.parentElement.style.display='none'"></button>
                    <strong>Thank you for visiting our website.We will get back to you shortly.</strong>
                    </div>`);
                })


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
})
function change() {

}
// Converter Ends

// Sell Starts
$('.sellButton').click((e) => {
    e.preventDefault();
    let radio = $('input[name="sell"]:checked').val();
    console.log(radio)
    if (radio === 'Cash') {
        let sell = $('#sell').val();
        let product = $('#sellProduct').val();
        let number = $('#sellPhoneNumber').val();
        let purpose = $('#sellPurpose').val();
        let sellCountry = $('#sellCountry').val();
        let sellAmount = $('#sellAmount').val();

        let url = 'https://folksmedia.herokuapp.com/sendEmail'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "Type": sell,
                    "Product": product,
                    "Contact": number,
                    "Purpose": purpose,
                    "Amount": sellAmount,
                    "Currency": sellCountry,
                }
            )
        })
            .then(res => {
                if (res.status == 201) {
                    //Tera success action joh dalna ho
                    console.log("Success")
                }
                else {
                    //Error action	
                }
            })
            .catch(err => {
                //Error action
                console.log("Error sending email:", err);
            });

        var docRef = db.collection("test").doc(sellCountry);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let sellCountry = $('#sellCountry').val();
                console.log(sellCountry);
                let sellMultiplier = doc.data().sellCurrency;
                console.log(sellAmount * sellMultiplier);

                let sellResult = sellAmount * sellMultiplier;
                let gst = (sellResult * 0.18).toFixed(2);
                let serviceCharge = (sellResult * 0.10 * 0.18).toFixed(2);
                let payableAmount = (sellResult - parseFloat(gst) - parseFloat(serviceCharge)).toFixed(2);

                let sellCoupon = $('#sellCoupon');
                sellCoupon.html(`<p class="label">
                    Have a coupon code?
                    </p>
                    <div class="field is-grouped ">
                    <p class="control ">
                        <input class="input" type="text" placeholder="Code" id="sellCoupon1">
                    </p>
                    <p class="control btn">
                        <button class="button is-info" id="sellClicked">
                            APPLY
                        </button>
                    </p>
                    </div>
                    <hr>
    
                    <p class="is-pulled-right">${sellResult}</p>
                    <p>Sub Total</p>
                    <p class="is-pulled-right">${gst}</p>
                    <p>GST</p>
                    <p class="is-pulled-right">${serviceCharge}</p>
                    <p>Service Charge</p>
                    <hr>
                    <p class="is-pulled-right sellCouponValue">₹ ${payableAmount}</p>
                    <p>Amount Payable</p><br>
                    <button class="button is-pulled-right is-light is-primary" id="checkBtn"><strong>Proceed to
                        checkout</strong></button>
                        <div id="notification"></div>`);
                $('#sellClicked').click(function () {
                    let sellCode = $('#sellCoupon1').val();
                    console.log(sellCode);

                    if (sellCode == 'NEW') {
                        NewPayableAmount = payableAmount + 200;
                        console.log(NewPayableAmount);
                        $('.sellCouponValue').html(`<p class="is-pulled-right sellCouponValue">₹ ${NewPayableAmount}</p>`)
                    }
                    if (sellCode == 'NEW1') {
                        NewPayableAmount = payableAmount + 400;
                        console.log(payableAmount);
                        $('.sellCouponValue').html(`<p class="is-pulled-right sellCouponValue">₹ ${NewPayableAmount}</p>`)
                    }
                })
                $('#checkBtn').click(function () {
                    $('#sellPhoneNumber').val('');
                    $("#sellPurpose")[0].selectedIndex = 0;
                    $('#sellAmount').val('');
                    $("#sellCountry")[0].selectedIndex = 0;
                    $('#notification').html(`<div class="notification is-primary is-light">
                    <button class="delete" onclick="this.parentElement.style.display='none'"></button>
                    <strong>Thank you for visiting our website.We will get back to you shortly.</strong>
                    </div>`);
                })


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    else if (radio === 'Forex') {
        let sell = $('#sell').val();
        let product = $('#sellProduct').val();
        let number = $('#sellPhoneNumber').val();
        let purpose = $('#sellPurpose').val();
        let sellCountry = $('#sellCountry').val();
        let sellAmount = $('#sellAmount').val();

        let url = 'https://folksmedia.herokuapp.com/sendEmail'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "Type": sell,
                    "Product": product,
                    "Contact": number,
                    "Purpose": purpose,
                    "Amount": sellAmount,
                    "Currency": sellCountry,
                }
            )
        })
            .then(res => {
                if (res.status == 201) {
                    //Tera success action joh dalna ho
                    console.log("Success")
                }
                else {
                    //Error action	
                }
            })
            .catch(err => {
                //Error action
                console.log("Error sending email:", err);
            });

        var docRef = db.collection("test").doc(sellCountry);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                let sellCountry = $('#sellCountry').val();
                console.log(sellCountry);
                let sellMultiplier = doc.data().sellForex;
                console.log(sellAmount * sellMultiplier);

                let sellResult = sellAmount * sellMultiplier;
                let gst = (sellResult * 0.18).toFixed(2);
                let serviceCharge = (sellResult * 0.10 * 0.18).toFixed(2);
                let payableAmount = (sellResult - parseFloat(gst) - parseFloat(serviceCharge)).toFixed(2);

                let sellCoupon = $('#sellCoupon');
                sellCoupon.html(`<p class="label">
                    Have a coupon code?
                    </p>
                    <div class="field is-grouped ">
                    <p class="control ">
                        <input class="input" type="text" placeholder="Code" id="sellCoupon1">
                    </p>
                    <p class="control btn">
                        <button class="button is-info" id="sellClicked">
                            APPLY
                        </button>
                    </p>
                    </div>
                    <hr>
    
                    <p class="is-pulled-right">${sellResult}</p>
                    <p>Sub Total</p>
                    <p class="is-pulled-right">${gst}</p>
                    <p>GST</p>
                    <p class="is-pulled-right">${serviceCharge}</p>
                    <p>Service Charge</p>
                    <hr>
                    <p class="is-pulled-right sellCouponValue">₹ ${payableAmount}</p>
                    <p>Amount Payable</p><br>
                    <button class="button is-pulled-right is-light is-primary" id="checkBtn"><strong>Proceed to
                        checkout</strong></button>
                        <div id="notification"></div>`);
                $('#sellClicked').click(function () {
                    let sellCode = $('#sellCoupon1').val();
                    console.log(sellCode);

                    if (sellCode == 'NEW') {
                        NewPayableAmount = payableAmount + 200;
                        console.log(NewPayableAmount);
                        $('.sellCouponValue').html(`<p class="is-pulled-right sellCouponValue">₹ ${NewPayableAmount}</p>`)
                    }
                    if (sellCode == 'NEW1') {
                        NewPayableAmount = payableAmount + 400;
                        console.log(payableAmount);
                        $('.sellCouponValue').html(`<p class="is-pulled-right sellCouponValue">₹ ${NewPayableAmount}</p>`)
                    }
                })
                $('#checkBtn').click(function () {
                    $('#sellPhoneNumber').val('');
                    $("#sellPurpose")[0].selectedIndex = 0;
                    $('#sellAmount').val('');
                    $("#sellCountry")[0].selectedIndex = 0;
                    $('#notification').html(`<div class="notification is-primary is-light">
                    <button class="delete" onclick="this.parentElement.style.display='none'"></button>
                    <strong>Thank you for visiting our website.We will get back to you shortly.</strong>
                    </div>`);
                })


            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
})
// Sell Ends

// Number Validations Starts
function validate() {
    let number = document.getElementById('phoneNumber').value;

    var error;

    if (number == "") {
        document.getElementById('NumberErr').innerHTML = "Enter your number";
    } else {
        var regex = /^[1-9]\d{9}$/;
        if (regex.test(number) === false) {
            document.getElementById('NumberErr').innerHTML = "Please enter a valid 10 digit number";
        } else {
            document.getElementById('NumberErr').innerHTML = "";
            NumberErr = false;
        }
    }

    if (error) {
        return false;
    } else {

    }
}

function sellValidate() {
    let number = document.getElementById('sellPhoneNumber').value;

    var error;

    if (number == "") {
        document.getElementById('NumberErr1').innerHTML = "Enter your number";
    } else {
        var regex = /^[1-9]\d{9}$/;
        if (regex.test(number) === false) {
            document.getElementById('NumberErr1').innerHTML = "Please enter a valid 10 digit number";
        } else {
            document.getElementById('NumberErr1').innerHTML = "";
            NumberErr = false;
        }
    }

    if (error) {
        return false;
    } else {

    }
}
// Number Validations Ends

function show() {
    let radio = $('input[name="buy"]:checked').val();
    console.log(radio);
    if (radio == 'Cash') {
        let country = $('#country').val();
        var docRef = db.collection("test").doc(country);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let country = $('#country').val();
                console.log(country);
                let multiplier = doc.data().currency;
                console.log(multiplier);
                $('#showCurrency').html(`1 ${country} = ₹ ${multiplier}`)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    else if (radio === 'Forex') {
        let country = $('#country').val();
        var docRef = db.collection("test").doc(country);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let country = $('#country').val();
                console.log(country);
                let multiplier = doc.data().forexCurrency;
                console.log(multiplier);
                $('#showCurrency').html(`1 ${country} = ₹ ${multiplier}`)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
}

function showSell() {
    let radio = $('input[name="sell"]:checked').val();
    console.log(radio);
    if (radio == 'Cash') {
        let sellCountry = $('#sellCountry').val();
        var docRef = db.collection("test").doc(sellCountry);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let sellCountry = $('#sellCountry').val();
                console.log(sellCountry);
                let multiplier = doc.data().sellCurrency;
                console.log(multiplier);
                $('#showSellCurrency').html(`1 ${sellCountry} = ₹ ${multiplier}`)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    else if (radio == 'Forex') {
        let sellCountry = $('#sellCountry').val();
        var docRef = db.collection("test").doc(sellCountry);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let sellCountry = $('#sellCountry').val();
                console.log(sellCountry);
                let multiplier = doc.data().sellForex;
                console.log(multiplier);
                $('#showSellCurrency').html(`1 ${sellCountry} = ₹ ${multiplier}`)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
}