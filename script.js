let misIngredientes = [];
let favoritos = JSON.parse(localStorage.getItem("misFavoritos")) || [];

const recetas = [
  { nombre: "Tortilla de Papas", ing: ["papa", "huevo", "cebolla"], pasos: "1. Freír papas y cebolla. 2. Mezclar con huevo. 3. Cocinar en sartén.", foto: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=400" },
  { nombre: "Omelette de Queso", ing: ["huevo", "queso"], pasos: "1. Batir huevos. 2. Poner queso y doblar en sartén.", foto: "https://images.unsplash.com/photo-1510750667821-d52f87cd5171?w=400" },
  { nombre: "Arroz con Atún", ing: ["arroz", "atun", "mayonesa"], pasos: "1. Cocinar arroz. 2. Mezclar con atún y mayo.", foto: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400" },
  { nombre: "Fideos a la Crema", ing: ["fideos", "crema", "queso"], pasos: "1. Hervir fideos. 2. Calentar crema con queso y mezclar.", foto: "https://images.unsplash.com/photo-1645112481338-3561ec81907a?w=400" },
  { nombre: "Milanesas con Puré", ing: ["carne", "huevo", "papa"], pasos: "1. Empanar carne. 2. Hervir papas para puré. 3. Cocinar y servir.", foto: "https://images.unsplash.com/photo-1594834749740-74b3f6764be4?w=400" },
  { nombre: "Ensalada Rusa", ing: ["papa", "zanahoria", "mayonesa"], pasos: "1. Hervir cubos de papa y zanahoria. 2. Mezclar con mayo.", foto: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400" },
  { nombre: "Lentejas Guisadas", ing: ["lentejas", "cebolla", "tomate"], pasos: "1. Sofreír vegetales. 2. Sumar lentejas y agua. Cocinar 30min.", foto: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400" }
];

const tips = ["Si el huevo flota, no sirve.", "Cebolla al freezer 15min para no llorar.", "Arroz: 2 tazas de agua por 1 de arroz."];

function toggle(el, ing) {
  el.classList.toggle("seleccionado");
  misIngredientes.includes(ing) ? misIngredientes = misIngredientes.filter(i => i !== ing) : misIngredientes.push(ing);
}

function agregarExtra() {
  const val = document.getElementById("inputExtra").value.toLowerCase().trim();
  if (val && !misIngredientes.includes(val)) {
    misIngredientes.push(val);
    document.getElementById("etiquetasExtras").innerHTML += `<span class="tag">📍 ${val}</span>`;
    document.getElementById("inputExtra").value = "";
  }
}

function buscar() {
  const posibles = recetas.filter(r => r.ing.every(i => misIngredientes.includes(i)));
  render(posibles);
}

function render(datos) {
  const lista = document.getElementById("lista");
  if (datos.length === 0) { lista.innerHTML = "<p>¡Selecciona más ingredientes!</p>"; return; }
  lista.innerHTML = datos.map((r, i) => `
    <div class="tarjeta-receta">
      <img src="${r.foto}">
      <div class="info">
        <h3>${r.nombre} <span onclick="toggleFav('${r.nombre}')" style="cursor:pointer">${favoritos.includes(r.nombre)?'❤️':'🤍'}</span></h3>
        <button onclick="document.getElementById('p-${i}').style.display='block'">📖 Ver Pasos</button>
        <div id="p-${i}" class="pasos-detalle" style="display:none;">${r.pasos}</div>
      </div>
    </div>
  `).join("");
}

function toggleFav(n) {
  favoritos.includes(n) ? favoritos = favoritos.filter(f => f !== n) : favoritos.push(n);
  localStorage.setItem("misFavoritos", JSON.stringify(favoritos));
  buscar();
}

function mostrarFavoritos() { render(recetas.filter(r => favoritos.includes(r.nombre))); }

window.onload = () => {
  document.getElementById("textoTip").innerText = tips[Math.floor(Math.random()*tips.length)];
  if ('serviceWorker' in navigator) { navigator.serviceWorker.register('./sw.js'); }
};
