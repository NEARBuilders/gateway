const TestnetDomains = {
  "test.nearbuilders.org": true,
  "127.0.0.1": true,
  "192.168.1.24": true,
};

export const NetworkId =
  window.location.hostname in TestnetDomains ? "testnet" : "mainnet";

const TestnetWidgets = {
  default: "buildhub.testnet/widget/app",
  login: "buildhub.testnet/widget/login",
  logout: "buildhub.testnet/widget/logout",
  trialAccountBanner: "buildhub.testnet/widget/TrialAccountBanner",
  onboardingFlow: "buildhub.testnet/widget/OnboardingFlow",

  image: "eugenethedream/widget/Image",
  viewSource: "eugenethedream/widget/WidgetSource",
  widgetMetadataEditor: "eugenethedream/widget/WidgetMetadataEditor",
  widgetMetadata: "eugenethedream/widget/WidgetMetadata",
  profileImage: "eugenethedream/widget/ProfileImage",
  profilePage: "buildhub.near/widget/Profile",
  profileName: "eugenethedream/widget/ProfileName",
  profileInlineBlock: "eugenethedream/widget/Profile",
  notificationButton: "eugenethedream/widget/NotificationButton",
};

const MainnetWidgets = {
  default: "buildhub.near/widget/app",
  login: "buildhub.near/widget/login",
  logout: "buildhub.near/widget/logout",
  trialAccountBanner: "buildhub.near/widget/TrialAccountBanner",
  onboardingFlow: "buildhub.near/widget/OnboardingFlow",

  image: "mob.near/widget/Image",
  feed: "buildhub.near/widget/Feed",
  resources: "buildhub.near/widget/Resources",
  viewSource: "mob.near/widget/WidgetSource",
  widgetMetadataEditor: "buildhub.near/widget/WidgetMetadataEditor",
  widgetMetadata: "buildhub.near/widget/WidgetMetadata",
  profileImage: "mob.near/widget/ProfileImage",
  notificationButton: "mob.near/widget/NotificationButton",
  profilePage: "buildhub.near/widget/Profile",
  profileName: "patrick.near/widget/ProfileName",
  editorComponentSearch: "mob.near/widget/Editor.ComponentSearch",
  profileInlineBlock: "mob.near/widget/Profile.InlineBlock",
  viewHistory: "bozon.near/widget/WidgetHistory",
};

export const Widgets =
  NetworkId === "testnet" ? TestnetWidgets : MainnetWidgets;
