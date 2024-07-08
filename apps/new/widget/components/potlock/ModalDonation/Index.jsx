const { Modal, Button, ProgressState } = VM.require(
  "${alias_old}/widget/components",
) || {
  Modal: () => <></>,
  Button: () => <></>,
  ProgressState: () => <></>,
};

const Container = styled.div`
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: #fff;
  font-size: 14px;
  box-shadow:
    0px 0px 0px 1px rgba(41, 41, 41, 0.1),
    0px 8px 12px -4px rgba(41, 41, 41, 0.1),
    0px 20px 32px -10px rgba(41, 41, 41, 0.1),
    0px 32px 44px -16px rgba(41, 41, 41, 0.1);
  overflow: hidden;
  border-radius: 6px;
  @media only screen and (max-width: 480px) {
    top: 0;
    border-radius: 0;
    position: fixed;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    display: flex;
    z-index: 1000;
  }
`;

const DENOMINATION_OPTIONS = [{ text: "NEAR", value: "NEAR", decimals: 24 }];

const {
  projectId,
  referrerId,
  potId,
  onClose,
  NADABOT_CONTRACT_ID,
  POT,
  multiple,
  potDetail,
} = props;

const DEFAULT_DONATION_AMOUNT = "1";

const accountId = context.accountId;

const initialState = {
  amount: "",
  donationType: multiple ? "auto" : "direct",
  showBreakdown: false,
  bypassProtocolFee: false,
  bypassChefFee: false,
  addNote: false,
  donationNote: "",
  donationNoteError: "",
  allPots: null,
  intervalId: null,
  ftBalances: null,
  selectedDenomination: DENOMINATION_OPTIONS[0],
  denominationOptions: DENOMINATION_OPTIONS,
  selectedRound: "",
  currentPage: multiple ? "formPot" : "form",
  selectedProjects: {},
  toggleAmount: true,
};

State.init(initialState);

const {
  amount,
  denomination,
  donationType,
  showBreakdownm,
  bypassProtocolFee,
  bypassChefFee,
  addNote,
  donationNote,
  donationNoteError,
  allPots,
  intervalId,
  nearBalance,
  ftBalances,
  denominationOptions,
  selectedDenomination,
  selectedRound,
  currentPage,
} = state;

const [activeRounds, setActiveRounds] = useState(null);

const profile = Social.getr(`${projectId}/profile`);
const profileName = profile?.name || projectId;

const MAX_NOTE_LENGTH = 60;

const {
  DONATION_CONTRACT_ID,
  NADABOT_HUMAN_METHOD,
  NADA_BOT_URL,
  SUPPORTED_FTS,
} = VM.require("${alias_potlock}/widget/constants") || {
  DONATION_CONTRACT_ID: "",
  NADABOT_HUMAN_METHOD: "",
  NADA_BOT_URL: "",
  SUPPORTED_FTS: {},
};

let ListsSDK =
  VM.require("${alias_potlock}/widget/SDK.lists") ||
  (() => ({
    getRegistrations: () => {},
  }));
ListsSDK = ListsSDK({ env: "production" });

let DonateSDK =
  VM.require("${alias_potlock}/widget/SDK.donate") ||
  (() => ({
    getConfig: () => {},
    asyncGetDonationsForDonor: () => {},
  }));
DonateSDK = DonateSDK({ env: "production" });

let PotFactorySDK =
  VM.require("${alias_potlock}/widget/SDK.potfactory") ||
  (() => ({
    getPots: () => {},
  }));

PotFactorySDK = PotFactorySDK({ env: "production" });

const PotSDK = VM.require("${alias_potlock}/widget/SDK.pot") || {
  getConfig: () => {},
  asyncGetConfig: () => {},
  getApprovedApplications: () => {},
  asyncGetApplicationByProjectId: () => {},
  asyncGetDonationsForDonor: () => {},
  isRoundActive: () => {},
};

const { nearToUsd, formatWithCommas } = VM.require(
  "${alias_potlock}/widget/utils",
) || {
  nearToUsd: 1,
  formatWithCommas: () => {},
};

const { addItemsToCart, clearCart } = VM.require(
  "${alias_potlock}/widget/SDK.cart",
) || {
  addItemsToCart: () => {},
  clearCart: () => {},
};

