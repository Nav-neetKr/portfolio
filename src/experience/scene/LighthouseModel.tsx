import * as THREE from 'three'
import { useContext, useRef } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, shaderMaterial, Decal } from '@react-three/drei'

import { AppContext } from '@/src/context/appContext'
import canvasVertexShader from '@/shaders/canvas/canvasVertexShader.glsl'
import canvasFragmentShader from '@/shaders/canvas/canvasFragmentShader.glsl'
import { perfectPageHeight } from '@/src/utilities/constants'
// import { useControls } from 'leva'

import type { GLTF } from 'three-stdlib'
import type { Object3DNode } from '@react-three/fiber'

interface CanvasPhotosUniforms {
    uArtTexture: THREE.Texture
    uPhotoTexture: THREE.Texture
    uDisplacementTexture: THREE.Texture
    uEffectFactor: number
    uDisplacementFactor: number
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        canvasPhotosMaterial: Object3DNode<typeof CanvasPhotosMaterial, typeof CanvasPhotosMaterial> &
            CanvasPhotosUniforms
    }
}

const CanvasPhotosMaterial = shaderMaterial(
    {
        uArtTexture: null,
        uPhotoTexture: null,
        uDisplacementTexture: null,
        uEffectFactor: 1.2,
        uDisplacementFactor: 0
    },
    canvasVertexShader,
    canvasFragmentShader
)

extend({ CanvasPhotosMaterial })

type GLTFResult = GLTF & {
    nodes: {
        wall: THREE.Mesh
        lighthouse: THREE.Mesh
        globe: THREE.Mesh
        ['1stFloor01']: THREE.Mesh
        ['1stFloor02']: THREE.Mesh
        ['1stFloorLightBulb']: THREE.Mesh
        ['2ndFloor01']: THREE.Mesh
        ['2ndFloor02']: THREE.Mesh
        ['2ndFloorLightBulb']: THREE.Mesh
    }
    materials: {}
}

