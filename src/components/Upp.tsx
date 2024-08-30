import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { useRef, useMemo, useState, useEffect } from "react";
import { myNFTABI, myNFTAddress } from '@/myNFT';
import { HexColorPicker  } from 'react-colorful';
import { ethers } from "ethers";
import { useWriteContract ,useReadContract} from 'wagmi'
import { FaEthereum, FaUnlock, FaEraser } from "react-icons/fa";
import { parseEther } from "viem";
import { FaSave } from "react-icons/fa";
import {abi} from './abi';
import { config } from "./config";
import './Canvas.css'; // Import your CSS stylesheet
import { type UseAccountReturnType } from 'wagmi'
import { getAccount } from '@wagmi/core'


const hexToDecimal = (hexColor: string): number => {
  return parseInt(hexColor.replace(/^#/, ''), 16);
};

// Define the type for a transaction
interface Transaction {
    address: typeof myNFTAddress,
    abi: typeof myNFTABI,
    functionName: "colorPixel",
  args: (string | number)[];
}

interface EraserTransaction {
  address: typeof myNFTAddress,
  abi: typeof myNFTABI,
  functionName: "erasePixel",
args: (string | number)[];
}


export function Upp() {
  const account = useAccount();
  const accounsAddress = getAccount(config);
  const accountAddress = accounsAddress.address as `0x${string}`;
  const { writeContract } = useWriteContract();
    const [id, setId] = useState<string | undefined>(undefined);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [hoveredPixel, setHoveredPixel] = useState<{ x: number, y: number } | null>(null);
    const [clickedPixels, setClickedPixels] = useState<{ x: number, y: number, color: string }[]>([]);
    const [clickedPixel, setClickedPixel] = useState<{ x: number, y: number } | null>(null);
    const [eraserPixels, setEraserClickedPixels] = useState<{ x: number, y: number }[]>([]);
    const [erasertransactions, setEraserTransactions] = useState<EraserTransaction[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelSize = 3.75; // Define pixel size
    const [showMessage, setShowMessage] = useState(false);

    const handleMove = () => {
      // Update state based on touch move
      setShowMessage(true);
    };
  
    const { writeContracts } = useWriteContracts({
      mutation: { onSuccess: (id) => setId(id) },
    });
    


    const { data: availableCapabilities } = useCapabilities({
      account: account.address,
    });
    const capabilities = useMemo(() => {
      if (!availableCapabilities || !account.chainId) return {};
      const capabilitiesForChain = availableCapabilities[account.chainId];
      if (
        capabilitiesForChain["paymasterService"] &&
        capabilitiesForChain["paymasterService"].supported
      ) {
        return {
          paymasterService: {
            url: "https://api.developer.coinbase.com/rpc/v1/base/",
          },
        };
      }
      return {};
    }, [availableCapabilities, account.chainId]);
    
    const handlePixelClick = (x: number, y: number) => {
     
      const colorValue = hexToDecimal(selectedColor);
      const newTransaction: Transaction = {
        address: myNFTAddress, // Type assertion
        abi: myNFTABI, // Ensure this matches your ABI type
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
      handlePixelClick(x, y); // Adjusted to make (0,0) at top-left

    };
    
    const handleEraserPixelClick = (x: number, y: number) => {
     
      const newEraserTransaction: EraserTransaction = {
        address: myNFTAddress, // Type assertion
        abi: myNFTABI, // Ensure this matches your ABI type
        functionName: "erasePixel",
        args: [x, y],
      };
      setEraserClickedPixels((prev) => {
        const updatedPixels = prev.filter(pixel => pixel.x !== x || pixel.y !== y);
        return [...updatedPixels, { x, y}];
      });
      setEraserTransactions((prev) => [
        ...prev.filter(tx => tx.args[0] !== x || tx.args[1] !== y),
        newEraserTransaction
      ]);
      handlePixelClick(x, y); // Adjusted to make (0,0) at top-left

    };

    const handleSubmit = () => {
      if (transactions.length === 0) return;
      writeContracts({
        contracts: transactions,
        capabilities,
      });
      setTransactions([]); // Clear transactions after submission
      setClickedPixels([]); 
    };

    const handleSubmitEraser = () => {
      if (erasertransactions.length === 0) return;
      writeContracts({
        contracts: erasertransactions,
        capabilities,
      });
      setEraserTransactions([]); // Clear transactions after submission
      setEraserClickedPixels([]); 
    };
    
    const drawCanvas = (ctx: CanvasRenderingContext2D) => {
      // Clear the canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
      // Redraw all clicked pixels
      clickedPixels.forEach(pixel => {
        ctx.fillStyle = pixel.color;
        ctx.fillRect((pixel.x-1) * pixelSize, (pixel.y-1) * pixelSize, pixelSize, pixelSize); // Adjusted for pixel size
      });
    
      // Draw hovered pixel
      if (hoveredPixel) {
        ctx.fillStyle = selectedColor;
        ctx.fillRect((hoveredPixel.x - 1) * pixelSize, (hoveredPixel.y - 1) * pixelSize, pixelSize, pixelSize); // Adjusted for pixel size
      }
    };
    


  
   
    
      const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const x = Math.floor((e.clientX - rect.left) / 3.75); // Adjust for larger pixels
          const y = Math.floor((e.clientY - rect.top) / 3.75);
          setHoveredPixel({ x: x + 1, y: y + 1 });
    
          const ctx = canvas.getContext('2d');
          if (ctx) {
            drawCanvas(ctx);
          }
        }
      };
      
      const { data: eraserPixelsResult, isLoading, isError} = useReadContract({
        abi,
        address: '0xC0011BB70cC2f19208EF01F88DD16B43250C7f77',
        functionName: 'eraserPixels',
        args:[accountAddress],
      })

      const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const x = Math.floor((e.clientX - rect.left) / pixelSize);
          const y = Math.floor((e.clientY - rect.top) / pixelSize);
          handlePixelClick(x+1, y+1);
          handleEraserPixelClick(x+1,x+1);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            drawCanvas(ctx);
          }
        }
      };
    
      useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            drawCanvas(ctx);
          }
        }
      }, [clickedPixels, hoveredPixel, eraserPixels]);


      return (
        <div className="dynamic" >
        <div className="bromiso" >
          <HexColorPicker
            color={selectedColor}
            onChange={setSelectedColor}
          />
            {hoveredPixel && (
          <p className="mt-2">hovered pixel: X: {hoveredPixel.x}, Y: {hoveredPixel.y}</p>
        )}
        {clickedPixel && (
          <p className="mt-2">clicked pixel: X: {clickedPixel.x}, Y: {clickedPixel.y}</p>
        )}
        </div>
        <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
        <button 
          onClick={handleSubmit} 
          className="bg-cyan-300 text-black px-4 py-2 rounded hover:bg-cyan-900 hover:text-white transition w-200"
          style={{display:'flex', flexDirection:'column',alignItems:'center',height:'fit-content', marginRight:'9vh', marginLeft:'22vw',width:'fit-content'}}
        >
        <FaSave/> save onchain for free
        </button>
        </div>
       <div style={{display:'flex',position:'absolute', flexDirection:'row'}}>
       <div style={{display:'flex',position:'absolute', marginLeft:'10vw',marginTop:'29vh', flexDirection:'row'}}>

    </div> 
    <div style={{ position: "absolute", marginTop: '40vh' }}>
               
            </div>
    </div> 

        <div style={{display:'flex', flexDirection:'column'}}>
        <canvas
          ref={canvasRef}
          width={375}
          height={375}
          className="border border-gray-400 bg-black-200"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
    
        </div>
      <div className="dynamicPend">
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-800">
          <h3 className="text-xl font-semibold mb-2">⬇️Pending Pixels</h3>
          <ul className="list-disc list-inside">
            {clickedPixels.map((pixel, index) => (
              <li key={index}>
                X: {pixel.x}, Y: {pixel.y}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    );
  }