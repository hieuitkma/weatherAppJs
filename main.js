const keyAPI = 'a41c1fe780c6fec86bd91b3e10034f40';
let cityName = 'ha noi';
let url;

let formElement = document.querySelector('form');
const userInput = document.querySelector('input[type="text"]');
const btn = document.querySelector('button.app__form-btn');
// let nameElemnt = document.querySelector('.citis__name');
// let countryElemnt = document.querySelector('.citis__country');
// let tempElement = document.querySelector('.citis__temp');
// let imgElement = document.querySelector('.citis__img');
// let description = document.querySelector('.citis__description');
let notifycationElement = document.querySelector('.notifycation');
let ulElement = document.querySelector('ul');

let arrData = [];

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
})

userInput.onchange = function(e) {
    e.preventDefault();
    cityName = userInput.value;
    url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${keyAPI}`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.message) {
                // console.log(data);
                notifycationElement.classList.add('hidden');
                userInput.value = '';

                let objData = {
                    city: data.name,
                    iconCity: data.sys.country,
                    temp: data.main.temp,
                    img: data.weather[0].icon,
                    descriptionObj: data.weather[0].description.toUpperCase()
                }
                arrData.push(objData);
                // console.log(arrData);
                render(arrData);
            } else {
                userInput.value = '';
                notifycationElement.classList.remove('hidden');
            }
        })
        .catch(() => {
            // msg.textContent = "Please search for a valid city 😩";
        });
}



function render(items) {
    let li = items.map(item => {
        return `<li class="citis__item">
        <div class="abc">
            <h2 class="citis__name citis__ml">${item.city}
            </h2>
            <p class="citis__country citis__ml">${item.iconCity}</p>
        </div>

        <div class="citis__temp citis__ml">${item.temp}<span>°C</span></div>
        <img class="citis__img citis__ml" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${item.img}.svg" alt="">
        <p class="citis__description citis__ml">${item.descriptionObj}</p>
    </li>`
    }).join('');
    ulElement.innerHTML = li;
}