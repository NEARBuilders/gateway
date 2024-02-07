export const TrialAccountGenerator = ({ trigger }) => {
  // function getTrialAccount() {
  //   asyncFetch(
  //     `https://harmonicdevapim.azure-api.net/bd/KeyPomMain?dropId=1706695349746`,
  //     { method: "POST" }
  //   ).then((res) => {
  //     const body = JSON.parse(res.body);
  //     //change API response in the service to make it better
  //     const path = body.url.split("https://www.nearbuilders.org")[1];
  //     console.log(path);
  //     window.open(`${window.location.origin}${path}`);
  //   });
  // }

  return trigger({ onClick: () => console.log("click") });
};
