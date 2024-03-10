const cardInput = document.getElementById('card');
const imageContainer = document.querySelector('.image');
const img = document.querySelector('.img');


cardInput.addEventListener('input', () => {
  cardNumberValidator(cardInput);
});

function cardNumberValidator(cardInput) {
    let AmeExCardno = /^(?:3[47][0-9]{13})$/;
    let VisaCardNum = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    let MasterCardNum = /^(?:5[1-5][0-9]{14})$/;
    let discoverCard = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    let cardImagePath;
    let isCardValid = false;

    if (cardInput.value.match(AmeExCardno)) {
        cardImagePath = "./images/amex.png";
        isCardValid = true;
    } else if (cardInput.value.match(VisaCardNum)) {
        cardImagePath = "./images/visa.png";
        isCardValid = true;
    } else if (cardInput.value.match(MasterCardNum)) {
        cardImagePath = "./images/master.png";
        isCardValid = true;
    } else if (cardInput.value.match(discoverCard)) {
        cardImagePath = "./images/discover.png";
        isCardValid = true;
    }

    if (isCardValid) {
        img.src = cardImagePath;
        imageContainer.classList.add('active');
    } else {
        img.src = ""; // Clear the image if no match
        imageContainer.classList.remove('active');
    }
}

