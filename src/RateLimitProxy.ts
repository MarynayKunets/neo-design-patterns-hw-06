import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number,
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(service, {
    get(target, prop) {
      if (prop === "send") {
        return function (message: string): void {
          const now = Date.now();

          if (now - lastCallTime < intervalMs) {
            console.log("[RateLimit] skipped");
            return;
          }

          lastCallTime = now;
          target.send(message);
        };
      }

      return Reflect.get(target, prop);
    },
  });
}
