import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightWord]'
})
export class HighlightWordDirective implements OnChanges{
  @Input() searchedWord: string ='';
  @Input() originalWord: string ='';

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('in the directive');

    let newContent = this.originalWord;
    
    if(this.searchedWord){
      newContent = this.highlighWord(this.originalWord,this.searchedWord);
      console.log('in the directive' , newContent);
    }

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      newContent
    );
    return;
  }

  highlighWord(originalValue:string, searchedWord:string) {
    const re = new RegExp(`(${searchedWord})`, 'gi');
    return originalValue.replace(re, `<b>$1</b>`);
  }

}
