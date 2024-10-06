function renderDonut() {
    const asciiContainer = document.getElementById('ascii-art');
    
    let A = 0;
    let B = 0;
    const K2 = 5;
    const K3 = 240;  
    const K4 = 90;  
    const R1 = 1.5;
    const R2 = 2.5;
  
    const luminanceChars = '.,-~:;=!*#$@';
      
    function renderFrame() {
      let screen = Array(K3 * K3).fill(' ');
      let zBuffer = Array(K3 * K3).fill(0);
      
      for (let theta = 0; theta < Math.PI * 2; theta += 0.06) { 
        for (let phi = 0; phi < Math.PI * 2; phi += 0.02) { 
          const cosTheta = Math.cos(theta);
          const sinTheta = Math.sin(theta);
          const cosPhi = Math.cos(phi);
          const sinPhi = Math.sin(phi);
          
          const circleX = R2 + R1 * cosTheta;
          const circleY = R1 * sinTheta;
  
          const x = circleX * (Math.cos(B) * cosPhi + Math.sin(A) * Math.sin(B) * sinPhi) - circleY * Math.cos(A) * Math.sin(B);
          const y = circleX * (Math.sin(B) * cosPhi - Math.sin(A) * Math.cos(B) * sinPhi) + circleY * Math.cos(A) * Math.cos(B);
          const z = K2 + Math.cos(A) * circleX * sinPhi + circleY * Math.sin(A);
  
          const ooz = 1 / z;
          const xp = Math.floor(K3 / 2 + K4 * ooz * x);
          const yp = Math.floor(K3 / 2 - K4 * ooz * y);
          
          if (xp < 0 || xp >= K3 || yp < 0 || yp >= K3) continue;
          
          const idx = xp + yp * K3;
          const L = cosPhi * cosTheta * Math.sin(B) - Math.cos(A) * cosTheta * sinPhi -
                    Math.sin(A) * sinTheta + Math.cos(B) * (Math.cos(A) * sinTheta - cosTheta * Math.sin(A) * sinPhi);
  
          if (L > 0 && ooz > zBuffer[idx]) {
            zBuffer[idx] = ooz;
            const luminance = Math.floor(L * 8);
            const clampedLuminance = Math.max(0, Math.min(luminance, luminanceChars.length - 1));
            screen[idx] = luminanceChars[clampedLuminance];
          }
        }
      }
  
      asciiContainer.innerHTML = screen.reduce((acc, char, i) => {
        acc += char;
        if ((i + 1) % K3 === 0) acc += '\n';
        return acc;
      }, '');
      
      A += 0.04;
      B += 0.02;
      requestAnimationFrame(renderFrame);
    }
  
    renderFrame();
  }
  
renderDonut();
