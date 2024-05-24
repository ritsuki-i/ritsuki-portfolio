import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import UsedTecs from "./Data/UsedTec.json";

export default function ThreeJSComponent() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight - 200;
    let rot = 0;
    let rot2 = 0;
    let mouseX = 0;

    const canvasElement = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, +1000);

    const loadPic = new THREE.TextureLoader();

    // 立方体を作成
    const earthMeshes = []; // メッシュを保存する配列
    const earthContainer = new THREE.Object3D(); // Object3D を作成
    UsedTecs.tecs.forEach((tecs, index) => {
      //マテリアルのサイズ設定
      const geometry = new THREE.BoxGeometry(tecs.size, tecs.size, tecs.size);
      // マテリアルにテクスチャーを設定
      let material = [
        new THREE.MeshBasicMaterial({
          map: loadPic.load("textures/side.jpeg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loadPic.load("textures/side.jpeg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loadPic.load("textures/side.jpeg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loadPic.load("textures/side.jpeg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loadPic.load(tecs.path),
        }),
        new THREE.MeshBasicMaterial({
          map: loadPic.load(tecs.path),
        }),
      ];

      // メッシュを作成
      const mesh = new THREE.Mesh(geometry, material);

      //位置の座標の乱数
      if (index === 0) {
        mesh.position.set(0, 0, 0);
      } else {
        let rand1 = Math.floor(Math.random() * 800 - 400);
        let rand2 = Math.floor(Math.random() * 800 - 400);
        let rand3 = Math.floor(Math.random() * 800 - 400);

        mesh.position.set(rand1, rand2, rand3);
      }

      // 各メッシュに回転速度を設定
      mesh.userData.rotationSpeed = {
        x: Math.random() * 0.01 - 0.005,
        y: Math.random() * 0.01 - 0.005,
        z: Math.random() * 0.01 - 0.005
      };

      // Object3D に Mesh を追加
      earthContainer.add(mesh);

      // メッシュを配列に保存
      earthMeshes.push(mesh);
    });

    scene.add(earthContainer); // シーンに Object3D を追加

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // リサイズイベントのハンドラー
    const onWindowResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight - 200;

      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    // リサイズイベントリスナーを追加
    window.addEventListener("resize", onWindowResize);

    document.addEventListener("mousemove", (event) => {
      mouseX = event.pageX;
    });

    const tick = () => {
      // マウスの位置に応じて角度を設定
      const targetRot = (mouseX / window.innerWidth) * 360;
      rot += (targetRot - rot) * 0.02;
      rot2 += 0.1;
      const radian = ((rot + rot2) * Math.PI) / 180;
      camera.position.x = 1000 * Math.sin(radian);
      camera.position.z = 1000 * Math.cos(radian);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // マテリアルは常に回転させておく
      earthMeshes.forEach((mesh, index) => {
        if (index === 0) {
          mesh.rotation.x += 0.005;
          mesh.rotation.y += 0.005;
          mesh.rotation.z += 0.005;
        } else {
          mesh.rotation.x += mesh.userData.rotationSpeed.x;
          mesh.rotation.y += mesh.userData.rotationSpeed.y;
          mesh.rotation.z += mesh.userData.rotationSpeed.z;
        }
      });

      // レンダリング
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      // コンポーネントのクリーンアップ時にイベントリスナーを削除
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div className="ThreeJSComponent">
      <canvas ref={canvasRef} className="fadeTarget"></canvas>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        integrity="sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script>
    </div>
  );
}
