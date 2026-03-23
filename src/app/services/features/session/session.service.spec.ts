import { SessionService } from "./session.service";
import { TestBed } from "@angular/core/testing";

describe("SessionService", () => {

  let service: SessionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionService
      ]
    });
    service = TestBed.get(SessionService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
