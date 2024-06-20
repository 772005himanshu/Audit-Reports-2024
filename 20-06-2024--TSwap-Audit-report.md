---
title: TSwap Audit Report
author: Rao Himanshu Yadav
date: June 10, 2024

---


<!-- Your report starts here! -->

Prepared by: [Himanshu]
Lead Auditors: 
- Himanshu

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Protocol Summary](#protocol-summary)
- [Disclaimer](#disclaimer)
- [Risk Classification](#risk-classification)
- [Audit Details](#audit-details)
  - [Scope](#scope)
- [Executive Summary](#executive-summary)
  - [Issues found](#issues-found)
- [Findings](#findings)
  - [High](#high)
    - [\[H-1\]  `TSwapPool::deposit` is missing deadline check causing transactions to complete after the deadline](#h-1--tswappooldeposit-is-missing-deadline-check-causing-transactions-to-complete-after-the-deadline)
    - [\[H-2\] Incorrect fee calculation in TSwapPool::getInputAmountBased0nOutput causes protocll to take too many tokens from users, resulting in lost fees](#h-2-incorrect-fee-calculation-in-tswappoolgetinputamountbased0noutput-causes-protocll-to-take-too-many-tokens-from-users-resulting-in-lost-fees)
    - [\[H-3\] Lack of slippage protection in `TSwapPool::swapExactOutput` causes user to potentially receive way fewer tokens](#h-3-lack-of-slippage-protection-in-tswappoolswapexactoutput-causes-user-to-potentially-receive-way-fewer-tokens)
    - [\[H-4\] TSwapPool::sellPoolTokens mismatches input and output tokens causing users to receive the incorrect amount of tokens](#h-4-tswappoolsellpooltokens-mismatches-input-and-output-tokens-causing-users-to-receive-the-incorrect-amount-of-tokens)
    - [\[H-5\] In `TSwapPool::_swap` the extra tokens given to users after every `swapCount` breaks the protocol invarinats of `x * y = k`](#h-5-in-tswappool_swap-the-extra-tokens-given-to-users-after-every-swapcount-breaks-the-protocol-invarinats-of-x--y--k)
  - [Low](#low)
    - [\[L-1\] `TSwapPool::LiquidityAdded` event has parameters out of order](#l-1-tswappoolliquidityadded-event-has-parameters-out-of-order)
    - [\[L-2\] Default value returned by `TSwapPool::swapExactInput` results in incorrect return value given](#l-2-default-value-returned-by-tswappoolswapexactinput-results-in-incorrect-return-value-given)
  - [Gas](#gas)
    - [\[G-1\] In `TSwapPool::swapExactInput` it should be `external` than `public`](#g-1-in-tswappoolswapexactinput-it-should-be-external-than-public)
  - [Informational](#informational)
    - [\[I-1\] `PoolFactory::PoolFactory__PoolDoesNotExist` is not used should be removed.](#i-1-poolfactorypoolfactory__pooldoesnotexist-is-not-used-should-be-removed)
    - [\[I-2\] Lacking zero Address checks](#i-2-lacking-zero-address-checks)
    - [\[I-3\] `PoolFactory::createPool` should use `.symbol()` instead of `.name()`](#i-3-poolfactorycreatepool-should-use-symbol-instead-of-name)
    - [\[I-4\] Event is missing `indexed` fields](#i-4-event-is-missing-indexed-fields)
    - [\[I-5\]  In `TSwapPool::swapExactInput` natspec is missing please add it. By asking to contract  author. It is helpfuk for auditor.](#i-5--in-tswappoolswapexactinput-natspec-is-missing-please-add-it-by-asking-to-contract--author-it-is-helpfuk-for-auditor)
    - [\[I-6\]  In `TSwapPool::swapExactOutput` , `deadline` natspec is missing .](#i-6--in-tswappoolswapexactoutput--deadline-natspec-is-missing-)

# Protocol Summary

Protocol does 

# Disclaimer

The Auditors team makes all effort to find as many vulnerabilities in the code in the given time period, but holds no responsibilities for the findings provided in this document. A security audit by the team is not an endorsement of the underlying business or product. The audit was time-boxed and the review of the code was solely on the security aspects of the Solidity implementation of the contracts.

# Risk Classification

|            |        | Impact |        |     |
| ---------- | ------ | ------ | ------ | --- |
|            |        | High   | Medium | Low |
|            | High   | H      | H/M    | M   |
| Likelihood | Medium | H/M    | M      | M/L |
|            | Low    | M      | M/L    | L   |

We use the [CodeHawks](https://docs.codehawks.com/hawks-auditors/how-to-evaluate-a-finding-severity) severity matrix to determine severity. See the documentation for more details.

# Audit Details 

- Commit Hash: 22bbbb2c47f3f2b78c1b134590baf41383fd354f
- In Scope:
## Scope 

```
./src/
#-- PuppyRaffle.sol
```

# Executive Summary  
I loved Auditing this codebase, Himanshu is wizard and happy to complete this practice audit report .

## Issues found
| Severity | Number of issues found |
| -------- | ---------------------- |
| High     | 5                      |
| Medium   | 0                      |
| Low      | 2                      |
| Info     | 6                      |
| Gas      | 1                      |
| Total    | 14                     |

# Findings

## High

### [H-1]  `TSwapPool::deposit` is missing deadline check causing transactions to complete after the deadline

**Description:** The `deposite` function accepts a deadline parameter which according to the documentation is "The deadline for the transaction to be completed by". Howver , this parameter is never used. As a consequence, operations that add liquidity to the pool might be executed at unexpected times, in market conditions where the deposite rate is unfavorable.

<!-- MEV attacks-->

**Impact:** Transactions could be sent when market conditions are unfavourable to deposite, even when adding a deadline parameter.


**Proof of Concept:** The `deadline` parameter is unused.

**Recommended Mitigation:**  Consider making the following change to the functions.

```diff
    function deposit(
        uint256 wethToDeposit,
        uint256 minimumLiquidityTokensToMint, // LP tokens -> liquidity Pool token we get back (if empty , we can pick 100%(100% = 17 token ))
        uint256 maximumPoolTokensToDeposit,
        uint64 deadline
    )
        external
+       revertIfDeadlinePassed(deadline)
        revertIfZero(wethToDeposit)
        returns (uint256 liquidityTokensToMint)

```

### [H-2] Incorrect fee calculation in TSwapPool::getInputAmountBased0nOutput causes protocll to take too many tokens from users, resulting in lost fees
**Description:** The getInputAmount Based0nOutput function is intended to calculate the amount of tokens a user should deposit given an amount of tokens of output tokens. However, the function currently miscalculates the resulting amount. When calculating the fee, it scales the amount by 10_000 instead of 1_000

**Impact:** Protocol takes more fees than expected from users.


**Recommended Mitigation:** 
```diff

        function getInputAmountBasedOnOutput(
        uint256 outputAmount,
        uint256 inputReserves,
        uint256 outputReserves
    )
        public
        pure
        revertIfZero(outputAmount)
        revertIfZero(outputReserves)
        returns (uint256 inputAmount)
    {
        return
-           ((inputReserves * outputAmount) * 10000) /
+           ((inputReserves * outputAmount) * 1000) /
            ((outputReserves - outputAmount) * 997);
    }

```

### [H-3] Lack of slippage protection in `TSwapPool::swapExactOutput` causes user to potentially receive way fewer tokens

**Description:** The `swapExactOutput` function does not include any sort of slippage protection.This function is similar to what is done in `TSwapPool::swapExactInput`, where the function specifies a `minOutputAmount`, the `swapExactOutput` function should specify a `maxInputAmount`.

**Impact:** If market conditions change before the transacition processes, the user could get a much worse swap.

**Proof of Concept:**
1. The price of WETH right now is 1,000 USDC
2. User inputs a `swapExactOutput` looking for 1 WETH
   1. inputToken = USDC
   2.  outputToken = WETH
   3.  outputAmount = 1
   4.  deadline = whatever
3. The function does not offer a maxInput amount
4. As the transaction is pending in the mempool, the market changes! And the price moves HUGE -> 1 WETH is now 10,000 USDC. 10x more than the user expected
5. The transaction completes, but the user sent the protocol 10,000 USDC instead of the expected 1,000 USDC

**Recommended Mitigation:** We should include a `maxInputAmount` so the user only has to spend a specified amount, and can predict how much they will spend on the protocol.

```diff

    function swapExactOutput(
        IERC20 inputToken,
+       uint256 maxInputAmount,
        IERC20 outputToken,
        uint256 outputAmount,
        uint64 deadline)

+       if(inputAmount > maxInputAmount){
+             revert TSwapPool__OutputTooLow(inputAmount,maxInputAmount)
+           }
        uint256 inputReserves = inputToken.balanceOf(address(this));
        uint256 outputReserves = outputToken.balanceOf(address(this));

```

### [H-4] TSwapPool::sellPoolTokens mismatches input and output tokens causing users to receive the incorrect amount of tokens

**Description:** The `sellPoolTokens` function is intended to allow users to easily sell pool tokens and receive WETH in exchange. Users indicate how many pool tokens they're willing to sell in the `poolTokenAmount` parameter. However, the function currently miscalculaes the swapped amount.

This is due to the fact that the `swapExactOutput` function is called, whereas the `swapExactInput` function is the one that should be called. Because users specify the exact amount of input tokens, not output. 

**Impact:** Users will swap the wrong amount of tokens,which is a severe disruption of protocol functionality.

**Proof of Concept:**

**Recommended Mitigation:** 

Consider changing the implementation to use `swapExactInput` instead of `swapExactOutput`. Note that this would also require changing the `sellPoolTokens` function to accept a new parameter(i.e `minWethToRecieve` to be passed to `swapExactInput`)

```diff
    function sellPoolTokens(
        uint256 poolTokenAmount,
+       uint256 minWethToRecieve,
    ) external returns (uint256 wethAmount) {
-       return swapExactOutput(i_poolToken,i_wethToken,poolTokenAmount,uint64(block.timestamp));
+       return swapExactOutput(i_poolToken,poolTokenAmount,i_wethToken,minWethToRecieve,uint64(block.timestamp));
    }

```

Additionally, it might be wise to add a deadline to the function, as there is currently no deadline.


### [H-5] In `TSwapPool::_swap` the extra tokens given to users after every `swapCount` breaks the protocol invarinats of `x * y = k`

**Description:** THe protocol follows a strict invariant of `x * y = k` . Where:
- `x` : The balance of the pool token
- `y` : The balance of the WETH token
- `k` : The constant product of the two balances

This means, that whenever the balances change in the protocol, the ratio between the two amounts, should emain constant, hence the `k`. However, this is broken due to the extra incentive in the `_swap` function. Meaning that over timethe protocol funds will be drained.

**Impact:** A user could maliciously drain the protocol of funds by doing a lot of swaps and collecting the extra incentive given out by the protocol.


The following block of code is responsible for the issue.

```javascript

        swap_count++;
        if (swap_count >= SWAP_COUNT_MAX) {
            swap_count = 0;
            outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
        }

```

Most simply put, the protocol's core invariants is broken.

**Proof of Concept:**
1. A user swaps 10 times, and collects the extra incentive of `1_000_000_000_000_000_000` tokens
2. That user continues to swap untill all the protocol funds are drained
<details>
<summary>Proof Of Code</summary>

```javascript

    function testInvariantBroken() public {
        vm.startPrank(liquidityProvider);
        weth.approve(address(pool), 100e18);
        poolToken.approve(address(pool), 100e18);
        pool.deposit(100e18, 100e18, 100e18, uint64(block.timestamp));
        vm.stopPrank();

        uint256 outputWeth = 1e17;

        vm.startPrank(user);
        poolToken.approve(address(pool), type(uint256).max);
        poolToken.mint(user, 100e18);
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));

        int256 startingY = int256(weth.balanceOf(address(pool)));
        int256 expectedDeltaY = int256(-1) * int256(outputWeth);

        pool.swapExactOutput(poolToken, weth, outputWeth, uint64(block.timestamp));
        vm.stopPrank();

        uint256 endingY = weth.balanceOf(address(pool));
        int256 actualDeltaY = int256(endingY) - int256(startingY);
        assertEq(actualDeltaY, expectedDeltaY);
    }

```


Place the following into `TSwapPool.t.sol`.

**Recommended Mitigation:** Remove the extra incentive mechanism.If you want to keep this in, we should account for the change in the x * y = k protocol invariant, Or,we should set aside tokens in the same way we do with fees.

```diff

-       swap_count++;
-       if (swap_count >= SWAP_COUNT_MAX) {
-           swap_count = 0;
-           outputToken.safeTransfer(msg.sender, 1_000_000_000_000_000_000);
-       }

```


## Low

### [L-1] `TSwapPool::LiquidityAdded` event has parameters out of order

**Description:** When the `LiquidityAdded` event is emitted in the `TSwapPool::_addLiquidityMintAndTransfer` function, it logs values in an incorrect order. The `poolTokensToDeposit` value should go in the third parameter position, whereas the `wethToDeposit` value should go second.

**Impact:** Event emission is incorrect, leading to off-chain functions potentially malfunctioning.

**Recommended Mitigation:** 

```diff
-emit LiquidityAdded(msg.sender, poolTokensToDeposit, wethToDeposit);
+emit LiquidityAdded(msg.sender, wethToDeposit, poolTokensToDeposit);
```

### [L-2] Default value returned by `TSwapPool::swapExactInput` results in incorrect return value given


**Description:** The `swapExactInput` function is expected to return the actual amount of tokens bought by the caller. However, while it declares the named return value `ouput` it is never assigned a value, nor uses an explict return statement.

**Impact:** The return value will always be 0, giving incorrect information to the caller

**Recommended Mitigation:** 
```diff 
    {
        uint256 inputReserves = inputToken.balanceOf(address(this));
        uint256 outputReserves = outputToken.balanceOf(address(this));

-       uint256 outputAmount = getOutputAmountBasedOnInput(inputAmount,inputReserves,outputReserves);
+       uint256 outputAmount = getOutputAmountBasedOnInput(inputAmount,inputReserves,outputReserves);

-       if (outputAmount < minOutputAmount) {
-           revert TSwapPool__OutputTooLow(outputAmount, minOutputAmount);
-       }

+       if (output < minOutputAmount) {
+           revert TSwapPool__OutputTooLow(output, minOutputAmount);
+       }

-       _swap(inputToken, inputAmount, outputToken, outputAmount);
+       _swap(inputToken, inputAmount, outputToken, output);
    
    }


```


## Gas

### [G-1] In `TSwapPool::swapExactInput` it should be `external` than `public`

## Informational

### [I-1] `PoolFactory::PoolFactory__PoolDoesNotExist` is not used should be removed.

``` diff
-      error PoolFactory__PoolDoesNotExist(address tokenAddress);
```

### [I-2] Lacking zero Address checks

```diff
    constructor(address wethToken) {
+       if(wethToken == address(0)){   
+             revert();
+       } 
        i_wethToken = wethToken;
    }
```

### [I-3] `PoolFactory::createPool` should use `.symbol()` instead of `.name()`

```diff 

-       string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).name());

+       string memory liquidityTokenSymbol = string.concat("ts", IERC20(tokenAddress).symbol());

```




### [I-4] Event is missing `indexed` fields

Index event fields make the field more quickly accessible to off-chain tools that parse events. However, note that each index field costs extra gas during emission, so it's not necessarily best to index the maximum allowed per event (three fields). Each event should use three indexed fields if there are three or more fields, and gas usage is not particularly of concern for the events in question. If there are fewer than three fields, all of the fields should be indexed.

<details><summary>4 Found Instances</summary>


- Found in src/PoolFactory.sol [Line: 35](src/PoolFactory.sol#L35)

	```solidity
	    event PoolCreated(address tokenAddress, address poolAddress);
	```

- Found in src/TSwapPool.sol [Line: 54](src/TSwapPool.sol#L54)

	```solidity
	    event LiquidityAdded(
	```

- Found in src/TSwapPool.sol [Line: 59](src/TSwapPool.sol#L59)

	```solidity
	    event LiquidityRemoved(
	```

- Found in src/TSwapPool.sol [Line: 64](src/TSwapPool.sol#L64)

	```solidity
	    event Swap(
	```

</details>

### [I-5]  In `TSwapPool::swapExactInput` natspec is missing please add it. By asking to contract  author. It is helpfuk for auditor.

### [I-6]  In `TSwapPool::swapExactOutput` , `deadline` natspec is missing .


