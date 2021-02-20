export default interface ILogProvider {
  error(message: string): void;
  warn(message: string): void;
  info(message: string): void;
  http(message: string): void;
  debug(message: string): void;
}
