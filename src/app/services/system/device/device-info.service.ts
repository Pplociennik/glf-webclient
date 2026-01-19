import { Injectable } from '@angular/core';

/**
 * Service for retrieving device and browser information.
 * Parses the browser's user agent string to extract meaningful device details.
 */
@Injectable({
  providedIn: 'root',
})
export class DeviceInfoService {
  /**
   * Returns a human-readable device name based on the browser's user agent.
   * Format: "Browser on OS" (e.g., "Chrome on Windows")
   */
  getDeviceName(): string {
    const userAgent = navigator.userAgent;
    const browser = this.getBrowser(userAgent);
    const os = this.getOS(userAgent);
    return `${browser} on ${os}`;
  }

  private getBrowser(userAgent: string): string {
    if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Opera') || userAgent.includes('OPR/')) return 'Opera';
    if (userAgent.includes('Edg/')) return 'Edge';
    if (userAgent.includes('Chrome/')) return 'Chrome';
    if (userAgent.includes('Firefox/')) return 'Firefox';
    return 'Unknown Browser';
  }

  private getOS(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return 'Unknown OS';
  }
}
