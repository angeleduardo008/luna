# Momentos con Luna

Página estática con HTML, CSS y JavaScript para dedicar a Luna.

## Cómo poner tus fotos

1. Crea o usa la carpeta `fotos`.
2. Guarda tus imágenes con estos nombres:
   - `foto01.jpg`
   - `foto02.jpg`
   - `foto03.jpg`
   - hasta `foto20.jpg`
3. Para la imagen principal de portada, agrega:
   - `portada.jpg`

También puedes usar `.png` o `.webp`, pero si cambias la extensión debes editar los nombres en `script.js` y `styles.css`.

## Cómo poner sonido

1. Crea o usa la carpeta `audio`.
2. Guarda tu música como:
   - `sonido.mp3`

Si quieres otro nombre, cambia esta línea en `index.html`:

```html
<audio id="bgMusic" src="audio/sonido.mp3" loop preload="auto"></audio>
```

## Cómo cambiar los mensajes

Edita el archivo `script.js`. Cada recuerdo tiene esta forma:

```js
{
  foto: "fotos/foto01.jpg",
  mensaje: "El inicio de un recuerdo que todavía me saca una sonrisa."
}
```

El mensaje final de disculpas está en `index.html`, dentro de la sección `apologyLetter`.
