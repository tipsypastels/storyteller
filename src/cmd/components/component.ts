/**
 * A component in the Discord API.
 */
export interface RawComponent {
  type: number;
}

/**
 * The bare mimimum (not really) component.
 */
export interface Component {
  raw: RawComponent;
}

/**
 * A component OR modal with an action handler.
 */
export interface Handler {
  handle(e: unknown): void;
}
