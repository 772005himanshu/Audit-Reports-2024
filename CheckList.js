[
    {
        "category": "Attacker's Mindset",
        "description": "General check items for main attack types.",
        "data": [
            {
                "category": "Denial-Of-Service(DOS) Attack",
                "description": "Attackers overload a system, making it unavailable to legitimate users, often by exploiting design vulnerabilities or resource limitations.",
                "data": [
                    {
                        "id": "SOL-AM-DOSA-1",
                        "question": "Is the withdrawal pattern followed to prevent denial of service?",
                        "description": "To prevent denial of service attacks during withdrawals, it's critical to follow the withdrawal pattern best practices - pull based approach.",
                        "remediation": "Implement withdrawal pattern best practices to ensure that contract behavior remains predictable and robust against denial of service attacks.",
                        "references": [
                            "https://solodit.xyz/issues/m-06-denial-of-service-contract-owner-could-block-users-from-withdrawing-their-strike-code4rena-putty-putty-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-DOSA-2",
                        "question": "Is there a minimum transaction amount enforced?",
                        "description": "Enforcing a minimum transaction amount can prevent attackers from clogging the network with zero amount or dust transactions.",
                        "remediation": "Disallow transactions below a certain threshold to maintain efficiency and prevent denial of service through dust spamming.",
                        "references": [
                            "https://solodit.xyz/issues/h-02-denial-of-service-code4rena-hubble-hubble-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-DOSA-3",
                        "question": "How does the protocol handle tokens with blacklisting functionality?",
                        "description": "Tokens with blacklisting capabilities, such as USDC, can pose unique risks and challenges to protocols.",
                        "remediation": "Account for the possibility of blacklisting within token protocols to ensure continued functionality even if certain addresses are blacklisted.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-DOSA-4",
                        "question": "Can forcing the protocol to process a queue lead to DOS?",
                        "description": "Forcing protocols to process queues, like a queue of dust withdrawals, can be exploited to cause a denial of service.",
                        "remediation": "Design queue processing in a manner that is resilient to spam and cannot be exploited to cause denial of service.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-DOSA-5",
                        "question": "What happens with low decimal tokens that might cause DOS?",
                        "description": "Tokens with low decimals can present issues where the transaction process fails due to rounding to zero amounts.",
                        "remediation": "Implement logic to handle low decimal tokens in a way that prevents the transaction process from breaking due to insufficient token amounts.",
                        "references": [
                            "https://solodit.xyz/issues/potential-funds-locked-due-low-token-decimal-and-long-stream-duration-spearbit-locke-pdf"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-DOSA-6",
                        "question": "Does the protocol handle external contract interactions safely?",
                        "description": "Protocols must handle interactions with external contracts in a way that does not compromise their functionality if external dependencies fail.",
                        "remediation": "Ensure robust handling of external contract interactions to maintain protocol integrity regardless of external contract performance.",
                        "references": [
                            "https://solodit.xyz/issues/m-09-unhandled-chainlink-revert-would-lock-all-price-oracle-access-code4rena-juicebox-juicebox-v2-contest-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Donation Attack",
                "description": "An attacker sends some amount of cryptocurrency to a contract and makes the protocol accounting reaches to an unexpected state.",
                "data": [
                    {
                        "id": "SOL-AM-DA-1",
                        "question": "Does the protocol rely on `balance` or `balanceOf` instead of internal accounting?",
                        "description": "Attackers can manipulate the accounting by donating tokens.",
                        "remediation": "Implement internal accounting instead of relying on `balanceOf` natively.",
                        "references": [
                            "https://solodit.xyz/issues/h-02-first-depositor-can-break-minting-of-shares-code4rena-prepo-prepo-contest-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Front-running Attack",
                "description": "Attackers watch pending transactions and then push their own transaction with a higher gas fee, ensuring it's executed before the targeted transaction.",
                "data": [
                    {
                        "id": "SOL-AM-FrA-1",
                        "question": "Are there measures in place to prevent frontrunning vulnerabilities in get-or-create patterns?",
                        "description": "Get-or-create pattern functionality is prone to frontrunning attacks.",
                        "remediation": "Ensure the frontrunning does not cause user loss or unexpected problems.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-FrA-2",
                        "question": "Are two-transaction actions designed to be safe from frontrunning?",
                        "description": "Actions that require two separate transactions may be at risk of frontrunning, where an attacker can intervene between the two calls.",
                        "remediation": "Ensure critical actions that are split across multiple transactions cannot be interfered with by attackers. This can involve checks or locks between the transactions.",
                        "references": [
                            "https://github.com/sherlock-audit/2022-11-isomorph-judging/issues/47"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-FrA-3",
                        "question": "Can users maliciously cause others' transactions to revert by preempting with dust?",
                        "description": "Attackers may cause legitimate transactions to fail by front-running with transactions of negligible amounts.",
                        "remediation": "Implement checks to prevent transactions with non-material amounts from affecting the contract's state or execution flow.",
                        "references": [
                            "https://solodit.xyz/issues/m-12-attacker-can-grift-syndicate-staking-by-staking-a-small-amount-code4rena-stakehouse-protocol-lsd-network-stakehouse-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-FrA-4",
                        "question": "Does the protocol need a commit-reveal scheme?",
                        "description": "Without a commit-reveal scheme, actions such as votes or bids are exposed in the mempool before they are mined, allowing adversaries to see and potentially act on this information. The commit-reveal pattern maintains confidentiality until all commitments are made.",
                        "remediation": "Implement a commit-reveal scheme where users first commit a hash of their intended action and then reveal the actual action after the commitment phase is over. This protects against front-running and provides a fairer process.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Griefing Attack",
                "description": "Malicious actors intentionally cause harm to a system, often without direct profit for themselves, just to disrupt its operations or users.",
                "data": [
                    {
                        "id": "SOL-AM-GA-1",
                        "question": "Is there an external function that relies on states that can be changed by others?",
                        "description": "Malicious actors can prevent normal user transactions by making a slight change on the on-chain states. More problematic on L2 chains where tx fee is low.",
                        "remediation": "Ensure normal user actions especially important actions like withdrawal/repayment are not disturbed by other actors.",
                        "references": [
                            "https://solodit.xyz/issues/m-10-griefing-attack-to-block-withdraws-code4rena-mochi-mochi-contest-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Miner Attack",
                "description": "Miners, who validate and add transactions to the blockchain, manipulate block attributes like hash or timestamp to influence contract execution or outcomes.",
                "data": [
                    {
                        "id": "SOL-AM-MA-1",
                        "question": "Is `block.timestamp` used judiciously, especially for longer intervals?",
                        "description": "`block.timestamp` can be manipulated by miners to a small extent, so relying on it for precise timing might be risky.",
                        "remediation": "Use `block.timestamp` only where a slight inaccuracy is acceptable, such as for longer intervals.",
                        "references": [],
                        "tags": [
                            "Miner Attack"
                        ]
                    }
                ]
            },
            {
                "category": "Price Manipulation Attack",
                "description": "Malicious actors intentionally alter the price of assets on decentralized exchanges, usually to exploit dependent contracts or trades.",
                "data": [
                    {
                        "id": "SOL-AM-PMA-1",
                        "question": "How does the protocol get the price of assets?",
                        "description": "Price, or rates between assets more generally, can be manipulated if it is derived from the ratio of balance. Flash loan and donation are the well-known attack vectors used to manipulate the prices.",
                        "remediation": "Use the Chainlink oracles for the asset prices and implement internal accounting instead of relying on `balanceOf`.",
                        "references": [
                            "https://solodit.xyz/issues/h-05-flash-loan-price-manipulation-in-purchasepyroflan-code4rena-behodler-behodler-contest-git",
                            "https://solodit.xyz/issues/h-05-underlying-assets-stealing-in-autopxgmx-and-autopxglp-via-share-price-manipulation-code4rena-redacted-cartel-redacted-cartel-contest-git",
                            "https://solodit.xyz/issues/h-02-use-of-slot0-to-get-sqrtpricelimitx96-can-lead-to-price-manipulation-code4rena-maia-dao-ecosystem-maia-dao-ecosystem-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Reentrancy Attack",
                "description": "An attacker exploits a contract's logic to repeatedly call into a function before the previous invocation is complete, potentially draining funds.",
                "data": [
                    {
                        "id": "SOL-AM-ReentrancyAttack-1",
                        "question": "Is there a view function that can return a stale value during interactions?",
                        "description": "Read-only reentrancy. The read-only reentrancy is a reentrancy scenario where a view function is reentered, which in most cases is unguarded as it does not modify the contract's state. However, if the state is inconsistent, wrong values could be reported. Other protocols relying on a return value can be tricked into reading the wrong state to perform unwanted actions.",
                        "remediation": "Extend the reentrancy guard to the view functions as well.",
                        "references": [
                            "https://medium.com/@zokyo.io/read-only-reentrancy-attacks-understanding-the-threat-to-your-smart-contracts-99444c0a7334",
                            "https://solodit.xyz/issues/m-03-read-only-reentrancy-is-possible-code4rena-angle-protocol-angle-protocol-invitational-git",
                            "https://solodit.xyz/issues/h-13-balancerpairoracle-can-be-manipulated-using-read-only-reentrancy-sherlock-none-blueberry-update-git"
                        ],
                        "tags": [
                            "Reentrancy Attack"
                        ]
                    },
                    {
                        "id": "SOL-AM-ReentrancyAttack-2",
                        "question": "Is there any state change after interaction to an external contract?",
                        "description": "Untrusted external contract calls could callback leading to unexpected results such as multiple withdrawals or out-of-order events.",
                        "remediation": "Use check-effects-interactions pattern or reentrancy guards.",
                        "references": [
                            "https://www.geeksforgeeks.org/reentrancy-attack-in-smart-contracts/",
                            "https://solodit.xyz/issues/m-09-malicious-royalty-recipient-can-steal-excess-eth-from-buy-orders-code4rena-caviar-caviar-private-pools-git",
                            "https://solodit.xyz/issues/h-01-re-entrancy-in-settleauction-allow-stealing-all-funds-code4rena-kuiper-kuiper-contest-git"
                        ],
                        "tags": [
                            "Reentrancy Attack"
                        ]
                    }
                ]
            },
            {
                "category": "Replay Attack",
                "description": "Attackers resend or duplicate valid data/signature transmissions to deceive or impersonate another entity.",
                "data": [
                    {
                        "id": "SOL-AM-ReplayAttack-1",
                        "question": "Are there protections against replay attacks for failed transactions?",
                        "description": "Failed transactions can be susceptible to replay attacks if not properly protected.",
                        "remediation": "Implement nonce-based or other mechanisms to ensure that each transaction can only be executed once, preventing replay attacks.",
                        "references": [
                            "https://github.com/code-423n4/2022-03-rolla-findings/issues/45"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-AM-ReplayAttack-2",
                        "question": "Is there protection against replaying signatures on different chains?",
                        "description": "Signatures valid on one chain may be replayed on another, leading to potential security breaches.",
                        "remediation": "Use chain-specific parameters or domain separators to ensure signatures are only valid on the intended chain.",
                        "references": [
                            "https://github.com/sherlock-audit/2022-09-harpie-judging/blob/main/004-M/004-m.md"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Rug Pull",
                "description": "Developers or initial project backers abruptly withdraw their funds from a decentralized project or application, often leaving other investors at a loss.",
                "data": [
                    {
                        "id": "SOL-AM-RP-1",
                        "question": "Can the admin of the protocol pull assets from the protocol?",
                        "description": "Some protocols grant an admin with a privilege of pulling assets directly from the protocol. In general, if there is an actor that can affect the user funds directly it must be reported.",
                        "remediation": "Allow access to only the relevant parts of protocol funds, e.g. by tracking fees internally. Forcing a timelock on the admin actions can be another mitigation.",
                        "references": [
                            "https://solodit.xyz/issues/m-06-centralisation-risk-admin-role-of-tokenmanagereth-can-rug-pull-all-eth-from-the-bridge-code4rena-skale-skale-contest-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Sandwich Attack",
                "description": "Malicious actors identify a target transaction on the blockchain, and place their own before and after it, capitalizing on potentially advantageous order execution.",
                "data": [
                    {
                        "id": "SOL-AM-SandwichAttack-1",
                        "question": "Does the protocol have an explicit slippage protection on user interactions?",
                        "description": "An attacker can monitor the mempool and puts two transactions before and after the user's transaction. For example, when an attacker spots a large trade, executes their own trade first to manipulate the price, and then profits by closing their position after the user's trade is executed.",
                        "remediation": "Allow users to specify the minimum output amount and revert the transaction if it is not satisfied.",
                        "references": [
                            "https://solodit.xyz/issues/h-12-sandwich-attack-to-accruepremiumandexpireprotections-sherlock-carapace-carapace-git",
                            "https://solodit.xyz/issues/h-1-adversary-can-sandwich-oracle-updates-to-exploit-vault-sherlock-olympus-olympus-update-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Sybil Attack",
                "description": "A single adversary controls multiple nodes in a network, primarily to subvert its functionality or to gather more than their fair share of resources.",
                "data": [
                    {
                        "id": "SOL-AM-SybilAttack-1",
                        "question": "Is there a mechanism depending on the number of users?",
                        "description": "It is very easy to trigger actions using a lot of alternative addresses on blockchain. Any quorum mechanism or utilization based rewarding system can be vulnerable to sybil attacks.",
                        "remediation": "Do not rely on the number of users in quorum design.",
                        "references": [
                            "https://solodit.xyz/issues/h-7-sybil-on-withdrawal-requests-can-allow-leverage-factor-manipulation-with-flashloans-sherlock-carapace-carapace-git",
                            "https://solodit.xyz/issues/routers-can-sybil-attack-the-sponsor-vault-to-drain-funds-spearbit-connext-pdf",
                            "https://solodit.xyz/issues/h-5-staker-rewards-can-be-gathered-with-maximal-multiplier-no-matter-how-borrowers-are-overdue-sherlock-union-finance-union-finance-git"
                        ],
                        "tags": []
                    }
                ]
            }
        ]
    },
    {
        "category": "Basics",
        "description": "",
        "data": [
            {
                "category": "Access Control",
                "description": "Vulnerabilities related to access control.",
                "data": [
                    {
                        "id": "SOL-Basics-AC-1",
                        "question": "Did you clarify all the actors and their allowed interactions in the protocol?",
                        "description": "This is a general check item. Having a clear understanding of all relevant actors and interactions in the protocol is critical for security.",
                        "remediation": "List down all the actors and interactions and draw a diagram.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AC-2",
                        "question": "Are there functions lacking proper access controls?",
                        "description": "Access controls determine who can use certain functions of a contract. If these are missing or improperly implemented, it can expose the contract to unauthorized changes or withdrawals.",
                        "remediation": "Implement and rigorously test access controls like `onlyOwner` or role-based permissions to ensure only authorized users can access certain functions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AC-3",
                        "question": "Do certain addresses require whitelisting?",
                        "description": "Whitelisting allows only a specific set of addresses to interact with the contract, offering an additional layer of security against malicious actors.",
                        "remediation": "Establish a whitelisting mechanism and ensure that only trusted addresses can execute sensitive or restricted operations.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AC-4",
                        "question": "Does the protocol allow transfer of privileges?",
                        "description": "Transfer of critical privileges must be done in two-step process. A two-step transfer process, usually involving a request followed by a confirmation, adds an extra layer of security against unintentional or malicious owner changes.",
                        "remediation": "Implement a two-step transfer mechanism that requires the new actor to accept the transfer, ensuring better security and intentional ownership changes.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AC-5",
                        "question": "What happens during the transfer of privileges?",
                        "description": "The protocol needs to work consistently and reasonably even during the transfer of privileges.",
                        "remediation": "Double check how the protocol works during the transfer of privileges.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AC-6",
                        "question": "Does the contract inherit others?",
                        "description": "If you do not override a parent contract's function explicitly, the parent's one will be exposed with its visibility and probably a wrong accessibiliy.",
                        "remediation": "Make sure you check the accessibility to the parent's external/public functions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AC-7",
                        "question": "Does the contract use `tx.origin` in validation?",
                        "description": "Use of `tx.origin` for authorization may be abused by a malicious contract forwarding calls from the legitimate user. Use `msg.sender` instead. `require( tx.origin == msg.sender)` is a useful check to ensure that the `msg.sender` is an EOA(externally owned account).",
                        "remediation": "Make sure you know the difference of `tx.origin` and `msg.sender` and use properly.",
                        "references": [
                            "https://swcregistry.io/docs/SWC-115"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Array / Loop",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-AL-1",
                        "question": "What happens on the first and the last cycle of the iteration?",
                        "description": "Sometimes the first and last cycles have a different logic from others and there can be problems.",
                        "remediation": "Ensure the logic is correct for the first and the last cycles.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-4",
                        "question": "How does the protocol remove an item from an array?",
                        "description": "`delete` does not rearrange the array but just resets the element.",
                        "remediation": "Copy the last element to the index of the element to be removed and decrease the length of an array.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-5",
                        "question": "Does any function get an index of an array as an argument?",
                        "description": "If an array is supposed to be updated (removal in the middle), the indexes will change.",
                        "remediation": "Do not use an index of an array that is supposed to be updated as a parameter of a function.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-6",
                        "question": "Is the summing of variables done accurately compared to separate calculations?",
                        "description": "Direct calculation against a sum may yield different results than the sum of individual calculations, leading to precision issues.",
                        "remediation": "Ensure that summation logic is thoroughly tested and verified, especially when dealing with financial calculations to maintain accuracy.",
                        "references": [
                            "https://github.com/sherlock-audit/2022-11-isomorph-judging/issues/174"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-7",
                        "question": "Is it fine to have duplicate items in the array?",
                        "description": "In most cases, an array (especially an input array by users) is supposed to be unique.",
                        "remediation": "Add a validation to check the array is unique.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-8",
                        "question": "Is there any issue with the first and the last iteration?",
                        "description": "The first and the last iteration in loops can sometimes have edge cases that differ from other iterations, possibly leading to vulnerabilities.",
                        "remediation": "Always test the initial and the last iteration separately and ensure consistent behavior throughout all iterations.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-9",
                        "question": "Is there possibility of iteration of a huge array?",
                        "description": "Due to the block gas limit, there is a clear limitation in the amount of operation that can be handled in a transaction.",
                        "remediation": "Ensure the number of iterations is properly bounded.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-10",
                        "question": "Is there a potential for a Denial-of-Service (DoS) attack in the loop?",
                        "description": "Loops that contain external calls or are dependent on user-controlled input can be exploited to halt the contract's functions. (e.g. sending ETH to multiple users)",
                        "remediation": "Ensure a failure of a single iteration does not revert the whole operation.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-11",
                        "question": "Is `msg.value` used within a loop?",
                        "description": "`msg.value` is consistent for the whole transaction. If it is used in the for loop, it is likely there is a mistake in accounting.",
                        "remediation": "Avoid using `msg.value` inside loops. Refer to multi-call vulnerability.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-12",
                        "question": "Is there a loop to handle batch fund transfer?",
                        "description": "If there is a mechanism to transfer funds out based on some kind of shares, it is likely that there is a problem of 'dust' funds not handled correctly.",
                        "remediation": "Make sure the last transfer handles all residual.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-AL-13",
                        "question": "Is there a break or continue inside a loop?",
                        "description": "Sometimes developers overlook the edge cases that can happened due to the break or continue in the middle of the loop.",
                        "remediation": "Make sure the break or continue inside a loop does not lead to unexpected behaviors.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Event",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Event-1",
                        "question": "Does the protocol emit events on important state changes?",
                        "description": "Emitting events properly is important especially if the change is critical.",
                        "remediation": "Ensure to emit events in all important functions.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Function",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Function-1",
                        "question": "Are the inputs validated?",
                        "description": "Inputs to functions should be validated to prevent unexpected behavior.",
                        "remediation": "Ensure thorough validation. E.g. min/max for numeric values, start/end for dates, ownership of positions.",
                        "references": [
                            "https://solodit.xyz/issues/missing-owner-check-on-from-when-transferring-tokens-spearbit-clober-pdf",
                            "https://solodit.xyz/issues/m-13-bondbasesdasetdefaults-doesnt-validate-inputs-sherlock-bond-bond-protocol-git",
                            "https://solodit.xyz/issues/h-16-user-supplied-amm-pools-and-no-input-validation-allows-stealing-of-steth-protocol-fees-sherlock-swivel-illuminate-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-2",
                        "question": "Are the outputs validated?",
                        "description": "Outputs of functions should be validated to prevent unexpected behavior.",
                        "remediation": "Ensure the outputs are valid.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-3",
                        "question": "Can the function be front-run?",
                        "description": "Front-running can allow attackers to prioritize their transactions over others.",
                        "remediation": "Make sure there is no unexpected risk even if attackers front-run.",
                        "references": [
                            "https://solodit.xyz/issues/m-08-borrower-can-cause-a-dos-by-frontrunning-a-liquidation-and-repaying-as-low-as-1-wei-of-the-current-debt-code4rena-venus-protocol-venus-protocol-isolated-pools-git",
                            "https://solodit.xyz/issues/m-01-new-proposals-can-be-dosd-by-frontrunning-zachobront-none-optimismgovernormd-markdown_",
                            "https://solodit.xyz/issues/h-01-challenges-can-be-frontrun-with-de-leveraging-to-cause-lossses-for-challengers-code4rena-frankencoin-frankencoin-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-4",
                        "question": "Are the code comments coherent with the implementation?",
                        "description": "Misleading or outdated comments can result in misunderstood function behaviors.",
                        "remediation": "Keep comments updated and ensure they accurately describe the function logic.",
                        "references": [
                            "https://solodit.xyz/issues/m-08-wrong-comment-in-getfee-code4rena-yeti-finance-yeti-finance-contest-git",
                            "https://solodit.xyz/issues/m-8-wrong-change_collateral_delay-in-collateralbook-sherlock-isomorph-isomorph-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-5",
                        "question": "Can edge case inputs (0, max) result in unexpected behavior?",
                        "description": "Edge input values can lead to unexpected behavior.",
                        "remediation": "Make sure the function works as expected for the edge values.",
                        "references": [
                            "https://solodit.xyz/issues/lack-of-validation-openzeppelin-bancor-compounding-rewards-audit-markdown",
                            "https://solodit.xyz/issues/p1-m07-lack-of-input-validation-openzeppelin-eco-contracts-audit-markdown"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-6",
                        "question": "Does the function allow arbitrary user input?",
                        "description": "Implementing a function that accepts arbitrary user input and makes low-level calls based on this data introduces a significant security risk. Low-level calls in Solidity, such as call(), are powerful and can lead to unintended contract behavior if not used cautiously. With the ability for users to supply arbitrary data, they can potentially trigger unexpected paths in the contract logic, exploit reentrancy vulnerabilities, or even interact with other contracts in a malicious manner.",
                        "remediation": "Restrict the usage of low-level calls, especially when combined with arbitrary user input. Ensure that any data used in these calls is thoroughly validated and sanitized.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-7",
                        "question": "Should it be `external`/`public`?",
                        "description": "Ensure the visibility modifier is appropriate for the function's use, preventing unnecessary exposure.",
                        "remediation": "Limit function visibility to the strictest level possible (`private` or `internal`).",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-8",
                        "question": "Does this function need to be called by only EOA or only contracts?",
                        "description": "There are several edge cases regarding the caller checking mechanism, both for EOA and contracts.",
                        "remediation": "Ensure the correct access control is implemented according to the protocol's context. (read all the references)",
                        "references": [
                            "https://solodit.xyz/issues/m-15-onlyeoaex-modifier-that-ensures-call-is-from-eoa-might-not-hold-true-in-the-future-sherlock-blueberry-blueberry-git",
                            "https://solodit.xyz/issues/m-17-addressiscontract-is-not-a-reliable-way-of-checking-if-the-input-is-an-eoa-code4rena-stakehouse-protocol-lsd-network-stakehouse-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Function-9",
                        "question": "Does this function need to be restricted for specific callers?",
                        "description": "Ensure that functions modifying contract state or accessing sensitive operations are access-controlled.",
                        "remediation": "Implement access control mechanisms like `onlyOwner` or custom modifiers.",
                        "references": [
                            "https://solodit.xyz/issues/h-8-lack-of-access-control-for-mintrebalancer-and-burnrebalancer-sherlock-none-ussd-autonomous-secure-dollar-git",
                            "https://solodit.xyz/issues/h-02-anyone-can-change-approvaldisapproval-threshold-for-any-action-using-llamarelativequorum-strategy-code4rena-llama-llama-git",
                            "https://solodit.xyz/issues/anyone-can-take-a-loan-out-on-behalf-of-any-collateral-holder-at-any-terms-spearbit-astaria-pdf"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Inheritance",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Inheritance-1",
                        "question": "Is it necessary to limit visibility of parent contract's public functions?",
                        "description": "External/Public functions of all parent contracts will be exposed with the same visibility as long as they are not overridden.",
                        "remediation": "Make sure to expose only relevant functions from parent contracts.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Inheritance-2",
                        "question": "Were all necessary functions implemented to fulfill inheritance purpose?",
                        "description": "Parent contracts often assume the inheriting contracts to implement public functions to utilize the parent's functionality. Sometimes developers miss implementing them and it makes the inheritance useless.",
                        "remediation": "Make sure to expose relevant functions from parent contracts.",
                        "references": [
                            "https://solodit.xyz/issues/m-02-pauseunpause-functionalities-not-implemented-in-many-pausable-contracts-code4rena-stader-labs-stader-labs-git",
                            "https://twitter.com/bytes032/status/1736065591536935366"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Inheritance-3",
                        "question": "Has the contract implemented an interface?",
                        "description": "Interfaces are used by other protocols to interact with the protocol. Missing implementation will lead to unexpected cases.",
                        "remediation": "Make sure to implement all functions specified in the interface.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Inheritance-4",
                        "question": "Does the inheritance order matter?",
                        "description": "Inheriting contracts in the wrong order can lead to unexpected behavior, e.g. storage allocation.",
                        "remediation": "Verify the inheritance chain is ordered from 'most base-like' to 'most derived' to prevent issues like incorrect variable initialization.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Initialization",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Initialization-1",
                        "question": "Are important state variables initialized properly?",
                        "description": "Overlooking explicit initialization of state variables can lead to critical issues.",
                        "remediation": "Make sure to initialize all state variables correctly.",
                        "references": [
                            "https://solodit.xyz/issues/h-01-mintersolstartinflation-can-be-bypassed-code4rena-backd-backd-tokenomics-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Initialization-2",
                        "question": "Has the contract inherited OpenZeppelin's Initializable?",
                        "description": "If the contract is supposed to be inherited by other contracts, `onlyInitializing` modifier MUST be used instead of `initializer`.",
                        "remediation": "Make sure to use the correct modifier for the initializer function.",
                        "references": [
                            "https://solodit.xyz/issues/h-03-wrong-implementation-of-eip712metatransaction-code4rena-rolla-rolla-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Initialization-3",
                        "question": "Does the contract have a separate initializer function other than a constructor?",
                        "description": "Initializer function can be front-run right after the deployment. The impact is critical if the initializer sets the access controls.",
                        "remediation": "Use the factory pattern to allow only the factory to call the initializer or ensure it is not front-runnable in the deploy script.",
                        "references": [
                            "https://solodit.xyz/issues/initialization-functions-can-be-front-run-trailofbits-advanced-blockchain-pdf"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Map",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Map-1",
                        "question": "Is there need to delete the existing item from a map?",
                        "description": "If a variable of nested structure is deleted, only the top-level fields are reset by default values (zero) and the nested level fields are not reset.",
                        "remediation": "Always ensure that inner fields are deleted before the outer fields of the structure.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Math",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Math-1",
                        "question": "Is the mathematical calculation accurate?",
                        "description": "Ensure that the logic behind any mathematical operation is correctly implemented.",
                        "remediation": "Verify calculations against established mathematical rules in the document or the comments.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-2",
                        "question": "Is there any loss of precision in time calculations?",
                        "description": "Loss of precision can lead to significant errors over time or frequent calculations.",
                        "remediation": "Use appropriate data types and ensure rounding methods are correctly applied.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-3",
                        "question": "Are you aware that expressions like `1 day` are cast to `uint24`, potentially causing overflows?",
                        "description": "Operations with certain expressions might lead to unintended data type conversions.",
                        "remediation": "Always be explicit with data types and avoid relying on implicit type conversions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-4",
                        "question": "Is there any case where dividing is done before multiplication?",
                        "description": "Multiplying before division is generally better to keep the precision.",
                        "remediation": "To avoid loss of precision, always multiply first and then divide.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-5",
                        "question": "Does the rounding direction matter?",
                        "description": "Rounding direction often matters when the accounting relies on user's shares.",
                        "remediation": "Use the proper rounding direction in favor of the protocol",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-6",
                        "question": "Is there a possibility of division by zero?",
                        "description": "Division by zero will revert the transaction.",
                        "remediation": "Always check denominators before division.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-7",
                        "question": "Even in versions like `>0.8.0`, have you ensured variables won't underflow or overflow leading to reverts?",
                        "description": "Variables can sometimes exceed their bounds, causing reverts.",
                        "remediation": "Use checks to prevent variable underflows and overflows.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-8",
                        "question": "Are you aware that assigning a negative value to an unsigned integer causes a revert?",
                        "description": "Unsigned integers cannot hold negative values.",
                        "remediation": "Always ensure that only non-negative values are assigned to unsigned integers.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-9",
                        "question": "Have you properly reviewed all usages of `unchecked{}`?",
                        "description": "Arithmetics do not overflow inside the `unchecked{}` block.",
                        "remediation": "Use `unchecked{}` only when it is strictly guaranteed that no overflow/underflow happens.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-10",
                        "question": "In comparisons using < or >, should you instead be using \u2264 or \u2265?",
                        "description": "Usage of incorrect inequality can cause unexpected behavior for the edge values.",
                        "remediation": "Review the logic and ensure the appropriate comparison operators are used.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-11",
                        "question": "Have you taken into consideration mathematical operations in inline assembly?",
                        "description": "Inline assembly can behave differently than high-level language constructs. (division by zero, overflow/underflow do not revert!)",
                        "remediation": "Ensure mathematical operations in inline assembly are properly tested and verified.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Math-12",
                        "question": "What happens for the minimum/maximum values included in the calculation?",
                        "description": "If the calculation includes numerous terms, you need to confirm all edge cases where each term has the possible min/max values.",
                        "remediation": "Ensure the edge cases do not lead to unexpected outcome.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Payment",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Payment-1",
                        "question": "Is it possible for the receiver to revert?",
                        "description": "There are cases where a receiver contract can deny the transaction. For example, a malicious receiver can have a fallback to revert. If a caller tried to send funds using `transfer` or `send`, the whole transaction will revert. (Meanwhile, `call()` does not revert but returns a boolean)",
                        "remediation": "Make sure that the receiver can not deny the payment or add a backup handler with a try-catch.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Payment-2",
                        "question": "Does the function gets the payment amount as a parameter?",
                        "description": "For ETH deposits, `msg.value` must be checked if it is not less than the amount specified.",
                        "remediation": "Require `msg.value==amount`.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Payment-3",
                        "question": "Are there vulnerabilities related to force-feeding?",
                        "description": "Certain actions like self-destruct, deterministic address feeding, and coinbase transactions can be used to force-feed contracts.",
                        "remediation": "Ensure the contract behaves as expected when receiving unexpected funds.",
                        "references": [
                            "https://scsfg.io/hackers/unexpected-ether/"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Payment-4",
                        "question": "What is the minimum deposit/withdrawal amount?",
                        "description": "Dust deposit/withdrawal often can lead to various vulnerabilities, e.g. rounding issue in accounting or Denial-Of-Service.",
                        "remediation": "Add a threshold for the deposit/withdrawal amount.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Payment-5",
                        "question": "How is the withdrawal handled?",
                        "description": "The best practice in withdrawal process is to implement pull-based approach. Track the accounting and let users pull the payments instead of sending funds proactively.",
                        "remediation": "Implement pull-based approach in withdrawals.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Payment-6",
                        "question": "Is `transfer()` or `send()` used for sending ETH?",
                        "description": "The transfer() and send() functions forward a fixed amount of 2300 gas. Historically, it has often been recommended to use these functions for value transfers to guard against reentrancy attacks. However, the gas cost of EVM instructions may change significantly during hard forks which may break already deployed contract systems that make fixed assumptions about gas costs. For example. EIP 1884 broke several existing smart contracts due to a cost increase of the SLOAD instruction.",
                        "remediation": "Use `call()` to prevent potential gas issues.",
                        "references": [
                            "https://solodit.xyz/issues/use-call-instead-of-transfer-cyfrin-none-woosh-deposit-vault-markdown",
                            "https://solodit.xyz/issues/m-5-call-should-be-used-instead-of-transfer-on-an-address-payable-sherlock-dodo-dodo-git",
                            "https://solodit.xyz/issues/m-10-addresscallvaluex-should-be-used-instead-of-payabletransfer-code4rena-debt-dao-debt-dao-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Payment-7",
                        "question": "Is it possible for native ETH to be locked in the contract?",
                        "description": "If a `payable` function does not transfer all ETH passed in `msg.value` and the contract does not have a withdraw method, ETH will be locked in the contract",
                        "remediation": "Make sure either no ETH remains in the contract at the end of `payable` functions or make sure there is a `withdraw` function.",
                        "references": [
                            "https://solodit.xyz/issues/m-09-bathbuddy-locks-up-ether-it-receives-code4rena-rubicon-rubicon-contest-git",
                            "https://solodit.xyz/issues/m-22-eth-sent-when-calling-executeassmartwallet-function-can-be-lost-code4rena-stakehouse-protocol-lsd-network-stakehouse-contest-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Proxy/Upgradable",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-PU-1",
                        "question": "Is there a constructor in the proxied contract?",
                        "description": "Proxied contract can't have a constructor and it's common to move constructor logic to an external initializer function, usually called initialize",
                        "remediation": "Use initializer functions for initialization of proxied contracts.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-2",
                        "question": "Is the `initializer` modifier applied to the `initialization()` function?",
                        "description": "Without the `initializer` modifier, there is a risk that the initialization function can be called multiple times.",
                        "remediation": "Always use the `initializer` modifier for initialization functions in proxied contracts and ensure they're called once during deployment.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-3",
                        "question": "Is the upgradable version used for initialization?",
                        "description": "Upgradable contracts must use the upgradable versions of parent initializer functions. (e.g. Pausable vs PausableUpgradable)",
                        "remediation": "Use upgradable versions of parent initializer functions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-4",
                        "question": "Is the `authorizeUpgrade()` function properly secured in a UUPS setup?",
                        "description": "Inadequate security on the `authorizeUpgrade()` function can allow unauthorized upgrades.",
                        "remediation": "Ensure proper access controls and checks are in place for the `authorizeUpgrade()` function.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-5",
                        "question": "Is the contract initialized?",
                        "description": "An uninitialized contract can be taken over by an attacker. This applies to both a proxy and its implementation contract, which may impact the proxy.",
                        "remediation": "To prevent the implementation contract from being used, invoke the `_disableInitializers` function in the constructor to automatically lock it when it is deployed.",
                        "references": [
                            "https://docs.openzeppelin.com/contracts/4.x/api/proxy#Initializable"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-6",
                        "question": "Are `selfdestruct` and `delegatecall` used within the implementation contracts?",
                        "description": "Using `selfdestruct` and `delegatecall` in implementation contracts can introduce vulnerabilities and unexpected behavior in a proxy setup.",
                        "remediation": "Avoid using `selfdestruct` and `delegatecall` in implementation contracts to ensure contract stability and security.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-7",
                        "question": "Are values in immutable variables preserved between upgrades?",
                        "description": "Immutable variables are stored in the bytecode, not in the proxy storage. So using immutable variable is not recommended in proxy setup. If used, make sure all immutables stay consistent across implementations during upgrades.",
                        "remediation": "Avoid using immutable variables in upgradable contracts.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-8",
                        "question": "Has the contract inherited the correct branch of OpenZeppelin library?",
                        "description": "Sometimes developers overlook and use an incorrect branch of OZ library, e.g. use Ownable instead of OwnableUpgradeable.",
                        "remediation": "Make sure inherit the correct branch of OZ library according to the contract's upgradeability design.",
                        "references": [
                            "https://solodit.xyz/issues/h-01-usage-of-an-incorrect-version-of-ownbale-library-can-potentially-malfunction-all-onlyowner-functions-code4rena-covalent-covalent-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-9",
                        "question": "Could an upgrade of the contract result in storage collision?",
                        "description": "Storage collisions can occur when storage layouts between contract versions conflict, leading to data corruption and unpredictable behavior.",
                        "remediation": "Maintain a consistent storage layout between upgrades, and when using inheritance, set storage gaps to avoid potential collisions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-PU-10",
                        "question": "Are the order and types of storage variables consistent between upgrades?",
                        "description": "Changing the order or type of storage variables between upgrades can lead to storage collisions.",
                        "remediation": "Maintain a consistent order and type for storage variables across contract versions to avoid storage collisions.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Type",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Basics-Type-1",
                        "question": "Is there a forced type casting?",
                        "description": "Explicit type casting does not revert on overflow/underflow.",
                        "remediation": "Avoid a forced type casting as much as possible and ensure values are in the range of type limit.",
                        "references": [
                            "https://solodit.xyz/issues/risk-of-token-theft-due-to-unchecked-type-conversion-trailofbits-none-primitive-hyper-pdf"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Basics-Type-2",
                        "question": "Does the protocol use time units like `days`?",
                        "description": "The time units are of `uint8` type and this can lead to unintended overflow.",
                        "remediation": "Double check the calculations including time units and ensure there is no overflow for reasonable values.",
                        "references": [
                            "https://solodit.xyz/issues/m-05-expiration-calculation-overflows-if-call-option-duration-195-days-code4rena-cally-cally-contest-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Version Issues",
                "description": "Vulnerabilities related to versions.",
                "data": [
                    {
                        "category": "EIP Adoption Issues",
                        "description": "Vulnerabilities related to specific EIP.",
                        "data": [
                            {
                                "id": "SOL-Basics-VI-EAI-1",
                                "question": "EIP-4758: Does the contract use `selfdestruct()`?",
                                "description": "`selfdestruct` will not be available after EIP-4758. This EIP will rename the SELFDESTRUCT opcode and replace its functionality.",
                                "remediation": "Do not use `selfdestruct` to ensure the contract works in the future.",
                                "references": [
                                    "https://eips.ethereum.org/EIPS/eip-4758",
                                    "https://solodit.xyz/issues/m-09-selfdestruct-will-not-be-available-after-eip-4758-code4rena-escher-escher-contest-git",
                                    "https://solodit.xyz/issues/m-03-system-will-not-work-anymore-after-eip-4758-code4rena-axelar-network-axelar-network-git"
                                ],
                                "tags": []
                            }
                        ]
                    },
                    {
                        "category": "OpenZeppelin Version Issues",
                        "description": "Vulnerabilities related to specific OpenZeppelin versions.",
                        "data": [
                            {
                                "id": "SOL-Basics-VI-OVI-1",
                                "question": "Does the contract use `ERC2771Context`? (version >=4.0.0 <4.9.3)",
                                "description": "`ERC2771Context._msgData()` reverts if `msg.data.length < 20`. The correct behavior is not specified in ERC-2771, but based on the specified behavior of `_msgSender` we assume the full `msg.data` should be returned in this case.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-2",
                                "question": "Does the contract use OpenZeppelin's GovernorCompatibilityBravo? (version >=4.3.0 <4.8.3)",
                                "description": "GovernorCompatibilityBravo may trim proposal calldata. The proposal creation entrypoint (propose) in GovernorCompatibilityBravo allows the creation of proposals with a signatures array shorter than the calldatas array. This causes the additional elements of the latter to be ignored, and if the proposal succeeds the corresponding actions would eventually execute without any calldata. The ProposalCreated event correctly represents what will eventually execute, but the proposal parameters as queried through getActions appear to respect the original intended calldata.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-3",
                                "question": "Does the contract use OpenZeppelin's ECDSA.recover or ECDSA.tryRecover? (version <4.7.3)",
                                "description": "ECDSA signature malleability. The functions ECDSA.recover and ECDSA.tryRecover are vulnerable to a kind of signature malleability due to accepting EIP-2098 compact signatures in addition to the traditional 65 byte signature format. This is only an issue for the functions that take a single bytes argument, and not the functions that take r, v, s or r, vs as separate arguments. The potentially affected contracts are those that implement signature reuse or replay protection by marking the signature itself as used rather than the signed message or a nonce included in it. A user may take a signature that has already been submitted, submit it again in a different form, and bypass this protection.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-4",
                                "question": "Does the contract use OpenZeppelin's ERC777? (version <3.4.0-rc.0)",
                                "description": "Extending this contract with a custom _beforeTokenTransfer function could allow a reentrancy attack to happen. More specifically, when burning tokens, _beforeTokenTransfer is invoked before the send hook is externally called on the sender while token balances are adjusted afterwards. At the moment of the call to the sender, which can result in reentrancy, state managed by _beforeTokenTransfer may not correspond to the actual token balances or total supply.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-5",
                                "question": "Does the contract use OpenZeppelin's `MerkleProof`? (version >=4.7.0 <4.9.2)",
                                "description": "When the `verifyMultiProof`, `verifyMultiProofCalldata`, `processMultiProof`, or `processMultiProofCalldata` functions are in use, it is possible to construct merkle trees that allow forging a valid multiproof for an arbitrary set of leaves.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-6",
                                "question": "Does the contract use OpenZeppelin's Governor or GovernorCompatibilityBravo? (version >=4.3.0 <4.9.1)",
                                "description": "Governor proposal creation may be blocked by frontrunning. By frontrunning the creation of a proposal, an attacker can become the proposer and gain the ability to cancel it. The attacker can do this repeatedly to try to prevent a proposal from being proposed at all. This impacts the Governor contract in v4.9.0 only, and the GovernorCompatibilityBravo contract since v4.3.0.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-7",
                                "question": "Does the contract use OpenZeppelin's TransparentUpgradeableProxy? (version >=3.2.0 <4.8.3)",
                                "description": "Transparency is broken in case of selector clash with non-decodable calldata. The TransparentUpgradeableProxy uses the ifAdmin modifier to achieve transparency. If a non-admin address calls the proxy the call should be frowarded transparently. This works well in most cases, but the forwarding of some functions can fail if there is a selector conflict and decoding issue.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-8",
                                "question": "Does the contract use OpenZeppelin's ERC721Consecutive?(version >=4.8.0 <4.8.2)",
                                "description": "The ERC721Consecutive contract designed for minting NFTs in batches does not update balances when a batch has size 1 and consists of a single token. Subsequent transfers from the receiver of that token may overflow the balance as reported by balanceOf. The issue exclusively presents with batches of size 1.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-9",
                                "question": "Does the contract use OpenZeppelin's ERC165Checker or ERC165CheckerUpgradeable? (version >=2.3.0 <4.7.2)",
                                "description": "Denial of Service (DoS) in the `supportsERC165InterfaceUnchecked()` function in `ERC165Checker.sol` and `ERC165CheckerUpgradeable.sol`, which can consume excessive resources when processing a large amount of data via an EIP-165 supportsInterface query.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-10",
                                "question": "Does the contract use OpenZeppelin's LibArbitrumL2 or CrossChainEnabledArbitrumL2? (version >=4.6.0 <4.7.2)",
                                "description": "Incorrect resource transfer between spheres via contracts using the cross-chain utilities for Arbitrum L2: `CrossChainEnabledArbitrumL2` or `LibArbitrumL2`. Calls from EOAs would be classified as cross-chain calls. The vulnerability will classify direct interactions of externally owned accounts (EOAs) as cross-chain calls, even though they are not started on L1.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-11",
                                "question": "Does the contract use OpenZeppelin's GovernorVotesQuorumFraction? (version >=4.3.0 <4.7.2)",
                                "description": "Checkpointing quorum was missing and past proposals that failed due to lack of quorum could pass later. It is necessary to avoid quorum changes making old, failed because of quorum, proposals suddenly successful.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-12",
                                "question": "Does the contract use OpenZeppelin's SignatureChecker? (version >=4.1.0 <4.7.1)",
                                "description": "Since 0.8.0, abi.decode reverts if the bytes raw data overflow the target type. SignatureChecker.isValidSignatureNow is not expected to revert. However, an incorrect assumption about Solidity 0.8's abi.decode allows some cases to revert, given a target contract that doesn't implement EIP-1271 as expected. The contracts that may be affected are those that use SignatureChecker to check the validity of a signature and handle invalid signatures in a way other than reverting.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-13",
                                "question": "Does the contract use OpenZeppelin's ERC165Checker? (version >=4.0.0 <4.7.1)",
                                "description": "Since 0.8.0, abi.decode reverts if the bytes raw data overflow the target type. ERC165Checker.supportsInterface is designed to always successfully return a boolean, and under no circumstance revert. However, an incorrect assumption about Solidity 0.8's abi.decode allows some cases to revert, given a target contract that doesn't implement EIP-165 as expected, specifically if it returns a value other than 0 or 1. The contracts that may be affected are those that use ERC165Checker to check for support for an interface and then handle the lack of support in a way other than reverting.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-14",
                                "question": "Does the contract use OpenZeppelin's GovernorCompatibilityBravo? (version >=4.3.0 <4.4.2)",
                                "description": "GovernorCompatibilityBravo incorrect ABI encoding may lead to unexpected behavior",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-15",
                                "question": "Does the contract use OpenZeppelin's Initializable? (version >=3.2.0 <4.4.1)",
                                "description": "It is possible for `initializer()`-protected functions to be executed twice, if this happens in the same transaction. For this to happen, either one call has to be a subcall the other, or both call have to be subcalls of a common initializer()-protected function. This can particularly be dangerous is the initialization is not part of the proxy construction, and reentrancy is possible by executing an external call to an untrusted address.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-16",
                                "question": "Does the contract use OpenZeppelin's ERC1155? (version >=4.2.0 <4.3.3)",
                                "description": "Possible inconsistency in the value returned by totalSupply DURING a mint. If you mint a token, the receiver is a smart contract, and the receiver implements onERC1155Receive, then this receiver is called with the balance already updated, but with the totalsupply not yet updated.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-17",
                                "question": "Does the contract use OpenZeppelin's UUPSUpgradeable? (version >=4.1.0 <4.3.2)",
                                "description": "Upgradeable contracts using UUPSUpgradeable may be vulnerable to an attack affecting uninitialized implementation contracts.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-OVI-18",
                                "question": "Does the contract use OpenZeppelin's TimelockController? (version >=4.0.0-beta.0 <4.3.1\\\\n<3.4.2)",
                                "description": "A vulnerability in TimelockController allowed an actor with the executor role to take immediate control of the timelock, by resetting the delay to 0 and escalating privileges, thus gaining unrestricted access to assets held in the contract. Instances with the executor role set to 'open' allow anyone to use the executor role, thus leaving the timelock at risk of being taken over by an attacker.",
                                "remediation": "Use the latest stable OpenZeppelin version",
                                "references": [],
                                "tags": []
                            }
                        ]
                    },
                    {
                        "category": "Solidity Version Issues",
                        "description": "Vulnerabilities related to specific Solidity versions.",
                        "data": [
                            {
                                "id": "SOL-Basics-VI-SVI-1",
                                "question": "Does the contract encode storage structs or arrays with types under 32 bytes directly using experimental ABIEncoderV2? (version 0.5.0~0.5.6)",
                                "description": "Storage structs and arrays with types shorter than 32 bytes can cause data corruption if encoded directly from storage using the experimental ABIEncoderV2.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2019/03/26/solidity-optimizer-and-abiencoderv2-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-2",
                                "question": "Are there any instances where empty strings are directly passed to function calls? (version ~0.4.11)",
                                "description": "If an empty string is used in a function call, the following function arguments will not be correctly passed to the function.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-3",
                                "question": "Does the optimizer replace specific constants with alternative computations? (version ~0.4.10)",
                                "description": "In some situations, the optimizer replaces certain numbers in the code with routines that compute different numbers.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2017/05/03/solidity-optimizer-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-4",
                                "question": "Does the contract use `abi.encodePacked`, especially in hash generation? (version >= 0.8.17)",
                                "description": "If you use `keccak256(abi.encodePacked(a, b))` and both `a` and `b` are dynamic types, it is easy to craft collisions in the hash value by moving parts of `a` into `b` and vice-versa. More specifically, `abi.encodePacked(\\'a\\', \\'bc\\') == abi.encodePacked(\\'ab\\', \\'c\\').",
                                "remediation": "Use `abi.encode` instead of `abi.encodePacked`.",
                                "references": [
                                    "https://solodit.xyz/issues/m-1-abiencodepacked-allows-hash-collision-sherlock-nftport-nftport-git",
                                    "https://docs.soliditylang.org/en/v0.8.17/abi-spec.html?highlight=collisions#non-standard-packed-mode"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-5",
                                "question": "BUILD: Is the contract optimized using sequences containing FullInliner with non-expression-split code? (version 0.6.7~0.8.20)",
                                "description": "Optimizer sequences containing FullInliner do not preserve the evaluation order of arguments of inlined function calls in code that is not in expression-split form.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2023/07/19/full-inliner-non-expression-split-argument-evaluation-order-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-6",
                                "question": "Are there any functions that conditionally terminate inside an inline assembly? (version 0.8.13~0.8.16)",
                                "description": "Calling functions that conditionally terminate the external EVM call using the assembly statements ``return(...)`` or ``stop()`` may result in incorrect removals of prior storage writes.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2022/09/08/storage-write-removal-before-conditional-termination/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-7",
                                "question": "Are tuples containing a statically-sized calldata array at the end being ABI-encoded? (version 0.5.8~0.8.15)",
                                "description": "ABI-encoding a tuple with a statically-sized calldata array in the last component would corrupt 32 leading bytes of its first dynamically encoded component.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2022/08/08/calldata-tuple-reencoding-head-overflow-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-8",
                                "question": "Does the contract have functions that copy `bytes` arrays from memory or calldata directly to storage? (version 0.0.1~0.8.14)",
                                "description": "Copying ``bytes`` arrays from memory or calldata to storage may result in dirty storage values.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2022/06/15/dirty-bytes-array-to-storage-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-9",
                                "question": "Is there a function with multiple inline assembly blocks? (version 0.8.13~0.8.14)",
                                "description": "The Yul optimizer may incorrectly remove memory writes from inline assembly blocks, that do not access solidity variables.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2022/06/15/inline-assembly-memory-side-effects-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-10",
                                "question": "Is a nested array being ABI-encoded or passed directly to an external function? (version 0.5.8~0.8.13)",
                                "description": "ABI-reencoding of nested dynamic calldata arrays did not always perform proper size checks against the size of calldata and could read beyond `calldatasize()`.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2022/05/17/calldata-reencode-size-check-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-11",
                                "question": "Is `abi.encodeCall` used together with fixed-length bytes literals? (version 0.8.11~0.8.12)",
                                "description": "Literals used for a fixed length bytes parameter in ``abi.encodeCall`` were encoded incorrectly.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2022/03/16/encodecall-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-12",
                                "question": "Is there any user defined types based on types shorter than 32 bytes? (version =0.8.8)",
                                "description": "User defined value types with underlying type shorter than 32 bytes used incorrect storage layout and wasted storage",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2021/09/29/user-defined-value-types-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-13",
                                "question": "Is there an immutable variable of signed integer type shorter than 256 bits? (version 0.6.5~0.8.8)",
                                "description": "Immutable variables of signed integer type shorter than 256 bits can lead to values with invalid higher order bits if inline assembly is used.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2021/09/29/signed-immutables-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-14",
                                "question": "Is there any use of `abi.encode` on memory with multi-dimensional array or structs? (version 0.4.16~0.8.3)",
                                "description": "If used on memory byte arrays, result of the function ``abi.decode`` can depend on the contents of memory outside of the actual byte array that is decoded.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2021/04/21/decoding-from-memory-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-15",
                                "question": "Is there an inline assembly block with `keccak256` inside? (version ~0.8.2)",
                                "description": "The bytecode optimizer incorrectly re-used previously evaluated Keccak-256 hashes. You are unlikely to be affected if you do not compute Keccak-256 hashes in inline assembly.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2021/03/23/keccak-optimizer-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-16",
                                "question": "Is there a copy of an empty `bytes` or `string` from `memory` or `calldata` to `storage`? (version ~0.7.3)",
                                "description": "Copying an empty byte array (or string) from memory or calldata to storage can result in data corruption if the target array's length is increased subsequently without storing new data.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2020/10/19/empty-byte-array-copy-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-17",
                                "question": "Is there a dynamically-sized storage-array with types of size at most 16 bytes? (version ~0.7.2)",
                                "description": "When assigning a dynamically-sized array with types of size at most 16 bytes in storage causing the assigned array to shrink, some parts of deleted slots were not zeroed out.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2020/10/07/solidity-dynamic-array-cleanup-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-18",
                                "question": "Does the library use contract types in events? (version 0.5.0~0.5.7)",
                                "description": "Contract types used in events in libraries cause an incorrect event signature hash",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-19",
                                "question": "Does the contract use internal library functions with calldata parameters via `using for`? (version =0.6.9)",
                                "description": "Function calls to internal library functions with calldata parameters called via ``using for`` can result in invalid data being read.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-20",
                                "question": "Are string literals with double backslashes passed directly to external or encoding functions with ABIEncoderV2 enabled? (version 0.5.14~0.6.7)",
                                "description": "String literals containing double backslash characters passed directly to external or encoding function calls can lead to a different string being used when ABIEncoderV2 is enabled.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-21",
                                "question": "Does the contract access slices of dynamic arrays, especially multi-dimensional ones? (version 0.6.0~0.6.7)",
                                "description": "Accessing array slices of arrays with dynamically encoded base types (e.g. multi-dimensional arrays) can result in invalid data being read.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-22",
                                "question": "Is there a contract with creation code, no constructor, but a base with a constructor that accepts non-zero values? (version 0.4.5~0.6.7)",
                                "description": "The creation code of a contract that does not define a constructor but has a base that does define a constructor did not revert for calls with non-zero value.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-23",
                                "question": "Does the contract create extremely large memory arrays? (version 0.2.0~0.6.4)",
                                "description": "The creation of very large memory arrays can result in overlapping memory regions and thus memory corruption.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2020/04/06/memory-creation-overflow-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-24",
                                "question": "Does the contract's inline assembly with Yul optimizer use assignments inside for loops combined with continue or break? (version =0.6.0)",
                                "description": "The Yul optimizer can remove essential assignments to variables declared inside for loops when Yul's continue or break statement is used. You are unlikely to be affected if you do not use inline assembly with for loops and continue and break statements.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-25",
                                "question": "Does the contract allow private methods to be overridden by inheriting contracts? (version 0.3.0~0.5.16)",
                                "description": "Private methods can be overridden by inheriting contracts.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-26",
                                "question": "Is there any Yul's continue or break statement inside the loop?? (version 0.5.8~0.5.15)",
                                "description": "The Yul optimizer can remove essential assignments to variables declared inside for loops when Yul's continue or break statement is used. You are unlikely to be affected if you do not use inline assembly with for loops and continue and break statements.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-27",
                                "question": "Are both experimental ABIEncoderV2 and Yul optimizer activated? (version =0.5.14)",
                                "description": "If both the experimental ABIEncoderV2 and the experimental Yul optimizer are activated, one component of the Yul optimizer may reuse data in memory that has been changed in the meantime.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-28",
                                "question": "Does the contract read from calldata structs with dynamic yet statically-sized members? (version 0.5.6~0.5.10)",
                                "description": "Reading from calldata structs that contain dynamically encoded, but statically-sized members can result in incorrect values.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-29",
                                "question": "Does the contract assign arrays of signed integers to differently typed storage arrays? (version 0.4.7~0.5.9)",
                                "description": "Assigning an array of signed integers to a storage array of different type can lead to data corruption in that array.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2019/06/25/solidity-storage-array-bugs/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-30",
                                "question": "Does the contract directly encode storage arrays with structs or static arrays in external calls or abi.encode*? (version 0.4.16~0.5.9)",
                                "description": "Storage arrays containing structs or other statically-sized arrays are not read properly when directly encoded in external function calls or in abi.encode*.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2019/06/25/solidity-storage-array-bugs/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-31",
                                "question": "Does the contract's constructor accept structs or arrays with dynamic arrays? (version 0.4.16~0.5.8)",
                                "description": "A contract's constructor that takes structs or arrays that contain dynamically-sized arrays reverts or decodes to invalid data.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-32",
                                "question": "Are uninitialized internal function pointers created in the constructor being called? (version 0.5.0~0.5.7)",
                                "description": "Calling uninitialized internal function pointers created in the constructor does not always revert and can cause unexpected behavior.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-33",
                                "question": "Are uninitialized internal function pointers created in the constructor being called? (version 0.4.5~0.4.25)",
                                "description": "Calling uninitialized internal function pointers created in the constructor does not always revert and can cause unexpected behavior.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-34",
                                "question": "Does the library use contract types in events? (version 0.3.0~0.4.25)",
                                "description": "Contract types used in events in libraries cause an incorrect event signature hash",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-35",
                                "question": "Does the contract encode storage structs or arrays with types under 32 bytes directly using experimental ABIEncoderV2? (version 0.4.19~0.4.25)",
                                "description": "Storage structs and arrays with types shorter than 32 bytes can cause data corruption if encoded directly from storage using the experimental ABIEncoderV2.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2019/03/26/solidity-optimizer-and-abiencoderv2-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-36",
                                "question": "Does the contract's optimizer handle byte opcodes with a second argument of 31 or an equivalent constant expression? (version 0.5.5~0.5.6)",
                                "description": "The optimizer incorrectly handles byte opcodes whose second argument is 31 or a constant expression that evaluates to 31. This can result in unexpected values.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2019/03/26/solidity-optimizer-and-abiencoderv2-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-37",
                                "question": "Are there double bitwise shifts with large constants that might sum up to overflow 256 bits? (version =0.5.5)",
                                "description": "Double bitwise shifts by large constants whose sum overflows 256 bits can result in unexpected values.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2019/03/26/solidity-optimizer-and-abiencoderv2-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-38",
                                "question": "Is the ** operator used with an exponent type shorter than 256 bits? (version ~0.4.24)",
                                "description": "Using the ** operator with an exponent of type shorter than 256 bits can result in unexpected values.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2018/09/13/solidity-bugfix-release/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-39",
                                "question": "Are structs used in the logged events? (version 0.4.17~0.4.24)",
                                "description": "Using structs in events logged wrong data.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2018/09/13/solidity-bugfix-release/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-40",
                                "question": "Are functions returning multi-dimensional fixed-size arrays called? (version 0.1.4~0.4.21)",
                                "description": "Calling functions that return multi-dimensional fixed-size arrays can result in memory corruption.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2018/09/13/solidity-bugfix-release/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-41",
                                "question": "Does the contract use both new-style and old-style constructors simultaneously? (version =0.4.22)",
                                "description": "If a contract has both a new-style constructor (using the constructor keyword) and an old-style constructor (a function with the same name as the contract) at the same time, one of them will be ignored.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-42",
                                "question": "Is there a function name crafted to potentially override the fallback function execution? (version ~0.4.17)",
                                "description": "It is possible to craft the name of a function such that it is executed instead of the fallback function in very specific circumstances.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-43",
                                "question": "Is the low-level .delegatecall() used without checking the actual execution outcome? (version 0.3.0~0.4.14)",
                                "description": "The low-level .delegatecall() does not return the execution outcome, but converts the value returned by the functioned called to a boolean instead.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-44",
                                "question": "Is the ecrecover() function used without validating its input? (version ~0.4.13)",
                                "description": "The ecrecover() builtin can return garbage for malformed input.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-45",
                                "question": "Is the `.selector` member accessed on complex expressions? (version 0.6.2~0.8.20)",
                                "description": "Accessing the ``.selector`` member on complex expressions leaves the expression unevaluated in the legacy code generation.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2023/07/19/missing-side-effects-on-selector-access-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-46",
                                "question": "Is there any inconsistency (`memory` vs `calldata`) in the param type during inheritance? (version 0.6.9~0.8.13)",
                                "description": "It was possible to change the data location of the parameters or return variables from ``calldata`` to ``memory`` and vice-versa while overriding internal and public functions. This caused invalid code to be generated when calling such a function internally through virtual function calls.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [
                                    "https://blog.soliditylang.org/2022/05/17/data-location-inheritance-bug/"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-47",
                                "question": "Are there any functions with the same name and parameter type inside the same contract? (version =0.7.1)",
                                "description": "The compiler does not flag an error when two or more free functions with the same name and parameter types are defined in a source unit or when an imported free function alias shadows another free function with a different name but identical parameter types.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Basics-VI-SVI-48",
                                "question": "Does the contract use tuple assignments with multi-stack-slot components, like nested tuples or dynamic calldata references? (version 0.1.6~0.6.5)",
                                "description": "Tuple assignments with components that occupy several stack slots, i.e. nested tuples, pointers to external functions or references to dynamically sized calldata arrays, can result in invalid values.",
                                "remediation": "Use the latest Solidity version.",
                                "references": [],
                                "tags": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "category": "Centralization Risk",
        "description": "",
        "data": [
            {
                "id": "SOL-CR-1",
                "question": "What happens to the user accounting in special conditions?",
                "description": "Users must be allowed to manage their existing positions in all protocol status. For example, users must be able to repay the debt even when the protocol is paused or the protocol should not accrue debts when it is paused.",
                "remediation": "Ensure user positions are protected in special/emergent protocol situations.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-CR-2",
                "question": "Is there a pause mechanism?",
                "description": "Some functionalities must work even when the whole protocol is paused. For example, users must be able to withdraw (or repay) assets even while the protocol is paused.",
                "remediation": "Review the pause mechanism thoroughly to ensure that it only affects intended functions and can't be abused by a malicious operator.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-CR-3",
                "question": "Is there a functionality for the admin to withdraw from the protocol?",
                "description": "Some protocols are written to allow admin pull any amount of assets from the pool. This is a red flag and MUST be disallowed. The best practice is to track the protocol fee and only allow access to that amount.",
                "remediation": "Ensure the admin can not steal user funds. Track the protocol earning separately.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-CR-4",
                "question": "Can the admin change critical protocol property immediately?",
                "description": "Changes in the critical protocol properties MUST go through a cooling period to allow users react on the changes.",
                "remediation": "Implement a timelock for the critical property changes and emit proper events.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-CR-5",
                "question": "Is there any admin setter function missing events?",
                "description": "Events are often used to monitor the protocol status. Without emission of events, users might be affected due to ignorance of the changes.",
                "remediation": "Emit proper events on critical configuration changes.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-CR-6",
                "question": "How is the ownership/privilege transferred??",
                "description": "Critical privileges MUST be transferred via a two-step process and the protocol MUST behave as expected before/during/after transfer.",
                "remediation": "Use two-step process for transferring critical privileges and ensure the protocol works properly before/during/after the transfer.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-CR-7",
                "question": "Is there a proper validation in privileged setter functions?",
                "description": "The validation on the protocol configuration values is often overlooked assuming the admin is trusted. But it is always recommended clarifying the range of each configuration value and validate in setter functions. (e.g. protocol fee should be limited)",
                "remediation": "Ensure the protocol level properties are properly validated in the documented range.",
                "references": [],
                "tags": []
            }
        ]
    },
    {
        "category": "Defi",
        "description": "",
        "data": [
            {
                "category": "AMM/Swap",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Defi-AS-1",
                        "question": "Is hardcoded slippage used?",
                        "description": "Using hardcoded slippage can lead to poor trades and freezing user funds during times of high volatility.",
                        "remediation": "Allow users to specify the slippage parameter in the actual asset amount which was calculated off-chain.",
                        "references": [
                            "https://dacian.me/defi-slippage-attacks#heading-on-chain-slippage-calculation-can-be-manipulated"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-2",
                        "question": "Is there a deadline protection?",
                        "description": "Without deadline protection, user transactions are vulnerable to sandwich attacks.",
                        "remediation": "Allow a user specify the deadline of the swap.",
                        "references": [
                            "https://defihacklabs.substack.com/p/solidity-security-lesson-6-defi-slippage?utm_source=profile&utm_medium=reader2"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-3",
                        "question": "Is there a validation check for protocol reserves?",
                        "description": "Protocols may face risks if reserves are not validated and can be lent out, affecting the system's solvency.",
                        "remediation": "Ensure reserve validation logic is in place to safeguard the protocol's liquidity and overall health.",
                        "references": [
                            "https://github.com/sherlock-audit/2022-08-sentiment-judging/blob/main/122-M/1-report.md"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-4",
                        "question": "Does the AMM utilize forked code?",
                        "description": "Using forked code, especially from known projects like Uniswap, can introduce known vulnerabilities if not updated or audited properly.",
                        "remediation": "Review the differences. Utilize tools such as contract-diff.xyz to compare and identify the origin of code snippets.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-5",
                        "question": "Are there rounding issues in product constant formulas?",
                        "description": "Rounding issues in the formulas can lead to inaccuracies or imbalances in token swaps and liquidity provisions.",
                        "remediation": "Review the mathematical operations in the AMM's formulas, ensuring they handle rounding appropriately without introducing vulnerabilities.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-6",
                        "question": "Can arbitrary calls be made from user input?",
                        "description": "Allowing arbitrary calls based on user input can expose the contract to various vulnerabilities.",
                        "remediation": "Validate and sanitize user inputs. Avoid executing arbitrary calls based solely on input data.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-7",
                        "question": "Is there a mechanism in place to protect against excessive slippage?",
                        "description": "Without slippage protection, traders might experience unexpected losses due to large price deviations during a trade.",
                        "remediation": "Incorporate a slippage parameter that users can set to limit their maximum acceptable slippage.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-8",
                        "question": "Does the AMM properly handle tokens of varying decimal configurations and token types?",
                        "description": "If the AMM doesn't support tokens with varying decimals or types, it might lead to incorrect calculations and potential losses.",
                        "remediation": "Ensure compatibility with tokens of varying decimal places and validate token types before processing them.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-9",
                        "question": "Does the AMM support the fee-on-transfer tokens?",
                        "description": "Fee-on-transfer tokens can cause problems because the sending amount and the received amount do not match.",
                        "remediation": "Ensure the fee-on-transfer tokens are handled correctly if they are supposed to be supported.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-10",
                        "question": "Does the AMM support the rebasing tokens?",
                        "description": "Rebasing tokens can change the actual balance.",
                        "remediation": "Ensure the rebasing tokens are handled correctly if they are supposed to be supported.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-11",
                        "question": "Does the protocol calculate `minAmountOut` before a token swap?",
                        "description": "Protocols integrating AMMs should determine the `minAmountOut` prior to swaps to avoid unfavorable rates. The source of the rates and potential for manipulation should also be considered.",
                        "remediation": "Ensure that the protocol calculates `minAmountOut` before executing swaps. If external oracles are used, validate their trustworthiness and consider potential vulnerabilities like sandwich attacks.",
                        "references": [
                            "https://blog.chain.link/guide-to-sandwich-attacks/"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-12",
                        "question": "Does the integrating contract verify the caller address in its callback functions?",
                        "description": "Callback functions can be manipulated if they don't validate the calling contract's address. This is especially crucial for functions like `swap()` that involve tokens or assets.",
                        "remediation": "Implement checks in the callback functions to validate the address of the calling contract. Additionally, review the logic for any potential bypasses to this check.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-13",
                        "question": "Is the slippage calculated on-chain?",
                        "description": "ON-chain slippage calculation can be manipulated.",
                        "remediation": "Allow users to specify the slippage parameter in the actual asset amount which was calculated off-chain.",
                        "references": [
                            "https://dacian.me/defi-slippage-attacks#heading-on-chain-slippage-calculation-can-be-manipulated"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-AS-14",
                        "question": "Is the slippage parameter enforced at the last step before transferring funds to users?",
                        "description": "Enforcing slippage parameters for intermediate swaps but not the final step can result in users receiving less tokens than their specified minimum",
                        "remediation": "Enforce slippage parameter as the last step before transferring funds to users",
                        "references": [
                            "https://dacian.me/defi-slippage-attacks#heading-mintokensout-for-intermediate-not-final-amount"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "FlashLoan",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Defi-FlashLoan-1",
                        "question": "Is withdraw disabled in the same block to prevent flashloan attacks?",
                        "description": "Allowing withdrawals within the same block as other interactions may enable attackers to exploit flashloan vulnerabilities.",
                        "remediation": "Implement a delay or disable withdrawals within the same block where a deposit or loan action took place to mitigate such risks.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-FlashLoan-2",
                        "question": "Can ERC4626 be manipulated through flashloans?",
                        "description": "ERC4626, the tokenized vault standard, could be susceptible to flashloan attacks if the underlying mechanisms do not adequately account for such threats.",
                        "remediation": "Ensure that ERC4626-related operations have in-built protections against rapid, in-block actions that could be leveraged by flashloans.",
                        "references": [
                            "https://github.com/code-423n4/2022-01-behodler-findings/issues/304"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "General",
                "description": "Common vulnerabilities of general Defi protocols",
                "data": [
                    {
                        "id": "SOL-Defi-General-1",
                        "question": "Can the protocol handle ERC20 tokens with decimals other than 18?",
                        "description": "Not all ERC20 tokens use 18 decimals. Overlooking this can lead to computation errors.",
                        "remediation": "Always check and adjust for the decimal count of the ERC20 tokens being handled.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-2",
                        "question": "Are there unexpected rewards accruing for user deposited assets?",
                        "description": "Some protocols or platforms may provide additional rewards for staked or deposited assets. If these rewards are not properly accounted for or managed, it could lead to discrepancies in the user's expected vs actual returns.",
                        "remediation": "The protocol should have mechanisms in place to track all potential rewards for user deposited assets. Users should be provided with clear interfaces or methods to claim any unexpected rewards to ensure fairness and transparency.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-3",
                        "question": "Could direct transfers of funds introduce vulnerabilities?",
                        "description": "Direct transfers of assets without using the protocol's logic can lead to various problems in accounting especially if the accounting relies on `balanceOf` (or `address.balance`).",
                        "remediation": "Implement the internal accounting so that it is not be affected by direct transfers.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-4",
                        "question": "Could the initial deposit introduce any issues?",
                        "description": "The first deposit can set certain parameters or conditions that subsequent deposits rely on.",
                        "remediation": "Test and ensure that the first deposit initializes and sets all necessary parameters correctly.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-5",
                        "question": "Are the protocol token pegged to any other asset?",
                        "description": "The target tokens can be depegged.",
                        "remediation": "Ensure the protocol behave as expected during the depeg.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-6",
                        "question": "Does the protocol revert on maximum approval to prevent over-allowance?",
                        "description": "Setting high allowances can make funds vulnerable to abuse; protocols sometimes set max to prevent this risk.",
                        "remediation": "Consider implementing a revert on approval functions when an unnecessarily high allowance is set.",
                        "references": [
                            "https://solodit.xyz/issues/m-3-universalapprovemax-will-not-work-for-some-tokens-that-dont-support-approve-typeuint256max-amount-sherlock-dodo-dodo-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-7",
                        "question": "What would happen if only 1 wei remains in the pool?",
                        "description": "Leaving residual amounts can lead to discrepancies in accounting or locked funds.",
                        "remediation": "Implement logic to handle minimal residual amounts in the pool.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-8",
                        "question": "Is it possible to withdraw in the same transaction of deposit?",
                        "description": "Protocols often provide various benefits to the depositors based on the deposit amount. This can lead to flashloan-deposit-harvest-withdraw attack cycle.",
                        "remediation": "Ensure the withdrawal is protected for some blocks after deposit.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-General-9",
                        "question": "Does the protocol aim to support ALL kinds of ERC20 tokens?",
                        "description": "Not all ERC20 tokens are compliant to the ERC20 standard and there are several weird ERC20 tokens (e.g. Fee-On-Transfer tokens, rebasing tokens, tokens with blacklisting).",
                        "remediation": "Clarify what kind of tokens are supported and whitelist the ERC20 tokens that the protocol would accept.",
                        "references": [
                            "https://github.com/d-xo/weird-erc20"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Lending",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Defi-Lending-1",
                        "question": "Will the liquidation process function effectively during rapid market downturns?",
                        "description": "Failure to liquidate positions during sharp price drops can result in substantial platform losses.",
                        "remediation": "Ensure robustness during extreme market conditions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-2",
                        "question": "Can a position be liquidated if the loan remains unpaid or if the collateral falls below the required threshold?",
                        "description": "If positions cannot be liquidated under these circumstances, it poses a risk to lenders who might not recover their funds.",
                        "remediation": "Ensure a reliable mechanism for liquidating under-collateralized or defaulting loans to safeguard lenders.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-3",
                        "question": "Is it possible for a user to gain undue profit from self-liquidation?",
                        "description": "Self-liquidation profit loopholes can lead to potential system abuse and unintended financial consequences.",
                        "remediation": "Audit and test self-liquidation mechanisms to prevent any exploitative behaviors.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-4",
                        "question": "If token transfers or collateral additions are temporarily paused, can a user still be liquidated, even if they intend to deposit more funds?",
                        "description": "Unexpected pauses can place users at risk of unwarranted liquidations, despite their willingness to increase collateral.",
                        "remediation": "Implement safeguards that protect users from liquidation during operational pauses or interruptions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-5",
                        "question": "If liquidations are temporarily suspended, what are the implications when they are resumed?",
                        "description": "Pausing liquidations can increase the solvency risk and lead to unpredictable behaviors upon resumption.",
                        "remediation": "Outline clear protocols for pausing and resuming liquidations, ensuring solvency is maintained.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-6",
                        "question": "Is it possible for users to manipulate the system by front-running and slightly increasing their collateral to prevent liquidations?",
                        "description": "Lenders must be prevented from griefing via front-running the liquidation.",
                        "remediation": "Ensure it is not possible to prevent liquidators by any means.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-7",
                        "question": "Are all positions, regardless of size, incentivized adequately for liquidation?",
                        "description": "Without proper incentives, small positions might be overlooked, leading to inefficiencies.",
                        "remediation": "Ensure a balanced incentive structure that motivates liquidators to address positions of all sizes.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-8",
                        "question": "Is interest considered during Loan-to-Value (LTV) calculation?",
                        "description": "Omitting interest in LTV calculations can result in inaccurate credit assessments.",
                        "remediation": "Include accrued interest in LTV calculations to maintain accurate and fair credit evaluations.",
                        "references": [
                            "https://solodit.xyz/issues/h-7-users-can-be-liquidated-prematurely-because-calculation-understates-value-of-underlying-position-sherlock-blueberry-blueberry-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-9",
                        "question": "Can liquidation and repaying be enabled or disabled simultaneously?",
                        "description": "Protocols might need to ensure that liquidation and repaying mechanisms are either both active or inactive to maintain consistency.",
                        "remediation": "Review protocol logic to allow or disallow liquidation and repaying functions collectively to avoid operational discrepancies.",
                        "references": [
                            "https://solodit.xyz/issues/m-2-liquidations-are-enabled-when-repayments-are-disabled-causing-borrowers-to-lose-funds-without-a-chance-to-repay-sherlock-blueberry-blueberry-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-10",
                        "question": "Is it possible to lend and borrow the same token within a single transaction?",
                        "description": "Protocols that allow the same token to be lent and borrowed in a single transaction may be vulnerable to attacks that exploit rapid price inflation or flash loans to manipulate the system.",
                        "remediation": "Protocols should implement constraints to prohibit the same token from being used in a lend and borrow action within the same block or transaction, reducing the risk of flash-loan attacks and other manipulative practices.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-11",
                        "question": "Is there a scenario where a liquidator might receive a lesser amount than anticipated?",
                        "description": "Discrepancies in liquidation returns can discourage liquidators and impact system stability.",
                        "remediation": "Ensure a clear and consistent calculation mechanism for liquidation rewards.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Lending-12",
                        "question": "Is it possible for a user to be in a condition where they cannot repay their loan?",
                        "description": "Certain scenarios or conditions might prevent a user from repaying their loan, causing them to be perpetually in debt. This can be due to factors such as excessive collateralization, high fees, fluctuating token values, or other unforeseen events.",
                        "remediation": "Review the lending protocol's logic to ensure there are no conditions that could trap a user in perpetual debt. Implement safeguards to notify or protect users from taking actions that may lead to irrecoverable financial situations.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Oracle",
                "description": "Price oracle related vulnerabilities",
                "data": [
                    {
                        "id": "SOL-Defi-Oracle-1",
                        "question": "Is the Oracle using deprecated Chainlink functions?",
                        "description": "Usage of deprecated Chainlink functions like latestRoundData() might return stale or incorrect data, affecting the integrity of smart contracts.",
                        "remediation": "Replace deprecated functions with the current recommended methods to ensure accurate data retrieval from oracles.",
                        "references": [
                            "https://github.com/code-423n4/2022-04-backd-findings/issues/17"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-2",
                        "question": "Is the returned price validated to be non-zero?",
                        "description": "Price feed might return zero and this must be handled as invalid.",
                        "remediation": "Ensure the returned price is not zero.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-3",
                        "question": "Is the price update time validated?",
                        "description": "Price feeds might not be supported in the future. To ensure accurate price usage, it's vital to regularly check the last update timestamp against a predefined delay.",
                        "remediation": "Implement a mechanism to check the heartbeat of the price feed and compare it against a predefined maximum delay (`MAX_DELAY`). Adjust the `MAX_DELAY` variable based on the observed heartbeat.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-4",
                        "question": "Is there a validation to check if the rollup sequencer is running?",
                        "description": "The rollup sequencer can become offline, which can lead to potential vulnerabilities due to stale price.",
                        "remediation": "Utilize the sequencer uptime feed to confirm the sequencers are up.",
                        "references": [
                            "https://docs.chain.link/data-feeds/l2-sequencer-feeds"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-5",
                        "question": "Is the Oracle's TWAP period appropriately set?",
                        "description": "An inadequately set TWAP (Time-Weighted Average Price) period could be exploited to manipulate prices.",
                        "remediation": "Adjust the TWAP period to a duration that mitigates the risk of manipulation while providing timely price updates.",
                        "references": [
                            "https://github.com/code-423n4/2022-06-canto-v2-findings/issues/124"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-6",
                        "question": "Is the desired price feed pair supported across all deployed chains?",
                        "description": "In multi-chain deployments, it's crucial to ensure the desired price feed pair is available and consistent across all chains.",
                        "remediation": "Review the supported price feed pairs on all chains and ensure they are consistent.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-7",
                        "question": "Is the heartbeat of the price feed suitable for the use case?",
                        "description": "A price feed heartbeat that's too slow might not be suitable for some use cases.",
                        "remediation": "Assess the requirements of the use case and ensure the price feed heartbeat aligns with them.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-8",
                        "question": "Are there any inconsistencies with decimal precision when using different price feeds?",
                        "description": "Different price feeds might have varying decimal precisions, which can lead to inaccuracies.",
                        "remediation": "Ensure that the contract handles potential variations in decimal precision across different price feeds.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-9",
                        "question": "Is the price feed address hard-coded?",
                        "description": "Hard-coded price feed addresses can be problematic, especially if they become deprecated or if they're not accurate in the first place.",
                        "remediation": "Review and verify the hardcoded price feed addresses. Consider mechanisms to update the address if required in the future.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-10",
                        "question": "What happens if oracle price updates are front-run?",
                        "description": "Oracle price updates can be front-run and cause various problems.",
                        "remediation": "Ensure the protocol is not affected in the case where oracle price updates are front-run.",
                        "references": [
                            "https://blog.angle.money/angle-research-series-part-1-oracles-and-front-running-d75184abc67"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-11",
                        "question": "How does the system handle potential oracle reverts?",
                        "description": "Unanticipated oracle reverts can lead to Denial-Of-Service.",
                        "remediation": "Implement try/catch blocks around oracle calls and have alternative strategies ready.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-12",
                        "question": "Are the price feeds appropriate for the underlying assets?",
                        "description": "Using an ETH price feed for stETH or a BTC price feed for WBTC can introduce risks associated with the underlying assets deviating from their pegs.",
                        "remediation": "Ensure that the price feeds accurately represent the underlying assets to address potential depeg risks.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-13",
                        "question": "Is the contract vulnerable to oracle manipulation, especially using spot prices from AMMs?",
                        "description": "Reliance on AMM spot prices as oracles can be manipulated via flashloan.",
                        "remediation": "Choose reliable and tamper-resistant oracle sources. Avoid using spot prices from AMMs directly without additional checks.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Oracle-14",
                        "question": "How does the system address potential inaccuracies during flash crashes?",
                        "description": "During flash crashes, oracles might return inaccurate prices.",
                        "remediation": "Implement checks to ensure that the price returned by the oracle lies within an expected range to guard against potential flash crash vulnerabilities.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Staking",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Defi-Staking-1",
                        "question": "Can a user amplify another user's time lock duration by stacking tokens on their behalf?",
                        "description": "If users can amplify time locks for others by stacking tokens, it may lead to unintended lock durations and potentially be exploited.",
                        "remediation": "Implement strict checks and controls to prevent users from influencing the time locks of other users through token stacking.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Staking-2",
                        "question": "Can the distribution of rewards be unduly delayed or prematurely claimed?",
                        "description": "Manipulation in the timing of reward distribution can adversely affect users and the protocol's intended incentives.",
                        "remediation": "Implement time controls and constraints on reward distributions to maintain the protocol's intended behavior.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Defi-Staking-3",
                        "question": "Are rewards up-to-date in all use-cases?",
                        "description": "The staking protocol often has a function to update the rewards (e.g. `updateRewards`) and sometimes it is used as a modifier. This update function MUST be called before all relevant operations.",
                        "remediation": "Ensure the update reward function is called properly in all places where the reward is relevant.",
                        "references": [],
                        "tags": []
                    }
                ]
            }
        ]
    },
    {
        "category": "External Call",
        "description": "",
        "data": [
            {
                "id": "SOL-EC-1",
                "question": "What are the implications if the call reenters a different function?",
                "description": "Reentrant calls to different functions can unpredictably alter contract states. Note that view functions should be checked as well to prevent the Readonly Reentrancy.",
                "remediation": "Ensure the contract state is maintained reasonably during the external interactions.",
                "references": [
                    "https://medium.com/@zokyo.io/read-only-reentrancy-attacks-understanding-the-threat-to-your-smart-contracts-99444c0a7334",
                    "https://solodit.xyz/issues/m-03-read-only-reentrancy-is-possible-code4rena-angle-protocol-angle-protocol-invitational-git"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-2",
                "question": "Is there a multi-call?",
                "description": "Mismanagement of `msg.value` across multiple calls can lead to vulnerabilities.",
                "remediation": "Do not use ETH in multicall.",
                "references": [
                    "https://solodit.xyz/issues/m-08-passing-multiple-eth-deposits-in-orders-array-will-use-the-same-msgvalue-many-times-code4rena-nested-finance-nested-finance-contest-git"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-3",
                "question": "What are the risks associated with using delegatecall in smart contracts?",
                "description": "A delegatecall is a low-level function call that delegates the execution of a function in another contract while maintaining the original contract's context. It can lead to critical vulnerabilities if the destination address is not secure or can be altered by an unauthorized party.",
                "remediation": "Use delegatecall only with trusted contracts, and ensure that the address to be delegated to is not changeable by unauthorized users. Implement strong access controls and audit the code for potential security issues before deployment.",
                "references": [],
                "tags": [
                    "SWC-112"
                ]
            },
            {
                "id": "SOL-EC-4",
                "question": "Is the external contract call necessary?",
                "description": "Unnecessary external calls can introduce vulnerabilities.",
                "remediation": "Evaluate and eliminate non-essential external contract calls.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-EC-5",
                "question": "Has the called address been whitelisted?",
                "description": "Calling untrusted addresses can lead to malicious actions.",
                "remediation": "Ensure that only whitelisted or trusted contract addresses are called.",
                "references": [
                    "https://solodit.xyz/issues/too-generic-calls-in-genericbridgefacet-allow-stealing-of-tokens-spearbit-lifi-pdf",
                    "https://solodit.xyz/issues/hardcode-or-whitelist-the-axelar-destinationaddress-spearbit-lifi-pdf"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-6",
                "question": "Is there suspicion when a fixed gas amount is specified?",
                "description": "Specifying fixed gas amounts can lead to out-of-gas vulnerabilities.",
                "remediation": "Use dynamic gas estimation or ensure sufficient gas is available before the call.",
                "references": [
                    "https://solodit.xyz/issues/m-02-fixed-amount-of-gas-sent-in-call-may-be-insufficient-code4rena-joyn-joyn-contest-git",
                    "https://solodit.xyz/issues/a-malicious-fee-receiver-can-cause-a-denial-of-service-trailofbits-nftx-protocol-v2-pdf"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-7",
                "question": "What happens if the call consumes all provided gas?",
                "description": "Calls that consume all available gas can halt subsequent actions.",
                "remediation": "Ensure enough gas is reserved for post-call tasks or use dynamic gas estimation.",
                "references": [
                    "https://solodit.xyz/issues/a-malicious-fee-receiver-can-cause-a-denial-of-service-trailofbits-nftx-protocol-v2-pdf",
                    "https://solodit.xyz/issues/poison-order-that-consumes-gas-can-block-market-trades-wont-fix-consensys-0x-v3-exchange-markdown"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-8",
                "question": "Is the contract passing large data to an unknown address?",
                "description": "Large data passed to untrusted addresses may be exploited for griefing.",
                "remediation": "Limit data passed or employ inline assembly to manage data transfer.",
                "references": [
                    "https://solodit.xyz/issues/h-2-malicious-user-can-use-an-excessively-large-_toaddress-in-oftcoresendfrom-to-break-layerzero-communication-sherlock-uxd-uxd-protocol-git"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-9",
                "question": "What happens if the call returns vast data?",
                "description": "External calls returning vast data can deplete available gas.",
                "remediation": "Limit or verify data size returned from external sources.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-EC-10",
                "question": "Are there any delegate calls to non-library contracts?",
                "description": "Non-library delegate calls can alter the state of the calling contract.",
                "remediation": "Thoroughly review and verify such delegate calls so that the delegate calls do not change the caller's state unexpectedly.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-EC-11",
                "question": "Is there a strict policy against delegate calls to untrusted contracts?",
                "description": "Delegate calls grant the called contract the context of the caller, risking state alterations.",
                "remediation": "Restrict delegate calls to only trusted, reviewed, and audited contracts.",
                "references": [
                    "https://solodit.xyz/issues/m-01-delegate-call-in-vault_execute-can-alter-vaults-ownership-code4rena-fractional-fractional-v2-contest-git"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-12",
                "question": "Is the address's existence verified?",
                "description": "Calling non-existent addresses can lead to unintended behaviors. Low level calls (call, delegate call and static call) return success if the called contract doesn't exist (not deployed or destructed)",
                "remediation": "Verify the existence of an address before making a call.",
                "references": [
                    "https://solodit.xyz/issues/h-02-non-existing-revenue-contract-can-be-passed-to-claimrevenue-to-send-all-tokens-to-treasury-code4rena-debt-dao-debt-dao-contest-git",
                    "https://solodit.xyz/issues/m-10-call-to-non-existing-contracts-returns-success-code4rena-biconomy-biconomy-hyphen-20-contest-git",
                    "https://solodit.xyz/issues/lack-of-contract-existence-check-on-delegatecall-will-result-in-unexpected-behavior-trailofbits-degate-pdf",
                    "https://solodit.xyz/issues/m-02-solmates-erc20-does-not-check-for-token-contracts-existence-which-opens-up-possibility-for-a-honeypot-attack-code4rena-size-size-contest-git",
                    "https://solodit.xyz/issues/m-25-vault-can-be-created-for-not-yet-existing-erc20-tokens-which-allows-attackers-to-set-traps-to-steal-nfts-from-borrowers-code4rena-astaria-astaria-git",
                    "https://solodit.xyz/issues/calls-made-to-non-existentremoved-routes-or-controllers-will-not-result-in-failure-consensys-socket-markdown"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-13",
                "question": "Is the check-effect-interaction pattern being utilized?",
                "description": "The check-effect-interaction pattern prevents reentrancy attacks.",
                "remediation": "Adhere to the CEI pattern and use `reentrancyGuard` judiciously.",
                "references": [
                    "https://www.geeksforgeeks.org/reentrancy-attack-in-smart-contracts/",
                    "https://solodit.xyz/issues/m-09-malicious-royalty-recipient-can-steal-excess-eth-from-buy-orders-code4rena-caviar-caviar-private-pools-git",
                    "https://solodit.xyz/issues/h-01-re-entrancy-in-settleauction-allow-stealing-all-funds-code4rena-kuiper-kuiper-contest-git"
                ],
                "tags": []
            },
            {
                "id": "SOL-EC-14",
                "question": "How is the msg.sender handled?",
                "description": "On interacting with external contracts, the caller becomes a new `msg.sender` instead of the original caller.",
                "remediation": "Ensure the validation is in place to check the actor is handled correctly.",
                "references": [
                    "https://solodit.xyz/issues/swapinternal-shouldnt-use-msgsender-spearbit-connext-pdf",
                    "https://solodit.xyz/issues/m-01-onlycentrifugechainorigin-cant-require-msgsender-equal-axelargateway-code4rena-centrifuge-centrifuge-git"
                ],
                "tags": []
            }
        ]
    },
    {
        "category": "Hash / Merkle Tree",
        "description": "",
        "data": [
            {
                "id": "SOL-HMT-1",
                "question": "Is the Merkle tree vulnerable to front-running attacks?",
                "description": "When using a merkle tree, the new proof is calculated at a certain time and there exists a period of time between when the proof is generated and the proof is published.",
                "remediation": "Ensure that front-running the merkle proof setting does not affect the protocol.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-HMT-2",
                "question": "Does the claim method validate `msg.sender`?",
                "description": "Validation of `msg.sender` is critical in the use of Merkle tree.",
                "remediation": "Ensure that the `msg.sender` is actually the same address included in the leave.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-HMT-3",
                "question": "What is the result when passing a zero hash to the Merkle tree functions?",
                "description": "Passing the zero hash can lead to unintended behaviors or vulnerabilities if not properly handled.",
                "remediation": "Implement checks to handle zero hash values appropriately and prevent potential misuse.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-HMT-4",
                "question": "What occurs if the same proof is duplicated within the Merkle tree?",
                "description": "Duplicate proofs within a Merkle tree can lead to double-spending or other vulnerabilities.",
                "remediation": "Ensure the Merkle tree construction and verification process detects and prevents the use of duplicate proofs.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-HMT-5",
                "question": "Are the leaves of the Merkle tree hashed with the claimable address included?",
                "description": "Not including claimable addresses when hashing leaves can let an attacker to claim.",
                "remediation": "Ensure that the Merkle tree construction includes the hashing of claimable addresses within the leaves.",
                "references": [],
                "tags": []
            }
        ]
    },
    {
        "category": "Heuristics",
        "description": "",
        "data": [
            {
                "id": "SOL-Heuristics-1",
                "question": "Is there any logic implemented multiple times?",
                "description": "Inconsistent implementations of the same logic can introduce errors or vulnerabilities.",
                "remediation": "Standardize the logic and make it as a separate function.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-2",
                "question": "Does the contract use any nested structures?",
                "description": "If a variable of nested structure is deleted, only the top-level fields are reset by default values (zero) and the nested level fields are not reset.",
                "remediation": "Always ensure that inner fields are deleted before the outer fields of the structure.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-3",
                "question": "Is there any unexpected behavior when `src==dst` (or `caller==receiver`)?",
                "description": "Overlooking the possibility of a sender and a recipient (source and destination) being the same in smart contracts can lead to unintended problems.",
                "remediation": "Ensure the protocol behaves as expected when `src==dst`.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-4",
                "question": "Is the NonReentrant modifier placed before every other modifier?",
                "description": "The order of modifiers can influence the behavior of a function. Generally,  NonReentrant must come first than other modifiers.",
                "remediation": "Reorder modifiers so that NonReentrant is placed before other modifiers.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-5",
                "question": "Does the `try/catch` block account for potential gas shortages?",
                "description": "A `try/catch` block without adequate gas can fail, leading to unexpected behaviors.",
                "remediation": "Ensure sufficient gas is supplied when using the `try/catch` block.",
                "references": [
                    "https://forum.openzeppelin.com/t/a-brief-analysis-of-the-new-try-catch-functionality-in-solidity-0-6/2564"
                ],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-6",
                "question": "Did you check the relevant EIP recommendations and security concerns?",
                "description": "Incomplete or incorrect implementation of EIP recommendations can lead to vulnerabilities.",
                "remediation": "Read the recommendations and security concerns and ensure all are implemented as per the official recommendations.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-7",
                "question": "Are there any off-by-one errors?",
                "description": "Off-by-one errors are not rare. Is `<=` correct in this context or should `<` be used? Should a variable be set to the length of a list or the length - 1? Should an iteration start at 1 or 0?",
                "remediation": "Review all usages of comparison operators for correctness.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-8",
                "question": "Are logical operators used correctly?",
                "description": "Logical operators like `==`, `!=`, `&&`, `||`, `!` can be overlooked especially when the test coverage is not good.",
                "remediation": "Review all usages of logical operators for correctness.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-9",
                "question": "What happens if the protocol's contracts are inputted as if they are normal actors?",
                "description": "Supplying unexpected addresses can lead to unintended behaviors, especially if the address points to another contract inside the same protocol.",
                "remediation": "Implement checks to validate receiver addresses and ensure the protocol behaves as expected.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-10",
                "question": "Are there rounding errors that can be amplified?",
                "description": "While minor rounding errors can be inevitable in certain operations, they can pose significant issues if they can be magnified. Amplification can occur when a function is invoked multiple times strategically or under specific conditions.",
                "remediation": "Conduct thorough tests to identify and understand potential rounding errors. Ensure that they cannot be amplified to a level that would be detrimental to the system or its users. In cases where significant rounding errors are detected, the implementation should be revised to minimize or eliminate them.",
                "references": [
                    "https://github.com/OpenCoreCH/smart-contract-audits/blob/main/reports/c4/rigor.md#high-significant-rounding-errors-for-interest-calculation"
                ],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-11",
                "question": "Is there any uninitialized state?",
                "description": "Checking a variable against its default value might be used to detect initialization. If such defaults can also be valid state, it could lead to vulnerabilities.",
                "remediation": "Avoid solely relying on default values to determine initialization status.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-12",
                "question": "Can functions be invoked multiple times with identical parameters?",
                "description": "Functions that should be unique per parameters set might be callable multiple times, leading to potential issues.",
                "remediation": "Ensure functions have measures to prevent repeated calls with identical or similar parameters, especially when these calls can produce adverse effects.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-13",
                "question": "Is the global state updated correctly?",
                "description": "While working with a `memory` copy for optimization, developers might overlook updating the global state.",
                "remediation": "Always ensure the global state mirrors changes made in `memory`. Consider tools or extensions that can highlight discrepancies.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-14",
                "question": "Is ETH/WETH handling implemented correctly?",
                "description": "Contracts might have special logic for ETH, like wrapping to WETH. Assuming exclusivity between handling ETH and WETH without checks can introduce errors.",
                "remediation": "Clearly differentiate the logic between ETH and WETH handling, ensuring no overlap or mutual exclusivity assumptions without validation.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-15",
                "question": "Does the protocol put any sensitive data on the blockchain?",
                "description": "Data on the blockchain, including that marked 'private' in smart contracts, is visible to anyone who knows how to query the blockchain's state or analyze its transaction history. Private variables are not exempt from public inspection.",
                "remediation": "Sensitive data should either be kept off-chain or encrypted before being stored on-chain. It's important to manage encryption keys securely and ensure that on-chain data does not expose private information even when encrypted, if the encryption method is weak or the keys are mishandled.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-16",
                "question": "Are there any code asymmetries?",
                "description": "In many projects, there should be some symmetries for different functions. For instance, a `withdraw` function should (usually) undo all the state changes of a `deposit` function and a `delete` function should undo all the state changes of the corresponding `add` function. Asymmetries in these function pairs (e.g., forgetting to unset a field or to subtract from a value) can often lead to undesired behavior. Sometimes one side of a 'pair' is missing, like missing removing from a whitelist while there is a function to add to a whitelist.",
                "remediation": "Review paired functions for symmetry and ensure they counteract each other's state changes appropriately.",
                "references": [
                    "https://github.com/OpenCoreCH/smart-contract-auditing-heuristics#code-asymmetries"
                ],
                "tags": []
            },
            {
                "id": "SOL-Heuristics-17",
                "question": "Does calling a function multiple times with smaller amounts yield the same contract state as calling it once with the aggregate amount?",
                "description": "Associative properties of certain financial operations suggest that performing the operation multiple times with smaller amounts should yield an equivalent outcome as performing it once with the aggregate amount. Variations might be indicative of potential issues such as rounding errors, unintended fee accumulations, or other inconsistencies.",
                "remediation": "Implement tests to validate consistency. Where discrepancies exist, ensure they are intentional, minimal, and well-documented. If discrepancies are unintended, reevaluate the implementation to ensure precision and correctness.",
                "references": [],
                "tags": []
            }
        ]
    },
    {
        "category": "Integrations",
        "description": "Possible vulnerabilities while integrating popular external protocols",
        "data": [
            {
                "category": "AAVE / Compound",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Integrations-AC-1",
                        "question": "Does the protocol use cETH token?",
                        "description": "The absence of the `underlying()` function in the cETH token contract can cause integration issues.",
                        "remediation": "Double check the protocol works as expected when integrating cETH token.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-2",
                        "question": "What happens if the utilization rate is too high, and collateral cannot be retrieved?",
                        "description": "A high utilization rate can potentially mean that there aren't enough assets in the pool to allow users to withdraw their collateral.",
                        "remediation": "Ensure that there are mechanisms to handle user withdrawal when the utilization rate is high.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-3",
                        "question": "What happens if the protocol is paused?",
                        "description": "If the AAVE protocol is paused, the protocol can not interact with it.",
                        "remediation": "Ensure the protocol behaves as expected when the AAVE protocol is paused.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-4",
                        "question": "What happens if the pool becomes deprecated?",
                        "description": "Pools can be deprecated.",
                        "remediation": "Ensure the protocol behaves as expected when the Pools are paused.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-5",
                        "question": "What happens if assets you lend/borrow are within the same eMode category?",
                        "description": "Lending and borrowing assets within the same eMode category might have rules or limitations.",
                        "remediation": "Ensure the protocol behaves as expected when interacting with assets in the same eMode category.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-6",
                        "question": "Do flash loans on Aave inflate the pool index?",
                        "description": "Flash loans can influence the pool index (a maximum of 180 flashloans can be performed within a block).",
                        "remediation": "Implement mechanisms to manage the effects of flash loans on the pool index.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-7",
                        "question": "Does the protocol properly implement AAVE/COMP reward claims?",
                        "description": "Misimplementation of reward claims can lead to users not receiving their correct rewards.",
                        "remediation": "Ensure a proper and tested implementation of AAVE/COMP reward claims.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-8",
                        "question": "On AAVE, what happens if a user reaches the maximum debt on an isolated asset?",
                        "description": "Reaching the maximum debt on an isolated asset can result in denial-of-service or other limitations on user actions.",
                        "remediation": "Ensure that the protocol works as expected when a user reaches the maximum debt.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-AC-9",
                        "question": "Does borrowing an AAVE siloed asset restrict borrowing other assets?",
                        "description": "Borrowing a siloed asset on Aave will prohibit users from borrowing other assets.",
                        "remediation": "Make use of `getSiloedBorrowing(address asset)` to prevent unexpected problems.",
                        "references": [
                            "https://docs.aave.com/developers/whats-new/siloed-borrowing"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Balancer",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Integrations-Balancer-1",
                        "question": "Does the protocol use the Balancer's flashloan?",
                        "description": "Balancer vault does not charge any fees for flash loans at the moment. However, it is possible Balancer implements fees for flash loans in the future.",
                        "remediation": "Ensure the protocol repays the fee together with the original debt on repayment in the `receiveFlashLoan` function.",
                        "references": [
                            "https://solodit.xyz/issues/receiveflashloan-does-not-account-for-fees-trailofbits-none-lindy-labs-sandclock-pdf"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Balancer-2",
                        "question": "Does the protocol use Balancer's Oracle? (getTimeWeightedAverage)",
                        "description": "The price will only be updated whenever a transaction (e.g. swap) within the Balancer pool is triggered. Due to the lack of updates, the price provided by Balancer Oracle will not reflect the true value of the assets.",
                        "remediation": "Do not use the Balancer's oracle for any pricing.",
                        "references": [
                            "https://solodit.xyz/issues/m-13-rely-on-balancer-oracle-which-is-not-updated-frequently-sherlock-notional-notional-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Balancer-3",
                        "question": "Does the protocol use Balancer's Boosted Pool?",
                        "description": "Balancer's Boosted Pool uses Phantom BPT where all pool tokens are minted at the time of pool creation and are held by the pool itself. Therefore, virtualSupply should be used instead of totalSupply to determine the amount of BPT supply in circulation.",
                        "remediation": "Ensure the protocol uses the correct function to get the total BPT supply in circulation.",
                        "references": [
                            "https://solodit.xyz/issues/h-7-totalbptsupply-will-be-excessively-inflated-sherlock-notional-notional-update-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Balancer-4",
                        "question": "Does the protocol use Balancer vault pool liquidity status for any pricing?",
                        "description": "Balancer vault does not charge any fees for flash loans at the moment. However, it is possible Balancer implements fees for flash loans in the future.",
                        "remediation": "Balancer pools are susceptible to manipulation of their external queries, and all integrations must now take an extra step of precaution when consuming data. Via readonly reentrancy, an attacker can force token balances and BPT supply to be out of sync, creating very inaccurate BPT prices.",
                        "references": [
                            "https://solodit.xyz/issues/h-13-balancerpairoracle-can-be-manipulated-using-read-only-reentrancy-sherlock-none-blueberry-update-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Chainlink",
                "description": "",
                "data": [
                    {
                        "category": "VRF",
                        "description": "",
                        "data": [
                            {
                                "id": "SOL-Integrations-Chainlink-VRF-1",
                                "question": "Are all parameters properly verified when Chainlink VRF is called?",
                                "description": "If the parameters are not thoroughly verified when Chainlink VRF is called, the `fullfillRandomWord` function will not revert but return an incorrect value.",
                                "remediation": "Ensure that all parameters passed to Chainlink VRF are verified to ensure the correct operation of `fullfillRandomWord`.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-Chainlink-VRF-2",
                                "question": "Is it guaranteed that the operator holds sufficient LINK in the subscription?",
                                "description": "Chainlink VRF can go into a pending state if there's insufficient LINK in the subscription. Once the subscription is refilled, the transaction can potentially be frontrun, introducing vulnerabilities.",
                                "remediation": "Ensure the pending subscription does not affect the protocol's functionality.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-Chainlink-VRF-3",
                                "question": "Is a sufficiently high request confirmation number chosen considering chain re-orgs?",
                                "description": "Not choosing a high enough request confirmation number can pose risks, especially in the context of chain re-orgs.",
                                "remediation": "Evaluate the chain's vulnerability to re-orgs and adjust the request confirmation number accordingly.",
                                "references": [
                                    "https://github.com/pashov/audits/blob/master/solo/NFTLoots-security-review.md#c-01-polygon-chain-reorgs-will-often-change-game-results"
                                ],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-Chainlink-VRF-4",
                                "question": "Are measures in place to prevent VRF calls from being frontrun?",
                                "description": "VRF calls can be frontrun and it's crucial to ensure that the user interactions are closed before the VRF call to prevent this.",
                                "remediation": "Ensure the implementation closes the user interaction phase before initiating the VRF call.",
                                "references": [],
                                "tags": []
                            }
                        ]
                    }
                ]
            },
            {
                "category": "Gnosis Safe",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Integrations-GS-1",
                        "question": "Do your modules execute the Guard's hooks?",
                        "description": "Failing to execute the Guard's hooks  (`checkTransaction()`, `checkAfterExecution()`) can bypass critical security checks implemented in those hooks.",
                        "remediation": "Ensure that all modules correctly execute the Guard's hooks as intended.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-GS-2",
                        "question": "Does the `execTransactionFromModule()` function increment the nonce?",
                        "description": "If the nonce is not incremented in `execTransactionFromModule()`, it can cause issues when relying on it for signatures.",
                        "remediation": "Ensure increase nonce inside the function `execTransactionFromModule()`.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "LayerZero",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Integrations-LayerZero-1",
                        "question": "Does the `_debitFrom` function in ONFT properly validate token ownership and transfer permissions?",
                        "description": "It's crucial that the `_debitFrom` function verifies whether the specified owner is the actual owner of the tokenId and if the sender has the correct permissions to transfer the token.",
                        "remediation": "Ensure thorough checks and validations are performed in the `_debitFrom` function to maintain token security.",
                        "references": [
                            "https://composable-security.com/blog/secure-integration-with-layer-zero/"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-LayerZero-2",
                        "question": "Which type of mechanism are utilized? Blocking or non-blocking?",
                        "description": "Using blocking mechanism can potentially lead to a Denial-of-Service (DoS) attack.",
                        "remediation": "Consider using non-blocking mechanism to prevent potential DoS attacks.",
                        "references": [
                            "https://solodit.xyz/issues/h-06-attacker-can-block-layerzero-channel-code4rena-velodrome-finance-velodrome-finance-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-LayerZero-3",
                        "question": "Is gas estimated accurately for cross-chain messages?",
                        "description": "Inaccurate gas estimation can result in cross-chain message failures.",
                        "remediation": "Implement mechanisms to estimate gas accurately.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-LayerZero-4",
                        "question": "Is the `_lzSend` function correctly utilized when inheriting LzApp?",
                        "description": "When inheriting LzApp, direct calls to `lzEndpoint.send` can introduce vulnerabilities. Using `_lzSend` is the recommended approach.",
                        "remediation": "Ensure that the `_lzSend` function is used instead of making direct calls to `lzEndpoint.send`.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-LayerZero-5",
                        "question": "Is the `ILayerZeroUserApplicationConfig` interface correctly implemented?",
                        "description": "The User Application should include the `forceResumeReceive` function to handle unexpected scenarios and unblock the message queue when needed.",
                        "remediation": "Implement the `ILayerZeroUserApplicationConfig` interface and ensure that the `forceResumeReceive` function is present and functional.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-LayerZero-6",
                        "question": "Are default contracts used?",
                        "description": "Default configuration contracts are upgradeable by the LayerZero team.",
                        "remediation": "Configure the applications uniquely and avoid using default settings.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-LayerZero-7",
                        "question": "Is the correct number of confirmations chosen for the chain?",
                        "description": "Choosing an inappropriate number of confirmations can introduce risks, especially considering past reorg events on the chain.",
                        "remediation": "Evaluate the chain's history and potential vulnerabilities to determine the optimal number of confirmations.",
                        "references": [],
                        "tags": []
                    }
                ]
            },
            {
                "category": "LSD",
                "description": "",
                "data": [
                    {
                        "category": "cbETH",
                        "description": "",
                        "data": [
                            {
                                "id": "SOL-Integrations-LSD-cbETH-1",
                                "question": "How is the control over the `cbETH`/`ETH` rate determined? Are there specific addresses with this capability due to the `onlyOracle` modifier?",
                                "description": "The rate between `cbETH` and `ETH` being controllable by a few addresses can introduce centralization risks and potential manipulations.",
                                "remediation": "Any address with `onlyOracle` permissions should be scrutinized and their actions should be transparent to the community.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-cbETH-2",
                                "question": "How does the system handle potential decreases in the `cbETH`/`ETH` rate?",
                                "description": "The rate of `cbETH` to `ETH` can decrease, which can impact users who hold or interact with `cbETH`.",
                                "remediation": "Implement mechanisms to inform users about the current `cbETH`/`ETH` rate. Consider providing alerts or notifications for significant rate changes. Ensure there's a mechanism to handle or rectify situations where the rate decreases dramatically.",
                                "references": [],
                                "tags": []
                            }
                        ]
                    },
                    {
                        "category": "rETH",
                        "description": "",
                        "data": [
                            {
                                "id": "SOL-Integrations-LSD-rETH-1",
                                "question": "Does the application account for potential penalties or slashes?",
                                "description": "Validators on the Ethereum 2.0 Beacon Chain can be penalized or slashed for misbehavior. This can affect the value of `rETH`.",
                                "remediation": "Implement mechanisms to account for potential penalties or slashes that can impact the value of `rETH`.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-rETH-2",
                                "question": "How does the system manage rewards accrued from staking?",
                                "description": "Staking on the Ethereum 2.0 Beacon Chain accrues rewards. The system should account for these rewards when dealing with `rETH`.",
                                "remediation": "Ensure proper distribution or accumulation of rewards in the system's `rETH` management.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-rETH-3",
                                "question": "Does the application handle potential reverts in the `burn()` function when there's insufficient ether in the `RocketDepositPool`?",
                                "description": "If there's not enough ether in the `RocketDepositPool` contract, the `burn()` function can fail. It's important for the system to handle these failures gracefully.",
                                "remediation": "Ensure there's a mechanism to either prevent calls to `burn()` when there's insufficient ether or handle the revert gracefully, informing the user appropriately.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-rETH-4",
                                "question": "What measures are in place to counteract potential consensus attacks on RPL nodes?",
                                "description": "There's a risk of consensus attacks on RPL nodes where malicious nodes may submit incorrect exchange rate data, leading to discrepancies.",
                                "remediation": "Implement a system in place to quickly rectify incorrect data submissions by nodes.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-rETH-5",
                                "question": "How does the system handle the conversion between `ETH` and `rETH`?",
                                "description": "The conversion rate between `ETH` and `rETH` might change over time based on the rewards accrued from staking. Ensure this dynamic is properly captured.",
                                "remediation": "Integrate accurate conversion mechanisms that consider the ever-changing staking rewards when converting between `ETH` and `rETH`.",
                                "references": [],
                                "tags": []
                            }
                        ]
                    },
                    {
                        "category": "sfrxETH",
                        "description": "",
                        "data": [
                            {
                                "id": "SOL-Integrations-LSD-sfrxETH-1",
                                "question": "How does the system handle potential detachment of `sfrxETH` from `frxETH` during reward transfers?",
                                "description": "If `sfrxETH` detaches from `frxETH` during reward transfers, it could cause discrepancies in expected and actual values, especially if these transfers are controlled by a centralized entity like the Frax team's multi-sig contract.",
                                "remediation": "Ensure there's transparency around the actions of the Frax team's multi-sig contract. Consider mechanisms to alert users or stakeholders about discrepancies between `sfrxETH` and `frxETH`.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-sfrxETH-2",
                                "question": "Is the stability of the `sfrxETH`/`ETH` rate guaranteed or can it decrease in the future?",
                                "description": "While the `sfrxETH`/`ETH` rate might be stable now, changes in the future could impact users and stakeholders, especially if they're not forewarned.",
                                "remediation": "Provide clear documentation and alerts about potential changes to the `sfrxETH`/`ETH` rate. Ensure users are informed well in advance about any planned changes that could affect the rate.",
                                "references": [],
                                "tags": []
                            }
                        ]
                    },
                    {
                        "category": "stETH",
                        "description": "",
                        "data": [
                            {
                                "id": "SOL-Integrations-LSD-stETH-1",
                                "question": "Is the application aware that `stETH` is a rebasing token?",
                                "description": "`stETH` rebases, which can introduce complexities when integrated with DeFi platforms. Using `wstETH` can simplify integrations as it is non-rebasing.",
                                "remediation": "Consider using `wstETH` for simpler DeFi integrations and to avoid complexities associated with rebasing tokens.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-stETH-2",
                                "question": "Are you aware of the overhead when withdrawing `stETH`/`wstETH`?",
                                "description": "Withdrawing `stETH` or `wstETH` can introduce overheads, due to various problems like queue time, receipt of an NFT, and withdrawal amount limits.",
                                "remediation": "Ensure account for these overheads and constraints in the protocol logic.",
                                "references": [],
                                "tags": []
                            },
                            {
                                "id": "SOL-Integrations-LSD-stETH-3",
                                "question": "Does the application handle conversions between `stETH` and `wstETH` correctly?",
                                "description": "Converting between `stETH` and `wstETH` can be tricky due to the rebasing nature of `stETH`. It's crucial to handle these conversions correctly to avoid potential issues.",
                                "remediation": "Ensure that the rebasing characteristics of `stETH` are properly managed when converting between `stETH` and `wstETH`.",
                                "references": [],
                                "tags": []
                            }
                        ]
                    }
                ]
            },
            {
                "category": "Uniswap",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Integrations-Uniswap-1",
                        "question": "Is the slippage calculated on-chain?",
                        "description": "ON-chain slippage calculation can be manipulated.",
                        "remediation": "Allow users to specify the slippage parameter in the actual asset amount which was calculated off-chain.",
                        "references": [
                            "https://dacian.me/defi-slippage-attacks#heading-on-chain-slippage-calculation-can-be-manipulated"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-2",
                        "question": "Are there refunds after swaps?",
                        "description": "In case of failed or partially filled orders, the protocol must issue refunds to the users.",
                        "remediation": "Implement a refund mechanism to handle failed or partially filled swaps.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-3",
                        "question": "Is the order of `token0` and `token1` consistent across chains?",
                        "description": "The order of `token0` and `token1` in AMM pools may vary depending on the chain, which can lead to inconsistencies.",
                        "remediation": "Always verify the order of tokens when interacting with different chains to avoid potential issues.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-4",
                        "question": "Are the pools that are being interacted with whitelisted?",
                        "description": "Missing verification on the interacting pools can introduce risks.",
                        "remediation": "Ensure pools are whitelisted or verify the pool's factory address before any interactions.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-5",
                        "question": "Is there a reliance on pool reserves?",
                        "description": "Relying on pool reserves can be risky, as they can be manipulated, especially using a flashloan.",
                        "remediation": "Implement alternative methods or checks without relying solely on pool reserves.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-6",
                        "question": "Is `pool.swap()` directly used?",
                        "description": "Directly using `pool.swap()` can bypass certain security mechanisms.",
                        "remediation": "Always use the Router contract to handle swaps, providing an added layer of security and standardization.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-7",
                        "question": "Is `unchecked` used properly with Uniswap's math libraries?",
                        "description": "Uniswap's TickMath and FullMath libraries require careful usage of `unchecked` due to solidity version specifics.",
                        "remediation": "Review and test the use of `unchecked` in contracts utilizing Uniswap's math libraries to ensure safety and correctness.",
                        "references": [
                            "https://solodit.xyz/issues/use-unchecked-intickmathsol-andfullmathsol-spearbit-overlay-pdf"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-8",
                        "question": "Is the slippage parameter enforced at the last step before transferring funds to users?",
                        "description": "Enforcing slippage parameters for intermediate swaps but not the final step can result in users receiving less tokens than their specified minimum",
                        "remediation": "Enforce slippage parameter as the last step before transferring funds to users",
                        "references": [
                            "https://dacian.me/defi-slippage-attacks#heading-mintokensout-for-intermediate-not-final-amount"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Integrations-Uniswap-9",
                        "question": "Is `pool.slot0` being used to calculate sensitive information like current price and exchange rates?",
                        "description": "`pool.slot0` can be easily manipulated via flash loans to sandwich attack users.",
                        "remediation": "Use UniswapV3 TWAP or Chainlink Price Oracle.",
                        "references": [
                            "https://solodit.xyz/issues/h-4-no-slippage-protection-during-repayment-due-to-dynamic-slippage-params-and-easily-influenced-slot0-sherlock-real-wagmi-2-git",
                            "https://solodit.xyz/issues/h-02-use-of-slot0-to-get-sqrtpricelimitx96-can-lead-to-price-manipulation-code4rena-maia-dao-ecosystem-maia-dao-ecosystem-git",
                            "https://docs.uniswap.org/concepts/protocol/oracle"
                        ],
                        "tags": []
                    }
                ]
            }
        ]
    },
    {
        "category": "Low Level",
        "description": "Vulnerabilities inherent in low-level codebases, such as contracts crafted in Huff, bytecode, and sections of inline assembly code.",
        "data": [
            {
                "id": "SOL-LL-1",
                "question": "Is there validation on the size of the input data?",
                "description": "In low-level, data size is not checked by default and it can affect the unintended memory locations.",
                "remediation": "Validate that inputs do not exceed the size of it's expected type and either revert or clean the unused bits depending on your use case before using that value.",
                "references": [
                    "https://github.com/AmadiMichael/LowLevelVulnerabilities?tab=readme-ov-file#validate-all-input-bit-size"
                ],
                "tags": []
            },
            {
                "id": "SOL-LL-2",
                "question": "What happens if there is no matching function signature?",
                "description": "It is expected to revert if there is no matching function signature in the contract. Overlooking this can let the execution continue into other parts of the unintended bytecode.",
                "remediation": "Ensure that the code reverts after comparing all supported function signatures, fallback etc and not matching any.",
                "references": [
                    "https://github.com/AmadiMichael/LowLevelVulnerabilities?tab=readme-ov-file#end-execution-after-function-dispatching"
                ],
                "tags": []
            },
            {
                "id": "SOL-LL-3",
                "question": "Is it checked if the target address of a call has the code?",
                "description": "Calling an address without code is always successful.",
                "remediation": "Ensure that addresses being called, static-called or delegate-called have code deployed.",
                "references": [
                    "https://github.com/AmadiMichael/LowLevelVulnerabilities?tab=readme-ov-file#ensure-that-addresses-being-called-static-called-or-delegate-called-have-code-deployed-to-them"
                ],
                "tags": []
            },
            {
                "id": "SOL-LL-4",
                "question": "Is there a check on the return data size when calling precompiled code?",
                "description": "When calling precompiled code, the call is still successful on error or \u201dfailure\u201d. A failed precompile call simply has a return data size of 0.",
                "remediation": "Check the return data size not the success of the call to determine if it failed.",
                "references": [
                    "https://github.com/AmadiMichael/LowLevelVulnerabilities?tab=readme-ov-file#when-calling-precompiles-check-the-returndatasize-not-the-success-of-the-call-to-determine-if-it-failed"
                ],
                "tags": []
            },
            {
                "id": "SOL-LL-5",
                "question": "Is there a non-zero check for the denominator?",
                "description": "At the evm level and in yul/inline assembly, when dividing or modulo'ing by 0, It does not revert with Panic(18) as solidity would do, its result 0. If this behavior is not desired it should be checked. Basically, x / 0 = 0 and x % 0 = 0.",
                "remediation": "Check if the denominator is zero before division.",
                "references": [
                    "https://github.com/AmadiMichael/LowLevelVulnerabilities?tab=readme-ov-file#when-dividing-or-moduloin-check-that-the-denominator-is-not-0"
                ],
                "tags": []
            }
        ]
    },
    {
        "category": "Multi-chain/Cross-chain",
        "description": "",
        "data": [
            {
                "id": "SOL-McCc-1",
                "question": "Are there hardcoded time values dependent on the `block.number`?",
                "description": "Block time can vary across different chains, leading to potential timing discrepancies.",
                "remediation": "Avoid hardcoding time values based on block numbers.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-McCc-2",
                "question": "Has the protocol been checked for the target chain differences?",
                "description": "Understanding the differences between chains is vital for ensuring compatibility and preventing unexpected behaviors.",
                "remediation": "Regularly check for chain differences and update the protocol accordingly.",
                "references": [
                    "https://www.evmdiff.com/diff?base=1&target=10",
                    "https://github.com/0xJuancito/multichain-auditor#differences-from-ethereum"
                ],
                "tags": []
            },
            {
                "id": "SOL-McCc-3",
                "question": "Are the EVM opcodes and operations used by the protocol compatible across all targeted chains?",
                "description": "Incompatibility can arise when the protocol uses EVM operations not supported on certain chains.",
                "remediation": "Review and ensure compatibility for chains like Arbitrum and Optimism.",
                "references": [
                    "https://docs.arbitrum.io/solidity-support",
                    "https://community.optimism.io/docs/developers/build/differences/#transaction-costs"
                ],
                "tags": []
            },
            {
                "id": "SOL-McCc-4",
                "question": "Does the expected behavior of `tx.origin` and `msg.sender` remain consistent across all deployment chains?",
                "description": "Different chains might interpret these values differently, leading to unexpected behaviors.",
                "remediation": "Test and verify the behavior on all targeted chains.",
                "references": [
                    "https://community.optimism.io/docs/developers/build/differences/#opcode-differences"
                ],
                "tags": []
            },
            {
                "id": "SOL-McCc-5",
                "question": "Is there any possibility of exploiting low gas fees to execute many transactions?",
                "description": "Some attacks become viable with low gas costs or when a large number of transactions can be processed.",
                "remediation": "Evaluate and mitigate potential attack vectors associated with gas fees.",
                "references": [
                    "https://github.com/0xJuancito/multichain-auditor#gas-fees"
                ],
                "tags": []
            },
            {
                "id": "SOL-McCc-6",
                "question": "Is there consistency in ERC20 decimals across chains?",
                "description": "Decimals in ERC20 tokens can differ across chains.",
                "remediation": "Ensure consistent ERC20 decimals or implement chain-specific adjustments.",
                "references": [
                    "https://github.com/0xJuancito/multichain-auditor#erc20-decimals"
                ],
                "tags": []
            },
            {
                "id": "SOL-McCc-7",
                "question": "Have contract upgradability implications been evaluated on different chains?",
                "description": "Contracts may have different upgradability properties depending on the chain, like USDT being upgradable on Polygon but not on Ethereum.",
                "remediation": "Verify and document upgradability characteristics for each chain.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-McCc-8",
                "question": "Have cross-chain messaging implementations been thoroughly reviewed for permissions and functionality?",
                "description": "Cross-chain messaging requires robust security checks to ensure the correct permissions and intended functionality.",
                "remediation": "Double check the access control over cross-chain messaging components.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-McCc-9",
                "question": "Is there a whitelist of compatible chains?",
                "description": "Allowing messages from an unsupported chain can lead to unpredictable results.",
                "remediation": "Implement a whitelist to prevent messages from unsupported chains.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-McCc-10",
                "question": "Have contracts been checked for compatibility when deployed to the zkSync Era?",
                "description": "zkSync Era might have specific requirements or differences when compared to standard Ethereum deployments.",
                "remediation": "Review and ensure compatibility before deploying contracts to zkSync Era.",
                "references": [
                    "https://era.zksync.io/docs/reference/architecture/differences-with-ethereum.html"
                ],
                "tags": []
            },
            {
                "id": "SOL-McCc-11",
                "question": "Is block production consistency ensured?",
                "description": "Inconsistent block production can lead to unexpected application behaviors.",
                "remediation": "Develop with the assumption that block production may not always be consistent.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-McCc-12",
                "question": "Is `PUSH0` opcode supported for Solidity version `>=0.8.20`?",
                "description": "`PUSH0` might not be supported on all chains, leading to potential incompatibility issues.",
                "remediation": "Ensure if `PUSH0` is supported in the target chain.",
                "references": [
                    "https://github.com/0xJuancito/multichain-auditor#support-for-the-push0-opcode"
                ],
                "tags": []
            }
        ]
    },
    {
        "category": "Signature",
        "description": "",
        "data": [
            {
                "id": "SOL-Signature-1",
                "question": "Are signatures guarded against replay attacks?",
                "description": "Lacking protection mechanisms like `nonce` and `block.chainid` can make signatures vulnerable to replay attacks. Also, EIP-712 provides a standard for creating typed and structured data to be signed, ensuring better security and user experience.",
                "remediation": "Implement a `nonce` system and incorporate `block.chainid` in your signature scheme. Ensure adherence to EIP-712 for all signatures.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Signature-2",
                "question": "Are signatures protected against malleability issues?",
                "description": "Signature malleability can be exploited by attackers to produce valid signatures without the private key. Using outdated versions of libraries can introduce known vulnerabilities.",
                "remediation": "Avoid using `ecrecover()` for signature verification. Instead, utilize the OpenZeppelin's latest version of ECDSA to ensure signatures are safe from malleability issues.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Signature-3",
                "question": "Does the returned public key from the signature verification match the expected public key?",
                "description": "Mismatched public keys can indicate an incorrect or malicious signer, potentially leading to unauthorized actions.",
                "remediation": "Implement rigorous checks to ensure the public key derived from a signature matches the expected signer's public key.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Signature-4",
                "question": "Is the signature originating from the appropriate entity?",
                "description": "If signatures aren't properly checked, malicious actors might exploit them, leading to unauthorized transactions or actions.",
                "remediation": "Ensure strict verification mechanisms are in place to confirm that signatures originate from the expected entities.",
                "references": [],
                "tags": []
            },
            {
                "id": "SOL-Signature-5",
                "question": "If the signature has a deadline, is it still valid?",
                "description": "Signatures with expiration dates that aren't checked can be reused maliciously after they should no longer be valid.",
                "remediation": "Always check the expiration date of signatures and ensure they're not accepted past their valid period.",
                "references": [],
                "tags": []
            }
        ]
    },
    {
        "category": "Timelock",
        "description": "",
        "data": [
            {
                "id": "SOL-Timelock-1",
                "question": "Are timelocks implemented for important changes?",
                "description": "Immediate changes in the protocol can affect the users.",
                "remediation": "Implement timelocks for important changes, allowing users adequate time to respond to proposed alterations.",
                "references": [],
                "tags": []
            }
        ]
    },
    {
        "category": "Token",
        "description": "",
        "data": [
            {
                "category": "Fungible : ERC20",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Token-FE-1",
                        "question": "Are safe transfer functions used throughout the contract?",
                        "description": "Not all ERC20 tokens are compliant to the EIP20 standard. Some do not return boolean flag, some do not revert on failure.",
                        "remediation": "Use OpenZeppelin's SafeERC20 where the safeTransfer and safeTransferFrom functions handle the return value check as well as non-standard-compliant tokens.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-2",
                        "question": "Is there potential for a race condition for approvals?",
                        "description": "Race condition for approvals can cause an unexpected loss of funds to the signer.",
                        "remediation": "Use OpenZeppelin's safeIncreaseAllowance and safeDecreaseAllowance functions.",
                        "references": [
                            "https://solodit.xyz/issues/m01-approval-process-can-be-front-run-openzeppelin-notional-governance-contracts-v2-audit-markdown"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-3",
                        "question": "Could a difference in decimals between ERC20 tokens cause issues?",
                        "description": "Different decimals in ERC20 tokens can cause incorrect calculations or interpretations.",
                        "remediation": "Always check and handle the decimals of ERC20 tokens to prevent potential issues.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-4",
                        "question": "Does the token implement any form of address whitelisting, blacklisting, or checks?",
                        "description": "Tokens that have address checks can lead to various problems.",
                        "remediation": "Ensure the token's own blacklisting mechanism does not affect the protocol's functionality.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-5",
                        "question": "Could the use of multiple addresses for a single token lead to complications?",
                        "description": "Some tokens have multiple addresses and this can introduce vulnerabilities.",
                        "remediation": "Do not rely on the token address in the accounting.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-6",
                        "question": "Does the token charge fee on transfer?",
                        "description": "Some tokens charge fee on transfer and the receiver gets less amount than specified.",
                        "remediation": "If the protocol intends to support this kind of token, ensure the accounting logic is correct.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-7",
                        "question": "Can the token be ERC777?",
                        "description": "ERC777 tokens have hooks that execute code before and after transfers, which might lead to reentrancy.",
                        "remediation": "Be cautious when integrating with ERC777 and be aware of the hook implications.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-8",
                        "question": "Does the protocol use Solmate's `ERC20.safeTransferLib`?",
                        "description": "Solmate `ERC20.safeTransferLib` do not check the contract existence and this opens up a possibility for a honeypot attack.",
                        "remediation": "Use OpenZeppelin's SafeERC20.",
                        "references": [
                            "https://solodit.xyz/issues/m-02-solmates-erc20-does-not-check-for-token-contracts-existence-which-opens-up-possibility-for-a-honeypot-attack-code4rena-size-size-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-9",
                        "question": "Is there a flash-mint functionality?",
                        "description": "Flash mints can drastically increase token supply temporarily, leading to potential abuse.",
                        "remediation": "Implement strict controls and checks around any flash mint functionality.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-10",
                        "question": "What happens on zero amount transfer?",
                        "description": "Some tokens revert on transfer of zero amount and can cause issues in certain integrations and operations.",
                        "remediation": "Transfer only when the amount is positive.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-11",
                        "question": "Is the token an ERC2612 implementation?",
                        "description": "Missing `DOMAIN_SEPARATOR()` can lead to vulnerabilities in the ERC2612 permit functionality.",
                        "remediation": "Ensure complete and correct implementation of ERC2612, including the `DOMAIN_SEPARATOR()` function.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-12",
                        "question": "Can the token be sent to any address?",
                        "description": "Certain addresses might be blocked or restricted to receive tokens (e.g. LUSD).",
                        "remediation": "Ensure the receiver blacklisting does not affect the protocol's functionality.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-13",
                        "question": "Is there a direct approval to a non-zero value?",
                        "description": "Some ERC20 tokens do not work when changing the allowance from an existing non-zero allowance value. For example Tether (USDT)'s approve() function will revert if the current approval is not zero, to protect against front-running changes of approvals.",
                        "remediation": "Set the allowance to zero before increasing the allowance and use safeApprove/safeIncreaseAllowance.",
                        "references": [
                            "https://solodit.xyz/issues/m-17-did-not-approve-to-zero-first-sherlock-notional-notional-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-14",
                        "question": "Is there a max approval used?",
                        "description": "Some tokens don't support approve `type(uint256).max` amount and revert.",
                        "remediation": "Avoid approval of `type(uint256).max`.",
                        "references": [
                            "https://solodit.xyz/issues/m-3-universalapprovemax-will-not-work-for-some-tokens-that-dont-support-approve-typeuint256max-amount-sherlock-dodo-dodo-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-15",
                        "question": "Can the token be paused?",
                        "description": "Some ERC20 tokens can be paused by the contract owner.",
                        "remediation": "Ensure the protocol is not affected when the token is paused.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-FE-16",
                        "question": "Is the decrease allowance feature of transferFrom() handled correctly when the sender is the caller?",
                        "description": "Allowance should not be decreased in a transferFrom() call if the sender is the same as the caller, to prevent incorrect balance and allowance tracking.",
                        "remediation": "Ensure that the smart contract logic maintains correct allowance levels when transferFrom() involves the token owner themselves.",
                        "references": [
                            "https://solodit.xyz/issues/m-2-transferfrom-uses-allowance-even-if-spender-from-sherlock-surge-surge-git"
                        ],
                        "tags": []
                    }
                ]
            },
            {
                "category": "Non-fungible : ERC721/1155",
                "description": "",
                "data": [
                    {
                        "id": "SOL-Token-NfE1-1",
                        "question": "How are the minting and transfer implemented?",
                        "description": "According to the ERC721 standard, a wallet/broker/auction application MUST implement the wallet interface if it will accept safe transfers. Use safe version of mint and transfer functions to prevent NFT being lost. (the similar applies to ERC1155)",
                        "remediation": "Use OpenZeppelin's safe mint/transfer functions for ERC721/1155.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-NfE1-2",
                        "question": "Is the contract safe from reentrancy attack?",
                        "description": "By standard, the token receiver contracts implement onERC721Received and onERC1155Received and this can potentially be a source of reentrancy attacks if not correctly handled.",
                        "remediation": "Double check the potential reentrancy attack.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-NfE1-3",
                        "question": "Is the OpenZeppelin implementation of ERC721 and ERC1155 safeguarded against reentrancy attacks, especially in the `safeTransferFrom` functions?",
                        "description": "The `safeTransferFrom` functions in OpenZeppelin's ERC721 and ERC1155 can expose the contract to reentrancy attacks due to external calls to user addresses.",
                        "remediation": "Use the checks-effects-interactions pattern and implement reentrancy guards to prevent potential reentrancy attacks when making external calls.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-NfE1-4",
                        "question": "Is it possible to steal NFT abusing his approval?",
                        "description": "Most of the time the `from` parameter of `transferFrom()` should be `msg.sender`. Otherwise an attacker can take advantage of other user's approvals and steal.",
                        "remediation": "Ensure that the contract verifies the `msg.sender` is actually the owner.",
                        "references": [],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-NfE1-5",
                        "question": "Does the ERC721/1155 contract correctly implement supportsInterface?",
                        "description": "Contracts must properly implement the supportsInterface function to ensure they comply with ERC721/1155 standards and interoperate with other contracts correctly.",
                        "remediation": "Implement the supportsInterface function to return true for ERC721 and ERC1155 token types, ensuring accurate reporting of supported features.",
                        "references": [
                            "https://solodit.xyz/issues/m-04-the-ferc1155sol-dont-respect-the-eip2981-code4rena-fractional-fractional-v2-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-NfE1-6",
                        "question": "Can the contract support both ERC721 and ERC1155 standards?",
                        "description": "To facilitate broader compatibility and usage in various applications, contracts may need to support both ERC721 and ERC1155 token standards.",
                        "remediation": "Use the supportsInterface method to check for and support interfaces of both ERC1155 and ERC721 within the same contract.",
                        "references": [
                            "https://solodit.xyz/issues/h-06-some-real-world-nft-tokens-may-support-both-erc721-and-erc1155-standards-which-may-break-infinityexchange_transfernfts-code4rena-infinity-nft-marketplace-infinity-nft-marketplace-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-NfE1-7",
                        "question": "What happens to the airdrops that are engaged to specific NFT?",
                        "description": "For many NFT collections, a kind of privilege is provided in various ways, e.g. airdrop. The NFT owner must be able to claim the benefits while they lock in protocols.",
                        "remediation": "Ensure the NFT holders can claim all benefits.",
                        "references": [
                            "https://solodit.xyz/issues/m-04-its-possible-to-swap-nft-token-ids-without-fee-and-also-attacker-can-wrap-unwrap-all-the-nft-token-balance-of-the-pair-contract-and-steal-their-air-drops-for-those-token-ids-code4rena-caviar-caviar-contest-git"
                        ],
                        "tags": []
                    },
                    {
                        "id": "SOL-Token-NfE1-8",
                        "question": "How is the approval/transfer handled for CryptoPunks collection?",
                        "description": "CryptoPunks collections that do not support the `transferFrom()` function can present risks. The `offerPunkForSaleToAddress()` function in particular can be susceptible to front-running attacks, which can compromise the ownership and security of the token.",
                        "remediation": "Ensure validation is done properly to prevent malicious actors claiming the ownership.",
                        "references": [
                            "https://solodit.xyz/issues/h-3-cryptopunks-nfts-may-be-stolen-via-deposit-frontrunning-sherlock-ajna-ajna-git",
                            "https://solodit.xyz/issues/h-02-anyone-can-steal-cryptopunk-during-the-deposit-flow-to-wpunkgateway-code4rena-paraspace-paraspace-contest-git"
                        ],
                        "tags": []
                    }
                ]
            }
        ]
    }
]
