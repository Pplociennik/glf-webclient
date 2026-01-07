import { Auth/authServiceTsService } from "./auth/auth-service-ts.service";
import { TestBed } from "@angular/core/testing";

describe("Auth/authServiceTsService", () => {

  let service: Auth/authServiceTsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Auth/authServiceTsService
      ]
    });
    service = TestBed.get(Auth/authServiceTsService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
