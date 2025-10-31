# ⚡ SOKO: A P2P Energy Marketplace on Hedera

**Hackathon Track:** Track 4: AI & DePIN

This repository contains the complete source code for SOKO, a decentralized P2P energy trading platform built on Hedera.

* **Live Demo:** `https://sokoenergy.netlify.app/`
* **Demo Video:** `[LINK TO YOUR 3-MINUTE YOUTUBE VIDEO]`
* **Pitch Deck:** `[LINK TO YOUR PITCH DECK PDF]`

## Hackathon Compliance

* **Hedera Certification:** Proof of certification for our team lead is available here: `[LINK TO YOUR HEDERA CERTIFICATE]`
* **Public Repository:** This repository is public and all code is auditable.
* **Collaborator:** `Hackathon@hashgraph-association.com` has been invited as a collaborator.

---

## Project Structure

* `/soko-contracts`: The deployed Solidity smart contract (Ethers v5/Hardhat).
* `/soko-frontend`: The functional React frontend deployed on Netlify.

## Problem Statement

In many African communities, energy access is unreliable and expensive. Households with small-scale solar (producers) have no way to monetize their surplus energy, while their neighbors (consumers) have no way to buy it directly, relying on an inefficient central grid.

## Our Hedera-Based Solution

SOKO is a decentralized marketplace that tokenizes surplus energy, allowing for secure, P2P trading.

1.  **Producers** tokenize their surplus energy (e.g., 1 kWh) as `$SEWH$` tokens (an HTS token).
2.  **Producers** list these tokens for sale on our Hedera Smart Contract, setting a price in `$USDC` (another HTS token).
3.  **Consumers** browse the marketplace and purchase the `$SEWH$` tokens.
4.  The smart contract handles the **atomic swap** trustlessly.

Our future-state feature, mocked up in the UI, includes an **AI layer** to suggest optimal pricing based on grid demand and weather forecasts, fulfilling the "AI & DePIN" track.
## Hedera Integration Summary

* **Hedera Smart Contract Service (HSCS):** Our entire marketplace (`SokoMarketplaceV2.sol`) is a Solidity smart contract deployed on Hedera. It acts as a trustless escrow agent, guaranteeing that the swap of `$USDC` for `$SEWH$` is atomic. This is the core "brain" of our DePIN.

* **Hedera Token Service (HTS):** We use HTS for both tokens.
    * **$SEWH$:** Represents the Real-Word Asset (RWA) of tokenized energy.
    * **$USDC$:** Used as a stable, reliable medium of exchange.

### Transaction Types
* `ContractExecuteTransaction` (for `listEnergy` and `buyEnergy`)
* `TokenTransferTransaction` (handled by the contract via `transferFrom`)
* `TokenApproveTransaction` (handled by the user to approve token spend)

### Economic Justification

Hedera's low, fixed fees are the *only* reason this project is viable. A P2P energy sale might be for $0.20. We cannot build this on a network with high or volatile gas fees. Hedera's predictable, sub-cent fees mean that producers and consumers keep 99.9% of the value.

## Deployed Hedera IDs

* **SokoMarketplaceV2 Contract:** `0xbA62218C3f9215C6145A80d08Ef5924780f9f70d`
* **SOKO Energy ($SEWH$) Token:** `0.0.6896403` (EVM: `0x00...6bab58`)
* **USDC Token (Testnet):** `0.0.138407` (EVM: `0x00...16a44`)

## Deployment & Setup Instructions

This project is a monorepo containing two packages.

### 1. Backend (`/soko-contracts`)

The backend was deployed from a clean cloud environment (GitHub Codespaces) using Ethers.js v5 and Hardhat.

1.  `cd soko-contracts`
2.  `npm install`
3.  Create a `.env` file with `TESTNET_PRIVATE_KEY="0x...your_key..."` (or hardcode the key in `hardhat.config.js`).
4.  `npx hardhat compile`
5.  `npx hardhat run scripts/deploy.js --network hedera_testnet`

### 2. Frontend (`/soko-frontend`)

The frontend is a standard React/Vite app and is already deployed.

1.  `cd soko-frontend`
2.  `npm install`
3.  `npm run dev`
4.  The app will run on `localhost:5173`.