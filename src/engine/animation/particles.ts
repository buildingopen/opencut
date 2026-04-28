/**
 * Particle system utilities.
 */

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  delay: number;
}

/** Generate a seeded array of particles for reproducible motion. */
export function generateParticles(count: number, seed: number = 42): Particle[] {
  const particles: Particle[] = [];
  const random = (i: number) => {
    const x = Math.sin(seed + i * 9999) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: random(i * 1) * 100,
      y: random(i * 2) * 100,
      vx: (random(i * 3) - 0.5) * 0.015,
      vy: (random(i * 4) - 0.5) * 0.015,
      size: 0.3 + random(i * 5) * 1.2,
      opacity: 0.15 + random(i * 6) * 0.25,
      delay: random(i * 7) * 30,
    });
  }
  return particles;
}

/** Update a particle's position for a given frame. */
export function updateParticlePosition(
  particle: Particle,
  frame: number,
  bounds: { width: number; height: number } = { width: 100, height: 100 }
): { x: number; y: number } {
  const t = frame * 0.5;
  let x = particle.x + particle.vx * t;
  let y = particle.y + particle.vy * t;

  x = ((x % bounds.width) + bounds.width) % bounds.width;
  y = ((y % bounds.height) + bounds.height) % bounds.height;

  x += Math.sin(frame * 0.02 + particle.id) * 0.5;
  y += Math.cos(frame * 0.015 + particle.id * 0.7) * 0.3;

  return { x, y };
}
