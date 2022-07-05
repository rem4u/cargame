import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'dat.gui'
import * as  CANNON from 'cannon-es'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
// import CannonDebugger from 'cannon-es-debugger'
import { Box3, BoxHelper } from 'three'
var nipplejs=require('nipplejs')

/**
 * Base
 */
// Debug
const gui = new dat.GUI()


//Bounding box array
var arrboundingbox=[]

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// let playerAngleMoved,playerAngleInitial 
/**
*Physics
*/
//world
const world=new CANNON.World()
world.gravity.set(0,-9.8,0)
world.allowSleep = true
world.broadphase = new CANNON.SAPBroadphase(world)


//materials

const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.defaultContactMaterial = defaultContactMaterial



///plane
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)
world.addBody(floorBody)


//carspheres

//car1
const shapecar1 = new CANNON.Sphere(0.75)
const axes=new THREE.AxesHelper()
const bodycar1 = new CANNON.Body({
    mass: 1.5,
    position: new CANNON.Vec3(0, 10, -30),
    shape: shapecar1,
    material: defaultMaterial
 })

 const stones1 = new CANNON.Body({
     mass: 0,
     position: new CANNON.Vec3(0, 0, 15.88716685931329),
     shape: shapecar1,
     material: defaultMaterial
  })
world.addBody(bodycar1)
world.addBody(stones1)
//world.addBody( playercar )
// scene.add(playercar)
/**
 * Models
 */
 const dracoLoader = new DRACOLoader()
 dracoLoader.setDecoderPath('/draco/')

 const gltfLoader = new GLTFLoader()
 gltfLoader.setDRACOLoader(dracoLoader)

 let mixer = null
 let action0=null
 let action1=null
 let action2=null
 let glt=null
 let glt1=null
 let car1controls
let gltcar=null

 // car1
 gltfLoader.load(
     '/models/CesiumMilkTruck.gltf',
     (gltf) =>
     {
         gltcar=gltf
         gltf.scene.scale.set(1, 1, 1)

       
        scene.add(gltf.scene)
         
         mixer = new THREE.AnimationMixer(gltf.scene)
         action0 = mixer.clipAction(gltf.animations[0])
         
     }
 )
 gltfLoader.load(
     '/models/1road.glb',
     (gltf) =>
     {
      
         gltf.scene.scale.set(0.9, 2, 0.25)
         gltf.scene.position.set(2,-25.5,-15)
        
         gltf.scene.rotation.y=Math.PI*0.5
        scene.add(gltf.scene)
      
     }
 )
 gltfLoader.load(
     '/models/stones.glb',
     (gltf) =>
     {
          glt1=gltf
         gltf.scene.scale.set(4, 4, 3)
         gltf.scene.position.set(0,-1.5,15)
         var stones11=new  THREE.Box3()
         stones11.setFromObject(glt1.scene)
         arrboundingbox.push(stones11)
          
        scene.add(gltf.scene)
       
     }
 )
 gltfLoader.load(
     '/models/tree14.glb',
     (gltf) =>
     {
        
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(0,-1.5,10)
        
        scene.add(gltf.scene)
       
     }
 )
 gltfLoader.load(
     '/models/tree14.glb',
     (gltf) =>
     {
        
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(2,-1.5,10)
        
        scene.add(gltf.scene)
        
     }
 )
 gltfLoader.load(
     '/models/tree14.glb',
     (gltf) =>
     {
         
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(-2,-1.5,10)
         
        scene.add(gltf.scene)
      
     }
 )
 var tree14=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
         
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(10,1,0)
         tree14.add(gltf.scene.clone())
         var tree15=new  THREE.Box3()
         tree15.setFromObject(gltf.scene)
         arrboundingbox.push(tree15)  
    
       
     }
 )
 scene.add(tree14)
 var tree12=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
        
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(-10,1,0)
         tree12.add(gltf.scene.clone())
         var tree13=new  THREE.Box3()
         tree13.setFromObject(gltf.scene)
         arrboundingbox.push(tree13)
      
        
       
     }
 )
 scene.add(tree12)
 var tree10=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
         
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(-10,1,10)
         tree10.add(gltf.scene.clone())
         var tree11=new  THREE.Box3()
         tree11.setFromObject(gltf.scene)
         arrboundingbox.push(tree11)
       
        
       
        
     
     }
 )
 scene.add(tree10)
 var tree8=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
      
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(10,1,10)
         tree8.add(gltf.scene.clone())
         var tree9=new  THREE.Box3()
         tree9.setFromObject(gltf.scene)
         arrboundingbox.push(tree9)
       
        
        
     }
 )
 scene.add(tree8)
 var tree6=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
       
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(10,1,-20)
         tree6.add(gltf.scene.clone())
         var tree7=new  THREE.Box3()
         tree7.setFromObject(gltf.scene)
         arrboundingbox.push(tree7)
        
        
     }
 )
 scene.add(tree6)
 var tree4=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
        
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(-10,1,-20)
        
         tree4.add(gltf.scene.clone())
         var tree5=new  THREE.Box3()
         tree5.setFromObject(gltf.scene)
         arrboundingbox.push(tree5)
     }
 )
 scene.add(tree4)
 var tree2=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
         
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(10,1,-10)
         tree2.add(gltf.scene.clone())
         var tree3=new  THREE.Box3()
         tree3.setFromObject(gltf.scene)
         arrboundingbox.push(tree3)
        
        
        
     }
 )
 scene.add(tree2)
 var tree=new THREE.Object3D()
 gltfLoader.load(
     '/models/birch_tree.glb',
     (gltf) =>
     {
        
         gltf.scene.scale.set(1, 1, 1)
         gltf.scene.position.set(-10,1,-10)
         tree.add(gltf.scene.clone())
         var tree1=new  THREE.Box3()
         tree1.setFromObject(gltf.scene)
         arrboundingbox.push(tree1)
        
        
     }
 )
 scene.add(tree)
