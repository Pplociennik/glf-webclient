import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UserSessionsComponent } from "./user-sessions.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UserSessionsComponent", () => {

  let fixture: ComponentFixture<UserSessionsComponent>;
  let component: UserSessionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UserSessionsComponent]
    });

    fixture = TestBed.createComponent(UserSessionsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
