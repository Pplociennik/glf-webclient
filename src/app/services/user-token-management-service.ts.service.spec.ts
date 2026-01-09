import { UserTokenManagementService.tsService } from "./user-token-management-service.ts.service";
import { TestBed } from "@angular/core/testing";

describe("UserTokenManagementService.tsService", () => {

  let service: UserTokenManagementService.tsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserTokenManagementService.tsService
      ]
    });
    service = TestBed.get(UserTokenManagementService.tsService);

  });

  it("should be able to create service instance", () => {
    expect(service).toBeDefined();
  });

});
