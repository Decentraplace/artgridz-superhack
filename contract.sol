
// SPDX-License-Identifier: MIT

//ArtGridz by Decentraplace Studios https://artgridz.decentraplace.io

pragma solidity ^0.8.1;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract ARTGRIDZ is ReentrancyGuard{
address public owner; 

//VARIABLES
uint256 public nextId = 1; //Grid #0 doesnt exist
mapping(address => uint256) public xp;
uint256 public constant PIXEL_RANGE = 100; 
uint256 public constant amount = 1000000000000000; //0.001 ethers in wei
uint256 public constant pixelAmount = 1;
uint256 public constant timeFee = 1000000000000000;
address public topOnchainArtUser;
uint256 public maxPixels;
mapping(uint256 =>mapping(uint256 => mapping(uint256 => address))) public pixelChanged;
mapping(address => uint256) public totalPixels;
mapping(address => uint256) public eraserPixels;
mapping(uint256 => uint256) public colored;
uint256 public nextGridId = 1;
mapping(uint256 => Grid) public grids;
mapping(address => uint256) public totalCustomPixels;
mapping(address => uint256) public currentGrid; 
mapping(address => uint256) public currentGridSize; 
mapping(uint256 => address) public gridOwner;
mapping(uint256 => bool) public gridCompleted;
mapping(uint256 => uint256) public gridSizes;
mapping(address => bool) public holdsGrid;
mapping(address => uint256) public totalCompletedGridz;
mapping(address => uint256) public totalCustomGridz;
uint256[] public customGridzAquired;
uint256[] public completedArtworks;
mapping(address => bool) public ownsKey;

//custom NFT variables
mapping(uint256 => bool) public isGridNFT;
mapping(uint256 => uint256) public gridNFTSupply;
mapping(uint256 => uint256) public gridNFTRoyalty;
mapping(uint256 => uint256) public gridNFTPrice;

//EVENTS
 // Event to log the transfer details
event Transfer(address indexed from, address indexed to, uint256 amount);
//customGrid
event GridComplete(address indexed sender, Grid);
event CustomPixelChanged(address indexed sender, uint256 x, uint256 y, uint256 color, uint256 id);
event CustomAmountPixel(address indexed sender, uint256 PixelAmount);
//customGrid marketplace
event NFTMinted(address indexed sender, uint256 gridID);
event NFTSold(address indexed artist,address indexed buyer, uint256 price, uint256 gridID);
event CollectionSoldOut(address indexed artist,uint256 gridID);
//colorPixels
event NFTCompleted(uint256 id);
event PixelChanged(address indexed sender, uint256 x, uint256 y, uint256 color, uint256 id);
event AmountPixel(address indexed sender, uint256 PixelAmount);

     constructor() {
        owner = msg.sender;
    }


//Modifiers

      modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    } 


