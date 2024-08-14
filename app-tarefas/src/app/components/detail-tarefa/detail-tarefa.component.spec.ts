import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTarefaComponent } from './detail-tarefa.component';

describe('DetailTarefaComponent', () => {
  let component: DetailTarefaComponent;
  let fixture: ComponentFixture<DetailTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTarefaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
