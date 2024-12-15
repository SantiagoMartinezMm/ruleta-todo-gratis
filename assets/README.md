# Estructura de Recursos para la Ruleta PINTEMAS

## Organización de Carpetas

```
assets/
├── images/          # Imágenes y logos
│   ├── logo.png     # Logo principal de PINTEMAS
│   ├── favicon.ico  # Ícono para el navegador
│   └── icons/       # Íconos adicionales
│
├── sounds/          # Efectos de sonido
│   ├── spin.mp3     # Sonido al girar
│   ├── win.mp3      # Sonido al ganar
│   └── click.mp3    # Sonido de botones
│
└── fonts/          # Fuentes personalizadas (si se requieren)
    └── custom/     # Fuentes específicas de PINTEMAS
```

## Formatos Recomendados

### Imágenes
- Logo principal: PNG con fondo transparente (tamaño recomendado: 200x60px)
- Íconos: SVG o PNG con fondo transparente
- Favicon: ICO (16x16px, 32x32px)

### Sonidos
- Formato: MP3
- Duración recomendada: 1-3 segundos
- Calidad: 128kbps

### Fuentes
- Formatos: WOFF2, WOFF, TTF
- Incluir variantes: Regular, Bold

## Uso

1. Coloca el logo de PINTEMAS en `assets/images/logo.png`
2. Agrega los sonidos en `assets/sounds/`
3. Si hay fuentes personalizadas, colócalas en `assets/fonts/`
