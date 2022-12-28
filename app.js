
let state = {
    teendok: [],
    isPending: false,
};

// 1. Kattintás eseményre köss be funkcionalitást
document.getElementById("result").addEventListener("click", () => {
// 2. A esemény bekövetkezésekor állítsd a state isPending értékét true-ra
//Később a renderelő függvény az isPending értékből fog dolgozni és ennek alapján dönti el, hogy mit kell megjelenítenie.
state.isPending = true;
render();
//Következő lépés az AJAX kérés kiküldése szerver oldalra.
//3. Küldj AJAX kérést a beépített "fetch" függvény segítségével
//4. A válaszként kapott adatokat szűrd meg a "filter" függvénnyel
//A kódnak kompaktabb kinézetet kölcsönözhetünk, ha a then blokkba bepasszolt függvényt arrow functionként hozzuk létre.
//A következő then blokkban elvégezhetjük a szűrést
//Ezekután a elvégezhetjük az alkalmazás állapotának megváltoztatását.
fetch("http://jsonplaceholder.typicode.com/todos").then((res) => res.json()).then((todos) => todos.filter((todo) => todo.completed)).then((todos => {
// 5. A megszűrt adatokat írd be a state teendok kulcsa alá
state.teendok = todos;
// 6. Ezután állítsd vissza az isPending-et false-ra
state.isPending = false;
render();
}))
//A promise láncot mindig érdemes lezárni egy catch blokk-kal, ami lekezeli az esetleges hibákat.
.catch(console.log);
});

/* 7. Készíts egy renderelő függvényt, ami
  - Ha az isPending true, akkor egy "Betöltés folyamatban" feliratot ír ki
  - Ha az isPending false, akkor pedig kirajzolja az összes teendőt, 
    ami a state-ben van
*/
function render() {
  if(state.isPending) {
    document.getElementById("todo-list").innerHTML = "Betöltés folyamatban...";
    return;
  }

  //A map function-nel kompakt módon ki tudod generálni a HTML tartalmat.

  document.getElementById("todo-list").innerHTML = state.teendok.map((teendo, i) => 
  `<span class="badge bg-primary me-1 mb-1>${i + 1}. ${teendo.title}</span>`).join("");
}

//Az utolsó lépés a render függvény meghívása a minden alkalommal, amikor valamilyen state változás történt.
// 8. Hívd meg a renderelő függvényt a 2. és az 4. pont után is