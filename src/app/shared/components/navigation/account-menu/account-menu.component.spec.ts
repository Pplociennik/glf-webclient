import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AccountMenuComponent } from "./account-menu.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AccountMenuComponent", () => {

  let fixture: ComponentFixture<AccountMenuComponent>;
  let component: AccountMenuComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AccountMenuComponent]
    });

    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