var ramp=new THREE.Object3D()
var ramp2
 gltfLoader.load(
     '/models/ramp.glb',
     (gltf) =>
     {
         // glt=gltf
         gltf.scene.scale.set(4, 4, 3)
           gltf.scene.position.set(0,1.5,10)
            gltf.scene.rotation.y=Math.PI
              gltf.scene.rotation.x=Math.PI*(-0.25)
              ramp.add(gltf.scene.clone())
               ramp2=new  THREE.Box3()
              ramp2.setFromObject(gltf.scene)
              arrboundingbox.push(ramp2)
        
     }
 )
 scene.add(ramp)
 var cottage=new THREE.Object3D()
 gltfLoader.load(
    '/models/Cyprys_House.glb',
    (gltf) =>
    {
     
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(10,-0.05,50)
        gltf.scene.rotation.y=(Math.PI)*2
        cottage.add(gltf.scene.clone())
        var cottage2=new  THREE.Box3()
        cottage2.setFromObject(gltf.scene)
        arrboundingbox.push(cottage2)
      
       
       
    }
)

scene.add(cottage)
var cottage3=new THREE.Object3D()
gltfLoader.load(
    '/models/Cyprys_House.glb',
    (gltf) =>
    {
     
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(10,-0.05,70)
        gltf.scene.rotation.y=(Math.PI)*2
        cottage3.add(gltf.scene.clone())
        var cottage4=new  THREE.Box3()
        cottage4.setFromObject(gltf.scene)
        arrboundingbox.push(cottage4)
      
       
       
    }
)

scene.add(cottage3)
var cottage7=new THREE.Object3D()
gltfLoader.load(
    '/models/Cyprys_House.glb',
    (gltf) =>
    {
     
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(-20,-0.05,50)
        gltf.scene.rotation.y=(Math.PI)*2
        cottage7.add(gltf.scene.clone())
        var cottage8=new  THREE.Box3()
        cottage8.setFromObject(gltf.scene)
        arrboundingbox.push(cottage8)
      
       
       
    }
)

scene.add(cottage7)

var cottage5=new THREE.Object3D()
gltfLoader.load(
   '/models/wooden watch tower2.glb',
   (gltf) =>
   {
    
       gltf.scene.scale.set(1, 1, 1)
       gltf.scene.position.set(0,-0.05,70)
       gltf.scene.rotation.y=(Math.PI)*2
       cottage5.add(gltf.scene.clone())
       var cottage6=new  THREE.Box3()
       cottage6.setFromObject(gltf.scene)
       arrboundingbox.push(cottage6)
     
      
      
   }
)

scene.add(cottage5)
var fence=new THREE.Object3D()
gltfLoader.load(
   '/models/Project.glb',
   (gltf) =>
   {
    
       gltf.scene.scale.set(15, 1, 1)
       gltf.scene.position.set(-50,0,50)
       gltf.scene.rotation.y=(Math.PI)*0.5
       fence.add(gltf.scene.clone())
       var fence1=new  THREE.Box3()
       fence1.setFromObject(gltf.scene)
       arrboundingbox.push(fence1)
     
      
      
   }
)

