import { browser, element, by } from 'protractor/globals';

export class ZESPERPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ze-root h1')).getText();
  }
}
