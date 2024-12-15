import { Canvas } from '@nativescript/core';

export function drawWheel(canvas: Canvas, segments: number, colors: string[]): void {
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw segments
  const anglePerSegment = (2 * Math.PI) / segments;
  for (let i = 0; i < segments; i++) {
    const startAngle = i * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.stroke();
  }
  
  // Draw center circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.stroke();
}