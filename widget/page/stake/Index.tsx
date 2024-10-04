const { Tailwind } = VM.require("uiisnear.near/widget/tailwind");
const { Button, ButtonConf } = VM.require("uiisnear.near/widget/button");
const { Input } = VM.require("uiisnear.near/widget/input");
const { Label } = VM.require("uiisnear.near/widget/label");
const { Switch } = VM.require("uiisnear.near/widget/switch");
const { Alert, AlertTitle } = VM.require("uiisnear.near/widget/alert");
const { ClassnameConf } = VM.require("uiisnear.near/widget/utils");
const {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardClassname,
  cardFooterClassname,
} = VM.require("uiisnear.near/widget/card");
const { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } =
  VM.require("uiisnear.near/widget/select");

if (Tailwind == undefined) return "";
if (ButtonConf == undefined) return "";
if (ClassnameConf == undefined) return "";

const [buttonCancel, setButtonCancel] = useState("");
const [card, setCard] = useState("");
const [cardFooter, setCardFooter] = useState("");
const [amount, setAmount] = useState(null);
const [isUnstakeSelected, setSelected] = useState(false);

if (buttonCancel === "")
  return <ButtonConf output={setButtonCancel} variant="outline" />;

if (card === "") {
  let className = `${cardClassname} max-w-lg sm:w-96`;
  return <ClassnameConf output={setCard} className={className} />;
}

if (cardFooter === "") {
  let className = `${cardFooterClassname} flex justify-between`;
  return <ClassnameConf output={setCardFooter} className={className} />;
}

if (ButtonConf == undefined) return "";
const [buttonLink, setButtonLink] = useState("");

if (buttonLink === "")
  return <ButtonConf output={setButtonLink} variant="secondary" size="sm" />;

const account = "builddao.poolv1.near";

function onStake() {
  Near.call({
    contractName: account,
    methodName: "deposit_and_stake",
    args: {},
    deposit: Big(amount).mul(Big(10).pow(24)).toFixed(),
    gas: 200000000000000,
  });
}

function onUnstake() {
  Near.call({
    contractName: account,
    methodName: "unstake",
    args: {
      amount: Big(amount).mul(Big(10).pow(24)).toFixed(),
    },
    gas: 200000000000000,
  });
}

function onWithdraw() {
  Near.call({
    contractName: account,
    methodName: "withdraw_all",
    args: {},
    gas: 200000000000000,
  });
}
const userLoggedIn = context.accountId;

if (!userLoggedIn) {
  return (
    <Tailwind>
      <div className="mx-auto w-max pt-10 space-y-2">
        <Alert>
          <AlertTitle>Please login to continue!</AlertTitle>
          <Wallet provides={({ signIn}) => <Button onClick={signIn}>Login</Button>} />
        </Alert>
      </div>
    </Tailwind>
  );
}

const balanceResp = fetch(
  `https://api3.nearblocks.io/v1/account/${userLoggedIn}`
);
const nearBalance = Big(balanceResp?.body?.account?.[0]?.amount ?? "0")
  .div(Big(10).pow(24))
  .toFixed(4);

function convertAmountToReadableFormat(value) {
  return Big(value ?? "0")
    .div(1e24)
    .toFixed(4);
}

const stakedBalanceResp = Near.view(account, "get_account_staked_balance", {
  account_id: userLoggedIn,
});
const stakedBalance = convertAmountToReadableFormat(stakedBalanceResp);
const unstakedBalanceResp = Near.view(account, "get_account_unstaked_balance", {
  account_id: userLoggedIn,
});
const unstakedBalance = convertAmountToReadableFormat(unstakedBalanceResp);
const allowedToWithdraw = Near.view(
  account,
  "is_account_unstaked_balance_available",
  { account_id: userLoggedIn }
);

const Container = styled.div`
  .text-red {
    color: red;
  }
`;

return (
  <Tailwind>
    <Container className="flex max-w-lg px-10 mx-auto w-max pt-10">
      <Card className={card}>
        <CardHeader>
          <CardTitle>
            {isUnstakeSelected ? "Unstake NEAR from" : "Stake NEAR to"} the
            Build DAO treasury
          </CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-2 pt-1 w-max">
              <Switch
                id="unstake"
                checked={isUnstakeSelected}
                onCheckedChange={(e) => setSelected(e)}
              />
              <Label htmlFor="unstake">Unstake</Label>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                placeholder="1 NEAR"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-sm">
                {!isUnstakeSelected ? (
                  `Balance: ${nearBalance} NEAR`
                ) : (
                  <div>
                    Staked Balance: {stakedBalance} NEAR
                    {parseFloat(unstakedBalance) > 0 && (
                      <div className="flex gap-2 items-center">
                        Unstaked Balance: {unstakedBalance} NEAR
                        {allowedToWithdraw && (
                          <Button className={buttonLink} onClick={onWithdraw}>
                            Withdraw
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </p>
            </div>
            {!isUnstakeSelected &&
              parseFloat(amount ?? "0") > parseFloat(nearBalance ?? "0") && (
                <p className="text-red text-sm">
                  Stake amount is more than your balance
                </p>
              )}
            {isUnstakeSelected &&
              parseFloat(amount ?? "0") > parseFloat(stakedBalance ?? "0") && (
                <p className="text-red text-sm">
                  Unstake amount is more than your staked balance
                </p>
              )}
          </div>
        </CardContent>
        <CardFooter className={cardFooter}>
          {!isUnstakeSelected ? (
            <Button
              disabled={
                parseFloat(amount ?? "0") > parseFloat(nearBalance ?? "0") ||
                parseFloat(amount ?? "0") <= 0
              }
              onClick={onStake}
              variant="secondary"
            >
              Stake
            </Button>
          ) : (
            <Button
              disabled={
                parseFloat(amount ?? "0") > parseFloat(stakedBalance ?? "0") ||
                parseFloat(amount ?? "0") <= 0
              }
              onClick={onUnstake}
              variant="secondary"
            >
              Unstake
            </Button>
          )}
          <Link
            to={
              "https://app.potlock.org/?tab=project&projectId=build.sputnik-dao.near"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Donate</Button>
          </Link>
        </CardFooter>
      </Card>
    </Container>
  </Tailwind>
);
