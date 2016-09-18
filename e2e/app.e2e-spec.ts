import { ZESPERPage } from './app.po';

describe('zesper App', function() {
  let page: ZESPERPage;

  beforeEach(() => {
    page = new ZESPERPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ze works!');
  });
});
