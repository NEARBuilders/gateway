function onChange(value) {
  if (value === state.text) {
    return;
  }
  const words = value.split(/\s+/);
  const allMentiones = words
    .filter((word) => word.startsWith("@"))
    .map((mention) => mention.slice(1));
  const newMentiones = allMentiones.filter(
    (item) => !state.mentionsArray.includes(item),
  );
  State.update((lastKnownState) => ({
    ...lastKnownState,
    text: value,
    showAccountAutocomplete: newMentiones?.length > 0,
    mentionsArray: allMentiones,
    mentionInput: newMentiones?.[0] ?? "",
  }));
}
