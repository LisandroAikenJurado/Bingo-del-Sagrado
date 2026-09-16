# Bingo del Sagrado

App web para marcar los números de un bingo (1 al 90).

## Estructura

```
bingo-sagrado/
├── index.html          → estructura de la página
├── css/
│   └── styles.css      → colores, tipografía, grilla, logo de fondo
├── js/
│   └── app.js          → marcar/desmarcar, lista y guardado
├── assets/
│   └── logo.png        → escudo de la comunidad, con fondo transparente
└── vercel.json
```

## Cómo subirlo a Vercel

### Opción 1: arrastrar la carpeta

1. Entrá a https://vercel.com e iniciá sesión.
2. **Add New... → Project**, elegí el deploy manual y arrastrá esta carpeta.
3. Framework Preset: **Other**. Sin build command. **Deploy**.

### Opción 2: con GitHub

1. Subí el contenido de esta carpeta a un repo nuevo.
2. En Vercel: **Add New... → Project → Import Git Repository**.
3. Framework Preset: **Other**, Build Command y Output Directory vacíos. **Deploy**.

### Opción 3: desde la terminal

```bash
npm i -g vercel
cd bingo-sagrado
vercel
```

## Probarlo localmente

Como ahora hay varios archivos, conviene levantar un servidor chico en vez de
abrir el `index.html` con doble clic:

```bash
cd bingo-sagrado
python3 -m http.server 8000
```

Después entrá a http://localhost:8000

## Cosas que podés cambiar

| Qué | Dónde |
|---|---|
| Cantidad de números | `js/app.js`, constante `TOTAL_NUMEROS` |
| Colores | `css/styles.css`, bloque `:root` |
| Tamaño del logo de fondo | `css/styles.css`, variable `--logo-size` |
| Transparencia del logo | `css/styles.css`, variable `--logo-opacity` |
| Título | `index.html`, la etiqueta `<h1>` |

## Nota

Los números marcados se guardan en el navegador de cada persona, así que al
recargar la página no se pierde la partida.
