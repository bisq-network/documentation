// Output helpers for scripts that run in GitHub Actions and print text a pull
// request controls (file names, receipt fields, error messages).

/** Untrusted text on one log line, so it cannot start a workflow command. */
export const oneLine = (value) => String(value).replace(/[\r\n\u0085\u2028\u2029]+/g, " ");

/** A GitHub Actions annotation with escaped properties and message. */
export function annotation(level, properties, message) {
  const data = (value) => String(value).replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
  const property = (value) => data(value).replaceAll(":", "%3A").replaceAll(",", "%2C");
  const list = Object.entries(properties).map(([key, value]) => `${key}=${property(value)}`).join(",");
  return `::${level}${list ? ` ${list}` : ""}::${data(message)}`;
}
