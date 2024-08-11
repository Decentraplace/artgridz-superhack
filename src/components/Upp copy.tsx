import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { useRef, useMemo, useState, useEffect } from "react";
import { myNFTABI, myNFTAddress } from '@/myNFT';
import { HexColorPicker } from 'react-colorful';
import { useContract, useContractRead, useContractEvents, ThirdwebProvider } from "@thirdweb-dev/react";

const hexToDecimal = (hexColor: string): number => {
  return parseInt(hexColor.replace(/^#/, ''), 16);
};

const decimalToHex = (decimalColor: number): string => {
  return "#" + (decimalColor & 0x00FFFFFF).toString(16).padStart(6, '0');
};

const CONTRACT_ADDRESS = "0x4C20042b6B62Fd73528a3bF2A1496E887e9F9662";

interface Transaction {
  address: typeof myNFTAddress,
  abi: typeof myNFTABI,
  functionName: "colorPixel",
  args: (string | number)[];
}

export function Upp() {
  const { contract } = useContract(CONTRACT_ADDRESS, myNFTABI);
  const account = useAccount();
  const [windowPosition, setWindowPosition] = useState({ x: 1, y: 1 });
  const { data: grid } = useContractRead(contract, "nextId");
  const [id, setId] = useState<string | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [hoveredPixel, setHoveredPixel] = useState<{ x: number, y: number } | null>(null);
  const [clickedPixels, setClickedPixels] = useState<{ x: number, y: number, color: string }[]>([]);
  const [clickedPixel, setClickedPixel] = useState<{ x: number, y: number } | null>(null);
  const WINDOW_SIZE = 100;
  const [pixelColors, setPixelColors] = useState(Array(WINDOW_SIZE * WINDOW_SIZE).fill(0));
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelSize = 5;
  const { writeContracts } = useWriteContracts();

  const { data: pixelChangedEvents = [] } = useContractEvents(contract, "PixelChanged", {
    queryFilter: {
      fromBlock: 3912450,
      toBlock: 'latest',
      order: "asc",
    },
    subscribe: true,
  });

  useEffect(() => {
    const newPixelColors = Array(WINDOW_SIZE * WINDOW_SIZE).fill(0);
    for (const event of pixelChangedEvents) {
      const { x, y, color, id } = event.data;
      const relativeX = x - windowPosition.x;
      const relativeY = y - windowPosition.y;
      if (relativeX >= 0 && relativeX < WINDOW_SIZE && relativeY >= 0 && relativeY < WINDOW_SIZE && id.toNumber() === grid.toNumber()) {
        const pixelIndex = relativeY * WINDOW_SIZE + relativeX;
        newPixelColors[pixelIndex] = color;
      }
    }
    setPixelColors(newPixelColors);
  }, [pixelChangedEvents, windowPosition, WINDOW_SIZE]);

  const handlePixelClick = (x: number, y: number) => {
    const colorValue = hexToDecimal(selectedColor);
    const newTransaction: Transaction = {
      address: myNFTAddress,
      abi: myNFTABI,
      functionName: "colorPixel",
      args: [x, y, colorValue],
    };
    setClickedPixels((prev) => {
      const updatedPixels = prev.filter(pixel => pixel.x !== x || pixel.y !== y);
      return [...updatedPixels, { x, y, color: selectedColor }];
    });
    setTransactions((prev) => [
      ...prev.filter(tx => tx.args[0] !== x || tx.args[1] !== y),
      newTransaction
    ]);
    setClickedPixel({ x, y });
  };

  const handleSubmit = () => {
    if (transactions.length === 0) return;
    writeContracts({
      contracts: transactions,
      capabilities:{ paymasterService: {
        url: process.env.PAYMASTER_SERVICE_URL,
      }},
  });
    setTransactions([]);
    setClickedPixels([]);
  };

  const drawCanvasLayer = (ctx: CanvasRenderingContext2D, pixelColors: number[], opacity: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    pixelColors.forEach((color, index) => {
      const x = (index % WINDOW_SIZE) * pixelSize;
      const y = Math.floor(index / WINDOW_SIZE) * pixelSize;
      ctx.fillStyle = decimalToHex(color);
      ctx.globalAlpha = opacity;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);
      setHoveredPixel({ x, y });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);
      handlePixelClick(x, y);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        drawCanvasLayer(ctx, pixelColors, 0.3); // Blockchain layer with opacity
        drawCanvasLayer(ctx, clickedPixels.map(pixel => hexToDecimal(pixel.color)), 1.0); // User layer with full opacity
      }
    }
  }, [pixelColors, clickedPixels, hoveredPixel]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Color Pixels (Transactions are sponsored)</h2>
      <div className="mb-4">
        <HexColorPicker
          color={selectedColor}
          onChange={setSelectedColor}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={WINDOW_SIZE * pixelSize}
        height={WINDOW_SIZE * pixelSize}
        className="border border-gray-400 mb-4"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Save to the Blockchain
      </button>
      {hoveredPixel && (
        <p className="mt-4">Hovered Pixel: X: {hoveredPixel.x}, Y: {hoveredPixel.y}</p>
      )}
      {clickedPixel && (
        <p className="mt-2">Clicked Pixel: X: {clickedPixel.x}, Y: {clickedPixel.y}</p>
      )}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Pending Pixels</h3>
        <ul className="list-disc list-inside">
          {clickedPixels.map((pixel, index) => (
            <li key={index}>
              X: {pixel.x}, Y: {pixel.y}, Color: {pixel.color}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
