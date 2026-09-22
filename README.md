# 🌻 Galaxia de Flores Amarillas para Jenny

Versión independiente hecha desde cero para GitHub Pages.

## Estructura

```text
galaxia-flores-amarillas/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── musica.mp3
    └── fotos/
        ├── foto1.jpg
        ├── foto2.jpg
        └── foto3.jpg
```

## Personalización

Edita `CONFIG` al principio de `script.js`:

- `name`: nombre que aparece al centro.
- `messages`: lista de mensajes.
- `photos`: rutas de las fotos.
- `music`: ruta del MP3.
- `messageInterval`: velocidad de aparición de mensajes.

Puedes usar cualquier cantidad de mensajes.

## GitHub Pages

1. Crea un repositorio.
2. Sube todos los archivos manteniendo las carpetas.
3. En GitHub entra a **Settings → Pages**.
4. Selecciona **Deploy from a branch**.
5. Selecciona `main` y `/ (root)`.
6. Guarda y espera a que GitHub publique la página.

Nota: los navegadores suelen bloquear la reproducción automática de audio. Por eso la música se intenta iniciar después de tocar "Toca para iniciar".
