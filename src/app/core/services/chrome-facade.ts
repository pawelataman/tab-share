import { Injectable } from '@angular/core';
import { ChromeTabWithId } from '../state/core.models';

@Injectable({
  providedIn: 'root',
})
export class ChromeFacade {
  async getCurrentWindowTabs(): Promise<ChromeTabWithId[]> {
    return chrome.tabs.query({ currentWindow: true }).then(tabs =>
      tabs.map(
        tab =>
          ({
            ...tab,
            id: String(tab.id ?? tab.index),
          }) as ChromeTabWithId
      )
    );
  }

  async openTabs(urls: string[]): Promise<void> {
    const openPromises = urls.map(url => chrome.tabs.create({ url }));
    await Promise.all(openPromises);
  }
}
