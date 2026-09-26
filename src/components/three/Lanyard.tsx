"use client";

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Text } from '@react-three/drei'
import { Physics, RigidBody, CuboidCollider, BallCollider, useRevoluteJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { Suspense } from 'react'

interface LanyardProps {
  className?: string;
  image?: string; // Optional custom image for the badge
}

export default function Lanyard({ className = "", image = "/images/portrait.jpg" }: LanyardProps) {
  // We'll wrap the 3D canvas in a Suspense-friendly wrapper and apply a fallback
  return (
    <div className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band image={image} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 10, image = "" }) {
  const band = useRef<THREE.Mesh>(null)
  const fixed = useRef<RapierRigidBody>(null)
  const j1 = useRef<RapierRigidBody>(null)
  const j2 = useRef<RapierRigidBody>(null)
  const j3 = useRef<RapierRigidBody>(null)
  const card = useRef<RapierRigidBody>(null)
  
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  
  // Create segment data for the string curve
  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 2,
    linearDamping: 2
  }

  // Load a texture for the card if provided. 
  // Using useTexture directly might throw if not wrapped in Suspense, but Next dynamic handles it if SSR=false or we use a fallback. 
  // For safety without suspending the whole layout, we'll create a fallback material.
  
  // String material
  const material = new THREE.MeshStandardMaterial({ color: '#FF4D00', roughness: 1, metalness: 0 })
  
  // Joints connecting the invisible physics bodies to form a string
  useSphericalJoint(fixed, j1, [
    [-0.5, 0, 0],
    [0.5, 0, 0]
  ])
  useSphericalJoint(j1, j2, [
    [-0.5, 0, 0],
    [0.5, 0, 0]
  ])
  useSphericalJoint(j2, j3, [
    [-0.5, 0, 0],
    [0.5, 0, 0]
  ])
  
  // The joint connecting the string to the card
  useRevoluteJoint(j3, card, [
    [0, 0, 0],
    [0, 1.2, 0],
    [0, 0, 1]
  ])

  // Mouse interaction
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  
  useEffect(() => {
    if (dragged) {
      document.body.style.cursor = 'grabbing'
    } else {
      document.body.style.cursor = 'auto'
    }
  }, [dragged])

  // Curve to visually draw the string
  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ]))

  useFrame((state, delta) => {
    if (dragged && card.current) {
      // Mouse dragging physics
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      
      card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    
    // Update the visual string based on physics bodies
    if (fixed.current && j1.current && j2.current && j3.current && band.current) {
      const p0 = fixed.current.translation()
      const p1 = j1.current.translation()
      const p2 = j2.current.translation()
      const p3 = j3.current.translation()
      
      curve.points[0].copy(p0)
      curve.points[1].copy(p1)
      curve.points[2].copy(p2)
      curve.points[3].copy(p3)
      
      // Update the tube geometry
      const geom = band.current.geometry as THREE.TubeGeometry
      geom.copy(new THREE.TubeGeometry(curve, 24, 0.05, 8, false))
    }
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        {/* Invisible physics bodies for the string */}
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        {/* The visual string */}
        <mesh ref={band} material={material}>
          <tubeGeometry args={[curve, 24, 0.05, 8, false]} />
        </mesh>
        
        {/* The Card */}
        <RigidBody 
          position={[0, 0, 0]} 
          ref={card} 
          {...segmentProps} 
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.1, 0.05]} />
          <group
            onPointerDown={(e) => {
              e.stopPropagation()
              e.target.setPointerCapture(e.pointerId)
              if (card.current) {
                const pos = card.current.translation()
                drag(new THREE.Vector3(pos.x, pos.y, pos.z).sub(e.point))
              }
            }}
            onPointerUp={(e) => {
              e.stopPropagation()
              e.target.releasePointerCapture(e.pointerId)
              drag(false)
            }}
          >
            {/* ID Card Graphic */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.6, 2.2, 0.05]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
            </mesh>
            
            <mesh position={[0, 0, 0.026]}>
              <planeGeometry args={[1.5, 2.1]} />
              <meshStandardMaterial color="#080808" roughness={0.9} />
            </mesh>
            
            {/* Text on Card */}
            <Center position={[0, 0.7, 0.027]}>
              <Text fontSize={0.12} color="#FF4D00" letterSpacing={0.1} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf">
                FANDI PUTRA
              </Text>
            </Center>
            
            <Center position={[0, 0.5, 0.027]}>
              <Text fontSize={0.07} color="#aaaaaa" letterSpacing={0.05} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf">
                CREATIVE DESIGNER
              </Text>
            </Center>

            {/* FPA Logo Graphic */}
            <Center position={[0, -0.2, 0.03]}>
              <group>
                <mesh>
                  <circleGeometry args={[0.4, 32]} />
                  <meshStandardMaterial color="#FF4D00" />
                </mesh>
                <Text fontSize={0.25} color="#080808" position={[0, 0, 0.01]} font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwJp-g.ttf">
                  FPA
                </Text>
              </group>
            </Center>

            {/* Fake barcode */}
            <mesh position={[0, -0.85, 0.027]}>
              <planeGeometry args={[1.2, 0.1]} />
              <meshStandardMaterial color="#ffffff" map={createBarcodeTexture()} />
            </mesh>
            
            {/* Top hole */}
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} rotation={[Math.PI/2, 0, 0]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
            </mesh>
          </group>
        </RigidBody>
      </group>
    </>
  )
}

// Utility to create a procedural barcode texture
function createBarcodeTexture() {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 32);
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 256; i += Math.random() * 4 + 2) {
      const width = Math.random() * 4 + 1;
      ctx.fillRect(i, 0, width, 32);
      i += width;
    }
  }
  return new THREE.CanvasTexture(canvas);
}
