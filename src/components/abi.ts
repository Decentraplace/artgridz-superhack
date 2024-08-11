export const abi = [
	{
	  "type": "constructor",
	  "name": "",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "event",
	  "name": "AmountPixel",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "PixelAmount",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CollectionSoldOut",
	  "inputs": [
		{
		  "type": "address",
		  "name": "artist",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "gridID",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CustomAmountPixel",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "PixelAmount",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "CustomPixelChanged",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "x",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "y",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "color",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "id",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "GridComplete",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "tuple",
		  "name": "",
		  "components": [
			{
			  "type": "uint256",
			  "name": "id",
			  "internalType": "uint256"
			},
			{
			  "type": "uint256",
			  "name": "size",
			  "internalType": "uint256"
			},
			{
			  "type": "address",
			  "name": "gridOwner",
			  "internalType": "address"
			},
			{
			  "type": "bool",
			  "name": "completed",
			  "internalType": "bool"
			},
			{
			  "type": "uint256",
			  "name": "supplyGrid",
			  "internalType": "uint256"
			},
			{
			  "type": "uint256",
			  "name": "royaltyGrid",
			  "internalType": "uint256"
			},
			{
			  "type": "uint256",
			  "name": "priceGrid",
			  "internalType": "uint256"
			}
		  ],
		  "indexed": false,
		  "internalType": "struct ARTGRIDZ.Grid"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "NFTCompleted",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "id",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "NFTMinted",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "gridID",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "NFTSold",
	  "inputs": [
		{
		  "type": "address",
		  "name": "artist",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "address",
		  "name": "buyer",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "price",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "gridID",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "PixelChanged",
	  "inputs": [
		{
		  "type": "address",
		  "name": "sender",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "x",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "y",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "color",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "id",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "Transfer",
	  "inputs": [
		{
		  "type": "address",
		  "name": "from",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "address",
		  "name": "to",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "type": "uint256",
		  "name": "amount",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "anonymous": false
	},
	{
	  "type": "function",
	  "name": "PIXEL_RANGE",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "amount",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "buyEraser",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "colorPixel",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "x",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "y",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "color",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "colored",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "coloredId",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "completeArtwork",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "price",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "supply",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "completedArtworks",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "currentGrid",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "currentGridSize",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "customGridzAquired",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "customPixel",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "x",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "y",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "color",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "decreaseSupply",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "gridId",
		  "internalType": "uint256"
		},
		{
		  "type": "address",
		  "name": "sender",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "erasePixel",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "x",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "y",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "eraserPixels",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getArrayLength",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "gridCompleted",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "gridNFTPrice",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "gridNFTRoyalty",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "gridNFTSupply",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "gridOwner",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "gridSizes",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "grids",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "id",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "size",
		  "internalType": "uint256"
		},
		{
		  "type": "address",
		  "name": "gridOwner",
		  "internalType": "address"
		},
		{
		  "type": "bool",
		  "name": "completed",
		  "internalType": "bool"
		},
		{
		  "type": "uint256",
		  "name": "supplyGrid",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "royaltyGrid",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "priceGrid",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "holdsGrid",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "isGridNFT",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "maxPixels",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "nextGridId",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "nextId",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "owner",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "ownsKey",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "bool",
		  "name": "",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "pixelAmount",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "pixelChanged",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		},
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "timeFee",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "topOnchainArtUser",
	  "inputs": [],
	  "outputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "totalCompletedGridz",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "totalCustomGridz",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "totalCustomPixels",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "totalPixels",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "unlockGrid",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "size",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "withdraw",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "withdrawAmount",
	  "inputs": [
		{
		  "type": "uint256",
		  "name": "_amount",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "xp",
	  "inputs": [
		{
		  "type": "address",
		  "name": "",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "type": "uint256",
		  "name": "",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "receive",
	  "name": "",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "payable"
	},
	{
	  "type": "fallback",
	  "name": "",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "payable"
	}
  ] as const