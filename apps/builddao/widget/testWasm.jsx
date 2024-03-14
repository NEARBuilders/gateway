const wasm = VM.require("buildhub.near/widget/trialAccountWasm") 

const contract = "v2.keypom.near";

const wrapTxnParamsForTrial = (params, newParams = {}) => {
    Object.entries(params).forEach(([k, v]) => {
        if (k === "args" && typeof v !== "string") {
            v = JSON.stringify(v);
        }
        if (Array.isArray(v)) v = v.join();
        newParams[PARAM_START + k] = v + PARAM_STOP;
    });
    return newParams;
};

// What contracts can the trial account call?
const callableContracts = [
    'social.near'
]
// What is the maximum amount of $NEAR that can be attached to a call for each callable contract?
const maxAttachableYoctoPerContract = [
    '1', //convert this into Yocto
]
// What methods can the trial account call?
const callableMethods = [
    ['*'],
]



// Take callable contract input from user and attachable deposit. 
// Before you pass this to create_drop however you need to add the mapping contract and it deposit like below
// Account Mapping Contract Changes
callableContracts.push('v1.mapping.keypom.near'); ////testnet: 'v1.mapping.keypom.testnet',
maxAttachableYoctoPerContract.push(parseNearAmount("0.002")!); // put the equivent yocto amount
callableMethods.push(["set"]);

// Take the storage cost into consideration for the attached deposit and trial end floor
const storageCost = parseNearAmount("0.35")!; //Deposit for contract state, put in yocto
const attachedDeposit = new BN(startingBalanceYocto).add(new BN(storageCost)).toString();

const trialEndFloorYocto = new BN(attachedDeposit).sub(new BN(trialEndFloorYocto)).toString();

const repayAmountYocto = "0";

const repayTo = context.accountId // whoever is creating the drop by default or whatever you put


const fcData = {
    methods: [
        [
            {
                receiverId: "near", //testnet if using for testnet network
                methodName: "create_account_advanced",
                //@ts-ignore
                attachedDeposit,
                args: JSON.stringify({
                    new_account_id: "INSERT_NEW_ACCOUNT",
                    options: {
                        contract_bytes: wasm.contract_bytes,
                        limited_access_keys: [
                            {
                                public_key: "INSERT_TRIAL_PUBLIC_KEY",
                                allowance: "0",
                                receiver_id: "INSERT_NEW_ACCOUNT",
                                method_names:
                                    "execute,create_account_and_claim",
                            },
                        ],
                    },
                }),
                userArgsRule: "UserPreferred",
            },
            {
                receiverId: "",
                methodName: "setup",
                //@ts-ignore
                attachedDeposit: "0",
                args: JSON.stringify(
                    wrapTxnParamsForTrial({ // All of these fields come UI
                        contracts: actualContracts, //which contracts the trial account should have access to.
                        amounts: actualAmounts, //allowance
                        methods: actualMethods, //methods it has access to, if empty [], then all methods.
                        funder: repayTo, // creator or the funder
                        repay: repayAmountYocto, // exit condition repay
                        floor: trialEndFloorYocto, // trial floor, after this much usage, the trial will be finished
                    })
                ),
                receiverToClaimer: true,
            },
        ],
    ],
};

const DROP_CONFIG = {
    // How many claims can each key have.
    uses_per_key: 1,

    // Should the drop be automatically deleted when all the keys are used? This is defaulted to false and
    // Must be overwritten
    delete_on_empty: true,

    // When this drop is deleted and it is the owner's *last* drop, automatically withdraw their balance.
    auto_withdraw: true,

    // Minimum block timestamp that keys can be used. If None, keys can be used immediately
    // Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    start_timestamp: null,

    // How often can a key be used
    // Measured in number of non-leap-nanoseconds since January 1, 1970 0:00:00 UTC.
    throttle_timestamp: null,

    // If claim is called, refund the deposit to the owner's balance. If None, default to false.
    on_claim_refund_deposit: null,

    // Can the access key only call the claim method_name? Default to both method_name callable
    claim_permission: null,

    // Root account that all sub-accounts will default to. If None, default to the global drop root.
    drop_root: null,
}

const createDropArgs = {
    drop_id: dropId,
    public_keys: publicKeys || [],
    deposit_per_use: "0", // I don't know was this zero but we take this input from users
    config: DROP_CONFIG,
    //metadata,//unique identifer, don't need it for now I guess.
    required_gas: "150000000000000",
    fc: fcData,
};

const deployTrialAccount = () => {
  Near.call(
     contract, 
    "creat_drop", 
     createDropArgs
  );
};


return (
  <div class="p-3">
    <h3 class="text-center">GuestBook</h3>
    <br />
    {context.accountId ? (
      <div class="border border-black p-3">
        <h3>New Message</h3>
        <div class="row">
          <div>
            <input
              placeholder="Account Id"
              onChange={(e) => State.update({ accountId: e.target.value })}
            />
          </div>
        </div>
        <button
          class="btn btn-primary mt-2"
          onClick={async () => {
            deployTrialAccount();
          }}
        >
          Deploy
        </button>
      </div>
    ) : (
      <p class="text-center py-2">I DONT KNOW WHAT THIS MEANS</p>
    )}
    <br />
  </div>
);



