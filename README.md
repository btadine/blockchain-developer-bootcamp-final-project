# blockchain-developer-bootcamp-final-project
Final Project of Consensys Ethereum Bootcamp

## Physical Collectible Verification System

### The Problem

Physical collectors find it difficult to acquire authentic items with relative scarcity at online markets. Counterfeit products are common in rare and expensive item categories. Either the customer is well versed in the verification of the specific goods or may incur a high risk of getting a non-authentic item (or a different item) for their money.

### The Solution

A decentralized verification protocol based on visual media of the actual goods. The idea is to take photos or videos of your item and let the community (users represented as nodes) decide if the goods are authentic or not.

### The Workflow

1. A node uploads a "media proof set" to prove authenticity (and ownership) of a physical collectible product.
2. A transaction is created with the item metadata. Is broadcasted to the network.
3. In a manual verification system, other nodes verify the authenticity of the item based on the proofs provided.
4. If the authenticity of the product is valid, an NFT symbolizing the authenticity of the physical product is minted and sent to the node address.
5. If the physical item is traded between system participants, the NFT is transferred to the new owner ot the item.

### The Rules

1. A node cannot validate the authenticity of its items.
2. Each node can validate a set of items in exchange for validation credits.
3. Validators are divided into categories. To become a validator for a specific category, the node must pass a test proving domain knowledge.
4. A specific number of validations is required to ensure the authenticity of an item (depending on the actual value of the item, more validations may be required).
5. If the physical item is traded within the system, a unique key generated from the seller's address will be sent to the seller to prove item ownership.
6. Ownership is represented with a score, being the maximum score the day where the NFT was sent to the node address. The score decreases over time. Recent media of the item resets the ownership score to the maximum value.