const { FormDirect } = VM.require(
  "${config_account}/widget/components.potlock.ModalDonation.Form",
) || {
  FormDirect: () => {},
};
const { Confirm } = VM.require(
  "${config_account}/widget/components.potlock.ModalDonation.Confirm",
) || {
  Confirm: () => {},
};

const pages = {
  form: FormDirect,
  confirm: Confirm,
};

const ActivePageComponent = pages[currentPage];

// get all active pots
const pots = useCache(
  () =>
    // get all pots
    PotFactorySDK.asyncGetPots()
      .then((pots) => {
        const activePots = pots.map((pot) =>
          // if active
          PotSDK.isRoundActive(pot.id)
            // check if project had applied
            .then((isActive) => isActive && pot.id)
            .catch((e) => {
              console.error(
                "error checking active round for pot: " + pot.id,
                e,
              );
            }),
        );
        return Promise.all(activePots);
      })
      .catch((e) => {
        console.error("error getting pots: ", e);
      }),
  "active-pots",
);
useEffect(() => {
  if (potId && !activeRounds) {
    setActiveRounds([potId]);
    State.update({
      selectedRound: potId,
      donationType: multiple ? "auto" : "pot",
    });
  } else if (!activeRounds?.length && projectId) {
    if (!pots) setActiveRounds([]);
    (pots ?? []).forEach((pot, idx) => {
      if (pot) {
        PotSDK.asyncGetApplicationByProjectId(pot, projectId)
          .then((application) => {
            if (application.status === "Approved") {
              setActiveRounds((prev) => {
                const prevRounds = prev || [];
                if (!prevRounds.includes(pot)) {
                  return [...prevRounds, pot];
                }
              });
              if (!selectedRound)
                State.update({
                  selectedRound: pot,
                });
            } else if (pots.length - 1 === idx && !activeRounds) {
              setActiveRounds((prev) => [...(prev || [])]);
            }
          })
          .catch((err) => {
            console.log(err);
            setActiveRounds((prev) => [...(prev || [])]);
          });
      }
    });
  }
}, [pots]);

// Get Ft Balances
useEffect(() => {
  if (!ftBalances && !potId) {
    asyncFetch(
      `https://near-mainnet.api.pagoda.co/eapi/v1/accounts/${accountId}/balances/FT`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "dce81322-81b0-491d-8880-9cfef4c2b3c2",
        },
      },
    )
      .then((ftBalancesRes) => {
        if (ftBalancesRes) {
          const ftBalances = ftBalancesRes.body.balances;
          State.update({
            ftBalances: ftBalances,
            denominationOptions: DENOMINATION_OPTIONS.concat(
              ftBalances
                .map(({ amount, contract_account_id, metadata }) => ({
                  amount,
                  id: contract_account_id,
                  text: metadata.symbol,
                  value: metadata.symbol,
                  icon: metadata.icon,
                  decimals: metadata.decimals,
                }))
                .filter((option) => option.text.length < 10),
            ),
          });
        }
      })
      .catch((err) => console.log("fetching Ft balances faild"));
  }
}, [ftBalances]);

const nearBalanceRes = fetch(
  `https://near-mainnet.api.pagoda.co/eapi/v1/accounts/${accountId}/balances/NEAR`,
  {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "dce81322-81b0-491d-8880-9cfef4c2b3c2",
    },
  },
);

const ftBalance = useMemo(() => {
  if (selectedDenomination.text === "NEAR") {
    const nearBalance = nearBalanceRes?.body?.balance;

    return nearBalance
      ? parseFloat(Big(nearBalance.amount).div(Big(10).pow(24)).toFixed(2))
      : null;
  }
  const balance = denominationOptions.find(
    // this is where we need the details
    (option) => option.text === selectedDenomination.text,
  );
  return balance
    ? parseFloat(
        Big(balance.amount).div(Big(10).pow(balance.decimals)).toFixed(2),
      )
    : null;
}, [selectedDenomination, ftBalances, nearBalanceRes]);

return (
  <Modal open={true} title={`Donate to ${profileName}`} onOpenChange={onClose}>
    <Container>
      <ActivePageComponent
        {...props}
        {...state}
        accountId={accountId}
        updateState={State.update}
        ftBalance={ftBalance}
        activeRounds={activeRounds}
        DENOMINATION_OPTION={DENOMINATION_OPTIONS}
      />
    </Container>
  </Modal>
);
