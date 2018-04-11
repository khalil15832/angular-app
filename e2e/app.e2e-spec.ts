import { AppPage } from './app.po';

describe('image-gallery App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app title', () => {
    page.navigateTo();
    expect(page.getBrandText()).toEqual('Angular 5 Image Gallery');
  });
});
