import { TaskType } from '../TaskType';
import { Mixin } from 'ts-mixer';
import { ProxyInfo, ProxyInfoIn } from './ProxyInfo';
import { TurnstileRequestBase, TurnstileRequestBaseIn } from './TurnstileRequestBase';

interface TurnstileTokenType extends Pick<TurnstileRequestBaseIn, Exclude<keyof TurnstileRequestBaseIn, 'type'>> {
  cloudflareTaskType?: 'token';
  userAgent?: string;
  pageAction?: string;
}

export type TurnstileCfClearanceType = Pick<TurnstileRequestBaseIn, Exclude<keyof TurnstileRequestBaseIn, 'type'>> &
  ProxyInfoIn & {
    cloudflareTaskType?: 'cf_clearance';
    userAgent: string;
    pageAction?: string;
    htmlPageBase64: string;
    data: string;
    pageData: string;
  };

export type TurnstileRequestIn = TurnstileTokenType | TurnstileCfClearanceType;

/**
 * TurnstileTask / Cloudflare Challenge (with proxy for cf-clearance).
 * {@link https://zennolab.atlassian.net/wiki/spaces/APIS/pages/2313814017/TurnstileTask+Cloudflare+Challenge}
 */
export class TurnstileRequest extends Mixin(TurnstileRequestBase, ProxyInfo) {
  cloudflareTaskType?: 'token' | 'cf_clearance';
  userAgent?: string;
  pageAction?: string;
  htmlPageBase64?: string;
  data?: string;
  pageData?: string;
  constructor(argsObj: TurnstileRequestIn) {
    super({ type: TaskType.TurnstileTask, ...argsObj });
    this.cloudflareTaskType = argsObj.cloudflareTaskType;
    this.userAgent = argsObj.userAgent;
    this.pageAction = argsObj.pageAction;
    if (argsObj.cloudflareTaskType === 'cf_clearance') {
      this.htmlPageBase64 = argsObj?.htmlPageBase64;
      this.data = argsObj?.data;
      this.pageData = argsObj?.pageData;
    }
  }
}
