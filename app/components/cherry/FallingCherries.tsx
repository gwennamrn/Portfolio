import { memo, useEffect, useMemo, useState } from "react";
import { COLORS } from "~/lib/colors";

const CHERRY_COUNT = 18;

interface FallingCherry {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  swayAmount: number;
  rotation: number;
  opacity: number;
}

function generateCherries(): FallingCherry[] {
  const cherries: FallingCherry[] = [];
  for (let i = 0; i < CHERRY_COUNT; i++) {
    cherries.push({
      id: i,
      left: (i / CHERRY_COUNT) * 100 + (Math.random() * 5 - 2.5),
      size: 22 + Math.random() * 20,
      delay: Math.random() * 14,
      duration: 16 + Math.random() * 12,
      swayAmount: 15 + Math.random() * 30,
      rotation: Math.random() * 360,
      opacity: 0.06 + Math.random() * 0.06,
    });
  }
  return cherries;
}

const CherrySVG = memo(function CherrySVG({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 3779.5332 3779.5332"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="matrix(0.13333333,0,0,-0.13333333,0,3779.5333)">
        <path
          d="m 18918.4,23088.9 c -347,-2306 -2883,-4014.9 -4912.5,-2400.1 885.2,157.1 1886.7,671.4 2697.3,1261 -1001.6,-554.1 -2232.2,-1076.2 -3224.8,-1250 758,-593.6 1485.1,-1577.2 2123.8,-2745.9 778.7,-1424.9 1435.4,-3136.9 1856.7,-4745.7 -73.8,-26.1 -148.1,-49.9 -222.6,-70.3 -144.7,-39.6 -295.1,-74.8 -447.1,-107 -407.4,1557.5 -1042.4,3214.4 -1795.2,4591.8 -561.8,1027.9 -1183.2,1892.8 -1814.3,2428.9 53.6,-1192.9 -77.7,-2391.9 -298.3,-3494.9 -283.7,-1418.1 -716.5,-2683.6 -1092.9,-3572.5 -230.1,44.5 -460.5,94.1 -678.3,153.7 l -10,2.8 c 370.6,851.7 812.8,2117.3 1099.7,3551.8 253.9,1269.5 384.7,2666.1 233.2,4014 h 0.2 c -7.3,65.6 4,133.9 36.4,196.9 87.7,170.2 296.8,237 467,149.3 112.8,-58.3 225.2,-126.2 337.1,-202.8 174.7,16.8 484.5,75.3 553.8,221 -87,938.5 583.3,1774.8 1629.3,2159.4 1028.9,378.2 2550.9,-114.8 3461.5,-141.4 v 0"
          fill={color}
        />
        <path
          d="M 13920.6,6767.6 C 12535.5,4598.6 9943.49,4709.2 8185.89,5474.8 6360.02,6270.1 5745.79,8093.6 5879.68,9779.5 c 61.6,775.5 267.91,2129.4 1013.37,3086.5 594.61,763.4 1575.46,1252.9 2542.06,980.1 468.67,-132.2 978.09,-450.3 1565.89,-611.1 811.2,-222 1650.6,-293.1 2238.7,-475.3 246.4,-76.4 453.4,-187.6 627.4,-325.9 -67.5,-83 -129.2,-170.4 -185.7,-261.7 -265.2,-428.7 -404.9,-932.2 -480,-1447.9 -93.4,-641.7 -69.3,-1324 40.8,-1970 117.6,-690.3 336.2,-1346.9 616.7,-1874 20.3,-38.1 40.9,-75.6 61.7,-112.6 z M 7003.07,11591.8 C 6591.93,10137.7 6750.48,8498.6 7315.85,7056.5 6412.55,8075.8 6192.44,9715.1 7003.07,11591.8 Z M 14479,10155.2 c 85.8,-1508.7 770.6,-3006.4 1775.5,-4185 -1186.5,668.8 -1929.4,2146.4 -1775.5,4185 z m -238.3,-3071.4 c 1327.6,-2494.6 4080.7,-2410.1 5919.9,-1609 1825.8,795.3 2440.1,2618.8 2306.2,4304.7 -61.6,775.5 -267.9,2129.4 -1013.4,3086.5 -594.6,763.4 -1575.5,1252.9 -2542.1,980.1 -468.6,-132.2 -978.1,-450.3 -1565.9,-611.1 -811.1,-222 -1650.6,-293.1 -2238.6,-475.3 -986,-305.5 -1341,-1168.8 -1476,-2096.6 -179.6,-1233.7 110.6,-2640.9 609.9,-3579.3 v 0"
          fill={color}
        />
      </g>
    </svg>
  );
});

export const FallingCherries = memo(function FallingCherries() {
  // Generate only client-side to avoid SSR/CSR hydration mismatch (Math.random)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cherries = useMemo(() => (mounted ? generateCherries() : []), [mounted]);

  const keyframes = useMemo(() => {
    return cherries
      .map(
        (c) => `
      @keyframes fall-${c.id} {
        0%   { transform: translateY(-60px) translateX(0px) rotate(${c.rotation}deg); }
        25%  { transform: translateY(25vh) translateX(${c.swayAmount}px) rotate(${c.rotation + 90}deg); }
        50%  { transform: translateY(50vh) translateX(-${c.swayAmount * 0.6}px) rotate(${c.rotation + 180}deg); }
        75%  { transform: translateY(75vh) translateX(${c.swayAmount * 0.4}px) rotate(${c.rotation + 270}deg); }
        100% { transform: translateY(105vh) translateX(-${c.swayAmount * 0.2}px) rotate(${c.rotation + 360}deg); }
      }`,
      )
      .join("\n");
  }, [cherries]);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden motion-reduce:hidden"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden motion-reduce:hidden"
    >
      <style>{keyframes}</style>
      {cherries.map((cherry) => (
        <div
          key={cherry.id}
          className="absolute top-0"
          style={{
            left: `${cherry.left}%`,
            opacity: cherry.opacity,
            animation: `fall-${cherry.id} ${cherry.duration}s ${cherry.delay}s linear infinite`,
            willChange: "transform",
          }}
        >
          <CherrySVG size={cherry.size} color={COLORS.cherry} />
        </div>
      ))}
    </div>
  );
});
