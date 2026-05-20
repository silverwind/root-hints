import hintsData from "./hints.json" with {type: "json"};

/** A single DNS root server hint entry. */
export type Hint = {
  /** The hostname of the root server, e.g. `"a.root-servers.net"`. */
  name: string,
  /** The IPv4 address of the root server. */
  A: string,
  /** The IPv6 address of the root server. */
  AAAA: string,
};

const hints = hintsData as Array<Hint>;

const values: Record<"A" | "AAAA", Array<string>> = {
  A: hints.map(hint => hint.A),
  AAAA: hints.map(hint => hint.AAAA),
};

/**
 * Returns DNS root hint data.
 * @param type - If `"A"`, returns an array of IPv4 addresses. If `"AAAA"`, returns an array of IPv6 addresses. If omitted, returns the full array of hint objects.
 */
export default function rootHints(type?: "A" | "AAAA"): Array<Hint> | Array<string> {
  if (type && values[type]) {
    return values[type];
  } else if (!type) {
    return hints;
  } else {
    throw new Error(`Unknown record type: ${type}`);
  }
}
