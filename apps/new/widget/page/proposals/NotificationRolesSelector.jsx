const DaoSDK = VM.require("sdks.near/widget/SDKs.Sputnik.DaoSDK") || (() => {});

const { InputField } = VM.require("${alias_old}/widget/components") || {
  InputField: <></>,
};

const [groupsAndMembers, setGroupsAndMembers] = useState([]);
const[ showList, setShowList] = useState(false)
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
if(!groupsAndMembers.length){
  setGroupsAndMembers(group);
}

useEffect(() => {
  if(groupsAndMembers.length > 0){
    setShowList(true)
  }
 
},[groupsAndMembers])


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
    --text-color: white;
  `;

const Wrapper = styled.div`
  color: var(--text-color) !important;
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
    margin-bottom: 5px;
  }

  .text {
    color: var(--text-color) !important;
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
  const notification = {
    [accountId]: {
      index: {
        notify: JSON.stringify(
          uniqueMembersArray.map((account) => {
            return {
              key: account,
              value: {
                message: message,
                params: {
                  daoId: daoId,
                  tab: "proposals",
                  page: "proposal",
                },
                type: "buildhub/custom",
                widget:
                  "${config_account}/widget/Index?page=activity&tab=proposals",
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
            loading=""
            src="nearui.near/widget/Input.Checkbox"
            props={{
              label: (
                <div className="text">
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
}, [showList]);

return (
  <ThemeContainer>
    <Wrapper className="d-flex flex-column gap-2">
      <div>Send notification to following roles: (Optional)</div>
      <div>
        <label htmlFor={"notifications-label" + daoId}>Custom Message</label>
        <textarea
          name={"notifications-label" + daoId}
          id={"notifications-label" + daoId}
          className="form-control"
          data-bs-theme={bootstrapTheme}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="2"
        />
      </div>
     <div>{groupList}</div>
    </Wrapper>
  </ThemeContainer>
);