export function LighthouseModel(props: JSX.IntrinsicElements['group']) {
    // const { position, scale, rotation } = useControls('photo', {
    //     position: {
    //         value: [-0.0149, 5.7865, 0.3479],
    //         step: 0.001
    //     },
    //     rotation: {
    //         value: [0.1865, 3.259, 0.024],
    //         step: 0.001
    //     },
    //     scale: {
    //         value: [0.024, 0.034, 1],
    //         step: 0.001
    //     }
    // })

    // console.log(position, rotation, scale)

    const { isLightMode } = useContext(AppContext)
    const canvasPhotosRef = useRef(null!)
    const wallMaterialRef = useRef<THREE.MeshBasicMaterial>(null!)
    const { nodes } = useGLTF('models/lighthouse.glb') as GLTFResult
    const [
        davidArtTexture,
        davidPhotoTexture,
        displacementTexture,
        lighthouseTexture,
        firstFloorTexture01,
        firstFloorTexture02,
        secondFloorTexture01,
        secondFloorTexture02,
        mumPhotoTexture
    ] = useTexture([
        'models/Navneet.jpg',
        'models/Navneet.jpg',
        'models/water_displacement_map.webp',
        'models/lighthouse_bake.webp',
        'models/first_floor_01.webp',
        'models/first_floor_02.webp',
        'models/second_floor_01.webp',
        'models/second_floor_02.webp',
        'models/premanandmaharaj.webp'
    ])

    lighthouseTexture.flipY = false
    firstFloorTexture01.flipY = false
    firstFloorTexture02.flipY = false
    secondFloorTexture01.flipY = false
    secondFloorTexture02.flipY = false

    useFrame((_state, delta) => {
        const dampedDisplacementFactor = THREE.MathUtils.damp(
            (canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms>).current.uDisplacementFactor,
            isLightMode ? 0 : 1,
            3.5,
            delta
        ) as number
        ;(canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms>).current.uDisplacementFactor =
            dampedDisplacementFactor

        const scrollTop = document.documentElement.scrollTop
        const isInInterior = scrollTop >= perfectPageHeight * 4
        const dampedWallOpacity = THREE.MathUtils.damp(wallMaterialRef.current.opacity, isInInterior ? 0 : 1, 5, delta)
        wallMaterialRef.current.opacity = dampedWallOpacity
    })

    return (
        <group {...props} dispose={null} scale={0.3} rotation={[0, -Math.PI * 0.6, 0]}>
            <mesh name='wall' geometry={nodes.wall.geometry} material={nodes.wall.material}>
                <meshBasicMaterial ref={wallMaterialRef} map={lighthouseTexture} transparent />
            </mesh>
            <mesh
                name='lighthouse'
                geometry={nodes.lighthouse.geometry}
                material={nodes.lighthouse.material}
                position={[-0.062, 0, 0.115]}
            >
                <meshBasicMaterial map={lighthouseTexture} />
            </mesh>
            <mesh
                name='canvasPhotos'
                position={[0.1561, 4.63, -0.8761]}
                rotation={[-0.4405, 1.198, 0.414]}
                scale-x={0.213}
                scale-y={0.293}
            >
                <planeGeometry args={[1, 1, 1, 1]} />
                <canvasPhotosMaterial
                    ref={canvasPhotosRef as React.MutableRefObject<CanvasPhotosUniforms & typeof CanvasPhotosMaterial>}
                    uArtTexture={davidArtTexture}
                    uPhotoTexture={davidPhotoTexture}
                    uDisplacementTexture={displacementTexture}
                    uEffectFactor={1.2}
                    uDisplacementFactor={0}
                />
            </mesh>
            <mesh
                name='globe'
                geometry={nodes.globe.geometry}
                material={nodes.globe.material}
                position={[-0.364, 5.079, 0.319]}
                rotation={[-Math.PI, 1.44, -Math.PI]}
            >
                <meshBasicMaterial map={firstFloorTexture01} />
            </mesh>
            <mesh
                name='1stFloor01'
                geometry={nodes['1stFloor01'].geometry}
                material={nodes['1stFloor01'].material}
                position={[0.083, 5.031, 0.049]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial map={firstFloorTexture01} />
            </mesh>
            <mesh
                name='1stFloor02'
                geometry={nodes['1stFloor02'].geometry}
                material={nodes['1stFloor02'].material}
                position={[0.083, 5.031, 0.049]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial map={firstFloorTexture02} />
            </mesh>
            <mesh
                name='1stFloorLightBulb'
                geometry={nodes['1stFloorLightBulb'].geometry}
                material={nodes['1stFloorLightBulb'].material}
                position={[0.083, 5.031, 0.049]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial />
            </mesh>
            <mesh
                name='memorialPhoto'
                position={[-0.0149, 5.7865, 0.3479]}
                rotation={[0.1865, 3.259, 0.024]}
                scale={[0.024, 0.034, 1]}
            >
                <planeGeometry args={[1, 1, 1, 1]} />
                <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
                    <meshBasicMaterial map={mumPhotoTexture} polygonOffset polygonOffsetFactor={-1} />
                </Decal>
            </mesh>
            <mesh
                name='2ndFloor01'
                geometry={nodes['2ndFloor01'].geometry}
                material={nodes['2ndFloor01'].material}
                position={[-0.156, 5.38, 0.019]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial map={secondFloorTexture01} />
            </mesh>
            <mesh
                name='2ndFloor02'
                geometry={nodes['2ndFloor02'].geometry}
                material={nodes['2ndFloor02'].material}
                position={[-0.156, 5.38, 0.019]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial map={secondFloorTexture02} />
            </mesh>
            <mesh
                name='2ndFloorLightBulb'
                geometry={nodes['2ndFloorLightBulb'].geometry}
                material={nodes['2ndFloorLightBulb'].material}
                position={[-0.156, 5.38, 0.019]}
                rotation={[0, 0.439, 0]}
            >
                <meshBasicMaterial />
            </mesh>
        </group>
    )
}

useGLTF.preload('models/lighthouse.glb')
useTexture.preload('models/david_art.webp')
useTexture.preload('models/Navneet.jpg')
useTexture.preload('models/water_displacement_map.webp')
useTexture.preload('models/lighthouse_bake.webp')
useTexture.preload('models/first_floor_01.webp')
useTexture.preload('models/first_floor_02.webp')
useTexture.preload('models/second_floor_01.webp')
useTexture.preload('models/second_floor_02.webp')
useTexture.preload('models/premanandmaharaj.webp')
