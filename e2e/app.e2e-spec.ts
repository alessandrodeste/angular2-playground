import { Angular2PlaygroundPage } from './app.po';

describe('angular2-playground App', () => {
  let page: Angular2PlaygroundPage;

  beforeEach(() => {
    page = new Angular2PlaygroundPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
