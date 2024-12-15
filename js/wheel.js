export class Wheel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.prizes = [
            { 
                name: 'TODO GRATIS',
                description: 'Descuento del 100% hasta $15.000',
                color: '#FFD700', // Dorado
                textColor: '#841468',
                probability: 0.05, // Muy baja probabilidad por ser el premio mayor
                shortText: 'TODO\nGRATIS'
            },
            { 
                name: '20% de Descuento',
                description: 'En pinturas premium',
                color: '#3498DB',
                textColor: '#FFFFFF',
                probability: 0.10,
                shortText: '20%\nDESCUENTO'
            },
            { 
                name: '15% de Descuento',
                description: 'En productos seleccionados',
                color: '#E74C3C',
                textColor: '#FFFFFF',
                probability: 0.15,
                shortText: '15%\nDESCUENTO'
            },
            { 
                name: 'Kit de Pintura',
                description: 'Con compras mayores a $50.000',
                color: '#F4DE00',
                textColor: '#841468',
                probability: 0.15,
                shortText: 'KIT DE\nPINTURA'
            },
            { 
                name: '10% de Descuento',
                description: 'En toda la tienda',
                color: '#841468',
                textColor: '#FFFFFF',
                probability: 0.20,
                shortText: '10%\nDESCUENTO'
            },
            { 
                name: 'Regalo Sorpresa',
                description: 'En tu próxima compra',
                color: '#2ECC71',
                textColor: '#FFFFFF',
                probability: 0.15,
                shortText: 'REGALO\nSORPRESA'
            },
            { 
                name: 'Bono Extra',
                description: 'Cupón de $10.000',
                color: '#9B59B6',
                textColor: '#FFFFFF',
                probability: 0.10,
                shortText: 'BONO\nEXTRA'
            },
            { 
                name: '5% de Descuento',
                description: 'En accesorios de pintura',
                color: '#FF7F50', // Coral
                textColor: '#FFFFFF',
                probability: 0.10,
                shortText: '5%\nDESCUENTO'
            }
        ];
        
        this.totalSlices = this.prizes.length;
        this.rotationAngle = 0;
        this.isSpinning = false;
        this.lastWinTime = 0;
        this.spinCooldown = 2000;
        this.highlightedSegment = -1;

        // Configuración de animación
        this.glowIntensity = 0;
        this.glowDirection = 1;
        this.animationFrame = null;

        // Configurar el tamaño del canvas
        this.canvas.width = 500;
        this.canvas.height = 500;

        document.fonts.ready.then(() => {
            this.draw();
            this.startGlowAnimation();
        });
    }

    draw() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = this.canvas.width / 2 - 40;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar el borde exterior con degradado
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#FFD700');
        gradient.addColorStop(1, '#FFA726');
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Dibujar los pines de tope
        const pinRadius = 6;
        for (let i = 0; i < this.totalSlices; i++) {
            const angle = (i * 2 * Math.PI / this.totalSlices) + this.rotationAngle;
            const pinX = centerX + (radius + 5) * Math.cos(angle);
            const pinY = centerY + (radius + 5) * Math.sin(angle);
            
            // Sombra del pin
            this.ctx.beginPath();
            this.ctx.arc(pinX, pinY, pinRadius + 2, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fill();
            
            // Pin principal
            this.ctx.beginPath();
            this.ctx.arc(pinX, pinY, pinRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fill();
            
            // Brillo del pin
            this.ctx.beginPath();
            this.ctx.arc(pinX - 1, pinY - 1, pinRadius/2, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
        }

        // Dibujar los segmentos de la ruleta con efecto 3D
        for (let i = 0; i < this.totalSlices; i++) {
            const startAngle = (i * 2 * Math.PI / this.totalSlices) + this.rotationAngle;
            const endAngle = ((i + 1) * 2 * Math.PI / this.totalSlices) + this.rotationAngle;

            // Efecto 3D del segmento
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            
            // Gradiente para efecto 3D
            const segmentGradient = this.ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius
            );
            const baseColor = this.prizes[i].color;
            const lighterColor = this.adjustColor(baseColor, 30);
            const darkerColor = this.adjustColor(baseColor, -30);
            
            segmentGradient.addColorStop(0, lighterColor);
            segmentGradient.addColorStop(0.5, baseColor);
            segmentGradient.addColorStop(1, darkerColor);
            
            this.ctx.fillStyle = segmentGradient;
            this.ctx.fill();
            
            // Borde del segmento
            this.ctx.strokeStyle = '#FFFFFF';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Texto mejorado
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + (Math.PI / this.totalSlices));
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = this.prizes[i].textColor;
            this.ctx.font = '700 20px "greycliff-cf"';
            this.ctx.letterSpacing = '-0.01em';
            
            // Sombra del texto
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            this.ctx.shadowBlur = 4;
            this.ctx.shadowOffsetX = 1;
            this.ctx.shadowOffsetY = 1;
            
            const lines = this.prizes[i].shortText.split('\n');
            lines.forEach((line, index) => {
                const yOffset = index * 24 - ((lines.length - 1) * 12);
                this.ctx.fillText(line, radius - 35, yOffset);
            });
            
            this.ctx.restore();
        }

        // Centro de la ruleta con efecto 3D
        const centerGradient = this.ctx.createRadialGradient(
            centerX - 10, centerY - 10, 5,
            centerX, centerY, 45
        );
        centerGradient.addColorStop(0, '#9B1C7D');
        centerGradient.addColorStop(1, '#841468');

        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 45, 0, 2 * Math.PI);
        this.ctx.fillStyle = centerGradient;
        this.ctx.fill();

        // Borde brillante del centro
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 45, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Texto "¡Gira y Gana!" con efecto
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '900 22px "greycliff-cf"';
        this.ctx.letterSpacing = '-0.02em';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 4;
        this.ctx.fillText('¡Gira y Gana!', centerX, centerY);
    }

    startGlowAnimation() {
        const animate = () => {
            this.glowIntensity += 0.05 * this.glowDirection;
            if (this.glowIntensity >= 1) {
                this.glowDirection = -1;
            } else if (this.glowIntensity <= 0) {
                this.glowDirection = 1;
            }
            this.draw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    stopGlowAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    generatePrizeCode() {
        const timestamp = Date.now();
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        
        // Generar 5 caracteres aleatorios
        for (let i = 0; i < 5; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Agregar timestamp codificado al final (últimos 3 caracteres del timestamp en base36)
        const timeCode = (timestamp % 100000).toString(36).padStart(3, '0').toUpperCase();
        
        // Insertar guiones para mejor legibilidad
        const formattedCode = code.slice(0, 3) + timeCode + code.slice(3);
        
        return {
            code: formattedCode,
            timestamp: timestamp,
            expiryTime: timestamp + (24 * 60 * 60 * 1000) // 24 horas
        };
    }

    spin() {
        return new Promise((resolve, reject) => {
            const now = Date.now();
            if (this.isSpinning) {
                reject(new Error('La ruleta ya está girando'));
                return;
            }
            if (now - this.lastWinTime < this.spinCooldown) {
                reject(new Error('Debes esperar un momento antes de volver a girar'));
                return;
            }

            this.isSpinning = true;
            this.lastWinTime = now;

            // Calcular el premio basado en las probabilidades
            const random = Math.random();
            let accumulatedProbability = 0;
            let selectedPrize;
            let selectedIndex = 0;

            for (let i = 0; i < this.prizes.length; i++) {
                accumulatedProbability += this.prizes[i].probability;
                if (random <= accumulatedProbability) {
                    selectedPrize = this.prizes[i];
                    selectedIndex = i;
                    break;
                }
            }

            // Calcular el ángulo final para que el premio quede en la parte superior
            const sliceAngle = (2 * Math.PI / this.totalSlices);
            const targetAngle = -(selectedIndex * sliceAngle);
            
            // Número de vueltas completas (entre 5 y 8)
            const spins = 5 + Math.random() * 3;
            const fullSpins = -(2 * Math.PI * spins);
            
            // El ángulo final debe incluir las vueltas completas más el ángulo objetivo
            const finalRotation = fullSpins + targetAngle;

            let startTime = null;
            const duration = 4000; // 4 segundos de giro
            const pinCount = this.totalSlices;
            const pinAngle = (2 * Math.PI) / pinCount;

            // Crear y mostrar la barra de progreso
            const progressBar = document.createElement('div');
            progressBar.className = 'spin-progress';
            document.querySelector('.wheel-container').appendChild(progressBar);

            // Sonido de los pines
            const pinSound = new Audio('/sounds/pin.mp3');
            pinSound.volume = 0.2;
            let lastPinIndex = -1;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Actualizar la barra de progreso
                progressBar.style.width = `${progress * 100}%`;

                // Función de easing personalizada con efecto de pines
                const easeOut = (t) => {
                    // Inicio rápido y desaceleración gradual
                    const baseEase = t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;

                    // Agregar efecto de pines en la desaceleración
                    if (t > 0.8) {
                        const currentAngle = finalRotation * baseEase;
                        const currentPinIndex = Math.floor(Math.abs(currentAngle) / pinAngle);
                        
                        // Reproducir sonido cuando pasa por un pin
                        if (currentPinIndex !== lastPinIndex) {
                            lastPinIndex = currentPinIndex;
                            pinSound.currentTime = 0;
                            pinSound.play();
                        }

                        // Agregar pequeña vibración al pasar por los pines
                        const vibration = Math.sin(currentAngle * pinCount) * (1 - t) * 0.02;
                        return baseEase + vibration;
                    }

                    return baseEase;
                };

                // Aplicar la rotación con el easing
                this.rotationAngle = finalRotation * easeOut(progress);
                this.draw();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Asegurarnos de que la ruleta se detenga exactamente en el ángulo correcto
                    this.rotationAngle = finalRotation;
                    this.draw();
                    this.isSpinning = false;
                    const prizeCode = this.generatePrizeCode();
                    
                    // Eliminar la barra de progreso
                    progressBar.remove();
                    
                    resolve({
                        name: selectedPrize.name,
                        description: selectedPrize.description,
                        code: prizeCode.code,
                        timestamp: prizeCode.timestamp,
                        expiryTime: prizeCode.expiryTime
                    });
                }
            };

            requestAnimationFrame(animate);
        });
    }

    shareOnWhatsApp(prize) {
        const expiryDate = new Date(prize.expiryTime).toLocaleString('es-AR', {
            dateStyle: 'short',
            timeStyle: 'short'
        });

        const emojis = {
            celebration: String.fromCodePoint(0x1F389),
            gift: String.fromCodePoint(0x1F381),
            ticket: String.fromCodePoint(0x1F3AB),
            clock: String.fromCodePoint(0x23F0),
            pin: String.fromCodePoint(0x1F4CD)
        };

        const message = 
            `${emojis.celebration} ¡Felicitaciones! Ganaste en PINTEMAS\n\n` +
            `${emojis.gift} Tu premio es:\n` +
            `${prize.name}\n` +
            `${prize.description}\n\n` +
            `${emojis.ticket} Tu código:\n` +
            `${prize.code}\n\n` +
            `${emojis.clock} Válido hasta:\n` +
            `${expiryDate}\n\n` +
            `${emojis.pin} Presentá este código en cualquier sucursal de PINTEMAS para reclamar tu premio`;

        window.open(`https://wa.me/5493547637630?text=${encodeURIComponent(message)}`);
    }
}