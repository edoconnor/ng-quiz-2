import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Capital } from '../capital';
import { CapitalService } from '../capital.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  capitals$: Observable<Capital[]> = new Observable();

  constructor(private capitalsService: CapitalService) {}

  visible: any = {};

  ngOnInit(): void {
    this.fetchCapitals();
  }

  private fetchCapitals(): void {
    this.capitals$ = this.capitalsService.getCapitals();
  }
}