bool private _locked;

    modifier noReentrancy() {
        require(!_locked, "Reentrant call detected");
        _locked = true;
        _;
        _locked = false;
    }
    
    function coloredId() public view returns(uint256) {
        return(colored[nextId]);
    }

    function buyEraser() public payable {
      require(msg.value == amount, "Incorrect payment amount");
      eraserPixels[msg.sender] += 20;
    }
  
        function erasePixel(uint256 x, uint256 y) public nonReentrant{
        require(x <= PIXEL_RANGE,"the out of bounds is not paintable");
        require(y <= PIXEL_RANGE,"the out of bounds is not paintable");
        require(x >= 0,"the out of bounds is not paintable");
        require(y >= 0,"the out of bounds is not paintable");
        require(pixelChanged[x][y][nextId] != address(0),"pixel was not colored");
        xp[msg.sender] += 10;
        pixelChanged[x][y][nextId] = address(0);
        colored[nextId] --;
        eraserPixels[msg.sender]--;
        emit PixelChanged(msg.sender, x, y, 0,nextId);
        }

    function colorPixel(uint256 x, uint256 y, uint256 color) public nonReentrant{
        require(x <= PIXEL_RANGE,"the out of bounds is not paintable");
        require(y <= PIXEL_RANGE,"the out of bounds is not paintable");
        require(x >= 0,"the out of bounds is not paintable");
        require(y >= 0,"the out of bounds is not paintable");
        require(pixelChanged[x][y][nextId] == address(0),"pixel already colored");
        xp[msg.sender] += 10;
        pixelChanged[x][y][nextId] = msg.sender;
        colored[nextId] ++;
        totalPixels[msg.sender] ++;
         emit PixelChanged(msg.sender, x, y, color,nextId);
        if ( totalPixels[msg.sender] > maxPixels) {
            topOnchainArtUser = msg.sender;
            maxPixels =  totalPixels[msg.sender];
        }
        if(colored[nextId] == 10000){ 
         emit NFTCompleted(nextId);
         nextId ++;
        } 

        emit AmountPixel(msg.sender, pixelAmount); //leaderboard
    }

    //CustomGridz

    struct Grid
{
uint256 id;
uint256 size;
address gridOwner;
bool completed;
uint256 supplyGrid;
uint256 royaltyGrid;
uint256 priceGrid;
}


    function unlockGrid(uint256 size) public nonReentrant {
        require(totalPixels[msg.sender]>=100,"You need to color 100 Pixels in the main canvas to unlock customGridz");
        require(gridCompleted[nextGridId] == false, "Someone already completed this grid");
        require(gridOwner[nextGridId] == address(0),"Someone already bought this grid");
        require(holdsGrid[msg.sender] == false,"You already own a Grid. Complete it before starting the next one!"); 
        grids[nextGridId] = Grid(nextGridId, size, msg.sender, false,0,0,0);
        gridOwner[nextGridId] = msg.sender;
        gridSizes[nextGridId] = size;
        holdsGrid[msg.sender] = true;
        currentGrid[msg.sender] = nextGridId;
        currentGridSize[msg.sender] = size;
        totalCustomGridz[msg.sender]++;
        customGridzAquired.push(nextGridId);
        nextGridId++;
        ownsKey[msg.sender] == false;
    }
    
    function customPixel(uint256 x, uint256 y, uint256 color) public nonReentrant{
         require(holdsGrid[msg.sender]==true,"You don't hold a uncompleted Grid!");
        uint256 gridId = currentGrid[msg.sender];
        require(gridOwner[gridId] ==msg.sender,"You don't own this Grid");
        uint256 gridSize = gridSizes[gridId]; 
        require(x <= gridSize,"the out of bounds is not paintable");
        require(y <= gridSize,"the out of bounds is not paintable");
        require(x >= 0,"the out of bounds is not paintable");
        require(y >= 0,"the out of bounds is not paintable");
        xp[msg.sender] += 10;
        totalCustomPixels[msg.sender] ++;
        emit CustomPixelChanged(msg.sender, x, y, color, gridId);
        emit CustomAmountPixel(msg.sender, pixelAmount);
    }

     function completeArtwork(uint256 price, uint256 supply) public nonReentrant {
        require(holdsGrid[msg.sender],"You don't hold a uncompleted Grid!");
        uint256 gridId = currentGrid[msg.sender];
        require(gridOwner[gridId] ==msg.sender,"You don't own this Grid");
        require(!gridCompleted[gridId],"This grid is already completed");
        require(supply > 0 && supply <= 10000, "the supply can only range between 0 and 10000");
        require(price > 0 && price <= 100000000000000000, "You can ask a maximum of 0.1 ETH per NFT");
        emit GridComplete(msg.sender, grids[gridId]);
        gridCompleted[gridId] = true;
        require(gridCompleted[gridId],"Something went wrong when completing the artwork");
        completedArtworks.push(gridId);
        gridNFTSupply[gridId] = supply;
        gridNFTPrice[gridId] = price; 
        grids[gridId]= Grid(gridId,gridSizes[gridId],msg.sender,true,gridNFTSupply[gridId], gridNFTRoyalty[gridId],gridNFTPrice[gridId]);
        currentGrid[msg.sender] = 0; 
        currentGridSize[msg.sender] = 0;
        holdsGrid[msg.sender] = false;
        totalCompletedGridz[msg.sender]++;
        xp[msg.sender] += 200;
    }

    function decreaseSupply(uint256 gridId, address sender)public payable noReentrancy{ 
     require(gridNFTSupply[gridId] > 0, "This Collection is sold out!");
     require(gridCompleted[gridId],"The artwork is not completed");
     require(msg.value ==gridNFTPrice[gridId], "Must send some Ether");
     uint256 platformFee = (gridNFTPrice[gridId] * 95)/100; //5%
     address _to = gridOwner[gridId];
     // Transfer the Ether to the recipient
        (bool success, ) = _to.call{value: platformFee}("");
        require(success, "Transfer failed");

        // Emit the transfer event
     emit NFTSold(_to, sender, platformFee,  gridId);
     gridNFTSupply[gridId] --;
     emit NFTMinted(sender,gridId);
     xp[sender] += 50;
     xp[gridOwner[gridId]] += 100;
     if(gridNFTSupply[gridId] == 0){
     emit CollectionSoldOut(gridOwner[gridId], gridId);
     xp[gridOwner[gridId]] += 1000;
     }
    }
    




     function getArrayLength() public view returns (uint) {
        return completedArtworks.length;
    }




    // Function to withdraw all Ether from this contract
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "Insufficient balance");

        // Transfer all the balance to the owner
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Transfer failed");
    }

    // Function to withdraw a specific amount of Ether from this contract
    function withdrawAmount(uint _amount) public onlyOwner {
        uint balance = address(this).balance;
        require(_amount <= balance, "Insufficient balance");

        // Transfer the specified amount to the owner
        (bool success, ) = owner.call{value: _amount}("");
        require(success, "Transfer failed");
    }


receive() external payable {
 revert("This contract does not accept Ether directly. Use paintPixel function.");
}

fallback() external payable {
    revert("Function does not exist.");
}

}
