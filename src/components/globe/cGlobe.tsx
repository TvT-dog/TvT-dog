"use client"
import { motion } from "motion/react"
import React, { Suspense, lazy } from 'react';

const World = lazy(() => import('./globe').then((m) => ({ default: m.World })));

export default function GlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 3000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"]
  // 统一的终点坐标
  const unifiedEndPoint = {
    lat: 22.551157,    // 统一的终点纬度（东京）
    lng: 113.923169,   // 统一的终点经度（东京）
  };

// 弧线配置
  const sampleArcs = [
    {
      order: 1,
      startLat: 30.572924,
      startLng: 104.066128,
      endLat: unifiedEndPoint.lat,    // 使用统一的终点纬度
      endLng: unifiedEndPoint.lng,    // 使用统一的终点经度
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: 40.221005,
      startLng: 116.23189,
      endLat: unifiedEndPoint.lat,    // 使用统一的终点纬度
      endLng: unifiedEndPoint.lng,    // 使用统一的终点经度
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 3,
      startLat: 31.231328,
      startLng: 121.47202,
      endLat: unifiedEndPoint.lat,    // 使用统一的终点纬度
      endLng: unifiedEndPoint.lng,    // 使用统一的终点经度
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 4,
      startLat: 28.225949,
      startLng: 112.932337,
      endLat: unifiedEndPoint.lat,    // 使用统一的终点纬度
      endLng: unifiedEndPoint.lng,    // 使用统一的终点经度
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 5,
      startLat: 22.3033,
      startLng: 114.179344,
      endLat: unifiedEndPoint.lat,    // 使用统一的终点纬度
      endLng: unifiedEndPoint.lng,    // 使用统一的终点经度
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  ];
  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">
            The places that I have been explored
          </h2>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  )
}
