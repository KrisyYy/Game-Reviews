import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGame } from 'src/app/core/interfaces';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game!: IGame;

  @Input() isAdmin!: boolean;

  editing: boolean = false;

  @Output() updateGame: EventEmitter<any> = new EventEmitter();
  @Output() deleteGame: EventEmitter<any> = new EventEmitter();

  gameForm: FormGroup = this.formBuilder.group({
    "title": [null, { validators: [Validators.required], updateOn: 'change'}],
    "description": [null, { validators: [Validators.required], updateOn: 'change'}],
    "developer": [null, { validators: [Validators.required], updateOn: 'change'}],
    "genre": [null, { validators: [Validators.required, Validators.pattern(/[a-zA-Z0-9- ]+(, [a-zA-Z0-9- ]+)*/)], updateOn: 'change'}],
    "releaseDate": [null, { validators: [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)], updateOn: 'change'}],
  })

  constructor(private gameService: GameService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  onUpdate() {
    this.editing = true;
    if (this.editing)
    {
      this.gameForm.patchValue({
        "title": this.game.title,
        "description": this.game.description,
        "developer": this.game.developer,
        "genre": this.game.genre,
        "releaseDate": this.game.releaseDate
      })
    }
  }

  sendUpdate() {
    this.editing = false;
    this.updateGame.emit(this.gameForm.value);
  }

  onCancel() {
    this.editing = false;
  }

  onDelete() {
    this.deleteGame.emit();
  }

  showError(property: string): boolean {
    return this.gameForm.controls[property].invalid && this.gameForm.controls[property].touched;
  }

  validation(property: string, validator: string): boolean {
    return this.gameForm.controls[property].errors?.[validator];
  }
}
