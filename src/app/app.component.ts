import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oolie';

  public toggle:boolean = true;
  slidetoggle(slide:boolean){
    this.toggle = !slide;
    console.log(this.toggle)

  }

}

