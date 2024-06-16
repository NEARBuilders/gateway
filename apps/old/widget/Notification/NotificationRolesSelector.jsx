const DaoSDK = VM.require("sdks.near/widget/SDKs.Sputnik.DaoSDK") || (() => {});

const { InputField } = VM.require("${config_account}/widget/components") || {
  InputField: <></>,
};

const [groupsAndMembers, setGroupsAndMembers] = useState([]);
const [selectedRoles, setSelectedRoles] = useState({}); // { role:boolean }
const daoId = props.daoId || "build.sputnik-dao.near";
const accountId = props.accountId ?? context.accountId;
const onUpdate = props.onUpdate ?? (() => {});
const proposalType = props.proposalType;
const [message, setMessage] = useState(
  `${accountId} created ${proposalType} proposal for ${daoId}`,
);
const bootstrapTheme = props.bootstrapTheme || "dark";

const sdk = DaoSDK(daoId);
if (!sdk) {
  return <></>;
}

const group = sdk.getGroupsAndMembers();
if (group === null || !group.length) {
  return;
}
setGroupsAndMembers(group);

const handleCheckboxChange = (role) => {
  setSelectedRoles((prevRoles) => {
    if (prevRoles.hasOwnProperty(role)) {
      return {
        ...prevRoles,
        [role]: !prevRoles[role],
      };
    } else {
      return {
        ...prevRoles,
        [role]: true,
      };
    }
  });
};

const ThemeContainer =
  props.ThemeContainer ||
  styled.div`
    --primary-color: rgb(255, 175, 81);
  `;

const Wrapper = styled.div`
  .checked > span:first-child {
    background: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
  }

  .cbx:hover span:first-child {
    border-color: var(--primary-color) !important;
  }

  button[type="checkbox"]:hover {
    background: none !important;
  }

  label {
    font-size: 13px;
  }
`;

const createNotificationsData = () => {
  const someRoleSelected = Object.values(selectedRoles).some(
    (value) => value === true,
  );
  if (!someRoleSelected) {
    return null;
  }
  const membersToNotify = [];
  Object.keys(selectedRoles).map((item) => {
    if (selectedRoles[item] === true) {
      membersToNotify = membersToNotify.concat(
        groupsAndMembers.find((group) => group.name === item).members,
      );
    }
  });
  const uniqueMembersArray = [...new Set(membersToNotify)];
  const item = {
    type: "social",
    path: `${context.accountId}/post/main`,
  };
  const notification = {
    [accountId]: {
      index: {
        notify: JSON.stringify(
          uniqueMembersArray.map((account) => {
            return {
              key: account,
              value: {
                type: `${config_account}/proposal/create`,
                item,
                message: message,
                widget: `${config_account}/widget/Index?page=activity&tab=proposals&daoId=${daoId}`,
              },
            };
          }),
        ),
      },
    },
  };
  const call = [
    {
      contractName: "${alias_socialdb}",
      methodName: "set",
      args: { data: notification, options: { refund_unused_deposit: true } },
      deposit: 200000000000000000000000,
    },
  ];
  return call;
};

useEffect(() => {
  onUpdate(createNotificationsData());
}, [selectedRoles]);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const groupList = useMemo(() => {
  return (
    Array.isArray(groupsAndMembers) &&
    groupsAndMembers.map((group) => {
      const membersLength = group?.members.length;
      if (!membersLength) {
        return null;
      }
      return (
        <div key={group}>
          <Widget
            src="nearui.near/widget/Input.Checkbox"
            props={{
              label: (
                <div>
                  {capitalizeFirstLetter(group.name)} ({membersLength} members)
                </div>
              ),
              onChange: (checked) => handleCheckboxChange(group.name),
              checked: selectedRoles[group.name] ?? false,
            }}
          />
        </div>
      );
    })
  );
}, [groupsAndMembers, selectedRoles]);

return (
  <ThemeContainer>
    <Wrapper className="d-flex flex-column gap-2">
      <div>Send notification to following roles: (Optional)</div>
      <div>
        <label htmlFor={"notifications-label" + daoId}>Custom Message</label>
        <input
          name={"notifications-label" + daoId}
          id={"notifications-label" + daoId}
          className="form-control"
          data-bs-theme={bootstrapTheme}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div>{groupList}</div>
    </Wrapper>
  </ThemeContainer>
);
