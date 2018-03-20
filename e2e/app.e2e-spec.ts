import { TechstorePage } from './app.po';

describe('techstore App', function() {
  let page: TechstorePage;

  beforeEach(() => {
    page = new TechstorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
