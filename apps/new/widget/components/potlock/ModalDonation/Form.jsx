const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { NADABOT_HUMAN_METHOD } = VM.require(
  "${alias_potlock}/widget/constants",
) || {
  NADABOT_HUMAN_METHOD: "",
};

const { AmountInput } = VM.require(
  "${config_account}/widget/components.potlock.ModalDonation.AmountInput",
) || {
  AmountInput: () => {},
};
const { Checks } = VM.require(
  "${alias_potlock}/widget/ModalDonation.Checks",
) || {
  Checks: () => {},
};
const { VerifyInfo, Alert } = VM.require(
  "${alias_potlock}/widget/ModalDonation.Banners",
) || {
  VerifyInfo: () => {},
  Alert: () => {},
};

const PotSDK = VM.require("${alias_potlock}/widget/SDK.pot") || {
  getConfig: () => {},
};

const Form = styled.div`
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  @media only screen and (max-width: 480px) {
    padding: 1.5rem 1.125rem;
  }
`;

const Label = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

const CurrentBalance = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;
  justify-content: flex-end;
  .amount-alert {
    color: #e54141;
  }
  .balance {
    display: flex;
    gap: 0.5rem;
    div:last-of-type {
      color: #7b7b7b;
    }
  }
`;

const PotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const PotSelector = styled.div`
  display: flex;
  > div:last-of-type {
    width: 100%;
  }
`;

const Pot = styled.div`
  border-radius: 6px;
  border: 1px solid #dbdbdb;
  border-bottom-width: 2px;
  background: #fff;
  padding: 0.75rem 1rem;
`;

const FormDirect = (props) => {
  const {
    projectId,
    profile,
    amount,
    amountError,
    denominationOptions,
    updateState,
    selectedDenomination,
    donationType,
    ftBalance,
    activeRounds,
    NADABOT_CONTRACT_ID,
    accountId,
  } = props;

  const isUserHumanVerified = Near.view(
    NADABOT_CONTRACT_ID,
    NADABOT_HUMAN_METHOD,
    {
      account_id: accountId,
    },
  );

  const needsToVerify = isUserHumanVerified === false && donationType === "pot";

  const donationTypes = [
    {
      label: "Direct donation",
      val: "direct",
      disabled: false,
    },
    {
      label: "Quadratically matched donation",
      val: "pot",
      disabled: !activeRounds || activeRounds.length === 0,
      disabledText: "(no pots available)",
    },
  ];

  const activeRoundsOptions = {};

  (activeRounds || []).forEach((round) => {
    activeRoundsOptions[round] = {
      label: PotSDK.getConfig(round)?.pot_name || round,
      val: round,
    };
  });

  const isFtDonation = selectedDenomination.text !== "NEAR";

  const HandleAmoutChange = (amount) => {
    amount = amount.replace(/[^\d.]/g, ""); // remove all non-numeric characters except for decimal
    if (amount === ".") amount = "0.";
    updateState({ amount, amountError: "" });
    // error if amount is greater than balance
    if (amount > ftBalance && ftBalance !== null) {
      updateState({
        amountError:
          "You don’t have enough balance to complete this transaction.",
      });
    } else if (!isFtDonation && parseFloat(amount) < 0.1) {
      updateState({ amountError: "Minimum donation is 0.1 NEAR" });
    }
  };

  const isLoading =
    donationType === "pot"
      ? isUserHumanVerified === null || activeRounds === null
      : false;

  return projectId ? (
    profile === null ? (
      <Widget src={"${alias_potlock}/widget/Components.Loading"} />
    ) : (
      <Form>
        <Label>Amount</Label>
        <AmountInput
          value={amount}
          donationType={donationType}
          HandleAmoutChange={HandleAmoutChange}
          updateState={updateState}
          denominationOptions={denominationOptions}
          selectedDenomination={selectedDenomination}
        />

        {ftBalance && (
          <CurrentBalance>
            <div className="balance">
              <div>
                {ftBalance} <span> {selectedDenomination.text} </span>
              </div>
              <div>available</div>
            </div>
          </CurrentBalance>
        )}
        {amountError && <Alert error={amountError} />}
        {needsToVerify && <VerifyInfo />}
        <div className="mt-3 w-100">
          <Button
            style={{ width: "-webkit-fill-available" }}
            disabled={amountError || !amount}
            onClick={() => updateState({ currentPage: "confirm" })}
            variant="primary"
          >
            {isLoading ? "Loading..." : "Proceed to donate"}
          </Button>
        </div>
      </Form>
    )
  ) : (
    ""
  );
};

return {
  FormDirect,
};
