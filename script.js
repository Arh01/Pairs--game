/*
1. Выбрать поле для игры
2. Заполнить игровое поле карточками (тегами li)
3. Сделать клик по карточкам
4. Сделать переворачивание карточек
	4.1. Размещаем картинку для каждой карточки
	4.2. Показываем картинку
5. Если выбрано 2 картинки проверяем на совпадение
	5.1. Если картинки совпадают, то удаляем карточки
	5.2. Перевернуть все выбранные карточки
6. Если все карточки удалены вывести окно с перезапуском игры
7. При клике на кнопку перезагрузить обновляем мтраницу
*/

var cardsField = document.querySelector("#cards");
// console.dir(cardsField);
var resetBlock = document.querySelector("#reset");
// console.dir(resetBlock);
var resetBtn = document.querySelector("#reset-btn");
var countCards = 16;
var deletedCards = 0;
var images = [
	1,2,3,4,
	5,6,7,8,
	1,2,3,4,
	5,6,7,8
];
var selected = [];
var pause = false;

/*----------------------Кусок кода делает рандомное расположение карт--------------------------*/

images.sort(()=> Math.random()-0.5)
console.dir(images);


/*-------более ранняя версия, более долгая-----------*/
// var usedCard = [];
// var count = countCards;
// for (var i = 0; i < count; i++) {
// 	var card = random(1,8);
// 	if (images.includes(card)) {
// 		if (usedCard.includes(card)) {
// 			count++
// 		} else {
// 			usedCard.push(card);
// 			images.push(card);
// 		}
// 	} else {
// 		images.push(card);
// 	}
// }
// // функция случайных чисел.
// function random(min, max) {
//     return Math.floor(min + Math.random() * (max + 1 - min));
// }
/*--------------------------------------------------------------------------------------------*/


for (var i = 0; i < countCards; i++) {
	var li = document.createElement("li");
	li.id = i;
	cardsField.appendChild(li);
}

cardsField.onclick = function(event) {
	if (pause == false) {
		var element = event.target;
		if (element.tagName == "LI" && element.className != "active") {
			selected.push(element);
			element.className = "active";
			var img = images[element.id];
			element.style.backgroundImage = "url('images/" + img + ".png')";
			if (selected.length == 2) {
				pause = true;
				if (images[selected[0].id] == images[selected[1].id]) {
					selected[0].style.visibility = "hidden";
					selected[1].style.visibility = "hidden";
					deletedCards +=2;
				}
				setTimeout(refreshCards, 600);
			}
		}
	}
}

function refreshCards() {
	for (var i = 0; i < countCards; i++) {
		cardsField.children[i].className = "";
		cardsField.children[i].style.backgroundImage = 'url("images/back.png")';
	}
	if (deletedCards == countCards) {
		resetBlock.style.display = "block";
	}
	selected = [];
	pause = false;
}

resetBtn.onclick = function() {
	location.reload();
}