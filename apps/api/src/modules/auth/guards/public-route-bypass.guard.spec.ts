import { PublicRouteBypassGuard } from './public-route-bypass.guard';

describe('PublicRouteBypassGuard', () => {
  it('should be defined', () => {
    expect(new PublicRouteBypassGuard()).toBeDefined();
  });
});