scene.add(fence)
var fence2=new THREE.Object3D()
gltfLoader.load(
   '/models/Project.glb',
   (gltf) =>
   {
    
       gltf.scene.scale.set(8, 1, 1)
       gltf.scene.position.set(-25,0,-100)
       //gltf.scene.rotation.y=(Math.PI)*0.5
       fence2.add(gltf.scene.clone())
       var fence3=new  THREE.Box3()
       fence3.setFromObject(gltf.scene)
       arrboundingbox.push(fence3)
     
      
      
   }
)

scene.add(fence2)
var fence4=new THREE.Object3D()
gltfLoader.load(
   '/models/Project.glb',
   (gltf) =>
   {
    
       gltf.scene.scale.set(15, 1, 1)
       gltf.scene.position.set(50,0,50)
       gltf.scene.rotation.y=(Math.PI)*0.5
       fence4.add(gltf.scene.clone())
       var fence5=new  THREE.Box3()
       fence5.setFromObject(gltf.scene)
       arrboundingbox.push(fence5)
     
      
      
   }
)

scene.add(fence4)
var fence6=new THREE.Object3D()
gltfLoader.load(
   '/models/Project.glb',
   (gltf) =>
   {
    
       gltf.scene.scale.set(8, 1, 1)
       gltf.scene.position.set(-25,0,100)
       //gltf.scene.rotation.y=(Math.PI)*0.5
       fence6.add(gltf.scene.clone())
       var fence7=new  THREE.Box3()
       fence7.setFromObject(gltf.scene)
       arrboundingbox.push(fence7)
     
      
      
   }
)

scene.add(fence6)


  
//  const debug={}


//  debug.Action0=()=>
//  {
//    action0.play()
//  }
//  debug.CarMovement=()=>
//  {
//    bodycar1.applyForce(new CANNON.Vec3(0,0,250),new CANNON.Vec3(0,0,0))
//  }
//  debug.CarMovementReverse=()=>
//  {
//    bodycar1.applyForce(new CANNON.Vec3(0,0,-250),new CANNON.Vec3(0,0,0))
//  }
//  debug.StopCar=()=>
//  {
//   bodycar1.sleep()
//  }
//  debug.Flycar=()=>
//  {
//    bodycar1.applyForce(new CANNON.Vec3(0,250,250),new CANNON.Vec3(0,0,0))
//  }
//  gui.add(debug,'Action0')
//  gui.add(debug,'CarMovement')
//  gui.add(debug,'CarMovementReverse')
//  gui.add(debug,'StopCar')
//  gui.add(debug,'Flycar')
//  const bui = new GUI()
// const physicsFolder = bui.addFolder('Physics')
// physicsFolder.add(world.gravity, 'x', -10.0, 10.0, 0.1)
// physicsFolder.add(world.gravity, 'y', -10.0, 10.0, 0.1)
// physicsFolder.add(world.gravity, 'z', -10.0, 10.0, 0.1)
// physicsFolder.open()

//  window.addEventListener("keydown",(event)=>
// {
//     switch (event.code) {
//         case "KeyW":
//             bodycar1.applyForce(new CANNON.Vec3(0,0,250),new CANNON.Vec3(0,0,0))
//             break
//         case "KeyS":
//         bodycar1.applyForce(new CANNON.Vec3(0,0,-250),new CANNON.Vec3(0,0,0))
//             break
//         case "KeyA":
//         //bodycar1.rotation.y=Math.PI*0.5
//         bodycar1.applyForce(new CANNON.Vec3(250,0,0),new CANNON.Vec3(0,0,0))
//                 break
//         case "KeyD":
//         bodycar1.applyForce(new CANNON.Vec3(-250,0,0),new CANNON.Vec3(0,0,0))
//           break

//        case "KeyT":
//             bodycar1.sleep()
//                 break
//     }

// })

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 200),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0,5,8)
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.target.set(0, 1, 0)
// controls.enableDamping = true

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer()//{canvas:canvas})
 document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//JoyStick and Orbit Controls
