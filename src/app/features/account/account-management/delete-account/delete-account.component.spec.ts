import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DeleteAccountComponent } from "./delete-account.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("DeleteAccountComponent", () => {

  let fixture: ComponentFixture<DeleteAccountComponent>;
  let component: DeleteAccountComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [DeleteAccountComponent]
    });

    fixture = TestBed.createComponent(DeleteAccountComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
