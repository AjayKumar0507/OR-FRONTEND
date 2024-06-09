import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MessagesService } from '../Services/messages.service';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrl: './outbox.component.css'
})
export class OutboxComponent implements OnInit{
  constructor(private messagesService:MessagesService,private renderer:Renderer2){}

  @ViewChild('messages', { static: true }) table!: ElementRef;

  messages:any;
  async ngOnInit(){
    try{
      this.messages = await this.messagesService.getOutBox();
      console.log(2);
      console.log(this.messages);
      this.generateOutBox();  
    }
    catch(error){
      console.log('error fetching messages',error);
    }
    
  }

  generateOutBox(){
    console.log(3);
    if(Object.keys(this.messages).length == 0){
      let p = this.renderer.createElement('p');
      p.innerHTML = "No Messages Sent";
      
      this.renderer.appendChild(this.table.nativeElement,p);
      return;
    }

    for(let i=Object.keys(this.messages).length -1 ; i>=0 ; i--){

      console.log(this.messages[i]);
      let task = this.renderer.createElement('div');
      this.renderer.addClass(task,'task');

      let to = this.renderer.createElement('div');
      this.renderer.addClass(to,'to');

      let h31 = this.renderer.createElement('h3');
      h31.innerHTML = "To : ";

      let h41 = this.renderer.createElement('h4');
      h41.innerHTML = this.messages[i].toRoleId;
      
      this.renderer.appendChild(to,h31);
      this.renderer.appendChild(to,h41);

      let hr = this.renderer.createElement('hr');

      this.renderer.appendChild(task,to);
      this.renderer.appendChild(task,hr);
      
      let msg = this.renderer.createElement('div');
      this.renderer.addClass(msg,'msg');

      let h32 = this.renderer.createElement('h3');
      h32.innerHTML = "Message : "

      let h42 = this.renderer.createElement('h4');
      h42.innerHTML = this.messages[i].message;

      this.renderer.appendChild(msg,h32);
      this.renderer.appendChild(msg,h42);

      this.renderer.appendChild(task,msg);

      this.renderer.appendChild(this.table.nativeElement,task);
    }
  }

}