var controls1 = new OrbitControls(camera, renderer.domElement);
controls1.rotateSpeed = 0.4;
controls1.dampingFactor = 0.1;
controls1.enableZoom = true;
controls1.enablePan = false;
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;
let angle
addJoystick();
function updatePlayer(){
    // move the player
     angle = controls1.getAzimuthalAngle()
    if(gltcar!=null){
        if(gltcar.scene.position.z>35)
        {
            gltcar.scene.position.y=0
            console.log("sdaasdf")
        }
      if (fwdValue > 0) {
          tempVector
            .set(0, 0, -fwdValue)
            .applyAxisAngle(upVector, angle)
           gltcar.scene.position.addScaledVector(tempVector,0.5)
        }
    
        if (bkdValue > 0) {
          tempVector
            .set(0, 0, bkdValue)
            .applyAxisAngle(upVector, angle)
           gltcar.scene.position.addScaledVector(tempVector,0.5)
        //    gltcar.scene.rotateOnWorldAxis(tempVector,angle)
        }
  
        if (lftValue > 0) {
          tempVector
            .set(-lftValue, 0, 0)
            .applyAxisAngle(upVector, angle)
           gltcar.scene.position.addScaledVector(tempVector,0.5)
        //    gltcar.scene.rotateOnWorldAxis(tempVector,angle)
        }
  
        if (rgtValue > 0) {
          tempVector
            .set(rgtValue, 0, 0)
            .applyAxisAngle(upVector, angle)
           gltcar.scene.position.addScaledVector(tempVector,0.5)
        }
       gltcar.scene.updateMatrixWorld()
  
  //controls.target.set( mesh.position.x, mesh.position.y, mesh.position.z );
  // reposition camera
  camera.position.sub(controls1.target)
  controls1.target.copy(gltcar.scene.position)
  camera.position.add(gltcar.scene.position)
    }
}  

function addJoystick(){
    const options = {
         zone: document.getElementById('joystickWrapper1'),
         size: 120,
         multitouch: true,
         maxNumberOfNipples: 2,
         mode: 'static',
         restJoystick: true,
         shape: 'circle',
         // position: { top: 20, left: 20 },
         position: { top: '60px', left: '60px' },
         dynamicPage: true,
       }
    
    
   joyManager = nipplejs.create(options);
   
 joyManager['0'].on('move', function (evt, data) {
         const forward = data.vector.y
         const turn = data.vector.x
         console.log(data);
         if(gltcar!=null)
         {
              gltcar.scene.rotation.y=data.angle.radian+(Math.PI)*0.52
            //gltcar.scene.rotateOnWorldAxis()
         }
         action0.play()
         if (forward > 0) {
           fwdValue = Math.abs(forward)
           bkdValue = 0
         } else if (forward < 0) {
           fwdValue = 0
           bkdValue = Math.abs(forward)
         }
 
         if (turn > 0) {
           lftValue = 0
           rgtValue = Math.abs(turn)
         } else if (turn < 0) {
           lftValue = Math.abs(turn)
           rgtValue = 0
         }
       })
 
      joyManager['0'].on('end', function (evt) {
         action0.stop()
         bkdValue = 0
         fwdValue = 0
         lftValue = 0
         rgtValue = 0
       })
   
 }
 let prevx=0
 let prevy=0
 let prevz=0

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
// const cannonDebugger = new CannonDebugger(scene, world)
const v = new THREE.Vector3()
let thrusting = false
let t=0
const tick = () =>
{
    updatePlayer();
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
   // console.log(elapsedTime)

    // Update physics

    world.step(1 / 60, deltaTime, 3)
   
    // if(glt1!=null)
    // {
    //   glt1.scene.position.x=stones1.position.x
    //   glt1.scene.position.y=stones1.position.y
    //   glt1.scene.position.z=stones1.position.z+11
    // }
 
    // if(bodycar1.position.z>=-17.730779351916272&&bodycar1.position.z<=-17.130779351916272){
     
    //   bodycar1.applyForce(new CANNON.Vec3(0,200,250),new CANNON.Vec3(0,0,0))
    // }
    // if(bodycar1.position.z>=35.01647520777614){
    //   bodycar1.position.z=-30
    //   bodycar1.sleep()

    // }
 
    if(gltcar!=null)
{
    if(t==elapsedTime)
    {
      gltcar.scene.position.y=0
    }
     var car2=new  THREE.Box3()
    car2.setFromObject(gltcar.scene)
const checkcollision = () => {
    for (let i = 0; i < arrboundingbox.length; i++) {

            if (car2.intersectsBox(arrboundingbox[i]) ) {
                gltcar.scene.position.z = prevz
                gltcar.scene.position.x = prevx
                gltcar.scene.position.y = prevy
                if(arrboundingbox[i]==ramp2)
                {
                    console.log(gltcar.scene.position)
                    gltcar.scene.position.y = Math.sin(deltaTime)*350
                     t=elapsedTime+5
               
                    // console.log(gltcar.scene.position.x)
                    //action0.stop()
                  
                }
                else
                {action0.stop()}
                //action0.stop()
            }
    }
    prevx =gltcar.scene.position.x
    prevy = gltcar.scene.position.y
    prevz = gltcar.scene.position.z
}
//console.log(gltcar.scene.position)
 console.log(gltcar.scene.position.z)

checkcollision()
}
   
    if(mixer)
    {
        mixer.update(deltaTime)
    }
    


controls1.update(
)

   
    renderer.render(scene, camera)

    
    window.requestAnimationFrame(tick)
}
tick()
