
function kolobok(hero) {
    if (hero === 'дедушка') {
        return 'Я от дедушки ушёл';
    } else if (hero === 'заяц') {
        return 'Я от зайца ушёл';
    } else if (hero === 'лиса') {
        return 'Меня съели';
    }

}
console.log(kolobok('заяц'));

function characterName(character) {
    return `${character}! ${character}! ${character}!`;
}

console.log(characterName("Дед Мороз"));