const { Button } = VM.require("${config_account}/widget/components") || {
  Button: () => <></>,
};

const { data } = props;

function parseDateForGoogleCalendar(date) {
  return date ? new Date(date).toISOString().replace(/-|:|\.\d+/g, "") : "";
}

const googleEventLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(data.title)}&details=${encodeURIComponent(data.extendedProps.description ?? data.description)}&location=${encodeURIComponent(data?.url)}&dates=${encodeURIComponent(parseDateForGoogleCalendar(data.start))}/${encodeURIComponent(parseDateForGoogleCalendar(data.end))}`;

return (
  <Button
    noLink={true}
    href={`${googleEventLink}`}
    target="_blank"
    variant="outline"
  >
    Add to Google Calendar
  </Button>
);
