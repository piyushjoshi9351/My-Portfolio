'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Robot3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Enhanced Lighting - Multi-layered for depth
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Purple light
    const purpleLight = new THREE.PointLight(0x7c3aed, 1.5);
    purpleLight.position.set(8, 8, 8);
    purpleLight.castShadow = true;
    scene.add(purpleLight);

    // Cyan light
    const cyanLight = new THREE.PointLight(0x06b6d4, 1.5);
    cyanLight.position.set(-8, -8, 8);
    cyanLight.castShadow = true;
    scene.add(cyanLight);

    // Green accent light
    const greenLight = new THREE.PointLight(0x10b981, 0.8);
    greenLight.position.set(0, 0, 10);
    scene.add(greenLight);

    // Create Robot
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Body (main cube) - Premium material
    const bodyGeometry = new THREE.BoxGeometry(1.2, 1.5, 0.6);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.5,
      wireframe: false,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    robotGroup.add(body);

    // Head - Sleeker design
    const headGeometry = new THREE.BoxGeometry(0.8, 0.9, 0.5);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0e27,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.3;
    head.castShadow = true;
    robotGroup.add(head);

    // Eyes - Glowing orbs
    const eyeGeometry = new THREE.SphereGeometry(0.18, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      metalness: 0.6,
      roughness: 0.1,
      emissive: 0x00ff88,
      emissiveIntensity: 1.2,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.2, 1.5, 0.35);
    leftEye.castShadow = true;
    robotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.2, 1.5, 0.35);
    rightEye.castShadow = true;
    robotGroup.add(rightEye);

    // Eye glow effect - larger spheres
    const eyeGlowGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3,
    });
    const leftEyeGlow = new THREE.Mesh(eyeGlowGeometry, eyeGlowMaterial);
    leftEyeGlow.position.set(-0.2, 1.5, 0.35);
    robotGroup.add(leftEyeGlow);

    const rightEyeGlow = new THREE.Mesh(eyeGlowGeometry, eyeGlowMaterial);
    rightEyeGlow.position.set(0.2, 1.5, 0.35);
    robotGroup.add(rightEyeGlow);

    // Left Arm
    const armGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const armMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1f3a,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.3,
    });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.8, 0.5, 0);
    leftArm.castShadow = true;
    robotGroup.add(leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.8, 0.5, 0);
    rightArm.castShadow = true;
    robotGroup.add(rightArm);

    // Left Leg
    const legGeometry = new THREE.BoxGeometry(0.25, 0.8, 0.25);
    const legMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.2,
    });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.3, -1, 0);
    leftLeg.castShadow = true;
    robotGroup.add(leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.3, -1, 0);
    rightLeg.castShadow = true;
    robotGroup.add(rightLeg);

    // Chest detail - Premium glowing core
    const chestGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.2);
    const chestMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.7,
      roughness: 0.1,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.8,
    });
    const chest = new THREE.Mesh(chestGeometry, chestMaterial);
    chest.position.set(0, 0.2, 0.35);
    chest.castShadow = true;
    robotGroup.add(chest);

    // Aura around robot - glowing ring
    const auraGeometry = new THREE.TorusGeometry(2.2, 0.1, 16, 100);
    const auraMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.3,
    });
    const aura = new THREE.Mesh(auraGeometry, auraMaterial);
    aura.rotation.x = Math.PI / 4;
    robotGroup.add(aura);

    // Particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleVertices = new Float32Array(300); // 100 particles * 3 (x,y,z)
    
    for (let i = 0; i < 300; i += 3) {
      particleVertices[i] = (Math.random() - 0.5) * 8;
      particleVertices[i + 1] = (Math.random() - 0.5) * 8;
      particleVertices[i + 2] = (Math.random() - 0.5) * 8;
    }
    
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particleVertices, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x7c3aed,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    robotGroup.add(particles);
    particlesRef.current = particles;

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      // Robot rotation based on mouse
      robotGroup.rotation.y += (mouseRef.current.x * 2 - robotGroup.rotation.y) * 0.05;
      robotGroup.rotation.x += (mouseRef.current.y * 2 - robotGroup.rotation.x) * 0.05;

      // Floating animation with better easing
      robotGroup.position.y = Math.sin(time * 0.5) * 0.4;

      // Arm swing with more personality
      leftArm.rotation.z = Math.sin(time * 1.5) * 0.6 + 0.4;
      rightArm.rotation.z = Math.sin(time * 1.5 + Math.PI) * 0.6 - 0.4;
      leftArm.rotation.x = Math.sin(time * 0.8) * 0.2;
      rightArm.rotation.x = Math.sin(time * 0.8 + Math.PI) * 0.2;

      // Leg movement
      leftLeg.rotation.x = Math.sin(time * 1.5) * 0.35;
      rightLeg.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.35;

      // Head tilt and rotation
      head.rotation.x = Math.sin(time * 0.8) * 0.25;
      head.rotation.z = Math.sin(time * 0.6) * 0.2;
      head.rotation.y = Math.sin(time * 0.4) * 0.15;

      // Eyes glow pulse
      leftEye.material.emissiveIntensity = 1 + Math.sin(time * 2.5) * 0.4;
      rightEye.material.emissiveIntensity = 1 + Math.sin(time * 2.5 + 0.5) * 0.4;
      leftEyeGlow.material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
      rightEyeGlow.material.opacity = 0.3 + Math.sin(time * 2 + 0.5) * 0.2;

      // Chest pulse
      chest.material.emissiveIntensity = 0.8 + Math.sin(time * 1.8) * 0.3;

      // Aura rotation
      aura.rotation.z += 0.001;
      aura.material.opacity = 0.3 + Math.sin(time * 1.5) * 0.2;

      // Particle animation
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
        
        const positions = particlesRef.current.geometry.attributes.position
          .array as Float32Array;
        for (let i = 0; i < 300; i += 3) {
          positions[i + 1] += Math.sin(time + i) * 0.01;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: '400px' }}
    />
  );
}
