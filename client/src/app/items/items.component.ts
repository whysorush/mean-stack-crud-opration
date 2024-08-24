import { Component, OnInit } from '@angular/core';
import { Item } from './items';
import { DataService } from '../data.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})

export class ItemsComponent implements OnInit {
  ngOnInit(): void {
    this.getItems();
    throw new Error('Method not implemented.');
  }
  items: Item[] = [];
  newItem : Item={
    name: '',
    description: '',
    _id:''
  };
  edittableItemId: string | null = null;
  isEditMode :boolean=false;

  constructor(private dataService: DataService) { }
  
  getItems(): void {
    this.dataService.getItems().subscribe((items: any[]) => {
      this.items = items.filter(item => !!item._id);
    });
  }
  editOrUpdateItem():void{
    console.log( this.isEditMode)
    if(this.isEditMode){
      this.dataService.updateItem(this.newItem._id,this.newItem).subscribe((item: any
        ) => {
          this.items = this.items.map((i) => i._id === this.newItem._id
          ? item : i);
          this.isEditMode=false;
          this.newItem.name='';
          this.newItem.description='';
          this.edittableItemId=null;
          
    });
  }
    else{
      this.dataService.createItem(this.newItem)
      .subscribe((item: any) => {
        this.items.push(item);
        this.resetForm();
      })
    }
  }
  deleteItem(item: any):void{
    console.log(item)
    this.dataService.deleteItem(item._id).subscribe((itemsData: any) => {
      console.log("itemsData",itemsData)
      this.items = this.items.filter(item => item._id !== itemsData._id);
      this.resetForm();
  
    });

  }
  
  editItem(item:any):void{
    this.isEditMode=true;
    this.newItem={...item};
  }
  cancelEdit():void{
    this.resetForm();
    this.isEditMode = false;
  }
  resetForm(): void {
    this.newItem = {_id:'',name: '', description: '' };
  }
  private generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
