import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface AboutScrollAnimationProps {
  opacity?: number;
}

export const AboutScrollAnimation: React.FC<AboutScrollAnimationProps> = ({ opacity = 0.7 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js animation handles
  const sceneState = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    worldGroup?: THREE.Group;
    printerGroup?: THREE.Group;
    printHead?: THREE.Group;
    spool1?: THREE.Group;
    spool2?: THREE.Group;
    robotArm?: THREE.Group;
    armForearm?: THREE.Group;
    conveyorRollers: THREE.Mesh[];
    conveyorBoxes: THREE.Group[];
    truckGroup?: THREE.Group;
    truckWheels: THREE.Mesh[];
    floatingCadMesh?: THREE.Group;
    floatingGifts: THREE.Group[];
    laserLine?: THREE.Line;
    animationFrameId?: number;
    scrollProgress: { current: number; target: number };
    mouse: { x: number; y: number; targetX: number; targetY: number };
  }>({
    conveyorRollers: [],
    conveyorBoxes: [],
    truckWheels: [],
    floatingGifts: [],
    scrollProgress: { current: 0.1, target: 0.1 },
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Isometric Camera Setup (Signature Sendoso Dribbble angle)
    const scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    // Isometric diagonal elevated vantage point
    camera.position.set(-14, 22, 28);
    camera.lookAt(-14, 4, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Tactile Studio Lighting (Warm, soft clay shadows)
    const ambientLight = new THREE.AmbientLight(0xfff7ea, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(24, 42, 30);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const warmRim = new THREE.DirectionalLight(0xffc43c, 1.6);
    warmRim.position.set(-30, 15, -20);
    scene.add(warmRim);

    const softFill = new THREE.DirectionalLight(0xff8a00, 1.1);
    softFill.position.set(0, -10, 20);
    scene.add(softFill);

    // 3. World Group & Floating Isometric Factory Base
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Main Extended Studio Platform (Warm cream / slate diorama slab)
    const platformLength = 52;
    const platformWidth = 18;
    const platformGeo = new THREE.BoxGeometry(platformLength, 1.4, platformWidth);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f23, // Matte dark slate base
      roughness: 0.6,
      metalness: 0.15,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(2, -0.7, 0);
    platform.receiveShadow = true;
    worldGroup.add(platform);

    // Top Workplate Surface (Warm off-white studio linoleum with gold bevel border)
    const topPlateGeo = new THREE.BoxGeometry(platformLength - 0.8, 0.1, platformWidth - 0.8);
    const topPlateMat = new THREE.MeshStandardMaterial({
      color: 0xfff9ed, // Brand warm cream linoleum
      roughness: 0.35,
      metalness: 0.05,
    });
    const topPlate = new THREE.Mesh(topPlateGeo, topPlateMat);
    topPlate.position.set(2, 0.05, 0);
    topPlate.receiveShadow = true;
    worldGroup.add(topPlate);

    // Factory Floor Guide Grid Lines (Amber laser-etched lines)
    const floorGrid = new THREE.GridHelper(48, 24, 0xff8a00, 0xe5e5e5);
    floorGrid.position.set(2, 0.11, 0);
    worldGroup.add(floorGrid);

    // Studio Contact Soft Shadow Plane under platform
    const shadowGeo = new THREE.PlaneGeometry(platformLength + 12, platformWidth + 10);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.41;
    shadowMesh.receiveShadow = true;
    worldGroup.add(shadowMesh);

    // -------------------------------------------------------------
    // ZONE 1: THE IDEA & DIGITAL CAD LAB (Left side: x ≈ -18 to -12)
    // -------------------------------------------------------------
    const zone1Group = new THREE.Group();
    zone1Group.position.set(-17, 0, 0);

    // A. Holographic CAD Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(2.4, 2.8, 2.2, 32);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.2,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, 1.1, 0);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    zone1Group.add(pedestal);

    // Holographic Glowing Ring on pedestal
    const holoRingGeo = new THREE.TorusGeometry(2.1, 0.08, 16, 48);
    const holoRingMat = new THREE.MeshBasicMaterial({ color: 0xff8a00 });
    const holoRing = new THREE.Mesh(holoRingGeo, holoRingMat);
    holoRing.rotation.x = Math.PI / 2;
    holoRing.position.set(0, 2.25, 0);
    zone1Group.add(holoRing);

    // Floating Geometric CAD Idea (Icosahedron / Crystal)
    const floatingCadGroup = new THREE.Group();
    floatingCadGroup.position.set(0, 4.4, 0);

    const cadCoreGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const cadCoreMat = new THREE.MeshStandardMaterial({
      color: 0xffc43c,
      roughness: 0.15,
      metalness: 0.4,
      emissive: 0xff8a00,
      emissiveIntensity: 0.25,
    });
    const cadCore = new THREE.Mesh(cadCoreGeo, cadCoreMat);
    floatingCadGroup.add(cadCore);

    const cadWireGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.85, 1));
    const cadWireMat = new THREE.LineBasicMaterial({ color: 0xff8a00, linewidth: 2 });
    const cadWire = new THREE.LineSegments(cadWireGeo, cadWireMat);
    floatingCadGroup.add(cadWire);

    zone1Group.add(floatingCadGroup);

    // Filament Spool Rack (Dual Spools: 1 Amber, 1 White)
    const spoolRackGroup = new THREE.Group();
    spoolRackGroup.position.set(0, 0, -5.2);

    const rackPostGeo = new THREE.CylinderGeometry(0.18, 0.18, 5.5, 16);
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x171717, metalness: 0.8 });
    const rackPost = new THREE.Mesh(rackPostGeo, rackMat);
    rackPost.position.set(0, 2.75, 0);
    spoolRackGroup.add(rackPost);

    const rackBarGeo = new THREE.CylinderGeometry(0.15, 0.15, 4.2, 16);
    rackBarGeo.rotateZ(Math.PI / 2);
    const rackBar = new THREE.Mesh(rackBarGeo, rackMat);
    rackBar.position.set(0, 4.8, 0);
    spoolRackGroup.add(rackBar);

    // Spool 1 (Amber PLA+)
    const createSpool = (filamentColor: number) => {
      const g = new THREE.Group();
      const flangeGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
      flangeGeo.rotateZ(Math.PI / 2);
      const flangeMat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.4,
        metalness: 0.3,
      });

      const leftFlange = new THREE.Mesh(flangeGeo, flangeMat);
      leftFlange.position.x = -0.55;
      const rightFlange = new THREE.Mesh(flangeGeo, flangeMat);
      rightFlange.position.x = 0.55;
      g.add(leftFlange, rightFlange);

      const woundGeo = new THREE.CylinderGeometry(1.3, 1.3, 1.0, 32);
      woundGeo.rotateZ(Math.PI / 2);
      const woundMat = new THREE.MeshStandardMaterial({
        color: filamentColor,
        roughness: 0.3,
        metalness: 0.1,
      });
      const woundFilament = new THREE.Mesh(woundGeo, woundMat);
      g.add(woundFilament);
      return g;
    };

    const spool1 = createSpool(0xff8a00);
    spool1.position.set(-1.2, 4.8, 0);
    spoolRackGroup.add(spool1);

    const spool2 = createSpool(0xffffff);
    spool2.position.set(1.2, 4.8, 0);
    spoolRackGroup.add(spool2);

    zone1Group.add(spoolRackGroup);
    worldGroup.add(zone1Group);

    // -------------------------------------------------------------------
    // ZONE 2: 3D PRINTER CLUSTER (Center-Left: x ≈ -7 to -2)
    // -------------------------------------------------------------------
    const printerGroup = new THREE.Group();
    printerGroup.position.set(-6.5, 0, 0);

    // Outer Enclosure (Matte dark ceramic body with rounded corner aesthetic)
    const enclosureWidth = 6.2;
    const enclosureHeight = 7.4;
    const enclosureDepth = 6.0;

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.4,
      metalness: 0.3,
    });

    // Printer Base
    const baseGeo = new THREE.BoxGeometry(enclosureWidth, 1.2, enclosureDepth);
    const printerBase = new THREE.Mesh(baseGeo, frameMat);
    printerBase.position.set(0, 0.6, 0);
    printerBase.castShadow = true;
    printerGroup.add(printerBase);

    // Top Cap
    const topCap = new THREE.Mesh(
      new THREE.BoxGeometry(enclosureWidth, 0.8, enclosureDepth),
      frameMat
    );
    topCap.position.set(0, enclosureHeight - 0.4, 0);
    printerGroup.add(topCap);

    // 4 Corner Pillars
    const pillarGeo = new THREE.BoxGeometry(0.5, enclosureHeight - 2.0, 0.5);
    const pillarPositions = [
      [-enclosureWidth / 2 + 0.35, (enclosureHeight - 2.0) / 2 + 1.2, -enclosureDepth / 2 + 0.35],
      [enclosureWidth / 2 - 0.35, (enclosureHeight - 2.0) / 2 + 1.2, -enclosureDepth / 2 + 0.35],
      [-enclosureWidth / 2 + 0.35, (enclosureHeight - 2.0) / 2 + 1.2, enclosureDepth / 2 - 0.35],
      [enclosureWidth / 2 - 0.35, (enclosureHeight - 2.0) / 2 + 1.2, enclosureDepth / 2 - 0.35],
    ];
    pillarPositions.forEach(([px, py, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, frameMat);
      pillar.position.set(px, py, pz);
      printerGroup.add(pillar);
    });

    // Transparent Glass Door (Front & Sides)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.28,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
    });
    const frontGlass = new THREE.Mesh(
      new THREE.BoxGeometry(enclosureWidth - 0.8, enclosureHeight - 2.0, 0.08),
      glassMat
    );
    frontGlass.position.set(0, (enclosureHeight - 2.0) / 2 + 1.2, enclosureDepth / 2 - 0.2);
    printerGroup.add(frontGlass);

    // Internal Heated Print Bed
    const bedGeo = new THREE.BoxGeometry(4.4, 0.3, 4.4);
    const bedMat = new THREE.MeshStandardMaterial({
      color: 0xffc43c,
      roughness: 0.4,
      metalness: 0.5,
    });
    const heatedBed = new THREE.Mesh(bedGeo, bedMat);
    heatedBed.position.set(0, 2.4, 0);
    heatedBed.receiveShadow = true;
    printerGroup.add(heatedBed);

    // In-Progress 3D Printed Object on the bed (Spiral faceted vase)
    const inProgressVaseGeo = new THREE.CylinderGeometry(0.9, 1.4, 2.0, 16);
    const vaseMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
    });
    const inProgressVase = new THREE.Mesh(inProgressVaseGeo, vaseMat);
    inProgressVase.position.set(0, 3.55, 0);
    inProgressVase.castShadow = true;
    printerGroup.add(inProgressVase);

    // CoreXY Moving Linear Rods & Print Head Toolhead
    const gantryGroup = new THREE.Group();
    gantryGroup.position.set(0, 4.9, 0);

    const rodGeo = new THREE.CylinderGeometry(0.08, 0.08, enclosureWidth - 1.2, 16);
    rodGeo.rotateZ(Math.PI / 2);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9 });
    const xRod1 = new THREE.Mesh(rodGeo, rodMat);
    xRod1.position.z = -0.6;
    const xRod2 = new THREE.Mesh(rodGeo, rodMat);
    xRod2.position.z = 0.6;
    gantryGroup.add(xRod1, xRod2);

    // The Print Head (Toolhead with hotend nozzle + LED status)
    const printHead = new THREE.Group();

    const toolheadBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.1, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xd9381e, roughness: 0.3 })
    );
    printHead.add(toolheadBody);

    const brassNozzle = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 0.6, 16),
      new THREE.MeshStandardMaterial({
        color: 0xffb800,
        metalness: 0.9,
        emissive: 0xff5500,
        emissiveIntensity: 0.7,
      })
    );
    brassNozzle.rotation.x = Math.PI;
    brassNozzle.position.y = -0.7;
    printHead.add(brassNozzle);

    // Glowing Chamber LED Light
    const internalLight = new THREE.PointLight(0xff8a00, 3.5, 8);
    internalLight.position.set(0, -0.6, 0);
    printHead.add(internalLight);

    gantryGroup.add(printHead);
    printerGroup.add(gantryGroup);

    // Small AristroCraft LCD Display Screen on Printer Base
    const screenGeo = new THREE.BoxGeometry(1.6, 1.0, 0.1);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(enclosureWidth / 2 - 1.3, 0.7, enclosureDepth / 2 + 0.02);
    printerGroup.add(screen);

    worldGroup.add(printerGroup);

    // -------------------------------------------------------------------------
    // ZONE 3: ROBOTIC ARM & AUTOMATED CONVEYOR SYSTEM (Center to Right: x ≈ 0 to 14)
    // -------------------------------------------------------------------------
    const zone3Group = new THREE.Group();

    // A. Articulated Robotic Transfer Arm (Mounted between printer and conveyor)
    const robotArmGroup = new THREE.Group();
    robotArmGroup.position.set(-1.8, 0, -2.5);

    // Robot Turntable Base
    const robotBase = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.4, 0.8, 32),
      new THREE.MeshStandardMaterial({ color: 0x171717, metalness: 0.7 })
    );
    robotBase.position.y = 0.4;
    robotArmGroup.add(robotBase);

    // Lower Arm Link
    const lowerArm = new THREE.Group();
    lowerArm.position.set(0, 0.8, 0);

    const shoulderJoint = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xff8a00, metalness: 0.5 })
    );
    lowerArm.add(shoulderJoint);

    const bicepSegment = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 2.8, 0.6),
      new THREE.MeshStandardMaterial({ color: 0xffc43c, roughness: 0.3 })
    );
    bicepSegment.position.set(0, 1.4, 0);
    lowerArm.add(bicepSegment);

    // Forearm & Gripper
    const armForearm = new THREE.Group();
    armForearm.position.set(0, 2.8, 0);

    const elbowJoint = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x171717 })
    );
    armForearm.add(elbowJoint);

    const forearmSegment = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 2.4, 0.48),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 })
    );
    forearmSegment.position.set(0, 1.2, 0);
    armForearm.add(forearmSegment);

    // Gripper Vacuum Pad
    const gripperHand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.4, 0.4, 16),
      new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.4 })
    );
    gripperHand.position.set(0, 2.5, 0);
    armForearm.add(gripperHand);

    lowerArm.add(armForearm);
    robotArmGroup.add(lowerArm);
    zone3Group.add(robotArmGroup);

    // B. Industrial Motorized Conveyor Belt Line (Extends from x = 1 to x = 16)
    const conveyorLength = 16;
    const conveyorWidth = 3.8;
    const conveyorHeight = 1.4;
    const conveyorGroup = new THREE.Group();
    conveyorGroup.position.set(8.5, 0, 0);

    // Side Rails
    const railGeo = new THREE.BoxGeometry(conveyorLength, 0.5, 0.3);
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x171717,
      metalness: 0.8,
      roughness: 0.3,
    });
    const frontRail = new THREE.Mesh(railGeo, railMat);
    frontRail.position.set(0, conveyorHeight, conveyorWidth / 2);
    const backRail = new THREE.Mesh(railGeo, railMat);
    backRail.position.set(0, conveyorHeight, -conveyorWidth / 2);
    conveyorGroup.add(frontRail, backRail);

    // Conveyor Legs
    const legGeo = new THREE.CylinderGeometry(0.2, 0.2, conveyorHeight, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6 });
    [-6.5, -2, 2.5, 7].forEach((lx) => {
      const leg1 = new THREE.Mesh(legGeo, legMat);
      leg1.position.set(lx, conveyorHeight / 2, conveyorWidth / 2 - 0.2);
      const leg2 = new THREE.Mesh(legGeo, legMat);
      leg2.position.set(lx, conveyorHeight / 2, -conveyorWidth / 2 + 0.2);
      conveyorGroup.add(leg1, leg2);
    });

    // Conveyor Belt Bed Surface
    const beltBed = new THREE.Mesh(
      new THREE.BoxGeometry(conveyorLength, 0.15, conveyorWidth - 0.5),
      new THREE.MeshStandardMaterial({
        color: 0x2b2b2b,
        roughness: 0.8,
      })
    );
    beltBed.position.set(0, conveyorHeight - 0.05, 0);
    conveyorGroup.add(beltBed);

    // 16 Rotating Rollers
    const rollers: THREE.Mesh[] = [];
    const rollerGeo = new THREE.CylinderGeometry(0.18, 0.18, conveyorWidth - 0.4, 16);
    rollerGeo.rotateX(Math.PI / 2);
    const rollerMat = new THREE.MeshStandardMaterial({
      color: 0xdddddd,
      metalness: 0.85,
      roughness: 0.2,
    });

    for (let i = 0; i < 15; i++) {
      const roller = new THREE.Mesh(rollerGeo, rollerMat);
      roller.position.set(-conveyorLength / 2 + 0.6 + i * 1.05, conveyorHeight + 0.04, 0);
      conveyorGroup.add(roller);
      rollers.push(roller);
    }

    // QA Inspection Optical Scanning Arch
    const archGroup = new THREE.Group();
    archGroup.position.set(-1, conveyorHeight, 0);

    const archFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 3.4, conveyorWidth + 0.4),
      new THREE.MeshStandardMaterial({ color: 0xff8a00, roughness: 0.3 })
    );
    archFrame.position.y = 1.7;
    archGroup.add(archFrame);

    // Hollow cutout for packages to pass through
    const archInnerHole = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 2.6, conveyorWidth - 0.6),
      new THREE.MeshStandardMaterial({ color: 0x171717 })
    );
    archInnerHole.position.y = 1.3;
    archGroup.add(archInnerHole);

    // Pulsing Laser Scan Beam
    const scanLaserGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 2.6, -conveyorWidth / 2 + 0.4),
      new THREE.Vector3(0, 0.2, conveyorWidth / 2 - 0.4),
    ]);
    const scanLaserMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 3 });
    const scanLaser = new THREE.Line(scanLaserGeo, scanLaserMat);
    archGroup.add(scanLaser);

    conveyorGroup.add(archGroup);

    // Moving AristroCraft Branded Parcel Boxes
    const conveyorBoxes: THREE.Group[] = [];
    const boxColors = [0xfff9ed, 0xffc43c, 0xffffff, 0xff8a00];

    for (let i = 0; i < 4; i++) {
      const boxGroup = new THREE.Group();
      const bSize = 1.4;

      // Cardboard package
      const boxMesh = new THREE.Mesh(
        new THREE.BoxGeometry(bSize, bSize * 0.9, bSize * 1.1),
        new THREE.MeshStandardMaterial({
          color: boxColors[i % boxColors.length],
          roughness: 0.45,
        })
      );
      boxMesh.castShadow = true;
      boxGroup.add(boxMesh);

      // Contrast Sealing Tape (Sendoso Style)
      const tapeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(bSize + 0.02, bSize * 0.9 + 0.02, 0.35),
        new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.3 })
      );
      boxGroup.add(tapeMesh);

      // White Shipping Label
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.35),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      label.position.set(0.2, bSize * 0.45 + 0.01, 0);
      label.rotation.x = -Math.PI / 2;
      boxGroup.add(label);

      boxGroup.position.set(-conveyorLength / 2 + 2 + i * 3.8, conveyorHeight + 0.75, 0);
      conveyorGroup.add(boxGroup);
      conveyorBoxes.push(boxGroup);
    }

    zone3Group.add(conveyorGroup);
    worldGroup.add(zone3Group);

    // ----------------------------------------------------------------------
    // ZONE 4: ARISTROCRAFT COURIER TRUCK & DISPATCH (Right side: x ≈ 18 to 26)
    // ----------------------------------------------------------------------
    const truckGroup = new THREE.Group();
    truckGroup.position.set(20.5, 0, 0);

    // Truck Chassis Frame
    const chassisGeo = new THREE.BoxGeometry(7.2, 0.6, 3.8);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x171717, metalness: 0.5 });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.set(0, 1.1, 0);
    chassis.castShadow = true;
    truckGroup.add(chassis);

    // Truck Driver Cabin (Front: x > 0)
    const cabGeo = new THREE.BoxGeometry(2.4, 2.8, 3.6);
    const cabMat = new THREE.MeshStandardMaterial({
      color: 0xffc43c, // Cheerful Sendoso mustard yellow
      roughness: 0.25,
      metalness: 0.1,
    });
    const cabin = new THREE.Mesh(cabGeo, cabMat);
    cabin.position.set(2.4, 2.7, 0);
    cabin.castShadow = true;
    truckGroup.add(cabin);

    // Curved Tinted Windshield
    const windshieldGeo = new THREE.BoxGeometry(0.1, 1.2, 3.2);
    const windshieldMat = new THREE.MeshStandardMaterial({
      color: 0x1f2421,
      roughness: 0.1,
      metalness: 0.8,
    });
    const windshield = new THREE.Mesh(windshieldGeo, windshieldMat);
    windshield.position.set(3.62, 2.9, 0);
    truckGroup.add(windshield);

    // Dual Headlights
    const headlightGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
    headlightGeo.rotateZ(Math.PI / 2);
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftLight = new THREE.Mesh(headlightGeo, headlightMat);
    leftLight.position.set(3.62, 1.8, 1.1);
    const rightLight = new THREE.Mesh(headlightGeo, headlightMat);
    rightLight.position.set(3.62, 1.8, -1.1);
    truckGroup.add(leftLight, rightLight);

    // Rear Cargo Container Box (White with AristroCraft Orange Stripe)
    const cargoGeo = new THREE.BoxGeometry(4.6, 3.4, 3.6);
    const cargoMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
    });
    const cargoBox = new THREE.Mesh(cargoGeo, cargoMat);
    cargoBox.position.set(-1.1, 3.0, 0);
    cargoBox.castShadow = true;
    truckGroup.add(cargoBox);

    // Orange Signature Stripe along the cargo box
    const stripeGeo = new THREE.BoxGeometry(4.62, 0.6, 3.62);
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xff8a00,
      roughness: 0.2,
    });
    const cargoStripe = new THREE.Mesh(stripeGeo, stripeMat);
    cargoStripe.position.set(-1.1, 3.0, 0);
    truckGroup.add(cargoStripe);

    // 4 Stylized Chunky Wheels with Rubber Tires
    const truckWheels: THREE.Mesh[] = [];
    const wheelPositions = [
      [2.2, 0.75, 1.95],
      [2.2, 0.75, -1.95],
      [-1.8, 0.75, 1.95],
      [-1.8, 0.75, -1.95],
    ];

    const tireGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.5, 24);
    tireGeo.rotateX(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });

    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(tireGeo, tireMat);
      wheel.position.set(wx, wy, wz);
      wheel.castShadow = true;
      truckGroup.add(wheel);
      truckWheels.push(wheel);
    });

    // Floating Delivery Map Pin above the truck
    const pinGroup = new THREE.Group();
    pinGroup.position.set(0, 6.4, 0);

    const pinHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xff8a00, emissive: 0xff3300, emissiveIntensity: 0.3 })
    );
    const pinCone = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 1.2, 24),
      new THREE.MeshStandardMaterial({ color: 0xff8a00 })
    );
    pinCone.rotation.x = Math.PI;
    pinCone.position.y = -0.6;
    pinGroup.add(pinHead, pinCone);
    truckGroup.add(pinGroup);

    worldGroup.add(truckGroup);

    // -------------------------------------------------------------
    // FLOATING 3D TOY PROPS & SPARKLES (The Dribbble aesthetic)
    // -------------------------------------------------------------
    const floatingGifts: THREE.Group[] = [];
    const propPositions = [
      [-18, 8, 4],
      [-10, 9, -5],
      [2, 8.5, 5],
      [12, 9, -4],
      [22, 10, 4],
    ];

    propPositions.forEach(([px, py, pz], idx) => {
      const propGroup = new THREE.Group();
      propGroup.position.set(px, py, pz);

      if (idx % 2 === 0) {
        // Floating mini parcel box
        const miniBox = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.9, 0.9),
          new THREE.MeshStandardMaterial({
            color: idx === 0 ? 0xffc43c : 0xff8a00,
            roughness: 0.3,
          })
        );
        propGroup.add(miniBox);
      } else {
        // Floating 3D geometric star / gem
        const star = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.7, 0),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.4,
            roughness: 0.2,
          })
        );
        propGroup.add(star);
      }

      worldGroup.add(propGroup);
      floatingGifts.push(propGroup);
    });

    // Save Three refs for animation updates
    sceneState.current = {
      scene,
      camera,
      renderer,
      worldGroup,
      printerGroup,
      printHead,
      spool1,
      spool2,
      robotArm: lowerArm,
      armForearm,
      conveyorRollers: rollers,
      conveyorBoxes,
      truckGroup,
      truckWheels,
      floatingCadMesh: floatingCadGroup,
      floatingGifts,
      laserLine: scanLaser,
      scrollProgress: sceneState.current.scrollProgress,
      mouse: sceneState.current.mouse,
    };

    // 4. Scroll Listener: Camera travels along the 4-stage pipeline
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

      gsap.to(sceneState.current.scrollProgress, {
        target: rawProgress,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      sceneState.current.mouse.targetX = x;
      sceneState.current.mouse.targetY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvasRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 5. Main Animation Loop (Buttery 60FPS)
    let clock = new THREE.Clock();
    let tickCount = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      tickCount++;

      const sp = sceneState.current.scrollProgress;
      sp.current += (sp.target - sp.current) * 0.08;

      const m = sceneState.current.mouse;
      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;

      // -----------------------------------------------------------------
      // A. CAMERA TRAVEL ALONG THE PIPELINE (Signature Sendoso Journey)
      // -----------------------------------------------------------------
      // Map scrollProgress (0 to 1) across the 4 stages (-14 to +18 in X)
      const targetCamX = THREE.MathUtils.lerp(-14, 16, sp.current);
      const camY = 20 + m.y * 3;
      const camZ = 27 - m.y * 2;

      camera.position.x = targetCamX + m.x * 4;
      camera.position.y = camY;
      camera.position.z = camZ;
      camera.lookAt(targetCamX, 3.5, 0);

      // -----------------------------------------------------------------
      // B. KINETIC FACTORY MOTION (Conveyor, Robot Arm, Spools, Gantry)
      // -----------------------------------------------------------------
      // 1. Filament Spools Spinning
      spool1.rotation.x += delta * 1.5;
      spool2.rotation.x += delta * 1.2;

      // 2. Floating CAD crystal rotation
      floatingCadGroup.rotation.y += delta * 0.8;
      floatingCadGroup.rotation.x = Math.sin(elapsed * 1.2) * 0.2;
      floatingCadGroup.position.y = 4.4 + Math.sin(elapsed * 2) * 0.3;

      // 3. 3D Printer Gantry CoreXY Slicing Motion (Lissajous curve)
      const gantryX = Math.sin(elapsed * 4.5) * 1.6;
      const gantryZ = Math.cos(elapsed * 3.2) * 1.6;
      printHead.position.set(gantryX, 0, gantryZ);

      // 4. Robotic Arm Swivel & Pick-and-Place Motion
      lowerArm.rotation.y = Math.sin(elapsed * 1.8) * 0.7 - 0.2;
      armForearm.rotation.z = Math.sin(elapsed * 2.4) * 0.3 - 0.2;

      // 5. Conveyor Rollers Rolling
      rollers.forEach((roller) => {
        roller.rotation.x += delta * 4.5;
      });

      // 6. Parcel Boxes Gliding on Conveyor
      conveyorBoxes.forEach((b, idx) => {
        b.position.x += delta * 1.8;
        // Loop back when reaching the end of the conveyor
        if (b.position.x > 8.5 + conveyorLength / 2 - 1) {
          b.position.x = 8.5 - conveyorLength / 2 + 1.2;
        }
        // Slight playful bob
        b.position.y = conveyorHeight + 0.75 + Math.sin(elapsed * 5 + idx) * 0.04;
      });

      // 7. Delivery Truck Wheels Spinning + Subtle Chassis Idle Vibration
      truckWheels.forEach((w) => {
        w.rotation.z -= delta * (3 + sp.current * 6);
      });
      chassis.position.y = 1.1 + Math.sin(elapsed * 12) * 0.03;
      cabin.position.y = 2.7 + Math.sin(elapsed * 12 + 0.5) * 0.03;
      cargoBox.position.y = 3.0 + Math.sin(elapsed * 12 + 0.2) * 0.03;

      // Delivery map pin bounce
      pinGroup.position.y = 6.4 + Math.sin(elapsed * 3) * 0.35;

      // 8. Floating Toy Props Bobbing
      floatingGifts.forEach((p, idx) => {
        p.position.y += Math.sin(elapsed * 2.2 + idx * 1.2) * 0.015;
        p.rotation.y += delta * 0.6;
        p.rotation.x += delta * 0.3;
      });

      renderer.render(scene, camera);
      sceneState.current.animationFrameId = requestAnimationFrame(animate);
    };

    sceneState.current.animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (sceneState.current.animationFrameId) {
        cancelAnimationFrame(sceneState.current.animationFrameId);
      }
      renderer.dispose();
      platformGeo.dispose();
      topPlateGeo.dispose();
      floorGrid.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ opacity }}>
      {/* 3D ISOMETRIC STUDIO BACKGROUND */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
