import { Embed } from "./embed.ts";
import { Reply } from "./reply.ts";
import { type CmdIntr } from "../api/intr/cmd.ts";
import { type Conn } from "../db.ts";
import { Modal } from "./components/modal.ts";

/**
 * An unspecialized concrete command.
 */
export type AnyCmd = Cmd<CmdArgs, CmdData, CmdIntr>;

/**
 * The base command type, specialized by types like chat commands.
 */
export interface Cmd<A extends CmdArgs, D extends CmdData, I extends CmdIntr> {
  (args: A): Promise<void>;
  data: D;

  __keep_type_I?: I;
}

/**
 * Types of commands, as needed in discord registration.
 */
export enum CmdType {
  Chat = 1,
  User = 2,
  Msg = 3,
}

/**
 * The arguments to a command function.
 */
export interface CmdArgs {
  intr: CmdIntr;
  conn: Conn;
  embed: Embed;
  reply: Reply;
  modal: Modal;
}

/**
 * The base command registration data.
 */
export interface CmdData {
  name: string;
  type: CmdType;
  description: string;
}

/**
 * A resolver for the custom arguments of a command type.
 */
export interface CmdArgResolver<A extends CmdArgs, I extends CmdIntr> {
  (intr: I, conn: Conn): A | null;
}
