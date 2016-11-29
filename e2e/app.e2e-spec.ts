import { MusicManagerPage } from './app.po';

describe('music-manager App', function() {
  let page: MusicManagerPage;

  beforeEach(() => {
    page = new MusicManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
