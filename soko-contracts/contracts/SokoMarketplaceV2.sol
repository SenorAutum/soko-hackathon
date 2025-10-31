// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SokoMarketplaceV2 is ReentrancyGuard {
    // Addresses for the tokens we interact with
    address public immutable sewhTokenAddress; // Our SOKO Energy Token
    address public immutable usdcTokenAddress; // The USDC stablecoin

    struct Listing {
        uint256 id;
        address seller;
        uint256 amountSEWH; // Amount of energy tokens
        uint256 priceUSDC;  // Price in USDC (with its decimals)
        bool active;
    }

    uint256 public nextListingId;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 indexed id, address indexed seller, uint256 amount, uint256 price);
    event Sold(uint256 indexed id, address indexed buyer, address indexed seller, uint256 amount, uint256 price);
    event Cancelled(uint256 indexed id, address indexed seller);

    constructor(address _sewhTokenAddress, address _usdcTokenAddress) {
        sewhTokenAddress = _sewhTokenAddress;
        usdcTokenAddress = _usdcTokenAddress;
    }

    /**
     * @dev The seller must first approve this contract to spend BOTH their SEWH and USDC.
     */
    function listEnergy(uint256 _amountSEWH, uint256 _priceUSDC) external {
        require(_amountSEWH > 0, "Amount must be > 0");
        require(_priceUSDC > 0, "Price must be > 0");

        // Escrow the seller's energy tokens in the contract
        IERC20(sewhTokenAddress).transferFrom(msg.sender, address(this), _amountSEWH);

        listings[nextListingId] = Listing({
            id: nextListingId,
            seller: msg.sender,
            amountSEWH: _amountSEWH,
            priceUSDC: _priceUSDC,
            active: true
        });

        emit Listed(nextListingId, msg.sender, _amountSEWH, _priceUSDC);
        nextListingId++;
    }

    /**
     * @dev The buyer must first approve this contract to spend their USDC.
     */
    function buyEnergy(uint256 _listingId) external nonReentrant {
        Listing storage listing = listings[_listingId];

        require(listing.active, "Listing is not active");
        require(msg.sender != listing.seller, "Cannot buy own listing");

        listing.active = false;

        // Pull the USDC payment from the buyer and send it to the seller
        IERC20(usdcTokenAddress).transferFrom(msg.sender, listing.seller, listing.priceUSDC);

        // Send the SEWH energy tokens to the buyer
        IERC20(sewhTokenAddress).transfer(msg.sender, listing.amountSEWH);
        
        emit Sold(_listingId, msg.sender, listing.seller, listing.amountSEWH, listing.priceUSDC);
    }
    
    function cancelListing(uint256 _listingId) external {
        Listing storage listing = listings[_listingId];
        
        require(listing.active, "Listing is not active");
        require(msg.sender == listing.seller, "Only the seller can cancel");
        
        listing.active = false;
        
        // Return the escrowed SEWH tokens to the seller
        IERC20(sewhTokenAddress).transfer(listing.seller, listing.amountSEWH);
        
        emit Cancelled(_listingId, listing.seller);
    }
}