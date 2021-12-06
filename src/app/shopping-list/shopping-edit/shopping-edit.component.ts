import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput',{ static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false}) amountInputRef: ElementRef;
  // to select the item on this list
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;


  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
      }
    );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    // const ingname = this.nameInputRef.nativeElement.value;
    // const ingamount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
